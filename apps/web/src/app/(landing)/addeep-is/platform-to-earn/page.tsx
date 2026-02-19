"use client";

import { images } from "../../../../constants/images";
import { useResponsive } from "../../../../lib/useResponsive";

const heroContent = {
  title: "가치를 만들어 수익으로 연결하는 플랫폼",
  lines: [
    "애딥은 참여가 경험으로 끝나지 않고,",
    "가치로 이어지는 플랫폼입니다. ",
    "사용자는 일상 속 활동을 통해 보상을 체감하고,",
    "그 흐름 위에서 서비스는 더 빠르게 확장됩니다.",
  ],
  backgroundImage: images.addeepIs.platformToEarn.hero,
};

const advertiserSection = {
  label: "광고주를 위한",
  title: "초개인화 타겟팅으로, 성과를 높이는 경험",
  lines: [
    "사용자별 맥락과 관심을 기반으로",
    "광고 타겟팅의 정확도를 높이고,",
    "실질적인 구매로 이어지는 성과를 만듭니다.",
  ],
  cards: [
    {
      title: "데이터 기반 인사이트",
      description:
        "방대한 데이터 패턴을 분석해 사용자 흐름에 맞춘 AI 광고 전략을 제공합니다. 이를 통해 재방문을 유도하고, 실질적인 매출 성장으로 이어지도록 설계합니다.",
    },
    {
      title: "전략적 성장 지원",
      description:
        "상품의 기획부터 출시, 판매에 이르는 전 과정을 정밀하게 분석해 광고주가 각 단계에 맞는 전략을 수립할 수 있도록 돕습니다. 신규 제품과 서비스의 시장 안착을 보다 효과적으로 지원합니다.",
    },
    {
      title: "운영 효율의 통합",
      description:
        "Addeep Ads를 중심으로 광고 성과와 고객 관리가 하나의 흐름으로 연결됩니다. 광고 효율은 높이고, 고객 관리는 더 정교해집니다.",
    },
  ],
};

const userSection = {
  label: "사용자를 위한",
  title: "변화, 참여에서 수익으로",
  lines: [
    "많은 소셜 플랫폼에서 사용자의 활동은",
    "소비로 끝나고, 보상으로 이어지지 않았습니다.",
    "우리는 이 오래된 구조를 바꿉니다."
  ],
  cards: [
    {
      title: "지속 가능한 수익 구조",
      description:
        "의미 있는 정보와 초개인화된 타겟 광고를 기반으로, 일회성이 아닌 지속적으로 이어지는 수익 흐름을 만듭니다.",
    },
    {
      title: "함께 연결되는 협력 생태계",
      description:
        "우리는 사용자, 크리에이터, 광고주가 각자의 역할로 연결되는 협력형 플랫폼 환경을 설계합니다. 모든 참여자는 다양한 수익의 경로 안에서 함께 성장할 수 있습니다.",
    },
  ],
  bannerImage: images.addeepIs.platformToEarn.userBanner,
};

const creatorSection = {
  label: "크리에이터를 위한",
  title: "새로운 수익 방식",
  lines: [
    "크리에이터와 인플루언서의 창작 활동을 중심으로, 숏폼 영상, 밈, 이미지 등",
    "다양한 형태의 콘텐츠가 자연스럽게 광고와 서비스로 확장되는 구조를 만듭니다.",
    "창의적인 표현은 경험이 되고, 그 경험은 실질적인 가치로 이어집니다.",
  ],
  cards: [
    {
      title: "지속 가능한 보상 구조",
      description:
        "일회성 캠페인이 아닌, 지속적인 콘텐츠 활동을 통해 안정적인 수익 흐름이 만들어지도록 설계합니다. 플랫폼은 창작이 계속될수록 더 많은 기회를 제공하며, 크리에이터와 함께 성장하는 생태계를 지향합니다.", 
      image: images.addeepIs.platformToEarn.platformToEarn3,
      imageAlt: "Platform to Earn Sustain",
    },
    {
      title: "창작 자산을 지키는 IP 보호 기술",
      description:
        "ACI 콘텐츠 보호 기술을 통해 콘텐츠의 소유와 권리를 명확하게 관리합니다. AI 기반 식별 기술과 블록체인 보안 구조로 창작물의 출처와 권리를 안전하게 기록하고 보호합니다. 크리에이터는 창작에 집중하고, 권리는 플랫폼이 함께 지켜줍니다.",
      image: images.addeepIs.platformToEarn.platformToEarn4,
      imageAlt: "Platform to Earn IP",
    },
  ],
};

const contentSection = {
  title: "우리를 이어주는 콘텐츠",
  lines: [
    "짧은 영상과 작은 이미지 하나가",
    "세대와 세대를, 사람과 사람을 이어줍니다.",
  ],
  items: [
    {
      image: images.addeepIs.platformToEarn.short,
      title: "Short Videos",
      description: "짧은 순간, 강한 몰입",
    },
    {
      image: images.addeepIs.platformToEarn.meme,
      title: "Memes & Art",
      description: "표현이 참여가 되는 콘텐츠",
    },
    {
      image: images.addeepIs.platformToEarn.digital,
      title: "Digital Communication",
      description: "현대적인 연결 방식",
    },
  ],
};

const freedomSection = {
  title: "자유로운 여정에 함께하세요",
  lines: [
    "자유롭게 연결되고,",
    "가치로 이어지는 경험.",
    "애딥은 그 사이를 잇습니다.",
  ],
  backgroundImage: images.addeepIs.platformToEarn.platformToEarn8
};

const PlatformToEarn = () => {
  const { isMobile, isTablet } = useResponsive();
  const renderLines = (lines: string[], className: string) =>
    lines.map((line, index) => (
      <h3 key={`${line}-${index}`} className={className}>
        {line}
      </h3>
    ));

  if (isMobile || isTablet) {
    return (
      <div className="flex flex-col flex-1">
        <div className="w-full text-center">
          <div className="absolute h-[600px] inset-0 bg-black bg-opacity-60 mt-20 mx-1 rounded-lg" />
          <div
            className="w-full h-[600px] rounded-lg flex flex-col items-center justify-center gap-2"
            style={{
              background: `url(${heroContent.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              border: "1px solid #E5E7EB",
            }}
          >
            <div className="flex flex-col items-center justify-center z-10">
              <div className="flex flex-col gap-2 p-2">
                <h1 className="text-2xl font-bold font-montserrat text-white mb-4">
                  {heroContent.title}
                </h1>
                {renderLines(
                  heroContent.lines,
                  "text-md font-normal font-poppins text-white"
                )}
              </div>
            </div>
          </div>
        </div>
        <section className="flex flex-col flex-1 p-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="font-bold text-2xl font-montserrat">
              <span className="text-[#B641E9]">{advertiserSection.label}</span>{" "}
              {advertiserSection.title}
            </h2>
            {advertiserSection.lines.map((line, index) => (
              <h4
                key={`${line}-${index}`}
                className="text-xl text-[#4B5563] font-normal font-poppins"
              >
                {line}
              </h4>
            ))}
          </div>
          <div className="mt-8 mb-8 grid grid-cols-1 gap-4">
            {advertiserSection.cards.map((card) => (
              <div
                key={card.title}
                className="max-w-[500px] border border-gray-200 shadow-md rounded-lg p-8 flex flex-col gap-4"
              >
                <h4 className="text-2xl text-[#4B5563] font-normal font-poppins">
                  {card.title}
                </h4>
                <p className="text-xl text-[#4B5563] font-normal font-poppins">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="font-bold text-2xl font-montserrat">
              <span className="text-[#B641E9]">{userSection.label}</span>{" "}
              {userSection.title}
            </h2>
            {userSection.lines.map((line, index) => (
              <h4
                key={`${line}-${index}`}
                className="text-xl text-[#4B5563] font-normal font-poppins"
              >
                {line}
              </h4>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 mt-8 mb-8">
            {userSection.cards.map((card) => (
              <div
                key={card.title}
                className="max-w-[500px] flex flex-col gap-3 mt-4"
              >
                <h4 className="text-xl text-[#B641E9] font-bold font-poppins">
                  {card.title}
                </h4>
                <p className="text-lg text-[#4B5563] font-normal font-poppins">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
          <img
            src={userSection.bannerImage}
            className="h-32"
            alt="Platform to Earn"
          />

          <div className="flex flex-col items-center justify-center mt-12 gap-4">
            <h2 className="font-bold text-2xl font-montserrat">
              <span className="text-[#B641E9]">{creatorSection.label}</span>{" "}
              {creatorSection.title}
            </h2>
            {creatorSection.lines.map((line, index) => (
              <h4
                key={`${line}-${index}`}
                className="text-xl font-poppins text-[#4B5563] font-normal"
              >
                {line}
              </h4>
            ))}
          </div>
          <div className="flex flex-col gap-4 mt-8 mb-8">
            {creatorSection.cards.map((card) => (
              <div
                key={card.title}
                className="max-w-[500px] flex flex-col gap-4 mt-4"
              >
                <h4 className="text-xl text-[#B641E9] font-bold font-poppins">
                  {card.title}
                </h4>
                <p className="text-lg text-[#4B5563] font-normal">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center mt-8 gap-4">
            <h2 className="font-bold font-montserrat text-3xl">
              {contentSection.title}
            </h2>
            {contentSection.lines.map((line, index) => (
              <h4
                key={`${line}-${index}`}
                className="text-xl text-[#4B5563] font-normal font-poppins"
              >
                {line}
              </h4>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-8 mt-12">
            {contentSection.items.map((item) => (
              <div key={item.title} className="text-center">
                <img src={item.image} alt="Platform to Earn" />
                <h4 className="text-2xl text-[#4B5563] font-poppins font-semibold mt-8">
                  {item.title}
                </h4>
                <p className="text-lg text-[#4B5563] font-poppins font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center mt-24 gap-4">
            <div
              className="w-full h-[600px] rounded-lg flex flex-col items-center justify-center"
              style={{
                background: `url(${freedomSection.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                border: "1px solid #E5E7EB",
                opacity: 0.7,
              }}
            >
              <div className="flex flex-col gap-4 items-center justify-center z-10 p-4">
                <h2 className="font-bold text-3xl font-montserrat text-black">
                  {freedomSection.title}
                </h2>
                {freedomSection.lines.map((line, index) => (
                  <h4
                    key={`${line}-${index}`}
                    className="text-xl text-black font-normal font-poppins"
                  >
                    {line}
                  </h4>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mb-20 flex flex-col flex-1">
      <div className="w-full text-center">
        <div className="absolute h-[600px] inset-0 bg-black bg-opacity-60 mt-32 mx-1 rounded-lg" />
        <div
          className="w-full h-[600px] rounded-lg flex flex-col items-center justify-center"
          style={{
            background: `url(${heroContent.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            border: "1px solid #E5E7EB",
          }}
        >
          <div className="flex flex-col gap-4 items-center justify-center z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-white mb-4">
              {heroContent.title}
            </h1>
            <div>
              {renderLines(
                heroContent.lines,
                "text-xl font-poppins font-normal text-white"
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="flex flex-col flex-1 p-28">
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-bold font-montserrat text-5xl mb-8">
            <span className="text-[#B641E9]">{advertiserSection.label}</span>{" "}
            {advertiserSection.title}
          </h2>
          {advertiserSection.lines.map((line, index) => (
            <h4
              key={`${line}-${index}`}
              className="text-xl text-[#4B5563] font-poppins font-normal"
            >
              {line}
            </h4>
          ))}
        </div>

        <div className="mt-12 mb-8 grid grid-cols-3 gap-4">
          {advertiserSection.cards.map((card) => (
            <div
              key={card.title}
              className="max-w-[500px] border border-gray-200 shadow-md rounded-lg p-8"
            >
              <h4 className="text-[28px] text-[#4B5563] font-poppins font-normal">
                {card.title}
              </h4>
              <p className="text-xl text-[#4B5563] font-poppins font-normal">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center mt-12">
          <h2 className="font-bold font-montserrat text-5xl mb-8">
            <span className="text-[#B641E9]">{userSection.label}</span>{" "}
            {userSection.title}
          </h2>
          {userSection.lines.map((line, index) => (
            <h4
              key={`${line}-${index}`}
              className="text-xl text-[#4B5563] font-poppins font-normal"
            >
              {line}
            </h4>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {userSection.cards.map((card) => (
            <div key={card.title} className="max-w-[500px] p-8">
              <h4 className="text-[28px] text-[#4B5563] font-poppins font-normal">
                {card.title}
              </h4>
              <p className="text-xl text-[#4B5563] font-poppins font-normal">
                {card.description}
              </p>
            </div>
          ))}
        </div>
        <img
          src={userSection.bannerImage}
          alt="Platform to Earn"
        />

        <div className="flex flex-col items-center justify-center mt-28">
          <h2 className="font-bold font-montserrat text-5xl mb-8">
            <span className="text-[#B641E9]">{creatorSection.label}</span>{" "}
            {creatorSection.title}
          </h2>
          {creatorSection.lines.map((line, index) => (
            <h4
              key={`${line}-${index}`}
              className="text-xl text-[#4B5563] font-poppins font-normal"
            >
              {line}
            </h4>
          ))}
        </div>

        <div className="grid gap-4 items-center mt-8 mb-8 justify-center">
          {creatorSection.cards.map((card, index) => {
            const content = (
              <div className="max-w-[500px] p-8">
                <h4 className="text-[28px] text-[#B641E9] font-bold font-poppins">
                  {card.title}
                </h4>
                <p className="text-xl text-[#4B5563] font-poppins font-normal">
                  {card.description}
                </p>
              </div>
            );
            const image = (
              <img src={card.image} alt={card.imageAlt} width={450} />
            );
            return (
              <div key={card.title} className="flex flex-row justify-between">
                {index % 2 === 0 ? content : image}
                {index % 2 === 0 ? image : content}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center justify-center mt-12">
          <h2 className="font-bold text-5xl font-montserrat mb-8">
            {contentSection.title}
          </h2>
          {contentSection.lines.map((line, index) => (
            <h4
              key={`${line}-${index}`}
              className="text-xl text-[#4B5563] font-poppins font-normal"
            >
              {line}
            </h4>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8 mt-12">
          {contentSection.items.map((item) => (
            <div key={item.title} className="text-center">
              <img src={item.image} alt="Platform to Earn" />
              <h4 className="text-3xl text-[#4B5563] font-poppins font-normal mt-8 mb-4">
                {item.title}
              </h4>
              <p className="text-lg text-[#4B5563] font-normal font-poppins">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <div className="w-full text-center">
        <div
          className="w-full h-[600px] rounded-lg flex flex-col items-center justify-center"
          style={{
            background: `url(${freedomSection.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            border: "1px solid #E5E7EB",
            opacity: 0.7,
          }}
        >
          <div className="flex flex-col items-center justify-center gap-4 z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat text-black mb-4">
              {freedomSection.title}
            </h1>
            {freedomSection.lines.map((line, index) => (
              <h3
                key={`${line}-${index}`}
                className="text-2xl font-bold font-poppins text-black"
              >
                {line}
              </h3>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformToEarn;
