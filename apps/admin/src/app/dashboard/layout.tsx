"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.replace("/?auth_required=true");
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("인증 확인 오류:", error);
        router.replace("/?auth_required=true");
      }
    }

    checkAuth();

    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/?auth_required=true");
      } else {
        setIsAuthenticated(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // 인증 확인 중 로딩 표시
  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-dark-50 via-primary-50/30 to-dark-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl mb-4 shadow-medium animate-pulse">
            <svg
              className="w-8 h-8 text-white animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p className="text-dark-600 font-medium">인증 확인 중...</p>
        </div>
      </div>
    );
  }

  // 인증되지 않은 경우 아무것도 렌더링하지 않음
  if (!isAuthenticated) {
    return null;
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return <>{children}</>;
}
