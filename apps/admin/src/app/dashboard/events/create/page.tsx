"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createEvent, uploadEventImage } from "../actions";

interface PersonItem {
  en_name: string;
  title: string;
  sub_title: string;
  speaker: string;
  desc: string[];
  speaker_image?: string;
}

interface OverviewItem {
  title: string;
  description: string;
}

interface ScheduleItem {
  time: string;
  title: string;
  subTitle?: string;
  duration: string;
  speaker?: string;
  desc?: string[];
}

const autoResizeTextarea = (element: HTMLTextAreaElement | null) => {
  if (!element) return;
  element.style.height = "auto";
  element.style.height = `${element.scrollHeight}px`;
};

export default function CreateEventPage() {
  const router = useRouter();
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail_url: "",
    video_link: "",
    event_date: "",
    location: "",
    form_link: "",
    detail_title: "",
    detail_content: "",
    banner_url: "",
    participants: "",
    manager_name: "",
    manager_email: "",
    persons: [] as PersonItem[],
    overview: [] as OverviewItem[],
    schedule: [] as ScheduleItem[],
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [isUploadingSpeakerImages, setIsUploadingSpeakerImages] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { mutate: createEventMutation, isPending } = useMutation({
    mutationFn: async (data: typeof formData) => {
      let uploadedThumbnailUrl = data.thumbnail_url;
      let uploadedBannerUrl = data.banner_url;

      // 썸네일 업로드
      if (thumbnailFile) {
        setIsUploadingThumbnail(true);
        try {
          const result = await uploadEventImage(thumbnailFile, "event-images/thumbnail");
          if (!result.success) {
            alert(result.error || "썸네일 업로드 중 오류가 발생했습니다.");
            throw new Error(result.error || "썸네일 업로드 실패");
          }
          uploadedThumbnailUrl = result.url || data.thumbnail_url;
        } catch (error) {
          console.error("썸네일 업로드 에러:", error);
          throw error;
        } finally {
          setIsUploadingThumbnail(false);
        }
      }

      // 배너 업로드
      if (bannerFile) {
        setIsUploadingBanner(true);
        try {
          const result = await uploadEventImage(bannerFile, "event-images/banner");
          if (!result.success) {
            alert(result.error || "배너 업로드 중 오류가 발생했습니다.");
            throw new Error(result.error || "배너 업로드 실패");
          }
          uploadedBannerUrl = result.url || data.banner_url;
        } catch (error) {
          console.error("배너 업로드 에러:", error);
          throw error;
        } finally {
          setIsUploadingBanner(false);
        }
      }

      const result = await createEvent({
        title: data.title,
        description: data.description,
        thumbnail_url: uploadedThumbnailUrl || undefined,
        banner_url: uploadedBannerUrl || undefined,
        video_link: data.video_link || undefined,
        event_date: data.event_date || undefined,
        location: data.location || undefined,
        form_link: data.form_link || undefined,
        detail_title: data.detail_title || undefined,
        detail_content: data.detail_content || undefined,
        participants: data.participants || undefined,
        manager_name: data.manager_name || undefined,
        manager_email: data.manager_email || undefined,
        persons: data.persons.length > 0 ? data.persons : undefined,
        overview: data.overview.length > 0 ? data.overview : undefined,
        schedule: data.schedule.length > 0 ? data.schedule : undefined,
      });

      if (!result.success) {
        throw new Error(result.error || "이벤트 생성 중 오류가 발생했습니다.");
      }

      return result;
    },
    onSuccess: () => {
      alert("이벤트가 성공적으로 생성되었습니다.");
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("createEvent 에러:", error);
      alert(error.message || "이벤트 생성 중 오류가 발생했습니다.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLTextAreaElement) {
      autoResizeTextarea(e.target);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 체크 (10MB 제한)
    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB를 초과할 수 없습니다.");
      return;
    }

    setThumbnailFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB를 초과할 수 없습니다.");
      return;
    }

    setBannerFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const addPerson = () => {
    setFormData((prev) => ({
      ...prev,
      persons: [
        ...prev.persons,
        {
          en_name: "",
          title: "",
          sub_title: "",
          speaker: "",
          desc: [""],
        },
      ],
    }));
  };

  const removePerson = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      persons: prev.persons.filter((_, i) => i !== index),
    }));
  };
  const handlePersonChange = (
    index: number,
    field: keyof PersonItem,
    value: string
  ) => {
    const newPersons = [...formData.persons];
    if (field === "desc") {
      newPersons[index][field] = [value];
    } else {
      newPersons[index][field] = value;
    }
    setFormData((prev) => ({ ...prev, persons: newPersons }));
  };

  const handlePersonImageUpload = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("스피커 이미지 파일 크기는 10MB를 초과할 수 없습니다.");
      e.target.value = "";
      return;
    }

    setIsUploadingSpeakerImages(true);
    try {
      const result = await uploadEventImage(file, "event-images/speaker");
      if (!result.success || !result.url) {
        alert(result.error || "스피커 이미지 업로드 중 오류가 발생했습니다.");
        return;
      }
      const newPersons = [...formData.persons];
      newPersons[index] = {
        ...newPersons[index],
        speaker_image: result.url,
      };
      setFormData((prev) => ({ ...prev, persons: newPersons }));
    } catch (err) {
      console.error("스피커 이미지 업로드 에러:", err);
      alert("스피커 이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploadingSpeakerImages(false);
      e.target.value = "";
    }
  };

  const addOverview = () => {
    setFormData((prev) => ({
      ...prev,
      overview: [...prev.overview, { title: "", description: "" }],
    }));
  };

  const removeOverview = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      overview: prev.overview.filter((_, i) => i !== index),
    }));
  };

  const handleOverviewChange = (
    index: number,
    field: keyof OverviewItem,
    value: string
  ) => {
    const newOverview = [...formData.overview];
    newOverview[index][field] = value;
    setFormData((prev) => ({ ...prev, overview: newOverview }));
  };

  const addSchedule = () => {
    setFormData((prev) => ({
      ...prev,
      schedule: [
        ...prev.schedule,
        {
          time: "",
          title: "",
          duration: "",
          subTitle: "",
          speaker: "",
          desc: [],
        },
      ],
    }));
  };

  const removeSchedule = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index),
    }));
  };

  const handleScheduleChange = (
    index: number,
    field: keyof ScheduleItem,
    value: string
  ) => {
    const newSchedule = [...formData.schedule];
    if (field === "desc") {
      newSchedule[index][field] = [value];
    } else {
      (newSchedule[index] as any)[field] = value;
    }
    setFormData((prev) => ({ ...prev, schedule: newSchedule }));
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

    createEventMutation(formData);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 via-primary-50/30 to-dark-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">이벤트 생성</h1>
            <p className="text-primary-100 mt-2">새로운 이벤트를 등록합니다.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* 기본 정보 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                📝 기본 정보 (필수)
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    제목 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    placeholder="이벤트 제목"
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    설명 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-primary-500 focus:border-transparent overflow-hidden`}
                    placeholder="이벤트 설명"
                    data-auto-resize="true"
                  />
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* 썸네일 이미지 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                📸 썸네일 이미지 (선택)
              </h2>

              <div>
                <input
                  type="file"
                  ref={thumbnailInputRef}
                  onChange={handleThumbnailChange}
                  accept="image/*"
                  className="hidden"
                />
                <div className="flex items-start gap-4">
                  <button
                    type="button"
                    onClick={() => thumbnailInputRef.current?.click()}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                  >
                    이미지 선택
                  </button>
                  {thumbnailPreview && (
                    <div className="flex-1">
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail Preview"
                        className="w-48 h-48 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setThumbnailFile(null);
                          setThumbnailPreview("");
                        }}
                        className="mt-2 text-sm text-red-600 hover:text-red-700"
                      >
                        제거
                      </button>
                    </div>
                  )}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  지원 형식: JPG, PNG, WEBP (최대 10MB)
                </p>
              </div>
            </section>

            {/* 배너 이미지 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                🖼️ 배너 이미지 (선택)
              </h2>

              <div>
                <input
                  type="file"
                  onChange={handleBannerChange}
                  accept="image/*"
                  className="hidden"
                  id="bannerInput"
                />
                <div className="flex items-start gap-4">
                  <button
                    type="button"
                    onClick={() => document.getElementById("bannerInput")?.click()}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                  >
                    배너 선택
                  </button>
                  {(bannerPreview || formData.banner_url) && (
                    <div className="flex-1">
                      <img
                        src={bannerPreview || formData.banner_url}
                        alt="Banner Preview"
                        className="w-64 h-32 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setBannerFile(null);
                          setBannerPreview("");
                          setFormData((prev) => ({ ...prev, banner_url: "" }));
                        }}
                        className="mt-2 text-sm text-red-600 hover:text-red-700"
                      >
                        제거
                      </button>
                    </div>
                  )}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  지원 형식: JPG, PNG, WEBP (최대 10MB)
                </p>
              </div>
            </section>

            {/* 영상 링크 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                🎥 영상 링크 (선택)
              </h2>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  영상 링크 URL
                </label>
                <input
                  type="url"
                  name="video_link"
                  value={formData.video_link}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://youtube.com/..."
                />
                <p className="mt-1 text-xs text-gray-500">
                  영상 링크가 있으면 "영상 바로보기" 버튼이 표시됩니다
                </p>
              </div>
            </section>
            {/* 상세 내용 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                📄 상세 내용 (선택)
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  상세 제목
                </label>
                <input
                  type="text"
                  name="detail_title"
                  value={formData.detail_title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="상세 내용의 설명용 제목을 입력해주세요"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  상세 설명
                </label>
                <textarea
                  name="detail_content"
                  value={formData.detail_content}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent overflow-hidden"
                  placeholder="이벤트에 대한 상세한 설명을 입력해주세요."
                  data-auto-resize="true"
                />
              </div>
            </section>
            {/* 행사 개요 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                행사 개요 (선택)
              </h2>
              <div className="space-y-6">
                {formData.overview.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-700">
                        개요 {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeOverview(index)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        제거
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          handleOverviewChange(index, "title", e.target.value)
                        }
                        className="w-full px-3 py-2 rounded border border-gray-300"
                        placeholder="개요 제목"
                      />
                      <textarea
                        value={item.description}
                        onChange={(e) => {
                          autoResizeTextarea(e.target);
                          handleOverviewChange(index, "description", e.target.value);
                        }}
                        className="w-full px-3 py-2 rounded border border-gray-300 overflow-hidden"
                        placeholder="개요 설명"
                        rows={3}
                        data-auto-resize="true"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addOverview}
                  className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
                >
                  + 개요 추가
                </button>
              </div>
            </section>

            {/* 이벤트 정보 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                📅 이벤트 정보 (선택)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    이벤트 날짜
                  </label>
                  <input
                    type="date"
                    name="event_date"
                    value={formData.event_date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    장소
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="강남구 테헤란로 123"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  참석 대상
                </label>
                <textarea
                  name="participants"
                  value={formData.participants}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent overflow-hidden"
                  placeholder="참석 대상 정보를 입력하세요 (줄바꿈 가능)"
                  rows={3}
                  data-auto-resize="true"
                />
              </div>
            </section>

            {/* 스피커 정보 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                👥 스피커 정보 (선택)
              </h2>
              <div className="space-y-6">
                {formData.persons.map((person, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-700">
                        스피커 {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removePerson(index)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        제거
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={person.en_name}
                        onChange={(e) =>
                          handlePersonChange(index, "en_name", e.target.value)
                        }
                        className="px-3 py-2 rounded border border-gray-300"
                        placeholder="영문 이름"
                      />
                      <input
                        type="text"
                        value={person.title}
                        onChange={(e) =>
                          handlePersonChange(index, "title", e.target.value)
                        }
                        className="px-3 py-2 rounded border border-gray-300"
                        placeholder="직함"
                      />
                      <input
                        type="text"
                        value={person.sub_title}
                        onChange={(e) =>
                          handlePersonChange(index, "sub_title", e.target.value)
                        }
                        className="px-3 py-2 rounded border border-gray-300"
                        placeholder="부제목"
                      />
                      <input
                        type="text"
                        value={person.speaker}
                        onChange={(e) =>
                          handlePersonChange(index, "speaker", e.target.value)
                        }
                        className="px-3 py-2 rounded border border-gray-300"
                        placeholder="스피커명"
                      />
                      <textarea
                        value={person.desc[0] || ""}
                        onChange={(e) => {
                          autoResizeTextarea(e.target);
                          handlePersonChange(index, "desc", e.target.value);
                        }}
                        className="md:col-span-2 px-3 py-2 rounded border border-gray-300 overflow-hidden"
                        placeholder="설명"
                        rows={2}
                        data-auto-resize="true"
                      />
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePersonImageUpload(index, e)}
                          className="flex-1 px-3 py-2 rounded border border-gray-300"
                        />
                        {person.speaker_image && (
                          <img
                            src={person.speaker_image}
                            alt="Speaker"
                            className="w-16 h-16 rounded-full object-cover border"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addPerson}
                  className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
                >
                  + 스피커 추가
                </button>
              </div>
            </section>

            {/* 프로그램 일정 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                프로그램 일정 (선택)
              </h2>
              <div className="space-y-6">
                {formData.schedule.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-700">
                        일정 {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeSchedule(index)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        제거
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) =>
                          handleScheduleChange(index, "time", e.target.value)
                        }
                        className="px-3 py-2 rounded border border-gray-300"
                        placeholder="시간 (예: 09:00)"
                      />
                      <input
                        type="text"
                        value={item.duration}
                        onChange={(e) =>
                          handleScheduleChange(index, "duration", e.target.value)
                        }
                        className="px-3 py-2 rounded border border-gray-300"
                        placeholder="소요시간 (예: 30분)"
                      />
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          handleScheduleChange(index, "title", e.target.value)
                        }
                        className="px-3 py-2 rounded border border-gray-300"
                        placeholder="세션 제목"
                      />
                      <input
                        type="text"
                        value={item.subTitle || ""}
                        onChange={(e) =>
                          handleScheduleChange(index, "subTitle", e.target.value)
                        }
                        className="px-3 py-2 rounded border border-gray-300"
                        placeholder="세션 부제목 (선택)"
                      />
                      <input
                        type="text"
                        value={item.speaker || ""}
                        onChange={(e) =>
                          handleScheduleChange(index, "speaker", e.target.value)
                        }
                        className="px-3 py-2 rounded border border-gray-300 md:col-span-2"
                        placeholder="발표자 (선택)"
                      />
                      <textarea
                        value={(item.desc && item.desc[0]) || ""}
                        onChange={(e) => {
                          autoResizeTextarea(e.target);
                          handleScheduleChange(index, "desc", e.target.value);
                        }}
                        className="px-3 py-2 rounded border border-gray-300 md:col-span-2 overflow-hidden"
                        placeholder="설명 (선택)"
                        rows={2}
                        data-auto-resize="true"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSchedule}
                  className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
                >
                  + 일정 추가
                </button>
              </div>
            </section>

            {/* 이벤트 관리자 (선택) */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                이벤트 관리자 (선택)
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  신청서 링크 URL
                </label>
                <input
                  type="url"
                  name="form_link"
                  value={formData.form_link}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://forms.gle/..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    이름
                  </label>
                  <input
                    type="text"
                    name="manager_name"
                    value={formData.manager_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    이메일
                  </label>
                  <input
                    type="email"
                    name="manager_email"
                    value={formData.manager_email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </section>
            {/* 버튼 */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isPending || isUploadingThumbnail || isUploadingBanner || isUploadingSpeakerImages}
                className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending || isUploadingThumbnail || isUploadingBanner || isUploadingSpeakerImages
                  ? "생성 중..."
                  : "생성하기"}
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
