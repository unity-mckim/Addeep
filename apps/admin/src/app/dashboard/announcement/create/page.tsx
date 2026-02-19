"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createAnnouncement } from "../actions";

export default function CreateAnnouncementPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { mutate: createAnnouncementMutation, isPending } = useMutation({
    mutationFn: (data: { title: string; description: string }) =>
      createAnnouncement(data),
    onSuccess: () => {
      alert("공지사항이 성공적으로 생성되었습니다.");
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("createAnnouncement 에러:", error);
      alert("공지사항 생성 중 오류가 발생했습니다.");
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

    createAnnouncementMutation(formData);
  };

  const handleCancel = () => {
    router.back();
  };

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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-dark-900">
                  공지사항 만들기
                </h1>
                <p className="text-dark-600 text-sm mt-1">
                  새로운 공지사항을 작성합니다
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
              {isPending ? "생성 중..." : "생성하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
