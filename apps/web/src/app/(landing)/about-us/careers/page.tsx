"use client";

import React, { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useResponsive } from "../../../../lib/useResponsive";
import { sectionData, items } from "../../../../constants/careers";
import { images } from "../../../../constants/images";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: ReactNode;
  index: number;
}

type InfoCardProps = {
  title: string;
  description: string;
  img?: any;
};

const AnimatedSection = ({ children, index }: AnimatedSectionProps) => {
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
    <div ref={sectionRef} className="min-h-screen flex items-center">
      {children}
    </div>
  );
};

const InfoCard = ({ title, description, img = `` }: InfoCardProps) => {
  const { isMobile, isTablet } = useResponsive();

  if (isMobile || isTablet) {
    return (
      <div className="bg-white w-full">
        <Image 
          src={img} 
          alt={title} 
          className="w-full h-auto" 
          fill
        />
        <div className="flex items-start gap-5 mt-8 max-w-96">
          <div className="space-y-2">
            <h3 className="text-xl font-poppins font-extrabold text-gray-900">
              {title}
            </h3>
            <p className="text-md text-gray-600 font-poppins leading-loose">
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white w-full">
      <Image 
        src={img} 
        alt={title} 
        className="w-[600px] h-auto" 
        fill 
      />
      <div className="flex items-start gap-5 mt-8 min-w-96">
        <div className="space-y-2">
          <h3 className="text-xl md:text-2xl font-poppins font-extrabold text-gray-900">
            {title}
          </h3>
          <p className="text-lg text-gray-600 font-poppins leading-loose">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const CareerHero = () => {
  const { isMobile, isTablet } = useResponsive();

  if (isMobile || isTablet) {
    return (
      <section className="w-full bg-[#F9FAFB] -mt-80">
        <div className="mx-auto px-6 py-14">
          {/* 제목 */}
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight font-montserrat">
            Job Openings
          </h1>

          {/* 본문 */}
          <h3 className="mt-8 text-lg font-normal text-gray-700 leading-relaxed font-poppins">
            We are currently seeking talented individuals
          </h3>
          <h3 className="text-lg font-normal text-gray-700 font-poppins">
            to join our team in the following roles:
          </h3>
          <div className="flex flex-col gap-6 mt-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-normal text-gray-700 min-w-72 font-poppins">
                Backend Planner
              </h3>
              <p className="text-lg font-normal text-gray-700 font-poppins">
                Designs the backend system architecture and plans new features
                to ensure the service's stability and efficiency.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-normal text-gray-700 leading-relaxed min-w-72 font-poppins">
                Engineer
              </h3>
              <p className="text-lg font-normal text-gray-700 leading-relaxed font-poppins">
                Utilizes a diverse tech stack to implement and develop Addeep's
                innovative AI and Web 3.0 platform.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-normal text-gray-700 leading-relaxed min-w-72 font-poppins">
                Global Business Strategist
              </h3>
              <p className="text-lg font-normal text-gray-700 leading-relaxed font-poppins">
                Analyzes global market trends and formulates strategies to
                achieve Addeep's business objectives.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#F9FAFB]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <h1 className="text-5xl font-bold font-montserrat text-gray-800 tracking-tight">
          Job Openings
        </h1>
        <h3 className="mt-8 text-xl md:text-2xl lg:text-3xl font-poppins font-normal text-gray-700">
          We are currently seeking talented individuals
        </h3>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-poppins font-normal text-gray-700">
          to join our team in the following roles:
        </h3>

        <div className="flex flex-col gap-6 mt-12">
          <div className="flex flex-row gap-24">
            <h3 className="text-xl font-normal font-poppins text-gray-700 min-w-72">
              Backend Planner
            </h3>
            <p className="text-lg font-normal font-poppins text-gray-700">
              Designs the backend system architecture and plans new features to
              ensure the service's stability and efficiency.
            </p>
          </div>
          <div className="flex flex-row gap-24">
            <h3 className="text-xl font-normal font-poppins text-gray-700 leading-relaxed min-w-72">
              Engineer
            </h3>
            <p className="text-lg font-normal font-poppins text-gray-700 leading-relaxed">
              Utilizes a diverse tech stack to implement and develop Addeep's
              innovative AI and Web 3.0 platform.
            </p>
          </div>
          <div className="flex flex-row gap-24">
            <h3 className="text-xl font-poppins font-normal text-gray-700 leading-relaxed min-w-72">
              Global Business Strategist
            </h3>
            <p className="text-lg font-poppins font-normal text-gray-700 leading-relaxed">
              Analyzes global market trends and formulates strategies to achieve
              Addeep's business objectives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CareerCard = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div>
          <h1 className="text-3xl font-montserrat font-bold text-gray-800 tracking-tight">
            Recuritment
          </h1>
          <h1 className="text-3xl font-montserrat font-bold text-gray-800 tracking-tight">
            Purpose
          </h1>
          <h3 className="mt-8 text-xl lg:text-2xl font-poppins font-normal text-gray-700">
            At Addeep, we highly value the safety and satisfaction of the
            diverse
          </h3>
          <h3 className="text-xl lg:text-2xl font-poppins font-normal text-gray-700">
            talents who work together to bring our imaginative ideas to reality.
          </h3>
          <h3 className="text-xl lg:text-2xl font-poppins font-normal text-gray-700">
            Here is an overview of our working environment.
          </h3>
        </div>

        {/* 카드 그리드 */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6">
          {items.map((it, i) => (
            <InfoCard key={i} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  const { isMobile, isTablet } = useResponsive();
  const secondSectionRef = useRef<HTMLDivElement>(null);

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

  if (isMobile || isTablet) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto">
          {sectionData.map((section, index) => (
            <AnimatedSection key={index} index={index}>
              <div className="flex flex-col w-full">
                <div className="absolute h-[400px] inset-0 bg-black mt-28 rounded-lg" />
                <div
                  className="flex flex-col h-[590px] items-center justify-center text-center"
                  style={{
                    background: `url(${images.careers.banner})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.9,
                  }}
                >
                  {/* Text Section */}
                  <div className="items-center justify-center relative z-10">
                    <p className="text-2xl font-montserrat flex flex-col font-bold text-white leading-loose text-center gap-2 p-2">
                      {section.text.map((line, lineIndex) => (
                        <span key={lineIndex} className="animate-text">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
                {/* Bottom Arrow */}
                {/* <div
                  className="absolute top-2/4 mt-12 left-8 animate-text cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={handleArrowClick}
                >
                  <LandingBottomArrowIcon />
                </div> */}
              </div>
            </AnimatedSection>
          ))}
        </div>
        <div ref={secondSectionRef} className="mt-72">
          <CareerHero />
          <CareerCard />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="absolute h-[600px] inset-0 bg-black mt-32 mx-1 rounded-lg" />
      <div
        className="flex flex-col h-[600px] items-center justify-center text-center"
        style={{
          background: `url(${images.careers.banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.9,
        }}
      >
        {sectionData.map((section, index) => (
          <AnimatedSection key={index} index={index}>
            <div className="flex flex-col w-full p-4">
              {/* Text Section */}
              <div className="items-center justify-center text-center">
                <p className="text-5xl font-montserrat flex flex-col font-bold text-white gap-6">
                  {section.text.map((line, lineIndex) => (
                    <span key={lineIndex} className="animate-text">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
      <div ref={secondSectionRef}>
        <CareerHero />
        <CareerCard />
      </div>
    </div>
  );
}
