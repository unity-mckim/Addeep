"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { IRMaterial } from "@/shared/types/ir-material";

export default function IRLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: irMaterials, isLoading } = useQuery<IRMaterial[]>({
    queryKey: ["irMaterials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ir_materials")
        .select("*")
        .eq("is_published", true)
        .order("published_date", { ascending: false });

      if (error) throw error;
      return data as IRMaterial[];
    },
  });

  // 필터링된 데이터
  const filteredMaterials = useMemo(() => {
    if (!irMaterials) return [];

    return irMaterials.filter((material) => {
      // 검색 필터
      const matchesSearch = material.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // 연도 필터
      const materialYear = material.published_date
        ? new Date(material.published_date).getFullYear().toString()
        : null;
      const matchesYear =
        selectedYear === "all" || materialYear === selectedYear;

      return matchesSearch && matchesYear;
    });
  }, [irMaterials, searchQuery, selectedYear]);

  // 사용 가능한 연도 목록
  const availableYears = useMemo(() => {
    if (!irMaterials) return [];
    const years = irMaterials
      .map((material) =>
        material.published_date
          ? new Date(material.published_date).getFullYear().toString()
          : null
      )
      .filter((year): year is string => year !== null);
    return Array.from(new Set(years)).sort((a, b) => parseInt(b) - parseInt(a));
  }, [irMaterials]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);
  const paginatedMaterials = filteredMaterials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  const getFileExtension = (fileType: string | null) => {
    if (!fileType) return "FILE";
    if (fileType.includes("pdf")) return "PDF";
    if (fileType.includes("word") || fileType.includes("document"))
      return "DOC";
    if (fileType.includes("excel") || fileType.includes("spreadsheet"))
      return "XLS";
    if (fileType.includes("powerpoint") || fileType.includes("presentation"))
      return "PPT";
    return "FILE";
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            IR 자료실
          </h1>
          <p className="text-lg text-gray-600">
            투명한 경영 정보를 제공합니다.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by Title"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-48 px-4 py-3 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Years</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          ) : filteredMaterials.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600">No IR materials found.</p>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
                <div className="col-span-2">Date Posted</div>
                <div className="col-span-8">Title</div>
                <div className="col-span-2 text-center">File</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {paginatedMaterials.map((material) => (
                  <div
                    key={material.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="md:col-span-2 text-gray-600">
                      <span className="md:hidden font-semibold">
                        Date Posted:{" "}
                      </span>
                      {formatDate(material.published_date)}
                    </div>
                    <div className="md:col-span-8 text-gray-900">
                      <span className="md:hidden font-semibold">Title: </span>
                      {material.title}
                    </div>
                    <div className="md:col-span-2 flex items-center justify-start md:justify-center gap-2">
                      {material.file_url ? (
                        <a
                          href={material.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <span className="text-sm font-medium">
                            {getFileExtension(material.file_type)}
                          </span>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg font-medium ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
