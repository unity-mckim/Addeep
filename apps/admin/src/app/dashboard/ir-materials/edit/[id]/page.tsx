"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "../../../../../../lib/supabase";
import { IRMaterial } from "../../../../store/interface/ir-material";
import { updateIRMaterial, uploadIRFile } from "../../actions";

export default function EditIRMaterialPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as unknown as number;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    published_date: "",
    is_published: true,
  });

  const [fileData, setFileData] = useState<{
    file?: File;
    file_url?: string;
    file_name?: string;
    file_type?: string;
    file_size?: number;
  }>({});

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isUploading, setIsUploading] = useState(false);

  const getIRMaterialData = async () => {
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
      console.error("getIRMaterialData 에러:", err);
      throw err;
    }
  };

  const {
    data: irMaterialData,
    isLoading,
    error,
  } = useQuery<IRMaterial>({
    queryKey: ["irMaterial", id],
    queryFn: () => getIRMaterialData(),
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  useEffect(() => {
    if (irMaterialData) {
      setFormData({
        title: irMaterialData.title,
        description: irMaterialData.description || "",
        category: irMaterialData.category || "",
        published_date: irMaterialData.published_date || "",
        is_published: irMaterialData.is_published,
      });
      setFileData({
        file_url: irMaterialData.file_url || "",
        file_name: irMaterialData.file_name || "",
        file_type: irMaterialData.file_type || "",
        file_size: irMaterialData.file_size || 0,
      });
    }
  }, [irMaterialData]);

  const { mutate: updateIRMaterialMutation, isPending } = useMutation({
    mutationFn: (data: {
      title: string;
      description: string;
      file_url?: string;
      file_name?: string;
      file_type?: string;
      file_size?: number;
      category?: string;
      published_date?: string;
      is_published: boolean;
    }) => updateIRMaterial(id, data),
    onSuccess: () => {
      alert("IR 자료가 성공적으로 수정되었습니다.");
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("updateIRMaterial 에러:", error);
      alert("IR 자료 수정 중 오류가 발생했습니다.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 체크 (50MB 제한)
    if (file.size > 50 * 1024 * 1024) {
      alert("파일 크기는 50MB를 초과할 수 없습니다.");
      return;
    }

    setIsUploading(true);
    try {
      const result = await uploadIRFile(file);
      setFileData({
        file,
        file_url: result.file_url,
        file_name: result.file_name,
        file_type: result.file_type,
        file_size: result.file_size,
      });
      if (errors.file) {
        setErrors((prev) => ({ ...prev, file: "" }));
      }
    } catch (error) {
      console.error("파일 업로드 에러:", error);
      alert("파일 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "설명을 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    updateIRMaterialMutation({
      ...formData,
      ...fileData,
    });
  };

  const handleCancel = () => {
    router.back();
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 via-primary-50/30 to-dark-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">IR 자료 수정</h1>
            <p className="text-primary-100 mt-2">IR 자료 정보를 수정합니다.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* 제목 */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                placeholder="IR 자료 제목을 입력하세요"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* 설명 */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                설명 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                placeholder="IR 자료에 대한 설명을 입력하세요"
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            {/* 카테고리 */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                카테고리
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
                <option value="">선택하세요</option>
                <option value="재무제표">재무제표</option>
                <option value="사업보고서">사업보고서</option>
                <option value="IR 프레젠테이션">IR 프레젠테이션</option>
                <option value="실적발표자료">실적발표자료</option>
                <option value="기업설명회">기업설명회</option>
                <option value="공시자료">공시자료</option>
                <option value="기타">기타</option>
              </select>
            </div>

            {/* 발행일 */}
            <div>
              <label
                htmlFor="published_date"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                발행일
              </label>
              <input
                type="date"
                id="published_date"
                name="published_date"
                value={formData.published_date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            {/* 파일 업로드 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                파일 업로드
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  {isUploading ? "업로드 중..." : "파일 변경"}
                </button>
                {fileData.file_name && (
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 font-medium">
                      {fileData.file_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(fileData.file_size)}
                    </p>
                  </div>
                )}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                지원 형식: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX (최대 50MB)
              </p>
            </div>

            {/* 공개 여부 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_published"
                name="is_published"
                checked={formData.is_published}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label
                htmlFor="is_published"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                공개
              </label>
            </div>

            {/* 버튼 */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isPending || isUploading}
                className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "수정 중..." : "수정하기"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
