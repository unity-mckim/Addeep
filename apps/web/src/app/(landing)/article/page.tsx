"use client";

import React, { useMemo, useState, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

interface ArticleItem {
  id: number;
  uuid: string;
  created_at: string;
  title: string;
  description?: string;
  pdf_url?: string;
}

interface ArticleHeaderProps {
  isMobile?: boolean;
}

function ArticleHeader({ isMobile }: ArticleHeaderProps) {
  return (
    <div className="w-full text-center py-16 md:py-20 bg-white">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        IR 자료
      </h1>
      <div className="text-gray-600 text-base md:text-lg">
        <p>투명한 경영정보를 제공합니다.</p>
      </div>
    </div>
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
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxPagesToShow; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 1; i <= currentPage + 3; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 my-12">
      {/* 이전 버튼 */}
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
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
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
            currentPage === page
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
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
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

function ArticleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedYear, setSelectedYear] = useState("전체 연도");
  const [pagination, setPagination] = useState({
    pageIndex: Number(searchParams.get("page") || 1),
    pageSize: 7,
  });

  const getArticleData = async () => {
    try {
      const { data, count, error } = await supabase
        .from("article")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(
          (pagination.pageIndex - 1) * pagination.pageSize,
          pagination.pageIndex * pagination.pageSize - 1
        );

      if (error) {
        console.error("Supabase 에러:", error);
        throw error;
      }

      return { data, count };
    } catch (err) {
      console.error("getArticleData 에러:", err);
      throw err;
    }
  };

  const {
    data: articleList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["article", pagination.pageIndex, pagination.pageSize],
    queryFn: () => getArticleData(),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  const yearOptions = useMemo(() => {
    if (!articleList?.data) return ["전체 연도"];

    const years = Array.from(
      new Set(
        articleList.data.map((article: ArticleItem) =>
          new Date(article.created_at).getFullYear().toString()
        )
      )
    );

    return ["전체 연도", ...years.sort((a, b) => Number(b) - Number(a))];
  }, [articleList?.data]);

  const filteredArticles = useMemo(() => {
    if (!articleList?.data) return [];

    return articleList.data.filter((article: ArticleItem) => {
      const articleYear = new Date(article.created_at).getFullYear().toString();
      const matchesYear =
        selectedYear === "전체 연도" || articleYear === selectedYear;
      const matchesKeyword =
        searchKeyword === "" ||
        article.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        article.created_at.includes(searchKeyword);

      return matchesYear && matchesKeyword;
    });
  }, [searchKeyword, selectedYear, articleList?.data]);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  }

  function handleDownload(article: ArticleItem) {
    if (!article.pdf_url) {
      alert("PDF 파일이 없습니다.");
      return;
    }

    // PDF URL을 새 탭에서 열기
    window.open(article.pdf_url, "_blank");
  }

  function handlePageChange(newPage: number) {
    setPagination({ ...pagination, pageIndex: newPage });
    router.push(`/article?page=${newPage}`);
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

  const totalCount = articleList?.count || 0;
  const totalPages = Math.ceil(totalCount / pagination.pageSize);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* 헤더 */}
        <ArticleHeader />

        {/* 검색 및 필터 */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="제목으로 검색"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <select
            className="border border-gray-300 rounded-lg px-4 py-3 md:w-48 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent cursor-pointer"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* 테이블 */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          {/* 테이블 헤더 */}
          <div className="grid grid-cols-[150px_1fr_150px] gap-4 bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="text-sm font-semibold text-gray-700">게시일</div>
            <div className="text-sm font-semibold text-gray-700">제목</div>
            <div className="text-sm font-semibold text-gray-700 text-center">
              자료
            </div>
          </div>

          {/* 테이블 바디 */}
          <div className="divide-y divide-gray-200">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article: ArticleItem) => (
                <div
                  key={article.id}
                  className="grid grid-cols-[150px_1fr_150px] gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-sm text-gray-600">
                    {formatDate(article.created_at)}
                  </div>
                  <div className="text-base text-gray-900 font-medium">
                    {article.title}
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleDownload(article)}
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                    >
                      <span>PDF</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 11L4 7H7V2H9V7H12L8 11Z"
                          fill="currentColor"
                        />
                        <path d="M14 13V14H2V13H14Z" fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500">검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
        </div>

        {/* 용량 제한 안내 */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            기본 첨부파일 등록 시 PDF 파일 업로드는 (용량 제한 500mb) 함 수
            있어야 함.
          </p>
        </div>

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

export default function ArticlePage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-xl font-medium text-gray-600">Loading...</div>
        </div>
      }
    >
      <ArticleContent />
    </Suspense>
  );
}
