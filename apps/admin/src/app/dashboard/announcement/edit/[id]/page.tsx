"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "../../../../../../lib/supabase";
import { Announcement } from "../../../../store/interface/announcement";
import { updateAnnouncement } from "../../actions";

export default function EditAnnouncementPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as unknown as number;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const getAnnouncementData = async () => {
    try {
      const { data, error } = await supabase
        .from("announcement")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Supabase 에러:", error);
        throw error;
      }
      return data;
    } catch (err) {
      console.error("getAnnouncementData 에러:", err);
      throw err;
    }
  };

  const {
    data: announcementData,
    isLoading,
    error,
  } = useQuery<Announcement>({
    queryKey: ["announcement", id],
    queryFn: () => getAnnouncementData(),
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  useEffect(() => {
    if (announcementData) {
      setFormData({
        title: announcementData.title,
        description: announcementData.description,
      });
    }
  }, [announcementData]);

  const { mutate: updateAnnouncementMutation, isPending } = useMutation({
    mutationFn: (data: { title: string; description: string }) =>
      updateAnnouncement(id, data),
    onSuccess: () => {
      alert("공지사항이 성공적으로 수정되었습니다.");
      router.push(`/dashboard/announcement/${id}`);
    },
    onError: (error) => {
      console.error("updateAnnouncement 에러:", error);
      alert("공지사항 수정 중 오류가 발생했습니다.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "내용을 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    updateAnnouncementMutation(formData);
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
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
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
                  공지사항 수정하기
                </h1>
                <p className="text-dark-600 text-sm mt-1">
                  공지사항 내용을 수정합니다 (ID: {id})
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
                  placeholder="공지사항 제목을 입력하세요"
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

              {/* Description Field */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-dark-900 mb-2"
                >
                  내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="공지사항 내용을 입력하세요"
                  rows={8}
                  className={`w-full px-4 py-3 border rounded-xl text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                    errors.description
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-dark-200 focus:ring-primary-500 focus:border-primary-500"
                  }`}
                />
                {errors.description && (
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
                    {errors.description}
                  </p>
                )}
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
              disabled={isPending}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-600 transition-all duration-200 shadow-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "수정 중..." : "수정하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
