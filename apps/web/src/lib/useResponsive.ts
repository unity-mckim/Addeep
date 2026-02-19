"use client";

import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

interface ResponsiveState {
  isMobile: boolean;
  isMobileTablet: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTabletDesktop: boolean;
}

const getResponsiveState = (): ResponsiveState => {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isMobileTablet: false,
      isTablet: false,
      isDesktop: true,
      isTabletDesktop: false,
    };
  }

  // Samsung Internet 및 모든 브라우저와 호환되는 방식
  const width = window.innerWidth;

  const isMobile = width <= 392;
  const isMobileTablet = width <= 768;
  const isTablet = width <= 1023;
  const isTabletDesktop = width >= 1024 && width <= 1200;
  const isDesktop = width >= 1024 && !isTabletDesktop;

  return {
    isMobile,
    isMobileTablet,
    isTablet,
    isDesktop,
    isTabletDesktop,
  };
};

export const useResponsive = (): ResponsiveState => {
  const [responsiveState, setResponsiveState] = useState<ResponsiveState>(
    () => {
      // 초기 상태를 즉시 계산 - SSR/CSR 불일치 최소화
      return getResponsiveState();
    }
  );

  const updateResponsiveState = useCallback(() => {
    const newState = getResponsiveState();
    setResponsiveState((prevState) => {
      // 모든 상태 체크 (isMobileTablet 추가)
      if (
        prevState.isMobile === newState.isMobile &&
        prevState.isMobileTablet === newState.isMobileTablet &&
        prevState.isTablet === newState.isTablet &&
        prevState.isDesktop === newState.isDesktop &&
        prevState.isTabletDesktop === newState.isTabletDesktop
      ) {
        return prevState;
      }
      return newState;
    });
  }, []);

  const debouncedHandleResize = useCallback(
    debounce(updateResponsiveState, 150), // 150ms로 증가 (모바일 최적화)
    [updateResponsiveState]
  );

  useEffect(() => {
    // 마운트 시 즉시 업데이트
    updateResponsiveState();

    window.addEventListener("resize", debouncedHandleResize);

    // orientation change 이벤트도 처리 (모바일 회전)
    window.addEventListener("orientationchange", updateResponsiveState);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      window.removeEventListener("orientationchange", updateResponsiveState);
      debouncedHandleResize.cancel();
    };
  }, [debouncedHandleResize, updateResponsiveState]);

  return responsiveState;
};
