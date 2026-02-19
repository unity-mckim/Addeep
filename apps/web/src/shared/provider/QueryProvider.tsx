"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useState로 QueryClient 생성 - 재렌더링 시 재생성 방지
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 재시도 로직 추가
            retry: 3,
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
            // 네트워크 복구 시 재시도
            refetchOnReconnect: true,
            // 윈도우 포커스 시 재시도 (모바일 백그라운드 복귀)
            refetchOnWindowFocus: true,
            // Stale 타임 설정 (30초)
            staleTime: 30000,
            // 캐시 타임 설정 (5분)
            gcTime: 5 * 60 * 1000,
            // 네트워크 에러 처리
            networkMode: "offlineFirst",
          },
          mutations: {
            retry: 2,
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 10000),
            networkMode: "offlineFirst",
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
