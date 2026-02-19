"use client";

import { type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useResponsive } from "../../../../lib/useResponsive";
import { images } from "../../../../constants/images";

gsap.registerPlugin(ScrollTrigger);

type SummaryCard = {
  title: string;
  icon: string;
  paragraphs: ReactNode[];
  mobileTitleClassName?: string;
  mobileParagraphClassNames?: string[];
  desktopParagraphClassNames?: string[];
};

type SummaryServiceCard = {
  title: string;
  icon: string;
  description: string[];
};

const summaryAIContent = {
  hero: {
    title: "증강 AI 애딥 GPR",
    subtitleLines: [
      "Augmented AI Addeep-GPR",
      "(Generative Pre-trained Recommender)",
      "대화하지 않아도 당신을 이해하는 생성형 AI",
    ],
    ctaLabel: "자세히 보기",
    ctaHref: "/addeep-is/summary-ai/gpr",
    backgroundImage: images.addeepIs.summaryAi.summaryAi1,
  },
  intro: {
    title: (
      <>
        <span className="text-[#B641E9]">Web 3.0 </span>소셜 미디어의 재정의
      </>
    ),
    paragraphs: [
      [
        "Addeep-GPR(Generative Pre-trained Recommender)은 애딥의 Web 3.0 소셜 미디어를 움직이는 핵심 AI 기술입니다.",
        "차세대 CNN과 RNN 아키텍처를 기존 생성형·추론형 AI 구조와 융합하여, 지금까지 존재하지 않았던 새로운 사용자 경험을 만들어냅니다.",
        "GPR은 기존 AI처럼 사용자의 명시적인 질문이나 입력을 기다리지 않습니다.",
        "행동과 흐름을 스스로 이해하고, 그 위에서 초개인화된 콘텐츠를 자동으로 생성하고 추천합니다.",
        "대화에 의존하지 않는 완전 자동화된 생성형 AI, Addeep GPR은 소셜 미디어의 작동 방식을 근본부터 다시 설계합니다.",
      ],
    ],
  },
  advantage: {
    titleLines: [
      "사람을 이해하는 기술", 
      "자동으로 완성되는 경험"
    ],
    cards: [
      {
        title: "마음을 이해하는 AI",
        icon: images.addeepIs.summaryAi.heart,
        mobileTitleClassName:
          "text-lg text-[#B641E9] font-bold mb-4 mt-4 font-montserrat",
        mobileParagraphClassNames: [
          "text-lg leading-loose p-4 font-poppins font-normal",
          "text-lg leading-loose p-4 font-poppins font-normal",
        ],
        desktopParagraphClassNames: [
          "text-lg leading-relaxed font-poppins",
          "text-lg font-poppins leading-relaxed",
        ],
        paragraphs: [
          "애딥은 사용자를 단순한 데이터로 보지 않습니다.",
          "소통 방식, 활동 패턴, 반응의 흐름, 인구통계적 맥락까지 다차원 사용자 데이터를 종합적으로 수집·이해합니다.",
          "이 모든 데이터는 애딥의 독자 기술인 LMM(Large Mind-Mining Model)을 통해 해석됩니다.",
          "언어 데이터에만 집중하는 기존 LLM과 달리, LMM은 행동과 맥락을 기반으로 사용자의 생각, 의도, 관심의 활성 상태를 추론합니다.",
          "애딥의 AI는 말을 분석하는 데서 멈추지 않고, 사람의 마음이 움직이는 방식을 이해하는 것에서 시작됩니다.",
        ],
      },
      {
        title: "입력 없이 완성되는 초개인화",
        icon: images.addeepIs.summaryAi.twoPeople,
        mobileTitleClassName:
          "text-xl text-[#B641E9] font-bold mt-4 font-montserrat",
        mobileParagraphClassNames: [
          "text-lg leading-loose p-4 font-poppins font-normal",
          "text-lg leading-loose font-poppins font-normal p-4",
        ],
        desktopParagraphClassNames: [
          "text-lg font-poppins leading-relaxed",
          "text-lg font-poppins leading-relaxed",
        ],
        paragraphs: [
          "애딥의 자동화는 단순한 편의 기능이 아닙니다.",
          "AI가 사람을 이해하는 방식을 근본적으로 전환하는 구조입니다.",
          "사용자의 질문이나 명령을 기다리지 않고, 행동과 반응의 흐름을 연속된 상태로 해석합니다.",
          "강화학습으로 지속적으로 보정되는 GPR AI는 현재의 맥락을 스스로 추론하고, 그 순간 가장 적합한 콘텐츠를 즉시 생성합니다.",
          "복잡한 입력이나 조작 없이도, 경험은 끊기지 않고 자연스럽게 이어집니다.",
          "이해는 축적되고, 개인화는 자동으로 완성됩니다.",
        ],
      },
      {
        title: "ACT 엔진",
        icon: images.addeepIs.summaryAi.speedGauge,
        mobileTitleClassName: "text-xl text-[#B641E9] font-bold font-montserrat",
        mobileParagraphClassNames: [
          "text-lg leading-loose p-4 font-poppins font-normal",
          "text-lg leading-loose p-4 font-poppins font-normal",
          "text-lg leading-loose p-4 font-poppins font-normal",
        ],
        desktopParagraphClassNames: [
          "text-lg font-poppins leading-relaxed",
          "text-lg font-poppins leading-relaxed",
          "text-lg font-poppins leading-relaxed",
        ],
        paragraphs: [
          "ACT(Addeep Automatic Content Convergence Technology)는 애딥의 증강 AI와 GPR 추론 모델을 기반으로 작동하는 콘텐츠 융합 엔진입니다.",
          "플랫폼 생태계 전반에 분산된 텍스트, 이미지, 영상 등 다양한 형식의 콘텐츠를 분해하고 결합해, 사용자에게 최적화된 콘텐츠를 자동으로 생성합니다.",
          "애딥의 Deep Blend 기술은 복잡한 제작 도구나 전문적인 저작 과정 없이도, 사용자가 의도한 콘텐츠를 자연스럽게 재구성해냅니다.",
          "창작은 단순해지고, 의도는 더욱 정확하게 전달됩니다.",
        ],
      },
    ] as SummaryCard[],
  },
  coreServices: {
    titleLines: [
      "'혁신'이라는 키워드를",
      "사용자 입장에서의 '직관'으로 풀어냅니다.",
    ],
    subtitleLines: [
      "애딥은 AI와 사용자의 관계를 새롭게 정의합니다.",
      "사용자의 의도와 맥락을 바탕으로 생성하고, 그 결과를 스스로 확인하고 확신하는 경험으로 전환합니다.",
      "AI는 먼저 제안하고, 사용자는 선택과 반응을 통해 완성합니다.",
      "이것이 애딥이 설계한 차세대 증강 AI 상호작용입니다.",
    ],
    cards: [
      {
        title: "자동으로 완성되는 콘텐츠",
        icon: images.addeepIs.summaryAi.clockWithArrow,
        description: [
          "이미지, 밈, 이모지까지 사용자의 맥락에 맞춰 자동으로 생성하고 추천합니다.",
          "복잡한 제작 없이, 간단한 사용자의 승인만으로 콘텐츠는 바로 활성화됩니다.",
        ],
      },
      {
        title: "자동화된 광고 생성",
        icon: images.addeepIs.summaryAi.refreshArrows,
        description: [
          "콘텐츠의 맥락과 광고를 지능적으로 연결해 사용자에게 최적화된 광고를 자동으로 생성하고 추천합니다.",
          "강요 없이, 방해 없이 사용자의 승인으로만 광고 경험이 활성화됩니다.",
        ],
      },
      {
        title: "콘텐츠에서 거래까지, 하나의 흐름으로",
        icon: images.addeepIs.summaryAi.commandWindow,
        description: [
          "애딥은 콘텐츠 생성부터 광고 결합, 그리고 개인에게 맞춘 제품 거래까지 모든 과정을 하나의 흐름으로 연결합니다.",
          "사용자는 복잡한 전환 없이, 콘텐츠 경험 안에서 자연스럽게 구매까지 이어집니다.",
        ],
      },
      {
        title: "콘텐츠가 함께 자라나는 공간",
        icon: images.addeepIs.summaryAi.chart,
        description: [
          "애딥의 그룹은 같은 관심사 위에 콘텐츠가 쌓이는 구조입니다.",
          "여기서 콘텐츠는 사라지지 않고, 의미를 축적하며 집단의 맥락으로 진화합니다.",
          "그룹은 함께 소비하고, 함께 반응하며, 함께 콘텐츠를 움직이는 단위입니다.",
          "관심사는 모이고, 반응은 쌓이며, 그 흐름은 또 다시 새로운 콘텐츠를 만들어냅니다.",
        ],
      },
    ] as SummaryServiceCard[],
  },
  scalability: {
    title: "확장 가능한 AI, 산업을 넘어선 서비스가 되다",
    image: images.addeepIs.summaryAi.summaryAi2,
    paragraphs: [
      "애딥의 GPR AI 엔진은 명시적인 입력 없이도 사용자의 행동과 흐름을 통해 마인드셋 모델을 자동으로 추출합니다.",
      "이해된 맥락을 바탕으로 사용자가 가장 의도할 가능성이 높은 소셜 행동과 콘텐츠 흐름을 생성합니다.",
      "이 구조는 특정 서비스에 종속되지 않습니다.",
      "교육, 의료, 미디어, 로봇 등 다양한 산업 환경으로 유연하게 확장됩니다.",
      "애딥의 지능은 자체 클라우드 서버를 기반으로 하되, 다양한 클라우드 인프라에 대응하며 산업과 규모에 맞게 배포될 수 있습니다.",
      "나아가 애딥은 이 지능을 하나의 플랫폼을 넘어 구독형 ‘AI-as-a-Service(AIaaS)’로 제공합니다.",
      "개인부터 글로벌 기업까지, 그리고 산업의 경계를 넘어, 애딥의 초개인화 지능은 어디서든 작동합니다.",
    ],
  },
};

function SummaryAI() {
  const { isMobile, isTablet } = useResponsive();
  const router = useRouter();

  if (isMobile || isTablet) {
    return (
      <div className="flex flex-col gap-8">
        <div
          className="relative w-full rounded-lg flex flex-col items-center text-center justify-center p-8"
          style={{
            background: `url(${summaryAIContent.hero.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            border: "1px solid #E5E7EB",
          }}
        >
          <div className="absolute inset-0 bg-black/60 rounded-lg" />
          <div className="relative z-10 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold font-montserrat text-white mb-4">
              {summaryAIContent.hero.title}
            </h1>
            {summaryAIContent.hero.subtitleLines.map((line) => (
              <h3
                key={line}
                className="text-lg font-normal font-poppins text-white mb-4"
              >
                {line}
              </h3>
            ))}
            <button
              className="mt-4 mb-6 px-6 flex flex-col items-center justify-center w-32 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-poppins font-medium"
              onClick={() => router.push(summaryAIContent.hero.ctaHref)}
            >
              {summaryAIContent.hero.ctaLabel}
            </button>
          </div>
        </div>

      <div className="flex flex-col flex-1 p-6">
        <h2 className="mb-4 text-xl font-bold font-montserrat">
          {summaryAIContent.intro.title}
        </h2>
        <div className="border border-[#B641E9] text-[#B641E9] w-10 h-px mb-4"></div>
          {summaryAIContent.intro.paragraphs.map((lines, index) => (
            <p
              key={`intro-mobile-${index}`}
              className={`text-lg leading-relaxed font-poppins font-normal whitespace-pre-line ${
                index === 0 ? "" : "mt-6"
              }`}
            >
              {lines.join("\n")}
            </p>
          ))}
        </div>

        <div className="flex flex-col flex-1 p-6">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-1 font-montserrat">
              {summaryAIContent.advantage.titleLines[0]}
            </h2>
            <h2 className="mb-4 text-xl font-bold font-montserrat">
              {summaryAIContent.advantage.titleLines[1]}
            </h2>
            <div className="border border-[#B641E9] text-[#B641E9] w-10 h-px mt-2 mb-4"></div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4">
            {summaryAIContent.advantage.cards.map((card) => (
              <div
                key={card.title}
                className="max-w-96 border-[1.2px] border-[#1F2937] rounded-2xl flex flex-col items-center justify-center p-4"
              >
                <h2
                  className={
                    card.mobileTitleClassName ??
                    "text-xl text-[#B641E9] font-bold mt-4 font-montserrat"
                  }
                >
                  {card.title}
                </h2>
                {card.paragraphs.map((paragraph, index) => (
                  <p
                    key={`${card.title}-mobile-${index}`}
                    className={
                      card.mobileParagraphClassNames?.[index] ??
                      "text-lg leading-loose p-4 font-poppins font-normal"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-col flex-1 mt-8 gap-4">
            <div className="flex flex-col justify-center gap-2">
              <h2 className="text-2xl font-bold font-montserrat">
                {summaryAIContent.coreServices.titleLines[0]}
              </h2>
              <h2 className="mb-4 text-2xl font-bold font-montserrat">
                {summaryAIContent.coreServices.titleLines[1]}
              </h2>
              {summaryAIContent.coreServices.subtitleLines.map((line) => (
                <h2
                  key={line}
                  className="text-lg font-normal font-poppins"
                >
                  {line}
                </h2>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center justify-center">
              <div className="grid grid-cols-1 gap-8">
                {summaryAIContent.coreServices.cards.map((card) => (
                  <div
                    key={card.title}
                    className="max-w-[600px] border-[1.2px] border-[#1F2937] p-6 rounded-2xl flex flex-col gap-4"
                  >
                    <h3 className="text-xl leading-relaxed text-[#B641E9] font-bold font-poppins">
                      {card.title}
                    </h3>
                    <p className="text-lg leading-relaxed font-poppins font-normal whitespace-pre-line">
                      {card.description.join("\n")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6">
          <div
            className="w-full border-[1.2px] p-8 rounded-2xl flex flex-col gap-12 border-[#B641E9] border-opacity-20"
            style={{
              background:
                "linear-gradient(to right, rgba(182, 65, 233, 0.1) 0%, rgba(0, 0, 0, 0) 100%)",
            }}
          >
            <div className="flex flex-col gap-4">
              <h2 className="mb-4 text-xl font-bold font-montserrat text-[#B641E9]">
                {summaryAIContent.scalability.title}
              </h2>
              <img
                src={summaryAIContent.scalability.image}
                alt="Addeep S2E SNS GPR Platform"
                className="h-auto w-full"
              />
              {summaryAIContent.scalability.paragraphs.map((paragraph, index) => (
                <p
                  key={`ai-scalability-${index}`}
                  className="text-md leading-loose font-poppins font-normal max-w-2xl"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="mb-20 flex flex-col flex-1">
      <div className="w-full text-center">
        <div className="absolute h-[600px] inset-0 bg-black bg-opacity-60 mt-32 mx-1 rounded-lg" />
        <div
          className="w-full h-[600px] rounded-lg flex flex-col items-center justify-center"
          style={{
            background: `url(${summaryAIContent.hero.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            border: "1px solid #E5E7EB",
          }}
        >
          <div className="flex flex-col items-center justify-center z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-white mb-12">
              {summaryAIContent.hero.title}
            </h1>
            {summaryAIContent.hero.subtitleLines.map((line, index) => (
              <h3
                key={line}
                className={`text-2xl font-normal font-poppins text-white ${
                  index === summaryAIContent.hero.subtitleLines.length - 1
                    ? "mb-12"
                    : "mb-1"
                }`}
              >
                {line}
              </h3>
            ))}
            <button
              className="mt-4 mb-6 p-4 font-poppins font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              onClick={() => router.push(summaryAIContent.hero.ctaHref)}
            >
              {summaryAIContent.hero.ctaLabel}
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-28">
        <h2 className="mb-4 text-4xl font-montserrat font-bold">
          {summaryAIContent.intro.title}
        </h2>
        <div className="border border-[#B641E9] text-[#B641E9] w-16 h-px mb-4"></div>
        {summaryAIContent.intro.paragraphs.map((lines, index) => (
          <p
            key={`intro-desktop-${index}`}
            className={`text-xl leading-loose font-poppins font-normal whitespace-pre-line ${
              index === 0 ? "" : "mt-6"
            }`}
          >
            {lines.join("\n")}
          </p>
        ))}
      </div>

      <div className="flex flex-col flex-1 p-12">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl font-montserrat font-bold">
            {summaryAIContent.advantage.titleLines[0]}
          </h2>
          <h2 className="mb-4 text-4xl font-montserrat font-bold">
            {summaryAIContent.advantage.titleLines[1]}
          </h2>
          <div className="border border-[#B641E9] text-[#B641E9] w-36 h-px mt-2 mb-4"></div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="mt-12 grid grid-cols-3 gap-12">
            {summaryAIContent.advantage.cards.map((card) => (
              <div
                key={card.title}
                className="max-w-96 border-[1.2px] border-[#1F2937] p-6 rounded-2xl flex flex-col"
              >
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-[76px] h-[76px] object-contain"
                />
                <h2 className="text-2xl text-[#B641E9] font-poppins font-bold mt-6 mb-4">
                  {card.title}
                </h2>
                {card.paragraphs.map((paragraph, index) => (
                  <p
                    key={`${card.title}-desktop-${index}`}
                    className={
                      card.desktopParagraphClassNames?.[index] ??
                      "text-lg font-poppins leading-relaxed"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-12">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl font-montserrat font-bold">
            {summaryAIContent.coreServices.titleLines[0]}
          </h2>
          <h2 className="mb-8 text-4xl font-montserrat font-bold">
            {summaryAIContent.coreServices.titleLines[1]}
          </h2>
          {summaryAIContent.coreServices.subtitleLines.map((line) => (
            <h2
              key={line}
              className="text-xl font-normal font-poppins"
            >
              {line}
            </h2>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center justify-center">
          <div className="grid grid-cols-2 gap-16">
            {summaryAIContent.coreServices.cards.map((card) => (
              <div
                key={card.title}
                className="max-w-[600px] border-[1.2px] border-[#1F2937] p-6 rounded-2xl flex flex-row gap-12"
              >
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-[76px] h-[76px] object-contain"
                />
                <div className="flex flex-col gap-4 w-3/4">
                  <h3 className="text-2xl leading-relaxed font-poppins text-[#B641E9] font-bold">
                    {card.title}
                  </h3>
                  <p className="text-xl leading-relaxed font-poppins whitespace-pre-line">
                    {card.description.join("\n")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div
          className="w-3/4 max-w-[1400px] border-[1.2px] p-12 rounded-2xl flex flex-row gap-12 border-[#B641E9] border-opacity-20"
          style={{
            background:
              "linear-gradient(to right, rgba(182, 65, 233, 0.1) 0%, rgba(0, 0, 0, 0) 100%)",
          }}
        >
          <div className="flex flex-col gap-4">
            <h2 className="mb-4 text-3xl font-bold font-poppins text-[#B641E9]">
              {summaryAIContent.scalability.title}
            </h2>
            {summaryAIContent.scalability.paragraphs.map((paragraph, index) => (
              <p
                key={`ai-scalability-desktop-${index}`}
                className="text-lg leading-relaxed font-poppins max-w-2xl"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <img
            src={summaryAIContent.scalability.image}
            alt="Addeep S2E SNS GPR Platform"
            className="h-auto w-1/2"
          />
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return <SummaryAI/>;
}
