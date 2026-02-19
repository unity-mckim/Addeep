"use client";

import React, { useState, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { formatKoreanDate } from "../../../shared/utils";
import { useResponsive } from "../../../lib/useResponsive";
import { supabase } from "../../../lib/supabase";
import { images } from "../../../constants/images";
import Link from "next/link";

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

interface PressMediaHeaderProps {
  isMobile?: boolean;
}

function PressMediaHeader({ isMobile }: PressMediaHeaderProps) {
  return (
    <div className="w-full text-center py-16 md:py-20 bg-white">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        보도자료
      </h1>
      <div className="text-gray-600 text-base md:text-lg space-y-2">
        <p>에딥의 최신 소식과 중요한 발표를 확인하세요.</p>
        <p>투명하고 신속한 정보 공유를 통해 더 나은 소통을 만들어갑니다.</p>
      </div>
    </div>
  );
}

interface FeaturedCardProps {
  item: PressMediaItem;
  isMobile?: boolean;
}

function FeaturedCard({ item, isMobile }: FeaturedCardProps) {
  return (
    <Link href={`/press-media/${item.id}`}>
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-16 md:mb-24 cursor-pointer group">
        {/* 이미지 */}
        <div className="w-full md:w-1/2 rounded-2xl overflow-hidden">
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-64 md:h-96 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* 텍스트 */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            {item.title}
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 line-clamp-4">
            {item.content.length > 100
              ? `${item.content.slice(0, 100)}...`
              : item.content}
          </p>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full font-medium hover:shadow-lg transition-shadow"
            >
              자세히 보기
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <time className="text-sm text-gray-500">
              {formatKoreanDate(item.published_date)}
            </time>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface GridCardProps {
  item: PressMediaItem;
}

function GridCard({ item }: GridCardProps) {
  return (
    <Link href={`/press-media/${item.id}`}>
      <div className="flex flex-col cursor-pointer group">
        {/* 이미지 */}
        <div className="w-full rounded-2xl overflow-hidden mb-6">
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* 날짜 */}
        <time className="text-sm text-gray-500 mb-3">
          {formatKoreanDate(item.published_date)}
        </time>

        {/* 제목 */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {item.title}
        </h3>

        {/* 설명 */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {item.content.length > 100
            ? `${item.content.slice(0, 100)}...`
            : item.content}
        </p>

        {/* 링크 */}
        <div className="inline-flex items-center gap-2 text-purple-600 font-medium">
          자세히 보기
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 3L11 8L6 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 my-16">
      {/* 이전 버튼 */}
      <button
        type="button"
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* 페이지 번호 */}
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page - 1)}
          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
            currentPage === page - 1
              ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage === totalPages - 1}
        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

function PressMediaContent() {
  const { isMobile, isTablet } = useResponsive();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [pagination, setPagination] = useState({
    pageIndex: Number(searchParams.get("page") || 0),
    pageSize: 4, // Featured 1개 + Grid 3개
  });

  const getPressMediaData = async () => {
    try {
      const { data, count, error } = await supabase
        .from("press_media")
        .select("*", { count: "exact" })
        .order("published_date", { ascending: false })
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
      console.error("getPressMediaData 에러:", err);
      throw err;
    }
  };

  const {
    data: pressMediaList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["press_media", pagination.pageIndex, pagination.pageSize],
    queryFn: () => getPressMediaData(),
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  function handlePageChange(newPage: number) {
    setPagination({ ...pagination, pageIndex: newPage });
    router.push(`/press-media?page=${newPage}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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

  const items = pressMediaList?.data || [];
  const totalCount = pressMediaList?.count || 0;
  const totalPages = Math.ceil(totalCount / pagination.pageSize);

  const featuredItem = items[0];
  const gridItems = items.slice(1, 4);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* 헤더 */}
        <PressMediaHeader isMobile={isMobile} />

        {/* Featured 카드 */}
        {featuredItem && (
          <div className="mt-8">
            <FeaturedCard item={featuredItem} isMobile={isMobile} />
          </div>
        )}

        {/* 그리드 카드들 */}
        {gridItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-8">
            {gridItems.map((item) => (
              <GridCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* 데이터가 없을 때 */}
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xl font-medium text-gray-500">
              보도자료가 없습니다.
            </p>
          </div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <Pagination
            currentPage={pagination.pageIndex}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
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
      <PressMediaContent />
    </Suspense>
  );
}
