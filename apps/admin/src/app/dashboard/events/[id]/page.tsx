"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Modal } from "../../../components/modal";
import { supabase } from "../../../../../lib/supabase";
import type { Event } from "../../../store/interface/event";
import { deleteEvent } from "../actions";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as unknown as number;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getEventDetailData = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Supabase 에러:", error);
        throw error;
      }
      return data;
    } catch (err) {
      console.error(`getEventDetailData 에러:`, err);
      throw err;
    }
  };

  const deleteEventDetailData = async (id: number) => {
    try {
      const result = await deleteEvent(id);
      return result.data;
    } catch (err) {
      console.error(`deleteEventDetailData 에러:`, err);
      throw err;
    }
  };

  const {
    data: eventDetail,
    isLoading,
    error,
  } = useQuery<Event>({
    queryKey: ["eventDetail", id],
    queryFn: () => getEventDetailData(),
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  const { mutate: deleteEventDetailDataMutation } = useMutation({
    mutationFn: (id: number) => deleteEventDetailData(id),
    onSuccess: () => {
      alert("삭제가 정상적으로 완료 되었습니다.");
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("deleteEventDetailData 에러:", error);
    },
  });

  function handleEdit(id: number): void {
    router.push(`/dashboard/events/edit/${id}`);
  }

  function handleDelete(): void {
    setIsModalOpen(true);
  }

  function handleConfirmDelete(): void {
    deleteEventDetailDataMutation(id);
    setIsModalOpen(false);
  }

  function handleCancelDelete(): void {
    setIsModalOpen(false);
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("ko-KR");
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

  if (!eventDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-50 via-primary-50/30 to-dark-50 flex items-center justify-center">
        <div className="text-gray-600 text-xl">이벤트를 찾을 수 없습니다.</div>
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
                    {eventDetail.title}
                  </h1>
                  <div className="flex gap-4 text-primary-100 text-sm">
                    <span>ID: {eventDetail.id}</span>
                    {eventDetail.event_date && (
                      <span>일시: {formatDate(eventDetail.event_date)}</span>
                    )}
                    {eventDetail.location && (
                      <span>장소: {eventDetail.location}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(eventDetail.id)}
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
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                  기본 정보
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      제목
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                      {eventDetail.title}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      설명
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 min-h-[80px] whitespace-pre-wrap">
                      {eventDetail.description}
                    </div>
                  </div>
                </div>
              </section>

              {/* 썸네일 이미지 */}
              {eventDetail.thumbnail_url && (
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                    썸네일 이미지
                  </h2>
                  <img
                    src={eventDetail.thumbnail_url}
                    alt="Event Thumbnail"
                    className="w-full max-w-md h-auto rounded-lg border"
                  />
                </section>
              )}

              {/* 영상 및 링크 */}
              {(eventDetail.video_link || eventDetail.form_link) && (
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                    링크 정보
                  </h2>
                  <div className="space-y-4">
                    {eventDetail.video_link && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          영상 링크
                        </label>
                        <a
                          href={eventDetail.video_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 bg-blue-50 rounded-lg text-blue-600 hover:text-blue-700 block"
                        >
                          {eventDetail.video_link}
                        </a>
                      </div>
                    )}
                    {eventDetail.form_link && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          신청서 링크
                        </label>
                        <a
                          href={eventDetail.form_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 bg-blue-50 rounded-lg text-blue-600 hover:text-blue-700 block"
                        >
                          {eventDetail.form_link}
                        </a>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* 이벤트 정보 */}
              {(eventDetail.event_date || eventDetail.location) && (
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                    이벤트 정보
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {eventDetail.event_date && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          날짜
                        </label>
                        <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                          {formatDate(eventDetail.event_date)}
                        </div>
                      </div>
                    )}
                    {eventDetail.location && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          장소
                        </label>
                        <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                          {eventDetail.location}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* 상세 내용 */}
              {eventDetail.detail_content && (
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                    {eventDetail.detail_title || "상세 내용"}
                  </h2>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 min-h-[100px] whitespace-pre-wrap">
                    {eventDetail.detail_content}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCancelDelete}>
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">이벤트를 삭제하시겠습니까?</h3>
          <p className="text-gray-700">이 작업은 되돌릴 수 없습니다.</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancelDelete}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              삭제
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
