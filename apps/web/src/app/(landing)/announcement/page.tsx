"use client";

import React, { useState, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CalendarIcon } from "../../../constants/announcement";
import { formatKoreanDate } from "../../../shared/utils";
import { useResponsive } from "../../../lib/useResponsive";
import { supabase } from "../../../lib/supabase";
import { images } from "../../../constants/images";

interface AnnouncementHeaderProps {
  isMobile?: boolean;
}

interface AnnouncementItem {
  id: string;
  title: string;
  description: string;
  created_at: string;
  thumbnail_url?: string;
}

interface NoticeListProps {
  items: AnnouncementItem[];
  title?: string;
}

function AnnouncementHeader({ isMobile }: AnnouncementHeaderProps) {
  return (
    <div className="w-full text-center">
      <div className="absolute h-[400px] mt-32 inset-0 bg-black bg-opacity-60 rounded-lg" />
      <div
        className="w-full h-[400px] rounded-lg flex flex-col items-center justify-center"
        style={{
          background: `url(${images.announcement.banner})`,
          border: "1px solid #E5E7EB",
        }}
      >
        <div className="flex flex-col items-center justify-center z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            공지사항
          </h1>
        </div>
      </div>
    </div>
  );
}

function NoticeList({ items, title = "" }: NoticeListProps) {
  return (
    <section className="w-full">
      {title ? (
        <h2 className="mb-6 text-3xl font-bold text-neutral-900 md:text-4xl">
          {title}
        </h2>
      ) : null}

      <ul className="space-y-8">
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <h4 className="font-poppins font-semibold text-xl">
              공지사항이 없습니다.
            </h4>
          </div>
        )}
        {items.map((it) => {
          return (
            <li key={it.id}>
              <Link
                href={`/announcement/${it.id}`}
                className="
                  block rounded-3xl bg-white
                  border border-neutral-100 shadow-[0_1px_0_rgba(0,0,0,0.02)]
                  transition
                  hover:shadow-md hover:-translate-y-0.5
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300
                  cursor-pointer
                "
              >
                <div className="p-8">
                  <h3 className="text-xl font-extrabold text-neutral-900">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-neutral-500">{it.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-neutral-500">
                    <CalendarIcon />
                    <time dateTime={it.created_at} className="text-sm">
                      {formatKoreanDate(it.created_at)}
                    </time>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function AnnouncementContent() {
  const { isMobile, isTablet } = useResponsive();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [pagination, setPagination] = useState({
    pageIndex: Number(searchParams.get("page") || 0),
    pageSize: 4, // Featured 1개 + Grid 3개
  });

  const getAnnouncementData = async () => {
    try {
      const { data, count, error } = await supabase
        .from("announcement")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(
          pagination.pageIndex * pagination.pageSize,
          pagination.pageIndex * pagination.pageSize + (pagination.pageSize - 1)
        );

      if (error) {
        console.error("Supabase 에러:", error);
        throw error;
      }

      return { data, count };
    } catch (err) {
      console.error("getAnnouncementData 에러:", err);
      throw err;
    }
  };

  const {
    data: announcementList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["announcement", pagination.pageIndex, pagination.pageSize],
    queryFn: () => getAnnouncementData(),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  function handlePageChange(newPage: number) {
    setPagination({ ...pagination, pageIndex: newPage });
    router.push(`/announcement?page=${newPage}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const NoticeListSectionClassname =
    isMobile || isTablet
      ? "flex flex-col items-center justify-center flex-1 p-2"
      : "flex flex-col items-center justify-center flex-1 w-3/4 p-24";

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-xl font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-xl font-medium text-red-600">
          Error: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <AnnouncementHeader />
      <div className={NoticeListSectionClassname}>
        <NoticeList title="" items={announcementList?.data || []} />
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-xl font-medium text-gray-600">Loading...</div>
        </div>
      }
    >
      <AnnouncementContent />
    </Suspense>
  );
}
