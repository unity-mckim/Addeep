"use client";

import { useResponsive } from "../../../../lib/useResponsive";
import { YoutubePlayer } from "../../../../components/YoutubePlayer";

const headings = {
  title: "Addeep GPR",
  subtitle: "디지털 플랫폼 혁신",
};

const videoId = "xUG4jmCCZWU";

const paragraphs = [
  "애딥은 디지털 플랫폼 생태계 안에서 소셜 미디어와 미디어 콘텐츠 산업에 참여하는 모든 구성원의 필요를 지능적으로 연결하는 통합 플랫폼을 지향합니다.",
  "사용자 중심의 시장에서 출발해, 사람과 사람 사이의 연결이 더 즐겁고, 더 가치 있는 경험이 되도록 혁신합니다.",
  "빅데이터와 AI 기술을 활용하여 방대한 양의 구조화된 데이터와 비구조화된 데이터를 효율적으로 축적합니다.",
  "그 과정을 통해 콘텐츠 시장을 둘러싼 모든 인적·물적 자원을 효과적으로 연결하고 재배치하여, 새로운 가치의 흐름을 만들어냅니다.",
];

const DigitalPlatformInnovation = () => {
  const { isMobile, isTablet } = useResponsive();

  if (isMobile || isTablet) {
    return (
      <div className="stage relative mb-20">
        <div className="mx-auto w-full p-6">
          <div className="space-y-20">
            <section className="copy">
              <h2 className="mb-4 text-2xl font-montserrat font-bold">
                {headings.title}
              </h2>
              <h2 className="mb-10 text-2xl font-montserrat font-bold text-[#B641E9]">
                {headings.subtitle}
              </h2>
              <YoutubePlayer videoId={videoId} />
              {paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={`text-lg md:text-xl leading-loose md:leading-loose font-poppins font-normal ${
                    index === 0 ? "mt-12" : "mt-8"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stage relative mb-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-28 px-6 py-24 md:grid-cols-2 md:py-32">
        <div className="space-y-[60vh]">
          <section className="copy">
            <h2 className="mb-8 text-6xl font-montserrat font-bold">
              {headings.title}
            </h2>
            <h2 className="mb-8 text-3xl font-poppins font-bold text-[#B641E9]">
              {headings.subtitle}
            </h2>
            {paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`text-xl font-poppins font-normal leading-relaxed ${
                  index === paragraphs.length - 1 ? "" : "mb-6"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </section>
        </div>
        <div className="flex flex-1 mt-24">
          <YoutubePlayer videoId={videoId} />
        </div>
      </div>
    </div>
  );
};

export default DigitalPlatformInnovation;
