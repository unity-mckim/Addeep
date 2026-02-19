"use client";

import React, { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useResponsive } from "../../../../lib/useResponsive";
import {
  MobileLandingBottomArrowIcon,
  LandingBottomArrowIcon,
} from "../../../../icons";
import {
  sectionData,
  HeaderImageData,
  HeroText,
  slideData,
} from "../../../../constants/we-are";
import { useState } from "react";
import { images } from "../../../../constants/images";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: ReactNode;
  index: number;
  col?: boolean;
}

const AnimatedSection = ({
  children,
  index,
  col = false,
}: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const textElements = section.querySelectorAll(".animate-text");
    const imageElement = section.querySelector(".animate-image");

    // 초기 상태 설정
    gsap.set(textElements, { y: 100, opacity: 0 });
    gsap.set(imageElement, { y: 100, opacity: 0 });

    // 페이지 로드 시 첫 번째 섹션만 즉시 애니메이션
    if (index === 0) {
      const tl = gsap.timeline();

      textElements.forEach((element, i) => {
        tl.to(
          element,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          i * 0.1
        );
      });

      tl.to(
        imageElement,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        textElements.length * 0.1
      );
    }

    // 스크롤 트리거 설정 - 스크롤 기반 애니메이션
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
        markers: false,
      },
    });

    // 텍스트 요소들을 순차적으로 애니메이션
    textElements.forEach((element, i) => {
      tl.to(
        element,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        i * 0.08
      );
    });

    // 이미지 애니메이션
    tl.to(
      imageElement,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      textElements.length * 0.08
    );

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, [index]);

  return (
    <div
      ref={sectionRef}
      className={`min-h-screen flex items-center ${col ? "flex-col" : ""}`}
    >
      {children}
    </div>
  );
};

function AboutSwiper() {
  const { isMobile, isTablet } = useResponsive();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 하이드레이션 불일치 방지를 위해 서버와 클라이언트에서 동일한 구조 렌더링
  const renderSlideContent = (
    slide: (typeof slideData)[0],
    isMobileView: boolean
  ) => {
    if (isMobileView) {
      return (
        <div className="flex flex-col items-center justify-between overflow-y-auto p-2 min-h-full mt-16">
          {/* Image */}
          <div className="flex justify-center mt-8 mb-8">
            <div className="relative w-[200px] h-[200px] rounded-3xl overflow-hidden shadow-lg">
              {/* <video
                src={slide.image}
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full"
              /> */}
              <img
                src={slide.image}
                alt={slide.title}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          {/* Text */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold font-montserrat text-[#833AB4]">Addeep</h1>
            <h2 className="text-xl font-normal font-poppins leading-normal mt-2 mb-2">
              {slide.title}
            </h2>
            <div className="text-md text-[#374151 leading-relaxed font-poppins">
              {slide.text.map((t, index) => (
                <div key={index}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col md:flex-row items-center h-full w-full justify-center">
        {/* Text */}
        <div className="space-y-6 ml-24 lg:ml-48">
          <h1 className="text-4xl font-bold font-montserrat text-[#833AB4]">Addeep</h1>
          <h2 className="text-2xl font-bold font-poppins leading-snug">
            {slide.title}
          </h2>
          <div className="text-[#374151] text-xl font-poppins leading-loose">
            {slide.text.map((t, index) => (
              <h4 key={index}>{t}</h4>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex items-center justify-center mt-8">
          <div className="relative w-[280px] h-[560px] rounded-3xl overflow-hidden shadow-lg">
            {/* <video
              src={slide.image}
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
            /> */}
            <img
              src={slide.image}
              alt={slide.title}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    );
  };

  // 서버사이드 렌더링 시에는 항상 데스크톱 버전 렌더링 (하이드레이션 불일치 방지)
  const shouldRenderMobile = (mounted && isMobile) || (mounted && isTablet);

  return (
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      className={`w-full custom-swiper ${shouldRenderMobile ? "min-h-screen" : "h-screen"}`}
    >
      {slideData.map((slide, i) => (
        <SwiperSlide key={i}>
          {renderSlideContent(slide, shouldRenderMobile)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default function LandingPage() {
  const { isMobile, isTablet } = useResponsive();
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleArrowClick = () => {
    if (secondSectionRef.current) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: secondSectionRef.current,
          offsetY: 0,
        },
        ease: "power2.inOut",
      });
    }
  };

  // 하이드레이션 불일치 방지를 위해 서버와 클라이언트에서 동일한 구조 렌더링
  const shouldRenderMobile = (mounted && isMobile) || (mounted && isTablet);

  const renderMobileLayout = () => (
    <div className="min-h-screen bg-white">
      {sectionData.map((section, index) => (
        <AnimatedSection key={index} index={index}>
          <div className="flex flex-col w-full -mt-[400px]">
            {/* Text Section */}
            <div className="items-center justify-center p-8">
              <p className="text-2xl font-sans flex flex-col font-normal text-gray-800 leading-loose text-left gap-1">
                {section.text.map((line, lineIndex) => (
                  <span key={lineIndex} className="animate-text block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
            {/* Bottom Arrow */}
            {/* <div
              className="absolute top-3/4 left-10 animate-text cursor-pointer hover:scale-110 transition-transform duration-200"
              onClick={handleArrowClick}
            >
              <MobileLandingBottomArrowIcon />
            </div> */}

            {/* Image Section */}
            <div
              className={[
                "absolute top-full -mt-64 right-0 w-full h-1/2 animate-image",
              ].join(" ")}
            >
              <img
                // src={images.weAre.gradient}
                src={images.weAre.weAre1}
                alt="girl taking a photo with a tunnel filter"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-4 inset-0 z-10 flex items-end p-6">
                {HeaderImageData.map((header, index) => {
                  return (
                    <div key={index} className="flex flex-col gap-2">
                      {header.text.map((line, lineIndex) => (
                        <span
                          key={lineIndex}
                          className="animate-text  leading-loose text-white font-sans font-normal text-2xl text-right"
                        >
                          {line}
                        </span>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </AnimatedSection>
      ))}
      <div
        ref={secondSectionRef}
        className="mt-16 text-xl flex-1 flex flex-col items-center justify-center font-sans font-normal text-gray-800 leading-normal text-center space-y-1 p-2"
      >
        <AnimatedSection col={true} index={1}>
          <img
            src={images.common.bannerAddeep}
            alt="logo"
            style={{ width: "200px", height: "auto" }}
          />
          {HeroText.map((section, index) => (
            <div key={index} className="mt-8">
              {section.text.map((line, lineIndex) => (
                <div
                  key={lineIndex}
                  className="animate-text font-montserrat block mt-6"
                >
                  {line}
                </div>
              ))}
            </div>
          ))}
        </AnimatedSection>
      </div>
      <div className="p-8 -mt-96 flex flex-col items-center justify-center">
        <AboutSwiper />
      </div>
    </div>
  );

  const renderDesktopLayout = () => (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center">
        {sectionData.map((section, index) => (
          <AnimatedSection key={index} index={index}>
            <div className="grid grid-cols-2 grid-rows-2 items-stretch justify-stretch">
              {/* Top Left - Text */}
              <div className="flex items-center justify-center p-2">
                <p className="text-3xl md:text-5xl font-arial font-normal text-gray-800 leading-normal text-left">
                  {section.text.map((line, lineIndex) => (
                    <span key={lineIndex} className="block mt-8 mb-8">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              {/* Top Right - Image */}
              <div className="flex items-center justify-center p-2">
                <img
                  // src={images.weAre.gradient}
                  src={images.weAre.weAre1}
                  alt="Gradient"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Bottom Left - Image */}
              <div className="flex items-center justify-center p-2">
                <img
                  // src={images.weAre.computer}
                  src={images.weAre.weAre2}
                  alt="Computer"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Bottom Right - Text */}
              <div className="flex items-center justify-center p-2">
                <div className="text-3xl md:text-5xl font-arial font-normal bg-gradient-to-r from-[#FF0169] via-[#D300C5] to-[#7638FA] bg-clip-text text-transparent leading-normal text-right">
                  {HeaderImageData.map((header, headerIndex) => (
                    <div key={headerIndex}>
                      {header.text.map((t, i) => (
                        <span key={i} className="block mt-8 mb-8">
                          {t}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <div
        ref={secondSectionRef}
        className="mt-48 text-3xl md:text-5xl flex-1 flex flex-col items-center justify-center font-sans font-normal text-gray-800 leading-loose text-center space-y-6"
      >
        <AnimatedSection index={1} col={true}>
          <img
            src={images.common.bannerAddeep}
            alt="logo"
            style={{ width: "300px", height: "auto" }}
          />
          <div className="mt-8" />
          {HeroText.map((section, index) => (
            <div key={index}>
              {section.text.map((line, lineIndex) => (
                <div key={lineIndex} className="animate-text block mt-6">
                  {line}
                </div>
              ))}
            </div>
          ))}
        </AnimatedSection>
      </div>
      <div className="flex flex-col items-center justify-center -mt-96 p-4">
        <AboutSwiper />
      </div>
    </div>
  );

  // 서버사이드 렌더링 시에는 항상 데스크톱 버전 렌더링 (하이드레이션 불일치 방지)
  return shouldRenderMobile ? renderMobileLayout() : renderDesktopLayout();
}
