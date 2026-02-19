"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  SiteNavChevronIcon,
  SiteNavCloseIcon,
  SiteNavHamburgerIcon,
} from "../icons";
import { useResponsive } from "../lib/useResponsive";
import { NAV, type DefaultLinkType } from "../constants/nav";
import { images } from "../constants/images";

export default function SiteNav() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [exp, setExp] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  const responsive = useResponsive();
  // 첫 렌더링에서는 항상 데스크톱으로 (서버와 일치)
  const isMobile = mounted ? responsive.isMobile : false;
  const isTablet = mounted ? responsive.isTablet : false;

  const pathname = usePathname();

  const disabledNav = "";

  const disableLogo = mounted && pathname.includes("/about-us/core-value");

  useEffect(() => {
    setMounted(true);
  }, []);

  // body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // esc close
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  if (disabledNav) {
    return null;
  }

  // 첫 렌더링에서는 데스크톱 버전만 렌더링 (Hydration 에러 방지)
  if (!mounted) {
    return (
      <>
        <header className="sticky top-0 left-0 z-50 bg-white bg-opacity-70 backdrop-blur-md flex items-center justify-end w-full h-[82px] p-16 text-[12px] leading-[16.08px] font-sans text-[#1c1e21] transition-transform duration-500 [transition-timing-function:cubic-bezier(0,0.61,0.28,0.92)]">
          <div className="mx-auto flex h-14 w-full items-center justify-between px-6 md:px-10">
            <button
              type="button"
              aria-label="메뉴 열기"
              aria-expanded={false}
              className="inline-flex items-center rounded-lg p-2 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            >
              <SiteNavHamburgerIcon className="h-12 w-14 text-gray-900" />
            </button>
            <div aria-hidden className="flex-1" />
            <div className="cursor-pointer">
              <img src={images.common.logoSymbol} alt="logo" className="h-14 w-16" />
            </div>
          </div>
        </header>
      </>
    );
  }

  if (isMobile || isTablet) {
    return (
      <>
        <header className="sticky top-0 left-0 z-50 bg-white bg-opacity-70 backdrop-blur-md flex items-center justify-end w-full h-[82px] p-8 text-[12px] leading-[16.08px] font-sans text-[#1c1e21] transition-transform duration-500 [transition-timing-function:cubic-bezier(0,0.61,0.28,0.92)]">
          <button
            type="button"
            aria-label="메뉴 열기"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="inline-flex items-center rounded-lg p-2 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
          >
            <SiteNavHamburgerIcon className="h-8 w-8 text-gray-900" />
          </button>
          <div aria-hidden className="flex-1" />
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <img src={images.common.logoSymbol} alt="logo" className="h-9 w-10" />
          </div>
          {open &&
            typeof window !== "undefined" &&
            createPortal(
              <>
                <div
                  aria-hidden="true"
                  className="fixed inset-0 z-[59] bg-gradient-to-b from-[#9A16D8] via-[#561BAA] to-[#4B16A3]"
                />
                <div
                  role="dialog"
                  aria-modal="true"
                  className="fixed inset-0 z-[60] overflow-y-auto"
                >
                  {/* gradient backdrop */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#9A16D8] via-[#561BAA] to-[#4B16A3]" />

                  {/* content */}
                  <div className="relative mx-auto flex min-h-full w-full max-w-[1440px] flex-col px-6 pt-6 md:px-10">
                    {/* top bar inside overlay */}
                    <div className="flex items-center justify-between">
                      <button
                        aria-label="닫기"
                        onClick={() => setOpen(false)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 text-white/90 backdrop-blur-sm hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                      >
                        <SiteNavCloseIcon />
                      </button>
                    </div>

                    {/* big menu */}
                    <nav className="mt-10 mb-16 text-white">
                      <ul className="space-y-6">
                        {NAV.map((it) => {
                          const isParent = "children" in it;
                          if (!isParent) {
                            const link = it as DefaultLinkType;
                            return (
                              <li key={link.label}>
                                <NavLinkBig
                                  href={link.href}
                                  external={link.external}
                                  onClick={() => setOpen(false)}
                                  isMobile={isMobile}
                                  isTablet={isTablet}
                                >
                                  {link.label}
                                </NavLinkBig>
                              </li>
                            );
                          }
                          const id = it.label;
                          const openNow = !!exp[id];
                          return (
                            <li key={id} className="space-y-2">
                              <button
                                type="button"
                                aria-expanded={openNow}
                                onClick={() =>
                                  setExp((m) => ({ ...m, [id]: !m[id] }))
                                }
                                className="flex w-full items-center gap-3 text-left text-white"
                              >
                                <span className="text-2xl leading-[1.1]">
                                  {it.label}
                                </span>
                                <SiteNavChevronIcon
                                  className={`mt-2 h-6 w-6 transition-transform ${openNow ? "rotate-180" : ""}`}
                                />
                              </button>
                              <ul
                                className={`overflow-hidden pl-1 ${
                                  openNow ? "max-h-[1000px]" : "max-h-0"
                                } transition-[max-height] duration-300`}
                              >
                                {(it.children ?? []).map((c) => (
                                  <li key={c.href}>
                                    <Link
                                      href={c.href}
                                      className="block py-2 text-lg text-white/85 hover:text-white"
                                      onClick={() => setOpen(false)}
                                    >
                                      {c.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                  </div>
                </div>
              </>,
              document.body
            )}
        </header>
      </>
    );
  }

  return (
    <>
      {/* 상단 얇은 바 + 햄버거(좌) / 로그인+IG(우) */}
      <header className="sticky top-0 left-0 z-50 bg-white bg-opacity-70 backdrop-blur-md flex items-center justify-end w-full h-[82px] p-16 text-[12px] leading-[16.08px] font-sans text-[#1c1e21] transition-transform duration-500 [transition-timing-function:cubic-bezier(0,0.61,0.28,0.92)]">
        <div className="mx-auto flex h-14 w-full items-center justify-between px-6 md:px-10">
          <button
            type="button"
            aria-label="메뉴 열기"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="inline-flex items-center rounded-lg p-2 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
          >
            <SiteNavHamburgerIcon className="h-12 w-14 text-gray-900" />
          </button>

          <div aria-hidden className="flex-1" />
          <div
            className="cursor-pointer"
            onClick={() => router.push("/")}
            style={{ visibility: disableLogo ? "hidden" : "visible" }}
          >
            <img
              src={images.common.logoSymbol}
              alt="logo"
              className="h-14 w-16"
            />
          </div>
        </div>
      </header>

      {/* 오버레이는 Portal로 띄워서 나머지 레이아웃에 영향 X */}
      {open &&
        typeof window !== "undefined" &&
        createPortal(
          <>
            <div
              aria-hidden="true"
              className="fixed inset-0 z-[59] bg-gradient-to-b from-[#9A16D8] via-[#561BAA] to-[#4B16A3]"
            />
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-[60] overflow-y-auto"
            >
              {/* gradient backdrop */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#9A16D8] via-[#561BAA] to-[#4B16A3]" />

              {/* content */}
              <div className="relative mx-auto flex min-h-full w-full max-w-[1440px] flex-col px-6 pt-6 md:px-10">
                {/* top bar inside overlay */}
                <div className="flex items-center justify-between">
                  <button
                    aria-label="닫기"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 text-white/90 backdrop-blur-sm hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    <SiteNavCloseIcon />
                  </button>
                </div>

                {/* big menu */}
                <nav className="mt-10 mb-16 text-white">
                  <ul className="space-y-8">
                    {NAV.map((it) => {
                      const isParent = "children" in it;
                      if (!isParent) {
                        const link = it as DefaultLinkType;
                        return (
                          <li key={link.label}>
                            <NavLinkBig
                              href={link.href}
                              external={link.external}
                              onClick={() => setOpen(false)}
                              isMobile={isMobile}
                              isTablet={isTablet}
                            >
                              {link.label}
                            </NavLinkBig>
                          </li>
                        );
                      }
                      const id = it.label;
                      const openNow = !!exp[id];
                      return (
                        <li key={id} className="space-y-2">
                          <button
                            type="button"
                            aria-expanded={openNow}
                            onClick={() =>
                              setExp((m) => ({ ...m, [id]: !m[id] }))
                            }
                            className="flex w-full items-center gap-3 text-left text-white"
                          >
                            <span className="text-[44px] leading-[1.1] sm:text-[56px]">
                              {it.label}
                            </span>
                            <SiteNavChevronIcon
                              className={`mt-2 h-6 w-6 transition-transform ${openNow ? "rotate-180" : ""}`}
                            />
                          </button>
                          <ul
                            className={`overflow-hidden pl-1 ${
                              openNow ? "max-h-[1000px]" : "max-h-0"
                            } transition-[max-height] duration-300`}
                          >
                            {(it.children ?? []).map((c) => (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  className="block py-2 text-lg text-white/85 hover:text-white"
                                  onClick={() => setOpen(false)}
                                >
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}

function NavLinkBig({
  href,
  external,
  onClick,
  children,
  isMobile,
  isTablet,
}: {
  href: string;
  external?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  isMobile: boolean;
  isTablet: boolean;
}) {
  const mobileCls =
    "inline-block text-2xl leading-normal text-white hover:text-white/90 focus:outline-none";

  const cls =
    "inline-block text-[44px] leading-[1.1] sm:text-[56px] text-white hover:text-white/90 focus:outline-none";

  if (isMobile || isTablet) {
    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={mobileCls}
        onClick={onClick}
      >
        {children}
      </a>
    ) : (
      <Link href={href} className={mobileCls} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      onClick={onClick}
    >
      {children}
    </a>
  ) : (
    <Link href={href} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}
