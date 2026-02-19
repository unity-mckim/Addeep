"use client";

import { useResponsive } from "../../../../lib/useResponsive";
import { images } from "../../../../constants/images";

const summarySNSContent = {
  hero: {
    title: "Addeep S2E SMS GPR Platform",
    subtitleLines: [
      "애딥 GPR AI를 기반으로",
      "모든 참여가 실질적인 보상으로 이어지는",
      "S2E(Social to Earn) 소셜 플랫폼을 경험해보세요.",
    ],
    // backgroundImage: images.addeepIs.summarySns.banner,
    backgroundImage: images.addeepIs.summarySns.summarySns1,
  },
  valueSection: {
    title: (
      <>
        <span className="text-[#B641E9] font-bold">가치 재정의: </span>
        모두를 위한 공동의 성장
      </>
    ),
    description: [
      "애딥은 사용자의 참여를 실질적인 보상으로 전환하는 구조를 설계합니다.",
      "Addeep GPR AI의 정교한 분석을 통해 축적된 리워드는 현금처럼 활용 가능한 가치로 이어집니다.",
      "이 구조는 특정 주체만을 위한 보상이 아닙니다.",
      "광고주, 사용자, 크리에이터까지 모든 참여자가 함께 기여하고, 함께 성장할 수 있도록 설계되었습니다.",
      "플랫폼 이용이 늘어날수록, 경제적 가치는 한쪽이 아닌 모두에게 확장됩니다.",
    ],
    subTitle: "사용자가 중심이 되는 구조",
    subDescription: [
      "기존 플랫폼 생태계에서 사용자는 소비자이자 데이터의 제공자에 머물러 왔습니다.",
      "참여와 기여는 축적되지만, 그에 대한 보상은 플랫폼 내부에만 남아왔습니다.",
      "애딥은 이 구조적 불균형을 다시 질문합니다.",
      "왜 사용자는 플랫폼을 성장시키면서도 그 가치의 주체가 되지 못했는가.",
      "애딥은 사용자를 중심에 두고, 참여 자체가 보상이 되는 SNS 플랫폼을 제시합니다.",
      "전 세계 누구나 플랫폼의 일부로서 가치를 만들고, 그 가치를 다시 돌려받을 수 있도록.",
      "애딥은 플랫폼을 사용하는 방식을 넘어, 플랫폼과 함께 성장하는 방식을 만듭니다.",
    ],
  },
  gprSection: {
    title: "Addeep GPR AI:",
    subtitle: "참여가 가치로 이어지는 구조",
    description: [
      "애딥의 경쟁력은 GPR AI의 예측·생성 지능과 차별화된 데이터 분석 구조에 있습니다.",
      "사용자의 참여를 가치로 전환하고, 그 가치를 공정하게 확장하는 흐름을 만듭니다.",
    ],
  },
  benefitCards: [
    {
      title: "개인에게 맞춰 완성되는 콘텐츠",
      description: [
        "Addeep GPR AI는 별도의 입력 없이도 사용자의 행동과 맥락을 이해해 개인에게 가장 적합한 콘텐츠를 자동으로 생성하고 제안합니다.",
      ],
    },
    {
      title: "참여자 모두를 위한 공정한 수익 구조",
      description: [
        "플랫폼에 참여하는 모든 구성원이 보다 공정하고 효율적으로 가치를 공유하는 생태계를 만듭니다.",
      ],
    },
    {
      title: "정확도에 기반한 효율적 타겟팅",
      description: [
        "초개인화된 분석을 통해 개인마다 다른 관심과 맥락을 정밀하게 이해하고, 그에 맞는 타겟팅으로 광고 효율을 극대화합니다.",
        "불필요한 비용은 줄이고, 수익 흐름은 보다 정교하게 완성됩니다.",
      ],
    },
  ],
  nextGenTitleLines: [
    <>
      <span className="text-[#B641E9]">크리에이터와 산업을 위한 </span>차세대 기술
    </>,
  ],
  platformSections: [
    {
      title: "AI & Cloud Platform",
      description: [
        "Addeep GPR AI는 딥러닝 기반 AI 기술을 한 단계 확장해, 클라우드 환경에서 작동하는 데이터 플랫폼으로 구현됩니다.",
        "이를 통해 각 산업의 특성과 목적에 맞춘 도메인 특화형 AI 서비스를 유연하게 구성할 수 있으며,",
        "기업과 크리에이터는 복잡한 기술 부담 없이 맞춤형 AI를 손쉽게 활용할 수 있습니다.",
      ],
      image: images.addeepIs.summarySns.bottom1,
      imageAlt: "Addeep S2E SNS GPR Platform",
      imagePosition: "right",
    },
    {
      title: "ACI Content Protection",
      description: [
        "ACI(Addeep Contents Identifier)는 Addeep GPR AI의 콘텐츠 분석·식별 기술과 블록체인 기반 보안 기술을 결합한 애딥의 콘텐츠 보호 솔루션입니다.",
        "콘텐츠의 생성과 유통 과정을 정밀하게 식별하고 기록함으로써, IP 권리를 보다 명확하고 안전하게 보호합니다. ",
        "이를 통해 크리에이터는 콘텐츠를 자유롭게 활용하면서도, 권리 침해에 대한 걱정 없이 애딥 플랫폼 안에서 안전한 거래와 확장을 이어갈 수 있습니다.",
      ],
      image: images.addeepIs.summarySns.bottom2,
      imageAlt: "Addeep S2E SNS GPR Platform",
      imagePosition: "left",
    },
  ],
  footerBanner: {
    title: "글로벌로 확장되는 애딥의 발걸음",
    subtitleLines: [
      "누구나 어디에서든",
      "애딥이 만들어가는 가치와 연결될 수 있도록",
      "새로운 플랫폼 생태계를 전 세계로 확장합니다.",
    ],
    backgroundImage: images.addeepIs.summarySns.earthBanner,
  },
  images: {
    hero: images.addeepIs.summarySns.summarySns2,
    content: images.addeepIs.summarySns.summarySns3,
  },
};

function SummarySNS() {
  const { isMobile, isTablet } = useResponsive();

  if (isMobile || isTablet) {
    return (
      <div className="flex flex-col flex-1">
        <div className="w-full text-center">
          <div
            className="relative w-full h-[600px] rounded-lg flex flex-col items-center justify-center"
            style={{
              background: `url(${summarySNSContent.hero.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              border: "1px solid #E5E7EB",
            }}
          >
            <div className="absolute inset-0 bg-black/60 rounded-lg" />
            <div className="relative z-10 flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold font-montserrat text-white mb-4">
                {summarySNSContent.hero.title}
              </h1>
              {summarySNSContent.hero.subtitleLines.map((line) => (
                <h3
                  key={line}
                  className="text-xl font-normal font-poppins text-white mb-4"
                >
                  {line}
                </h3>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-6 gap-4">
          <h2 className="mb-4 text-2xl font-bold font-montserrat">
            {summarySNSContent.valueSection.title}
          </h2>
          <p className="text-lg leading-loose font-poppins font-normal whitespace-pre-line">
            {summarySNSContent.valueSection.description.join("\n")}
          </p>
          <h2 className="mb-4 text-2xl text-[#B641E9] font-bold font-montserrat mt-4">
            {summarySNSContent.valueSection.subTitle}
          </h2>
          <p className="text-lg leading-loose font-poppins font-normal whitespace-pre-line">
            {summarySNSContent.valueSection.subDescription.join("\n")}
          </p>

          <div className="flex flex-col mt-16 gap-4">
            <h2 className="text-2xl text-[#B641E9] font-bold font-montserrat">
              {summarySNSContent.gprSection.title}
            </h2>
            <h2 className="text-xl font-bold font-montserrat">
              {summarySNSContent.gprSection.subtitle}
            </h2>
            <p className="text-lg leading-relaxed font-poppins font-normal whitespace-pre-line">
              {summarySNSContent.gprSection.description.join("\n")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-6 justify-items-center">
            {summarySNSContent.benefitCards.map((card) => (
              <div
                key={card.title}
                className="max-w-[600px] border-[1.2px] border-transparent shadow-xl p-6 rounded-2xl flex flex-col"
              >
                <h2 className="mb-4 text-xl font-semibold text-[#B641E9] font-montserrat">
                  {card.title}
                </h2>
                <p className="text-lg leading-relaxed font-poppins font-normal whitespace-pre-line">
                  {card.description.join("\n")}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center mt-16">
            <h2 className="mb-4 text-2xl font-bold font-montserrat">
              {summarySNSContent.nextGenTitleLines[0]}
            </h2>
            <h2 className="text-2xl font-bold font-montserrat">
              {summarySNSContent.nextGenTitleLines[1]}
            </h2>
          </div>

          <h2 className="mb-4 text-xl font-semibold text-[#B641E9] font-montserrat">
            {summarySNSContent.platformSections[0].title}
          </h2>
          <p className="text-lg leading-relaxed font-poppins font-normal whitespace-pre-line">
            {summarySNSContent.platformSections[0].description.join("\n")}
          </p>
          <h2 className="mb-4 text-xl font-semibold text-[#B641E9] font-montserrat mt-8">
            {summarySNSContent.platformSections[1].title}
          </h2>
          <p className="text-lg leading-relaxed font-poppins font-normal whitespace-pre-line">
            {summarySNSContent.platformSections[1].description.join("\n")}
          </p>
        </div>
        <div className="w-full text-center p-2">
          <div
            className="w-full h-[600px] rounded-lg flex flex-col items-center justify-center"
            style={{
              background: `url(${summarySNSContent.footerBanner.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              border: "1px solid #E5E7EB",
            }}
          >
            <h1 className="text-3xl font-bold font-montserrat text-white mb-12">
              {summarySNSContent.footerBanner.title}
            </h1>
            {summarySNSContent.footerBanner.subtitleLines.map((line) => (
              <h3
                key={line}
                className="text-lg font-normal font-poppins text-white mb-4"
              >
                {line}
              </h3>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-20 flex flex-col flex-1">
      <div className="w-full text-center">
        <div className="absolute h-[600px] inset-0 bg-black bg-opacity-60 mt-32 mx-1 rounded-lg" />
        <header
          className="w-full h-[600px] rounded-lg flex flex-col items-center justify-center"
          style={{
            background: `url(${summarySNSContent.hero.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            border: "1px solid #E5E7EB",
          }}
        >
          <div className="flex flex-col items-center justify-center z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat text-white mb-12">
              {summarySNSContent.hero.title}
            </h1>
            {summarySNSContent.hero.subtitleLines.map((line, index) => (
              <h3
                key={line}
                className={`text-2xl font-normal font-poppins text-white ${
                  index === summarySNSContent.hero.subtitleLines.length - 1
                    ? "mb-4"
                    : "mb-1"
                }`}
              >
                {line}
              </h3>
            ))}
          </div>
        </header>
      </div>

      <div className="flex flex-col flex-1 p-28">
        <div className="flex flex-row gap-16">
          <div className="flex flex-col">
            <h2 className="mb-4 text-4xl font-bold font-montserrat">
              {summarySNSContent.valueSection.title}
            </h2>
            <p className="text-xl leading-loose font-poppins font-normal whitespace-pre-line">
              {summarySNSContent.valueSection.description.join("\n")}
            </p>
            <h2 className="mb-4 text-2xl text-[#B641E9] font-semibold font-poppins mt-16">
              {summarySNSContent.valueSection.subTitle}
            </h2>
            <p className="text-xl leading-loose font-poppins font-normal whitespace-pre-line">
              {summarySNSContent.valueSection.subDescription.join("\n")}
            </p>
          </div>
          <img
            src={summarySNSContent.images.hero}
            alt="Addeep S2E SNS GPR Platform"
            className="w-96 h-auto"
          />
        </div>

        <div className="flex flex-col items-center justify-center mt-32">
          <h2 className="text-4xl font-montserrat text-[#B641E9] font-bold">
            {summarySNSContent.gprSection.title}
          </h2>
          <h2 className="text-4xl font-bold font-montserrat">
            {summarySNSContent.gprSection.subtitle}
          </h2>
          <p className="text-2xl leading-relaxed text-center mt-8 font-poppins font-normal text-[#374151] w-2/3 whitespace-pre-line">
            {summarySNSContent.gprSection.description.join("\n")}
          </p>
        </div>

        <img
          src={summarySNSContent.images.content}
          alt="Addeep S2E SNS GPR Platform"
          className="w-full h-auto mt-6"
        />

        <div className="grid grid-cols-3 gap-4 mt-4">
          {summarySNSContent.benefitCards.map((card) => (
            <div
              key={card.title}
              className="max-w-[600px] border-[1.2px] border-gray-100 shadow-xl p-6 rounded-2xl flex flex-col"
            >
              <h2 className="mb-4 text-2xl font-semibold font-poppins text-[#B641E9]">
                {card.title}
              </h2>
              <p className="text-2xl leading-9 font-poppins font-normal text-[#374151] whitespace-pre-line">
                {card.description.join("\n")}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center mt-32">
          <h2 className="mb-4 text-4xl font-montserrat font-bold">
            {summarySNSContent.nextGenTitleLines[0]}
          </h2>
          <h2 className="text-4xl font-bold font-montserrat">
            {summarySNSContent.nextGenTitleLines[1]}
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center">
          {summarySNSContent.platformSections.map((section, index) => (
            <div
              key={section.title}
              className={`flex flex-row items-center gap-16 w-3/4 h-96 ${
                index === 0 ? "mt-24" : ""
              }`}
            >
              {section.imagePosition === "left" ? (
                <img
                  src={section.image}
                  alt={section.imageAlt}
                  className="h-auto w-1/3"
                />
              ) : null}
              <div className="flex flex-col w-2/3">
                <h2 className="mb-4 text-2xl font-semibold font-poppins text-[#B641E9]">
                  {section.title}
                </h2>
                <p className="text-2xl leading-relaxed font-poppins font-normal text-[#374151] whitespace-pre-line">
                  {section.description.join("\n")}
                </p>
              </div>
              {section.imagePosition === "right" ? (
                <img
                  src={section.image}
                  alt={section.imageAlt}
                  className="h-auto w-1/3"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full text-center">
        <div
          className="w-full h-[600px] rounded-lg flex flex-col items-center justify-center"
          style={{
            background: `url(${summarySNSContent.footerBanner.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            border: "1px solid #E5E7EB",
          }}
        >
          <div className="flex flex-col items-center justify-center z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 font-montserrat">
              {summarySNSContent.footerBanner.title}
            </h1>
            {summarySNSContent.footerBanner.subtitleLines.map((line) => (
              <h3
                key={line}
                className="text-2xl font-normal text-white mb-4 font-poppins"
              >
                {line}
              </h3>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return <SummarySNS />;
}
