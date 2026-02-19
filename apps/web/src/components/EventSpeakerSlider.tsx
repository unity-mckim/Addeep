"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useResponsive } from "../lib/useResponsive";
import { images as imageCatalog } from "../constants/images";

import "swiper/css";
import "swiper/css/navigation";

export default function EventSpeakerSlider({
  onClick,
  uuid,
  images,
  thumbnailUrl,
}: {
  onClick: (e: any) => void;
  uuid: number;
  images?: string[];
  thumbnailUrl?: string;
}) {
  const { isMobile, isTablet, isTabletDesktop } = useResponsive();
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // 이미지 우선순위: images > thumbnailUrl > 하드코딩된 기본 이미지
  let speakers: { img: string }[] = [];

  if (images && images.length > 0) {
    // speaker_images가 있으면 사용
    speakers = images.map((img) => ({ img }));
  } else if (thumbnailUrl) {
    // thumbnail_url이 있으면 사용
    speakers = [{ img: thumbnailUrl }];
  } else {
    // 기본 이미지 (하위 호환성)
    speakers =
      uuid === 1
        ? [
            {
              img: imageCatalog.events.globalFirstDayFirst,
            },
            {
              img: imageCatalog.events.globalFirstDaySecond,
            },
          ]
        : [
            {
              img: imageCatalog.events.globalSecondDayFirst,
            },
            {
              img: imageCatalog.events.globalSecondDaySecond,
            },
          ];
  }

  // 이미지가 하나도 없으면 렌더링하지 않음
  if (speakers.length === 0) {
    return null;
  }

  if (isMobile || isTablet || isTabletDesktop) {
    return (
      <div
        className="w-full max-w-[200px] min-h-[200px] max-h-[400px] mx-auto mt-8"
        onClick={onClick}
      >
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 8000 }}
          loop
          className="h-full"
        >
          {speakers.map((sp, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col items-center justify-center bg-white aspect-square w-full h-[300px] relative">
                <Image
                  src={sp.img}
                  alt={`speaker-${idx}`}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg min-h-[400px] mx-auto" onClick={onClick}>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 8000 }}
        loop
        className="h-full rounded-l-2xl"
      >
        {speakers.map((sp, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col items-center justify-center bg-white aspect-square w-full h-[800px] relative">
              <Image
                src={sp.img}
                alt={`speaker-${idx}`}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
