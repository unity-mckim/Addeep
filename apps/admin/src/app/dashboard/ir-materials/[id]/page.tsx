"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Modal } from "../../../components/modal";
import { supabase } from "../../../../../lib/supabase";
import { IRMaterial } from "../../../store/interface/ir-material";
import { deleteIRMaterial } from "../actions";

export default function IRMaterialDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as unknown as number;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getIRMaterialDetailData = async () => {
    try {
      const { data, error } = await supabase
        .from("ir_materials")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Supabase 에러:", error);
        throw error;
      }
      return data;
    } catch (err) {
      console.error(`getIRMaterialDetailData 에러:`, err);
      throw err;
    }
  };

  const deleteIRMaterialDetailData = async (id: number) => {
    try {
      const result = await deleteIRMaterial(id);
      return result.data;
    } catch (err) {
      console.error(`deleteIRMaterialDetailData 에러:`, err);
      throw err;
    }
  };

  const {
    data: IRMaterialDetail,
    isLoading,
    error,
  } = useQuery<IRMaterial>({
    queryKey: ["irMaterialDetail", id],
    queryFn: () => getIRMaterialDetailData(),
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  const { mutate: deleteIRMaterialDetailDataMutation } = useMutation({
    mutationFn: (id: number) => deleteIRMaterialDetailData(id),
    onSuccess: () => {
      alert("삭제가 정상적으로 완료 되었습니다.");
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("deleteIRMaterialDetailData 에러:", error);
    },
  });

  function handleEdit(id: number): void {
    router.push(`/dashboard/ir-materials/edit/${id}`);
  }

  function handleDelete(): void {
    setIsModalOpen(true);
  }

  function handleConfirmDelete(): void {
    deleteIRMaterialDetailDataMutation(id);
    setIsModalOpen(false);
  }

  function handleCancelDelete(): void {
    setIsModalOpen(false);
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "-";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-50 via-primary-50/30 to-dark-50 flex items-center justify-center">
        <div className="text-primary-600 text-xl">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-50 via-primary-50/30 to-dark-50 flex items-center justify-center">
        <div className="text-red-600 text-xl">
          데이터를 불러오는 중 오류가 발생했습니다.
        </div>
      </div>
    );
  }

  if (!IRMaterialDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-50 via-primary-50/30 to-dark-50 flex items-center justify-center">
        <div className="text-gray-600 text-xl">IR 자료를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-dark-50 via-primary-50/30 to-dark-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {IRMaterialDetail.title}
                  </h1>
                  <div className="flex gap-4 text-primary-100 text-sm">
                    <span>ID: {IRMaterialDetail.id}</span>
                    {IRMaterialDetail.category && (
                      <span>카테고리: {IRMaterialDetail.category}</span>
                    )}
                    <span>
                      {IRMaterialDetail.is_published ? "공개" : "비공개"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(IRMaterialDetail.id)}
                    className="px-6 py-2 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                  >
                    수정
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>

            {/* 본문 */}
            <div className="p-8 space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    발행일
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {formatDate(IRMaterialDetail.published_date)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    등록일
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {formatDate(IRMaterialDetail.created_at)}
                  </div>
                </div>
              </div>

              {/* 설명 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  설명
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 min-h-[100px] whitespace-pre-wrap">
                  {IRMaterialDetail.description || "-"}
                </div>
              </div>

              {/* 파일 정보 */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  파일 정보
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      파일명
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                      {IRMaterialDetail.file_name || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        파일 형식
                      </label>
                      <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                        {IRMaterialDetail.file_type || "-"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        파일 크기
                      </label>
                      <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                        {formatFileSize(IRMaterialDetail.file_size)}
                      </div>
                    </div>
                  </div>
                  {IRMaterialDetail.file_url && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        파일 다운로드
                      </label>
                      <a
                        href={IRMaterialDetail.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
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
                        파일 다운로드
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* 메타데이터 */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  메타데이터
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      생성일
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                      {formatDate(IRMaterialDetail.created_at)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      수정일
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                      {formatDate(IRMaterialDetail.updated_at)}
                    </div>
                  </div>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  목록으로
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      <Modal isOpen={isModalOpen} onClose={handleCancelDelete}>
        <div>
          정말로 이 IR 자료를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition"
              onClick={handleCancelDelete}
            >
              취소
            </button>
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              onClick={handleConfirmDelete}
            >
              삭제
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
