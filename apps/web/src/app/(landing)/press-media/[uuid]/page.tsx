"use client";

import React, { Suspense, use } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { formatKoreanDate } from "../../../../shared/utils";
import { useResponsive } from "../../../../lib/useResponsive";
import { supabase } from "../../../../lib/supabase";
import { NEXT_PUBLIC_SUPABASE_CDN_BASE } from "../../../../lib/env";

interface PressMediaItem {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  published_date: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

function PressMediaDetailContent({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = React.use(params);
  const router = useRouter();

  const getPressMediaDetail = async () => {
    const { data, error } = await supabase
      .from("press_media")
      .select("*")
      .eq("id", uuid)
      .single();

    if (error) {
      console.error("Supabase 에러:", error);
      throw error;
    }

    return data as PressMediaItem;
  };

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["press_media_detail", uuid],
    queryFn: getPressMediaDetail,
    retry: 0,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-xl font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-xl font-medium text-red-600">
          보도자료를 찾을 수 없습니다.
        </div>
        <button
          type="button"
          onClick={() => router.push("/press-media")}
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-20">
        {/* 뒤로가기 버튼 */}
        <button
          type="button"
          onClick={() => router.push("/press-media")}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          목록으로
        </button>

        {/* 제목 */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>

        {/* 날짜 */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
          <time>{formatKoreanDate(article.published_date)}</time>
          {article.is_featured && (
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
              주요 보도
            </span>
          )}
        </div>

        {/* 이미지 */}
        {article.image_url && (
          <div className="w-full rounded-2xl overflow-hidden mb-12">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* 본문 */}
        <div className="prose prose-lg max-w-none">
          <div
            className="text-gray-700 leading-relaxed whitespace-pre-wrap"
            style={{ wordBreak: "keep-all" }}
          >
            {article.content}
          </div>
        </div>

        {/* 목록으로 돌아가기 버튼 (하단) */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.push("/press-media")}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-shadow"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PressMediaDetailPage({ params }: {params: Promise<{ uuid: string }>}) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-xl font-medium text-gray-600">Loading...</div>
        </div>
      }
    >
      <PressMediaDetailContent params={params} />
    </Suspense>
  );
}
