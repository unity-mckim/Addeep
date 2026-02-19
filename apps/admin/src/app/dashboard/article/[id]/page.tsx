"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Modal } from "../../../components/modal";
import { supabase } from "../../../../../lib/supabase";
import { Article } from "../../../store/interface/article";
import { deleteArticle } from "../actions";

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as unknown as number;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getArticleDetailData = async () => {
    try {
      const { data, error } = await supabase
        .from("article")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Supabase 에러:", error);
        throw error;
      }
      return data;
    } catch (err) {
      console.error(`getArticleDetailData 에러:`, err);
      throw err;
    }
  };

  const deleteArticleDetailData = async (id: number) => {
    try {
      const result = await deleteArticle(id);
      return result.data;
    } catch (err) {
      console.error(`deleteArticleDetailData 에러:`, err);
      throw err;
    }
  };

  const {
    data: ArticleDetail,
    isLoading,
    error,
  } = useQuery<Article>({
    queryKey: ["articleDetail", id],
    queryFn: () => getArticleDetailData(),
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  const { mutate: deleteArticleDetailDataMutation } = useMutation({
    mutationFn: (id: number) => deleteArticleDetailData(id),
    onSuccess: () => {
      alert("삭제가 정상적으로 완료 되었습니다.");
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("deleteArticleDetailData 에러:", error);
    },
  });

  console.log(ArticleDetail);

  function handleEdit(id: number): void {
    router.push(`/dashboard/article/edit/${id}`);
  }

  function handleDelete(id: number): void {
    console.log("삭제:", id);
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
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
          <p className="text-dark-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-dark-50 via-primary-50/30 to-dark-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-lg font-semibold text-dark-900 mb-2">
            오류가 발생했습니다
          </p>
          <p className="text-dark-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!ArticleDetail) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-dark-50 via-primary-50/30 to-dark-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-dark-100 rounded-2xl mb-4">
            <svg
              className="w-8 h-8 text-dark-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-lg font-semibold text-dark-900">
            데이터를 찾을 수 없습니다
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return dateString ? dateString.split("T")[0] : "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 via-primary-50/30 to-dark-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto animate-fade-in">
        {/* Header Section */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 text-dark-600 hover:text-dark-900 font-medium transition-colors mb-4"
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
            뒤로 가기
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white rounded-2xl p-6 shadow-medium border border-dark-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-100 text-secondary-700 rounded-lg text-sm font-semibold mb-3">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                아티클
              </div>
              <h1 className="text-3xl font-bold text-dark-900 mb-2">
                {ArticleDetail.title}
              </h1>
              <p className="text-dark-600 text-sm">
                작성일: {formatDate(ArticleDetail.created_at)}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(ArticleDetail.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-all duration-200 shadow-soft"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                수정
              </button>
              <button
                onClick={() => handleDelete(ArticleDetail.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all duration-200 shadow-soft"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                삭제
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-medium border border-dark-100 overflow-hidden">
          <div className="divide-y divide-dark-100">
            <div className="px-8 py-6 hover:bg-dark-50/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-32">
                  <span className="text-sm font-semibold text-dark-700">
                    제목
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-dark-900 font-medium">
                    {ArticleDetail.title}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 hover:bg-dark-50/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-32">
                  <span className="text-sm font-semibold text-dark-700">
                    작성 날짜
                  </span>
                </div>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 text-dark-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {formatDate(ArticleDetail.created_at)}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 hover:bg-dark-50/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-32">
                  <span className="text-sm font-semibold text-dark-700">
                    설명
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-dark-600 whitespace-pre-wrap">
                    {ArticleDetail.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 hover:bg-dark-50/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-32">
                  <span className="text-sm font-semibold text-dark-700">
                    PDF URL
                  </span>
                </div>
                <div className="flex-1">
                  {ArticleDetail.pdf_url ? (
                    <a
                      href={ArticleDetail.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      PDF 파일 보기
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  ) : (
                    <p className="text-dark-400 italic">PDF 파일이 없습니다.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-dark-900 mb-1">
                삭제 확인
              </h2>
              <p className="text-sm text-dark-600">
                이 작업은 되돌릴 수 없습니다.
              </p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-800">
              정말로{" "}
              <span className="font-semibold">"{ArticleDetail.title}"</span>
              을(를) 삭제하시겠습니까?
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleModalClose}
              className="px-6 py-2.5 bg-dark-100 text-dark-700 rounded-xl font-medium hover:bg-dark-200 transition-colors"
            >
              취소
            </button>
            <button
              onClick={() => deleteArticleDetailDataMutation(id)}
              className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors shadow-soft"
            >
              삭제하기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
