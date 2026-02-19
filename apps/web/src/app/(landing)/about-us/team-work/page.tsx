"use client";

import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "../../../../constants/images";

gsap.registerPlugin(ScrollTrigger);

const headerLines = [
  "애딥은 질문을 멈추지 않는 사고와",
  "가능성을 현실로 만드는 역량으로",
  "플랫폼의 미래를 이끕니다",
];

const heroLines = [
  "디지털 플랫폼 분야의 최정상급 전문가들과",
  "고도화된 기술력을 바탕으로, 우리는 글로벌 플랫폼 생태계가 마주할",
  "혁신적인 변화의 중심에서 새로운 기준을 세워가고 있습니다.",
];

type TeamSectionVisibility = "always" | "desktop" | "hidden";

type TeamSection = {
  title: string;
  items: string[];
  listClassName: string;
  visibility?: TeamSectionVisibility;
};

type RoleLine = {
  text: string;
  highlight?: boolean;
};

type TeamMember = {
  name: string;
  image: string;
  alt: string;
  backgroundClass: string;
  roleLines: RoleLine[];
  sections: TeamSection[];
};

const teamMembers: TeamMember[] = [
  {
    name: "윤재영",
    image: images.teamWork.jaeyoung,
    alt: "Kevin Jaeyoung Yoon",
    backgroundClass: "bg-white",
    roleLines: [
      { text: "(주)애딥 설립자 및 CVO(Chief Visionary Officer)", highlight: true },
      { text: "US Addeep Inc. Chief Executive Officer CEO" },
    ],
    sections: [
      {
        title: "학력 및 리더십 이력",
        items: [
          "• 헤이필드 대학교 경영대학원 MBA",
          "• 서울대학교 경영대학원 CFO 전략과정 수료",
          "• 현) 한국 AGI 기업협회 이사",
          "• 애딥 그룹(Addeep Group) 설립자",
        ],
        listClassName:
          "text-sm lg:text-md text-gray-700 space-y-4 lg:space-y-1 p-3 font-poppins",
      },
      {
        title: "주요 경력",
        items: [
          "• 애딥 그룹 창업자 및 CVO (Chief Visionary Officer)",
          "• 애딥 증강 AI LMM(Large Mind-mining Model) 'GPR-1' 고안 및 설계",
          "• 애딥 S2E(Social-to-Earn) SNS 플랫폼 시리즈 제품 및 비즈니스 총괄",
          "• 차세대 콘텐츠 원천 기술 개발: 'ACT'(콘텐츠 자동 융합 생성) 및 'ACI'(콘텐츠 보안 및 실시간 클라우드 저작권 보호) 기술 창안",
          "• ICT 융복합 솔루션 상용화: OTT 스마트 플랫폼, AI 소셜 로봇, 통합 보안 UTM 솔루션 개발 및 전략 컨설팅",
          "• 글로벌 비즈니스 전략 총괄: 한국, 미국, 중국, 싱가포르 및 동남아시아 ICT 경영 전략 총괄",
        ],
        listClassName:
          "text-sm lg:text-md text-gray-700 space-y-3 p-3 font-poppins",
      },
      {
        title: "핵심 성과",
        items: [
          "• OTT 스마트 콘텐츠 플랫폼 및 스마트 디바이스, AI 소셜 로봇 시리즈 사업화",
          "• 디지털 콘텐츠 플랫폼 글로벌 비즈니스 최고 경영관리 총괄",
          "• 네트워크 정보 보안 제품 및 통합 보안 UTM 솔루션 개발 및 컨설팅 서비스",
        ],
        listClassName:
          "text-sm lg:text-md text-gray-700 space-y-4 lg:space-y-1 p-3 font-poppins",
      },
    ],
  },
  {
    name: "강경수",
    image: images.teamWork.kyoungsu,
    alt: "Chris Kang",
    backgroundClass: "bg-[#E5E7EB] lg:bg-gray-50",
    roleLines: [{ text: "(주)애딥 최고경영책임자 (Chief Executive Officer, CEO)", highlight: true }],
    sections: [
      {
        title: "학력 및 리더십 이력",
        items: [
          "• 우송대학교 컴퓨터공학 학사",
          "• 타이탄플랫폼 부사장 및 최고운영책임자(COO) 역임",
          "• 타이탄스튜디오 대표이사(CEO) 역임",
          "• 네트워크 통합, 정보보안 개발 및 보안 컨설팅 전문가",
        ],
        listClassName:
          "text-md text-gray-700 font-poppins space-y-4 lg:space-y-1 p-3",
      },
    ],
  },
  {
    name: "조진완",
    image: images.teamWork.jinwan,
    alt: "JinWan Jo",
    backgroundClass: "bg-[#E5E7EB] lg:bg-gray-50",
    roleLines: [{ text: "(주)애딥 최고미래전략책임자 (Chief Future & Execution Officer, CFEO)", highlight: true }],
    sections: [
      {
        title: "학력 및 리더십 이력",
        items: [
          "• 서울대학교 경제학 학사",
          "• 일리노이 대학교 재무학 석사",
          "• 일리노이 대학교 응용수학 석사",
          "• 카네기멜론 대학교 경영학 박사 (재무경제학 전공)",
          "• (사)한국금융산업연구원 원장",
          "• 전문건설공제조합 자산운용위원회 위원장",
          "• 고려대학교 경영전문대학원 MBA 주임교수 역임",
          "• 조지아 공과대학교(Georgia Tech) 교수 역임",
          "• 카네기멜론 대학교 방문교수 역임",
          "• 하나UBS자산운용 사외이사 역임",
        ],
        listClassName:
          "text-md text-gray-700 font-poppins space-y-4 lg:space-y-1 p-3",
      },
    ],
  },
  {
    name: "김선태",
    image: images.teamWork.seontae,
    alt: "SeonTae",
    backgroundClass: "bg-white",
    roleLines: [
      { text: "(주)애딥 최고재무책임자 (Chief Financial Officer, CFO)", highlight: true },
    ],
    sections: [
      {
        title: "학력 및 리더십 이력",
        items: [
          "• 서울대학교 경영학 학사",
          "• 서울대학교 Bio-CEO 전략과정 수료",
          "• 강스템바이오텍, 케이론제비티, ST에셋 대표이사(CEO) 역임",
          "• 파마웍스, 코디엠(KODIAM) 최고전략책임자(CSO) 역임",
          "• 메타센테라퓨틱스, 캐린네트웍스 최고재무책임자(CFO) 역임",
        ],
        listClassName:
          "text-md text-gray-700 font-poppins space-y-4 lg:space-y-2 p-3",
      },
    ],
  },
];

const TeamWorkHeader = () => (
  <div className="w-full text-center mt-6 lg:mt-10 mb-10 lg:mb-20">
    <div className="w-full rounded-lg flex flex-col items-center justify-center">
      {headerLines.map((line, index) => (
        <h1
          key={index}
          className="text-xl lg:text-5xl font-bold font-montserrat mb-4"
        >
          {line}
        </h1>
      ))}
    </div>
  </div>
);

const TeamWorkHero = () => (
  <div className="mt-8 w-full p-4 text-center flex flex-col bg-[#F9FAFB]">
    <div className="flex-1 flex flex-col items-center justify-center mt-4 mb-4">
      {heroLines.map((line, index) => (
        <p
          key={index}
          className="text-lg md:text-xl lg:text-4xl font-normal text-gray-800 leading-relaxed mt-4 first:mt-0 font-poppins"
        >
          {line}
        </p>
      ))}
    </div>
  </div>
);

const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <div className={`w-full p-4 lg:p-8 ${member.backgroundClass}`}>
    <div className="max-w-full mx-auto lg:mt-10">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
        <div className="flex flex-col items-center text-center lg:text-left lg:w-1/3">
          <div className="w-48 h-48 lg:w-64 lg:h-64 mb-8 rounded-full overflow-hidden">
            <img
              src={member.image}
              alt={member.alt}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="lg:w-2/3 space-y-6 font-poppins">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl lg:text-4xl font-bold text-black mb-1 font-montserrat lg:font-sans">
              {member.name}
            </h2>
            <div className="text-md lg:text-xl text-black font-poppins space-y-1">
              {member.roleLines.map((line, index) => (
                <p
                  key={index}
                  className={line.highlight ? "text-[#4A1A5C] font-semibold" : ""}
                >
                  {line.text}
                </p>
              ))}
            </div>
          </div>
          {member.sections.map((section, index) => {
            const visibilityClass =
              section.visibility === "desktop"
                ? "hidden lg:block"
                : section.visibility === "hidden"
                ? "hidden"
                : "";
            return (
              <div key={index} className={visibilityClass}>
                <div className="flex flex-row gap-3">
                  <div className="w-1 h-7 bg-[#7B2CBF]" />
                  <h3 className="text-md lg:text-lg font-semibold text-black mb-2">
                    {section.title}
                  </h3>
                </div>
                <ul className={section.listClassName}>
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <TeamWorkHeader />
      <TeamWorkHero />
      <div className="flex flex-col items-center justify-center">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
}
