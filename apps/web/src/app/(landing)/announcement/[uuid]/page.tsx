"use client";

import { use } from "react";
import React, { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { supabase } from "../../../../lib/supabase";
import { NEXT_PUBLIC_SUPABASE_CDN_BASE } from "../../../../lib/env";

interface AnnouncementDetail {
  id: string;
  title: string;
  description: string;
  created_at: string;
  thumbnail_url?: string;
}

interface AttachmentFile {
  id: string;
  name: string;
  size: string;
  url: string;
}

// ── 유틸
function formatDotDate(input: string) {
  const d = new Date(input);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

// ── 아이콘
function CalendarIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="15" rx="2" />
      <path d="M3 10h18M7 3v4M17 3v4" strokeLinecap="round" />
    </svg>
  );
}

function DownloadIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FileIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ZipIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface AnnouncementDetailContentProps {
  uuid: string;
}

function AnnouncementDetailContent({ uuid }: AnnouncementDetailContentProps) {
  const getAnnouncementDetail = async () => {
    try {
      const { data, error } = await supabase
        .from("announcement")
        .select("*")
        .eq("id", uuid)
        .single();

      if (error) {
        console.error("Supabase 에러:", error);
        throw error;
      }

      return data as AnnouncementDetail;
    } catch (err) {
      console.error("getAnnouncementDetail 에러:", err);
      throw err;
    }
  };

  const {
    data: announcement,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["announcementDetail", uuid],
    queryFn: () => getAnnouncementDetail(),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

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

  if (!announcement) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-xl font-medium text-gray-600">
          게시글을 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 md:px-20 py-16 md:py-24 border rounded-xl shadow-md">
        {/* 헤더 - 날짜와 제목 */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-12">
            {announcement.title}
          </h1>
          <div className="flex items-center gap-2 text-purple-600 mb-8">
            <CalendarIcon className="w-5 h-5" />
            <time
              dateTime={announcement.created_at}
              className="text-base font-medium"
            >
              {formatDotDate(announcement.created_at)}
            </time>
          </div>
        </header>

        <hr />

        {/* 본문 */}
        <article className="mb-16 mt-8">
          <div className="text-gray-700 leading-[1.8] whitespace-pre-wrap text-base">
            {announcement.description}
          </div>
        </article>

        {/* 목록 보기 버튼 */}
        <div className="flex justify-center pt-8">
          <Link
            href="/announcement"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 5L7.5 10L12.5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            목록 보기
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function NoticeDetailPage({ params }: {params: Promise<{ uuid: string }>;}) {
  const { uuid } = use(params);

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-xl font-medium text-gray-600">Loading...</div>
        </div>
      }
    >
      <AnnouncementDetailContent uuid={uuid} />
    </Suspense>
  );
}
