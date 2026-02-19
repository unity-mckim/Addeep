"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "../../../../../../lib/supabase";
import { PressMedia } from "../../../../store/interface/press-media";
import { updatePressMedia, uploadPressImage } from "../../actions";

export default function EditPressMediaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const imageFileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_url: "",
    published_date: "",
    is_featured: false,
    display_order: 0,
  });

  const [imageFileData, setImageFileData] = useState<{
    file?: File;
    image_url?: string;
  }>({});

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const getPressMediaData = async () => {
    try {
      const { data, error } = await supabase
        .from("press_media")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Supabase 에러:", error);
        throw error;
      }
      return data;
    } catch (err) {
      console.error("getPressMediaData 에러:", err);
      throw err;
    }
  };

  const {
    data: pressMediaData,
    isLoading,
    error,
  } = useQuery<PressMedia>({
    queryKey: ["pressMedia", id],
    queryFn: () => getPressMediaData(),
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  useEffect(() => {
    if (pressMediaData) {
      setFormData({
        title: pressMediaData.title,
        content: pressMediaData.content,
        image_url: pressMediaData.image_url || "",
        published_date: pressMediaData.published_date.split("T")[0],
        is_featured: pressMediaData.is_featured,
        display_order: pressMediaData.display_order,
      });
    }
  }, [pressMediaData]);

  const { mutate: updatePressMediaMutation, isPending } = useMutation({
    mutationFn: (data: {
      title: string;
      content: string;
      image_url?: string;
      published_date: string;
      is_featured?: boolean;
      display_order?: number;
    }) => updatePressMedia(id, data),
    onSuccess: (result) => {
      if (result.success) {
        alert("보도자료가 성공적으로 수정되었습니다.");
        router.push(`/dashboard/press-media/${id}`);
      } else {
        console.error("updatePressMedia 에러:", result.error);
        alert(result.error || "보도자료 수정 중 오류가 발생했습니다.");
      }
    },
    onError: (error) => {
      console.error("updatePressMedia 에러:", error);
      alert("보도자료 수정 중 오류가 발생했습니다.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const result = await uploadPressImage(file);

      if (result.success) {
        setImageFileData({
          file,
          image_url: result.image_url,
        });
        // URL 입력 필드 비우기 (파일 업로드가 우선)
        setFormData((prev) => ({ ...prev, image_url: "" }));
        if (errors.image) {
          setErrors((prev) => ({ ...prev, image: "" }));
        }
      } else {
        console.error("이미지 업로드 에러:", result.error);
        alert(result.error || "이미지 업로드 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("이미지 업로드 에러:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, image_url: value }));
    // URL 입력 시 이미지 파일 데이터 클리어
    if (value && imageFileData.image_url) {
      setImageFileData({});
    }
    if (errors.image_url) {
      setErrors((prev) => ({ ...prev, image_url: "" }));
    }
  };

  const handleRemoveImageFile = () => {
    setImageFileData({});
    if (imageFileInputRef.current) {
      imageFileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요.";
    }

    if (!formData.content.trim()) {
      newErrors.content = "내용을 입력해주세요.";
    }

    if (!formData.published_date) {
      newErrors.published_date = "발행일을 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // 이미지 URL 결정: 파일 업로드가 우선, 없으면 URL 입력값 사용
    const finalImageUrl =
      imageFileData.image_url || formData.image_url || undefined;

    updatePressMediaMutation({
      ...formData,
      image_url: finalImageUrl,
    });
  };

  const handleCancel = () => {
    router.back();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 via-primary-50/30 to-dark-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={handleCancel}
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

          <div className="bg-white rounded-2xl p-6 shadow-medium border border-dark-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <div>
                <h1 className="text-3xl font-bold text-dark-900">
                  보도자료 수정하기
                </h1>
                <p className="text-dark-600 text-sm mt-1">
                  보도자료 내용을 수정합니다 (ID: {id})
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-medium border border-dark-100">
            <div className="space-y-6">
              {/* Title Field */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-dark-900 mb-2"
                >
                  제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="보도자료 제목을 입력하세요"
                  className={`w-full px-4 py-3 border rounded-xl text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.title
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-dark-200 focus:ring-primary-500 focus:border-primary-500"
                  }`}
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Content Field */}
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-semibold text-dark-900 mb-2"
                >
                  내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="보도자료 내용을 입력하세요"
                  rows={8}
                  className={`w-full px-4 py-3 border rounded-xl text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                    errors.content
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-dark-200 focus:ring-primary-500 focus:border-primary-500"
                  }`}
                />
                {errors.content && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.content}
                  </p>
                )}
              </div>

              {/* Published Date Field */}
              <div>
                <label
                  htmlFor="published_date"
                  className="block text-sm font-semibold text-dark-900 mb-2"
                >
                  발행일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="published_date"
                  name="published_date"
                  value={formData.published_date}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl text-dark-900 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.published_date
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-dark-200 focus:ring-primary-500 focus:border-primary-500"
                  }`}
                />
                {errors.published_date && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.published_date}
                  </p>
                )}
              </div>

              {/* Image Section */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-dark-900">
                  이미지
                </label>

                {/* Image File Upload */}
                <div>
                  <label className="block text-xs font-medium text-dark-700 mb-2">
                    파일 업로드
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      ref={imageFileInputRef}
                      onChange={handleImageFileChange}
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => imageFileInputRef.current?.click()}
                      disabled={isUploadingImage}
                      className="px-6 py-3 bg-primary-100 hover:bg-primary-200 text-primary-700 font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isUploadingImage ? "업로드 중..." : "이미지 선택"}
                    </button>
                    {imageFileData.file?.name && (
                      <div className="flex-1 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-dark-700 font-medium">
                            {imageFileData.file.name}
                          </p>
                          <p className="text-xs text-dark-500">
                            {(imageFileData.file.size / (1024 * 1024)).toFixed(
                              2
                            )}{" "}
                            MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveImageFile}
                          className="p-2 text-dark-500 hover:text-red-600 transition-colors"
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-dark-500">
                    지원 형식: JPG, PNG, GIF, WebP, SVG (최대 5MB)
                  </p>
                </div>

                {/* OR Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-dark-200"></div>
                  <span className="text-sm text-dark-500 font-medium">
                    또는
                  </span>
                  <div className="flex-1 h-px bg-dark-200"></div>
                </div>

                {/* Image URL Field */}
                <div>
                  <label
                    htmlFor="image_url"
                    className="block text-xs font-medium text-dark-700 mb-2"
                  >
                    이미지 URL 직접 입력
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-dark-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="image_url"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleImageUrlChange}
                      placeholder="https://example.com/image.jpg"
                      disabled={!!imageFileData.image_url}
                      className="w-full pl-12 pr-4 py-3 border border-dark-200 rounded-xl text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 disabled:bg-dark-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  {imageFileData.image_url && (
                    <p className="mt-2 text-xs text-primary-600">
                      이미지 파일이 업로드되어 URL 입력이 비활성화되었습니다
                    </p>
                  )}
                </div>

                {/* Image Preview */}
                {(imageFileData.image_url || formData.image_url) && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-dark-200 shadow-soft">
                    <img
                      src={imageFileData.image_url || formData.image_url}
                      alt="Preview"
                      className="w-full h-auto max-h-64 object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f1f5f9' width='400' height='300'/%3E%3Ctext fill='%2364748b' font-family='Arial' font-size='18' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3E이미지를 불러올 수 없습니다%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Display Order Field */}
              <div>
                <label
                  htmlFor="display_order"
                  className="block text-sm font-semibold text-dark-900 mb-2"
                >
                  표시 순서
                </label>
                <input
                  type="number"
                  id="display_order"
                  name="display_order"
                  value={formData.display_order}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-dark-200 rounded-xl text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                />
                <p className="mt-2 text-sm text-dark-500">
                  낮은 숫자가 먼저 표시됩니다
                </p>
              </div>

              {/* Is Featured Checkbox */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="is_featured"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleChange}
                    className="w-5 h-5 text-primary-600 border-dark-300 rounded focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="text-sm font-semibold text-dark-900">
                    추천 보도자료로 표시
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-white border border-dark-200 text-dark-700 rounded-xl font-semibold hover:bg-dark-50 transition-all duration-200 shadow-soft"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isPending || isUploadingImage}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-600 transition-all duration-200 shadow-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "수정 중..." : "수정하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
