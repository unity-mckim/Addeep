"use client";

import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import MaintenancePage from "./MaintenancePage";
import { useResponsive } from "@/lib/useResponsive";

interface MaintenanceMode {
  id: number;
  is_active: boolean;
  message: string | null;
  updated_at: string;
}

async function fetchMaintenanceStatus() {
  const { data, error } = await supabase
    .from("maintenance_mode")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Error fetching maintenance status:", error);
    return null;
  }

  return data as MaintenanceMode;
}

export default function MaintenanceChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMobileTablet } = useResponsive();
  const [maintenanceStatus, setMaintenanceStatus] =
    useState<MaintenanceMode | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const channelRef = useRef<any>(null);

  // 초기 상태 조회 - 재시도 로직 추가
  const { data } = useQuery({
    queryKey: ["maintenance_mode"],
    queryFn: fetchMaintenanceStatus,
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 20000,
  });

  useEffect(() => {
    if (data) {
      setMaintenanceStatus(data);
    }
  }, [data]);

  // Supabase Realtime 구독 - 재연결 로직 추가
  useEffect(() => {
    let isSubscribed = true;

    function setupRealtimeChannel() {
      // 기존 채널 정리
      if (channelRef.current) {
        try {
          supabase.removeChannel(channelRef.current);
        } catch (error) {
          console.error("Error removing channel:", error);
        }
      }

      if (!isSubscribed) return;

      try {
        const channel = supabase
          .channel("maintenance_mode_changes", {
            config: {
              broadcast: { self: false },
              presence: { key: "" },
            },
          })
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "maintenance_mode",
            },
            (payload) => {
              if (payload.new && isSubscribed) {
                setMaintenanceStatus(payload.new as MaintenanceMode);
              }
            }
          )
          .subscribe((status, error) => {
            if (error) {
              console.error("Subscription error:", error);
              // 에러 발생 시 5초 후 재연결 시도
              if (isSubscribed) {
                reconnectTimeoutRef.current = setTimeout(() => {
                  if (isSubscribed) {
                    setupRealtimeChannel();
                  }
                }, 5000);
              }
            }
          });

        channelRef.current = channel;
      } catch (error) {
        console.error("Error setting up realtime channel:", error);
        // 채널 설정 실패 시 10초 후 재시도
        if (isSubscribed) {
          reconnectTimeoutRef.current = setTimeout(() => {
            if (isSubscribed) {
              setupRealtimeChannel();
            }
          }, 10000);
        }
      }
    }

    setupRealtimeChannel();

    // 네트워크 상태 변경 감지 (온라인 복귀 시 재연결)
    function handleOnline() {
      if (isSubscribed) {
        setupRealtimeChannel();
      }
    }

    window.addEventListener("online", handleOnline);

    return () => {
      isSubscribed = false;
      window.removeEventListener("online", handleOnline);

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      if (channelRef.current) {
        try {
          supabase.removeChannel(channelRef.current);
        } catch (error) {
          console.error("Error during cleanup:", error);
        }
      }
    };
  }, []);

  // 모바일/태블릿에서만 점검 모드 페이지 표시
  if (maintenanceStatus?.is_active && isMobileTablet) {
    return <MaintenancePage />;
  }

  return <>{children}</>;
}
