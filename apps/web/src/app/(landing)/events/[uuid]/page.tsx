"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useResponsive } from "../../../../lib/useResponsive";
import { supabase } from "../../../../lib/supabase";
import { NEXT_PUBLIC_SUPABASE_CDN_BASE } from "../../../../lib/env";
import { images } from "../../../../constants/images";
import type { Event, ScheduleItem } from "../../../../shared/types/event";

const GlobalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    viewBox="0 0 86 86"
    fill="none"
  >
    <path
      d="M42.667 0.00390625C66.2309 0.00411035 85.333 19.1069 85.333 42.6709C85.3328 66.2347 66.2308 85.3367 42.667 85.3369C19.103 85.3369 0.000204126 66.2348 0 42.6709C0 19.1068 19.1029 0.00390625 42.667 0.00390625Z"
      fill="url(#paint0_linear_220_636)"
    />
    <g clipPath="url(#clip0_220_636)">
      <path
        d="M48.6665 41.3281C48.6665 42.7156 48.5915 44.0531 48.4602 45.3281H36.8727C36.7352 44.0531 36.6665 42.7156 36.6665 41.3281C36.6665 39.9406 36.7415 38.6031 36.8727 37.3281H48.4602C48.5977 38.6031 48.6665 39.9406 48.6665 41.3281ZM50.4665 37.3281H58.1602C58.4915 38.6094 58.6665 39.9469 58.6665 41.3281C58.6665 42.7094 58.4915 44.0469 58.1602 45.3281H50.4665C50.5977 44.0406 50.6665 42.7031 50.6665 41.3281C50.6665 39.9531 50.5977 38.6156 50.4665 37.3281ZM57.504 35.3281H50.2102C49.5852 31.3344 48.3477 27.9906 46.754 25.8531C51.6477 27.1469 55.629 30.6969 57.4977 35.3281H57.504ZM48.1852 35.3281H37.1477C37.529 33.0531 38.1165 31.0406 38.8352 29.4094C39.4915 27.9344 40.2227 26.8656 40.929 26.1906C41.629 25.5281 42.2102 25.3281 42.6665 25.3281C43.1227 25.3281 43.704 25.5281 44.404 26.1906C45.1102 26.8656 45.8415 27.9344 46.4977 29.4094C47.2227 31.0344 47.804 33.0469 48.1852 35.3281ZM35.1227 35.3281H27.829C29.704 30.6969 33.679 27.1469 38.579 25.8531C36.9852 27.9906 35.7477 31.3344 35.1227 35.3281ZM27.1728 37.3281H34.8665C34.7352 38.6156 34.6665 39.9531 34.6665 41.3281C34.6665 42.7031 34.7352 44.0406 34.8665 45.3281H27.1728C26.8415 44.0469 26.6665 42.7094 26.6665 41.3281C26.6665 39.9469 26.8415 38.6094 27.1728 37.3281ZM38.8352 53.2406C38.1102 51.6156 37.529 49.6031 37.1477 47.3281H48.1852C47.804 49.6031 47.2165 51.6156 46.4977 53.2406C45.8415 54.7156 45.1102 55.7843 44.404 56.4593C43.704 57.1281 43.1227 57.3281 42.6665 57.3281C42.2102 57.3281 41.629 57.1281 40.929 56.4656C40.2227 55.7906 39.4915 54.7218 38.8352 53.2468V53.2406ZM35.1227 47.3281C35.7477 51.3218 36.9852 54.6656 38.579 56.8031C33.679 55.5093 29.704 51.9593 27.829 47.3281H35.1227ZM57.504 47.3281C55.629 51.9593 51.654 55.5093 46.7602 56.8031C48.354 54.6656 49.5852 51.3218 50.2165 47.3281H57.504Z"
        fill="white"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_220_636"
        x1="30.1699"
        y1="30.1738"
        x2="90.5096"
        y2="-30.1659"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6B46C1" />
        <stop offset="1" stopColor="#EC4899" />
      </linearGradient>
      <clipPath id="clip0_220_636">
        <path
          d="M26.6665 25.3281H58.6665V57.3281H26.6665V25.3281Z"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);

function Timeline({ items }: { items: ScheduleItem[] }) {
  const { isMobile, isTablet } = useResponsive();
  if (isMobile || isTablet) {
    return (
      <>
        <div className="relative mt-4 space-y-12">
          {items.map((it, idx) => (
            <div
              key={it.time || idx}
              className="flex flex-col gap-10 z-10 relative"
            >
              <div className="flex flex-col">
                <div className="h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center whitespace-pre-wrap">
                  {it.time}
                </div>
              </div>
              <div className="flex flex-col gap-4 bg-white p-6 border-l-4 border-[#BD19F1] rounded-2xl shadow-lg">
                <div className="font-bold font-montserrat text-lg whitespace-pre-wrap">
                  {it.title}
                </div>
                {it.subTitle && (
                  <div className="font-medium font-poppins text-sm whitespace-pre-wrap">
                    {it.subTitle}
                  </div>
                )}
                {it.speaker && (
                  <div className="font-medium font-poppins text-md whitespace-pre-wrap">
                    {it.speaker}
                  </div>
                )}
                <div className="font-medium font-poppins text-sm whitespace-pre-wrap">
                  Duration: {it.duration}
                </div>
                {Array.isArray(it.desc) ? (
                  <div className="flex flex-col gap-2">
                    {it.desc.map((line, i) => (
                      <p
                        key={i}
                        className="text-sm font-poppins text-gray-600 leading-loose text-left whitespace-pre-wrap"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  it.desc && (
                    <p className="text-sm font-poppins text-gray-600 leading-loose text-left whitespace-pre-wrap">
                      {it.desc}
                    </p>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      <div className="relative mt-4 space-y-12 flex flex-col items-center justify-center">
        {items.map((it, idx) => (
          <div
            key={it.time || idx}
            className="flex flex-row gap-10 z-10 relative"
          >
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center whitespace-pre-wrap">
                {it.time}
              </div>
            </div>
            <div className="flex flex-col gap-4 bg-white p-6 border-l-4 border-[#BD19F1] rounded-2xl lg:w-[1000px] lg:min-h-0 shadow-lg">
              <div className="font-bold text-xl whitespace-pre-wrap">{it.title}</div>
              {it.subTitle && (
                <div className="font-medium text-sm whitespace-pre-wrap">{it.subTitle}</div>
              )}
              {it.speaker && (
                <div className="font-medium text-md whitespace-pre-wrap">{it.speaker}</div>
              )}
              <div className="font-medium text-sm whitespace-pre-wrap">Duration: {it.duration}</div>
              {Array.isArray(it.desc) ? (
                <div className="flex flex-col gap-2">
                  {it.desc.map((line, i) => (
                    <p key={i} className="text-sm text-gray-600 leading-loose whitespace-pre-wrap">
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                it.desc && (
                  <p className="text-sm text-gray-600 leading-loose whitespace-pre-wrap">
                    {it.desc}
                  </p>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const EventDetailHeader = ({
  eventDetail,
  uuid,
  formLink,
}: {
  eventDetail: Event[] | null | undefined;
  uuid: string;
  formLink: string;
}) => {
  const { isMobile, isTablet } = useResponsive();

  if (!eventDetail || eventDetail.length === 0) {
    return null;
  }

  const event = eventDetail[0];
  const bannerImage =
    event.banner_url ||
    images.events.bannerGenesis;

  if (isMobile) {
    return (
      <div className="w-full text-center flex-1">
        <header
          className="w-full min-h-[400px] rounded-lg flex flex-col items-center justify-center p-12"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.4)), url(${bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid #E5E7EB",
          }}
        >
          <div className="flex flex-col items-center justify-center z-10 mt-6">
            <h1 className="text-2xl font-montserrat font-bold text-white mb-2 whitespace-pre-wrap">
              {event.title?.split(":")[0] ? event.title.split(":")[0] + " : " : ""}
            </h1>
            <h1 className="text-2xl font-montserrat font-bold text-white mb-2 whitespace-pre-wrap">
              {event.title?.split(":")[1] || ""}
            </h1>
            <h3 className="text-lg font-medium font-poppins text-white mb-4 hidden whitespace-pre-wrap">
              {event.description}
            </h3>

            {formLink && (
              <button
                className="w-48 h-14 rounded-full bg-gradient-to-r from-[#4C15A1] via-[#A218DE] to-[#FF17C5] py-4 px-11 mb-8"
                onClick={() => window.open(formLink, "_blank")}
              >
                <span className="text-white font-medium">참가 신청하기</span>
              </button>
            )}
          </div>
        </header>
      </div>
    );
  }

  if (isTablet) {
    return (
      <div className="w-full text-center flex-1">
        <header
          className="w-full min-h-[400px] rounded-lg flex flex-col items-center justify-center p-12"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.4)), url(${bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid #E5E7EB",
          }}
        >
          <div className="flex flex-col items-center justify-center z-10">
            <h1 className="text-2xl font-bold text-white mb-2 whitespace-pre-wrap">
              {event.title?.split(":")[0] ? event.title.split(":")[0] + " : " : ""}
            </h1>
            <h1 className="text-2xl font-bold text-white mb-12 whitespace-pre-wrap">
              {event.title?.split(":")[1] || ""}
            </h1>
            <h3 className="text-lg font-medium text-white mb-4 whitespace-pre-wrap">
              {event.description}
            </h3>
            <h3 className="text-lg font-medium text-white">
              
            </h3>

            {formLink && (
              <button
                className="w-48 h-14 rounded-full bg-gradient-to-r from-[#4C15A1] via-[#A218DE] to-[#FF17C5] mt-8 py-4 px-11 mb-8"
                onClick={() => window.open(formLink, "_blank")}
              >
                <span className="text-white font-medium">참가 신청하기</span>
              </button>
            )}
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="w-full text-center">
      <header
        className="w-full min-h-[600px] rounded-lg flex flex-col items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.4)), url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "1px solid #E5E7EB",
        }}
      >
        <div className="flex flex-col items-center justify-center z-10 mt-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 whitespace-pre-wrap">
            {event.title?.split(":")[0] ? event.title.split(":")[0] + ":" : ""}
          </h1>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 whitespace-pre-wrap">
            {event.title?.split(":")[1] || ""}
          </h1>
          <h3 className="text-xl font-medium text-white whitespace-pre-wrap">
            {event.description}
          </h3>
          <h3 className="text-xl font-medium text-white">
            
          </h3>

          {formLink && (
            <button
              className="w-48 h-14 rounded-full bg-gradient-to-r from-[#4C15A1] via-[#A218DE] to-[#FF17C5] mt-8 py-4 px-11 mb-8"
              onClick={() => window.open(formLink, "_blank")}
            >
              <span className="text-white font-medium">참가 신청하기</span>
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

const renderWithNewlines = (text: string | undefined | null) => {
  if (!text) return null;
  return text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < text.split("\n").length - 1 && <br />}
    </React.Fragment>
  ));
};

export default function LandingPage() {
  const params = useParams();
  const uuid = params.uuid as any;

  const { isMobile, isMobileTablet, isTablet } = useResponsive();

  const getEventDetailData = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", uuid);

      if (error) {
        console.error("Supabase 에러:", error);
        throw error;
      }

      return data;
    } catch (err) {
      console.error("getEventDetailData 에러:", err);
      throw err;
    }
  };

  const {
    data: eventDetail,
    isLoading,
    error,
  } = useQuery<Event[]>({
    queryKey: ["eventDetail", uuid],
    queryFn: () => getEventDetailData(),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center">
        Error Occurred
      </div>
    );
  }

  if (!eventDetail || eventDetail.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        Event not found
      </div>
    );
  }

  const event = eventDetail[0];
  const formLink = event.form_link || "";
  const participants =
    event.participants ??
    (event as any).participhants ?? // fallback for legacy misspelling
    (event as any).participant ??
    (event as any)?.hero_data?.participant ??
    "";
  const managerName = event.manager_name?.trim() || "";
  const managerEmail = event.manager_email?.trim() || "";
  const overviewItems = event?.Overview?.data ?? [];
  const hasOverview = overviewItems.length > 0;
  const speakerItems = event?.Person?.data ?? [];
  const hasSpeakers = speakerItems.length > 0;
  const scheduleItems = event?.Schedule?.data ?? [];
  const hasSchedule = scheduleItems.length > 0;

  if (isMobile || isMobileTablet || isTablet) {
    return (
      <div className="min-h-screen bg-white">
        <EventDetailHeader
          eventDetail={eventDetail}
          uuid={uuid}
          formLink={formLink}
        />

        <div className="mx-auto max-w-7xl p-6">
        {/* Event Details */}
        <section className="relative overflow-hidden">
          <div className="p-6">
            <div className="flex flex-row gap-10">
              <div className="flex flex-col gap-10">
                <div>
                  {event?.title && (
                    <h1 className="text-xl font-montserrat font-bold tracking-tight text-black whitespace-pre-wrap">
                      {event.title}
                    </h1>
                  )}
                  {event?.description && (
                    <p className="mt-8 text-md font-poppins leading-relaxed text-gray-700 whitespace-pre-wrap">
                      {event.description}
                    </p>
                  )}
                  {(event?.detail_title || event?.detail_content) && (
                    <div className="mt-8 flex flex-col gap-2">
                      <h3 className="text-lg font-poppins font-bold text-gray-900 whitespace-pre-wrap">
                        {event.detail_title || "상세 내용"}
                      </h3>
                      {event.detail_content && (
                        <p className="text-md font-poppins leading-relaxed text-gray-700 whitespace-pre-wrap">
                          {event.detail_content}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-6 text-gray-600 border border-gray-200 rounded-xl p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-col gap-2 rounded-lg bg-white px-3 py-2 md:flex-1">
                  <span className="text-xl font-poppins font-bold text-[#BD19F1]">
                    일시
                  </span>
                  <span className="text-md font-poppins font-normal text-[#4B5563] whitespace-pre-wrap">
                    {event?.event_date || "-"}
                  </span>
                </div>
                <div className="flex flex-col gap-2 rounded-lg bg-white px-3 py-2 md:flex-1">
                  <span className="text-xl font-poppins font-bold text-[#BD19F1]">
                    장소
                  </span>
                  <span className="text-md font-poppins font-normal text-[#4B5563] whitespace-pre-wrap">
                    {event?.location || "-"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 rounded-lg bg-white px-3 py-2">
                <span className="text-xl font-poppins font-bold text-[#BD19F1]">
                  참석 대상
                </span>
              <span className="text-md font-poppins font-normal text-[#4B5563] whitespace-pre-wrap">
                  {renderWithNewlines(participants || "-")}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Keynote / Tracks */}
        {hasOverview && (
          <section id="intro" className="relative overflow-hidden">
            <div className="flex flex-col gap-10">
              <h2 className="text-2xl font-poppins font-bold md:text-3xl text-center">
                행사 개요 및 목표
              </h2>
              <div className="mt-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {overviewItems.map((item, idx: number) => (
                  <div
                    key={idx}
                    className="w-full border border-[#F3E8FF] bg-gradient-to-r from-[#FAF5FF] to-[#FDF2F8] shadow-md rounded-lg p-8 flex flex-col gap-6"
                  >
                    <GlobalIcon />
                    <h4 className="text-2xl text-[#1F2937] font-poppins font-bold whitespace-pre-wrap">
                      {item.title}
                    </h4>
                    <p className="font-poppins font-normal text-[#4B5563] text-base leading-loose whitespace-pre-wrap">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Speaker */}
        {hasSpeakers && (
          <section id="agenda" className="relative overflow-hidden">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold md:text-4xl text-center">
                Speakers
              </h2>
            </div>
            <div className="mt-8 mb-8 flex flex-col gap-16">
              {speakerItems.map((item, idx: number) => (
                <div
                  key={idx}
                  className="p-2 flex flex-col items-center justify-center gap-4"
                >
                  <div className="flex flex-col items-center gap-5">
                    <img
                      src={
                        item.speaker_image ||
                        `${NEXT_PUBLIC_SUPABASE_CDN_BASE}/event-images/speaker/NoProfile.png`
                      }
                      alt="Person"
                      className="w-48 h-48 rounded-full"
                    />
                    <h4 className="font-poppins font-bold text-[#373737] text-2xl whitespace-pre-wrap">
                      {item.speaker}
                    </h4>
                    <h4 className="font-poppins font-bold text-[#373737] text-xl text-center whitespace-pre-wrap">
                      ({item.en_name})
                    </h4>
                    <h4 className="text-center font-poppins font-medium text-[#373737] whitespace-pre-wrap">
                      {renderWithNewlines(item.sub_title)}
                    </h4>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h2 className="font-poppins font-bold text-[#373737] text-xl whitespace-pre-wrap">
                      {item.title}
                    </h2>
                    <div className="flex flex-col gap-6">
                      {item.desc &&
                        item.desc.map((d: any, idx: number) => (
                          <div
                            key={idx}
                            className="font-poppins font-normal text-[#202020] leading-loose whitespace-pre-wrap"
                            >
                            {d}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Keynote / Tracks */}
        {hasSchedule && (
          <section
            id="agenda"
            className="px-6 py-16 md:py-20 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center gap-10">
              <h2 className="text-2xl font-montserrat font-bold md:text-3xl text-center">
                Program Schedule
              </h2>
              <div>
                <div className="rounded-2xl flex flex-col items-center justify-center bg-white p-6">
                  <Timeline items={scheduleItems} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section id="register" className="bg-gray-50">
          <div className="flex flex-col flex-1 p-16 items-center justify-center">
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-xl font-montserrat font-bold md:text-2xl">
                Ready to Shape the Future?
              </h2>
              {formLink && (
                <button
                  className="w-48 h-14 rounded-full bg-gradient-to-r from-[#4C15A1] via-[#A218DE] to-[#FF17C5] font-poppins"
                  onClick={() => window.open(formLink, "_blank")}
                >
                  <span className="text-white font-medium font-poppins">
                    참가 신청하기
                  </span>
                </button>
              )}
              {managerEmail && (
                <p className="text-gray-700 font-poppins">
                  문의 : {managerEmail}
                </p>
              )}
              {managerName && (
                <p className="text-gray-700 text-center font-poppins">
                  {managerName}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <EventDetailHeader
        eventDetail={eventDetail}
        uuid={uuid}
        formLink={formLink}
      />

      <div className="mx-auto max-w-7xl p-6">
      {/* Event Details */}
      <section className="relative overflow-hidden">
        <div className="px-6 py-16 md:py-24">
          <div className="flex flex-row gap-10">
            <div className="flex flex-col gap-10">
              <div>
                {(event?.detail_title || event?.detail_content) && (
                  <div className="mt-6 flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-gray-900 whitespace-pre-wrap">
                      {event.detail_title || "상세 내용"}
                    </h3>
                    {event.detail_content && (
                      <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">
                        {event.detail_content}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          

          <div className="mt-12 flex flex-col gap-6 text-gray-600 border border-gray-200 rounded-xl p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex flex-col gap-2 rounded-lg bg-white px-3 py-2 md:flex-1">
                <span className="text-xl font-bold text-[#BD19F1]">일시</span>
                <span className="text-lg font-normal text-[#4B5563] whitespace-pre-wrap">
                  {event?.event_date || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-2 rounded-lg bg-white px-3 py-2 md:flex-1">
                <span className="text-xl font-bold text-[#BD19F1]">장소</span>
                <span className="text-lg font-normal text-[#4B5563] whitespace-pre-wrap">
                  {event?.location || "-"}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-lg bg-white px-3 py-2">
              <span className="text-xl font-bold text-[#BD19F1]">
                참석 대상
              </span>
              <span className="text-lg font-normal text-[#4B5563] whitespace-pre-wrap">
                {renderWithNewlines(participants || "-")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Keynote / Tracks */}
      {hasOverview && (
        <section id="intro" className="relative overflow-hidden">
          <div className="flex flex-col gap-10">
            <h2 className="text-2xl font-bold md:text-3xl text-center">
              행사 개요 및 목표
            </h2>
            <div className="mt-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {overviewItems.map((item, idx: number) => (
                <div
                  key={idx}
                  className="w-full border border-[#F3E8FF] bg-gradient-to-r from-[#FAF5FF] to-[#FDF2F8] shadow-md rounded-lg p-8 flex flex-col gap-6"
                >
                  <GlobalIcon />
                  <h4 className="text-2xl text-[#1F2937] font-poppins font-bold whitespace-pre-wrap">
                    {item.title}
                  </h4>
                  <p className="font-poppins font-normal text-[#4B5563] text-base leading-loose whitespace-pre-wrap">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Speaker */}
      {hasSpeakers && (
        <section id="agenda" className="relative overflow-hidden">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold md:text-4xl text-center">
              Speakers
            </h2>
          </div>
          <div className="mt-8 mb-8 flex flex-col gap-16">
            {speakerItems.map((item, idx: number) => (
              <div
                key={idx}
                className="p-8 flex flex-row items-start justify-center gap-10"
              >
                <div className="flex flex-col items-center gap-5 w-full max-w-sm">
                  <img
                    src={
                      item.speaker_image ||
                      `${NEXT_PUBLIC_SUPABASE_CDN_BASE}/event-images/speaker/NoProfile.png`
                    }
                    alt="Person"
                    className="w-48 h-48 rounded-full"
                  />
                  <h4 className="font-poppins font-bold text-[#373737] text-3xl whitespace-pre-wrap">
                    {item.speaker}
                  </h4>
                  <h4 className="font-poppins font-bold text-[#373737] text-2xl whitespace-pre-wrap">
                    ({item.en_name})
                  </h4>
                  <h4 className="text-center font-poppins font-medium text-[#373737] whitespace-pre-wrap">
                    {renderWithNewlines(item.sub_title)}
                  </h4>
                </div>

                <div className="flex flex-col gap-4 flex-1 w-full max-w-3xl">
                  <h2 className="font-poppins font-bold text-[#373737] text-2xl whitespace-pre-wrap">
                    {item.title}
                  </h2>
                  <div className="flex flex-col gap-6">
                    {item.desc &&
                      item.desc.map((d: any, idx: number) => (
                        <div
                          key={idx}
                          className="font-poppins font-normal text-[#202020] whitespace-pre-wrap"
                        >
                          {d}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Keynote / Tracks */}
      {hasSchedule && (
        <section id="agenda" className="relative overflow-hidden">
          <div className="flex flex-col gap-10">
            <h2 className="text-2xl font-bold md:text-3xl text-center">
              Program Schedule
            </h2>
            <div>
              <div className="rounded-2xl bg-white p-6">
                <Timeline items={scheduleItems} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section id="register" className="bg-gray-50">
        <div className="flex flex-col flex-1 p-16 items-center justify-center">
          <div className="flex flex-col items-center gap-8 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              Ready to Shape the Future?
            </h2>
            {formLink && (
              <button
                className="w-48 h-14 rounded-full bg-gradient-to-r from-[#4C15A1] via-[#A218DE] to-[#FF17C5]"
                onClick={() => window.open(formLink, "_blank")}
              >
                <span className="text-white font-medium">참가 신청하기</span>
              </button>
            )}
            {managerEmail && (
              <p className="text-gray-700">문의 : {managerEmail}</p>
            )}
            {managerName && (
              <p className="text-gray-700 text-center">{managerName}</p>
            )}
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}
