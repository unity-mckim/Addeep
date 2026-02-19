"use client";

import { useState, useEffect } from "react";
import { images } from "../../../../../constants/images";

export default function GPRPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [language, setLanguage] = useState("en");

  const content = {
    en: {
      hero: {
        name: "AI의 미래:  예측 • 생성 • 확장",
        description: [
          "증강 AI Addeep GPR은 대화에 의존하지 않는 완전 자동화 생성형 AI로,",
          "사용자의 의도를 먼저 예측해 가장 적합한 경험을 스스로 만들어냅니다.",
          "단순한 반응을 넘어, 다음 행동을 예측하고 그 가능성을 확장(Augment)하는 지능.",
          "애딥의 AI는 응답하는 기술이 아니라, 앞서 움직이는 경험을 설계합니다.",
        ],
      },
      summary: {
        title: "Addeep GPR : 증강 AI의 시작",
        description: [
          "Addeep GPR(Generative Pre-trained Recommender)는",
          "기존의 추천 시스템을 넘어서는 증강 AI(Augmented Intelligence)입니다.",
          "사용자의 행동과 맥락을 바탕으로 마인드셋을 깊이 있게 분석하고,",
          "그 이해 위에서 새로운 콘텐츠·광고·커머스 경험을 생성합니다.",
          "GPR은 단순히 제안하는 기술이 아니라, 사용자의 의도를 예측하고 다음 경험을 확장하는 지능입니다.",
          "GPR은 Web 3.0 기반 S2E(SNS to Earn) 소셜 미디어 생태계를 구동하는",
          "애딥의 핵심 엔진으로 작동합니다.",
        ],
      },
      technologies: {
        title: "핵심 기술 소개",
        cards: [
          {
            title: "LMM: Large Mind-mining Model",
            description: [
              "LLM이 언어를 이해하는 모델이라면, LMM은 사용자의 의도를 이해하는 모델입니다.",
              "언어 중심의 해석을 넘어, 행동과 맥락, 반응의 흐름 속에서 의도의 구조를 읽어내는 것이 LMM의 역할입니다.",
            ],
          },
          {
            title: "ACT & Deep Blend",
            description: [
              "ACT(Addeep Automatic Content Convergence Technology)는 LMM의 추론 결과를 바탕으로 콘텐츠를 자동으로 결합하고 재구성하는 기술입니다.",
              "Diffusion 모델 기반의 Deep Blend 과정으로 다양한 형식의 콘텐츠를 자연스럽게 융합해, 사용자가 의도한 결과를 빠르게 완성합니다.",
              "LMM의 이해는 ACT를 통해 곧바로 경험으로 이어집니다.",
            ],
          },
          {
            title: "Generation-Confirmation & RL",
            description: [
              "애딥의 AI는 ‘생성–확인(Generation-Confirmation)’ 모델과 강화학습(Reinforcement Learning)을 통해 사용자와 함께 지속적으로 진화합니다.",
              "사용자의 선택과 반응을 통해 그 결과를 검증하며, 이 과정은 다시 학습으로 이어집니다.",
              "AI는 일회성 결과에 머물지 않고, 경험이 쌓일수록 더 정교하게 성장합니다.",
            ],
          },
        ],
      },
      services: {
        title: "핵심 서비스와 AIaaS 확장성",
        description: [
          "Addeep GPR은 SNS 플랫폼 안에서 네 가지 핵심 서비스를 자동화하며, 콘텐츠, 광고, 거래, 소셜 경험 전반을 하나의 지능으로 연결합니다.",
          "이 기술은 플랫폼에 한정되지 않고, AIaaS(Service-based AI) 모델을 통해 산업의 경계를 넘어 다양한 분야로 확장됩니다.",
          "GPR은 특정 서비스가 아니라, 어디서든 작동하는 구조로 진화합니다.",
        ],
        cards: [
          {
            title: "의도에 맞춰 탄생하는 콘텐츠",
            description: [
              "이미지, 밈, 이모티콘 등 다양한 형식의 콘텐츠를 사용자의 의도에 맞춰 자동으로 생성하고 제안합니다.",
              "콘텐츠는 경험의 흐름 속에서 자연스럽게 완성됩니다.",
            ],
          },
          {
            title: "콘텐츠와 브랜드를 연결하는 광고 생성",
            description: [
              "콘텐츠의 의미와 흐름을 이해해 광고를 가장 어울리는 지점에 연결합니다.",
              "방해가 아닌 경험으로 작동하는 네이티브 광고가 자동으로 구성됩니다.",
            ],
          },
          {
            title: "경험 안에서 완성되는 거래",
            description: [
              "콘텐츠와 관심의 흐름을 바탕으로 상품과 거래가 하나의 경험으로 이어집니다.",
              "발견과 선택은 나뉘지 않고, 콘텐츠를 경험하는 과정 속에서 자연스럽게 완성됩니다.",
              "그 결과, 구매는 전환이 아닌 경험의 일부가 됩니다.",
            ],
          },
          {
            title: "소셜이 흐름이 되는 방식",
            description: [
              "애딥의 소셜은 개별 콘텐츠가 흩어지는 공간이 아니라, 공통의 관심과 맥락 위에 흐름이 쌓이는 곳입니다.",
              "콘텐츠는 그룹 안에서 이어지고, 반응은 다음 이야기로 확장되며, 경험은 자연스럽게 축적됩니다.",
              "그룹은 스스로 흐름을 만들고 소셜 경험은 지속됩니다.",
            ],
          },
        ],
        aiAas: {
          title: "AIaaS (Artificial Intelligence-as-a-Service)",
          description: [
            "애딥의 강력한 GPR 엔진은 API와 솔루션 형태로 제공되어, 다양한 환경과 목적에 맞게 유연하게 적용될 수 있습니다.",
            "금융, 헬스케어, 교육을 비롯해 산업의 경계를 가리지 않고, 각 도메인에 최적화된 방식으로 커스터마이징이 가능합니다.",
            "애딥의 AI는 특정 서비스에 머무르지 않고, 필요한 곳 어디에서나 작동하는 무한한 확장성을 지닌 지능으로 진화합니다.",
          ],
        },
      },
      projects: {
        title: "기대 효과와 미래 가치",
        cards: [
          {
            title: "사람과 가치를 연결하는 사용자 경험",
            description: [
              "기술을 앞세우기보다, 사람과 사람, 그리고 사람과 가치를 연결하는 경험을 설계합니다.",
              "콘텐츠·커머스·리워드가 하나로 통합된 증강 AI GPR 기반 S2E 구조를 통해 사용자의 가장 평범한 일상은 참여와 보상으로 이어지는 새로운 가치가 됩니다.",
              "탐색과 선택의 부담은 줄어들고, 경험은 더욱 직관적이고 개인에게 맞춰집니다.",
            ],
          },
          {
            title: "비즈니스 구조의 혁신과 효율 극대화",
            description: [
              "콘텐츠 생성부터 광고 결합, 커머스, 보상까지 분절된 디지털 흐름을 하나의 자동화된 구조로 통합합니다.",
              "ACT와 Deep Blend 기반의 자동 생성·융합 기술은 기업의 운영 비용을 획기적으로 낮추고, 광고 효율과 구매 전환율을 동시에 끌어올립니다.",
              "기업은 기술을 운영하는 대신, 가치와 전략에 집중할 수 있습니다.",
            ],
          },
        ],
        footer: {
          title: "Web 3.0을 넘어, 다음 경제 생태계를 선도",
          description: [
            "애딥은 Web 3.0 기반의 참여형 소셜미디어 경제를 완성하고, 그 위에서 사람과 AI가 함께 성장하는 다음 단계의 디지털 환경을 준비합니다.",
            "증강 AI GPR을 중심으로 한 플랫폼 확장성과 AIaaS 전략을 통해, 콘텐츠·커머스·산업 AX·로봇까지 연결되는 경계 없는 미래 생태계를 만들어갑니다.",
            "애딥은 기술이 무엇을 할 수 있는지를 묻지 않고, 이 기술로 어떤 미래를 만들 것인지를 선택합니다.",
          ],
        },
      },
    },
  };

  const currentContent = content[language as keyof typeof content];

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "summary",
        "technologies",
        "gpr1",
        "projects",
        "journey",
        "accolades",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-['Inter','Noto_Sans_KR',sans-serif]">
      {/* Hero Section */}
      <section id="hero" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-montserrat mb-2">
              {currentContent.hero.name.split(":")[0] + ":"}
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold font-montserrat bg-gradient-to-r from-[#FF0169] via-[#D300C5] to-[#7638FA] text-transparent bg-clip-text mb-4 leading-[1.1] pb-1">
              {currentContent.hero.name.split(":")[1]}
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-poppins font-normal leading-relaxed mt-12 whitespace-pre-line">
              {currentContent.hero.description.join("\n")}
            </p>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section id="summary" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-montserrat text-gray-900 mb-8">
              {currentContent.summary.title}
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl font-poppins font-normal mx-auto leading-relaxed whitespace-pre-line">
              {currentContent.summary.description.join("\n")}
            </p>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section
        id="technologies"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-montserrat text-gray-900 text-center mb-12">
            {currentContent.technologies.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {currentContent.technologies.cards.map((card) => (
              <div key={card.title} className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold font-poppins text-cyan-600 mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-700 font-poppins font-normal whitespace-pre-line">
                  {card.description.join("\n")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GPR-1 Model Section */}
      <section id="gpr1" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          <h2 className="text-3xl font-bold font-montserrat text-gray-900 text-center mb-8">
            {currentContent.services.title}
          </h2>
          <h2 className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-poppins font-normal whitespace-pre-line">
            {currentContent.services.description.join("\n")}
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mt-8">
            {currentContent.services.cards.map((card) => (
              <div key={card.title} className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold font-poppins text-purple-600 mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-700 font-poppins font-normal whitespace-pre-line">
                  {card.description.join("\n")}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg w-full">
            <h3 className="text-xl font-semibold font-poppins text-purple-600 mb-4">
              {currentContent.services.aiAas.title}
            </h3>
            <p className="text-gray-700 font-poppins font-normal whitespace-pre-line">
              {currentContent.services.aiAas.description.join("\n")}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          <h2 className="text-3xl font-bold font-montserrat text-gray-900 text-center mb-12">
            {currentContent.projects.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {currentContent.projects.cards.map((card) => (
              <div key={card.title} className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold font-poppins text-cyan-600 mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-700 font-poppins font-normal whitespace-pre-line">
                  {card.description.join("\n")}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg w-full text-center">
            <h3 className="text-xl font-semibold font-poppins text-cyan-600 mb-4">
              {currentContent.projects.footer.title}
            </h3>
            <p className="text-gray-700 font-poppins font-normal whitespace-pre-line">
              {currentContent.projects.footer.description.join("\n")}
            </p>
          </div>
        </div>
      </section>

      <section id="journey" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* <h2 className="text-3xl font-bold font-montserrat text-gray-900 text-center mb-12">
            GPR vs LLM: Paradigm Shift
          </h2>

          <img
            src={images.addeepIs.gpr.table}
            alt="GPR vs LLM"
            className="w-full h-auto"
          /> */}

          {/* TODO: Table to be implemented */}
          <div className="overflow-x-auto card rounded-lg shadow hidden">
            {/* grid header */}
            <div className="flex flex-row items-center bg-gray-200 text-gray-700 text-lg font-semibold border-b p-6">
              <div className="text-left flex flex-col gap-24 w-1/5">
                <div className="font-bold">
                  <span className="lang-en">Core Philosophy</span>
                </div>
                <div className="font-bold">
                  <span className="lang-en">Inference Model</span>
                </div>
                <div className="font-bold">
                  <span className="lang-en">Interaction Method</span>
                </div>
                <div className="font-bold">
                  <span className="lang-en">Business Application</span>
                </div>
              </div>

              <div className="flex flex-col gap-16 w-2/5">
                Addeep GPR-1
                <div>
                  <strong className="lang-en">Augmented Intelligence: </strong>
                  <span className="lang-en">
                    AI predicts and enhances human intent
                  </span>
                </div>
                <div className="font-semibold text-gray-800">
                  LMM (Large Mind-mining Model)
                </div>
                <div>
                  <strong className="lang-en">
                    Non-conversational (Proactive):{" "}
                  </strong>
                  <span className="lang-en">
                    Proactively generates without explicit input
                  </span>
                </div>
                <div>
                  <strong className="lang-en">
                    Direct S2E Ecosystem Drive:{" "}
                  </strong>
                  <span className="lang-en">
                    Revenue model directly linked with ads and commerce
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-16 w-2/5">
                <span className="lang-en">
                  Conversational LLM (e.g., ChatGPT)
                </span>
                <div>
                  <strong className="lang-en">Artificial Intelligence: </strong>
                  <span className="lang-en">
                    AI understands and executes human commands
                  </span>
                </div>
                <div>LLM (Large Language Model)</div>
                <div>
                  <strong className="lang-en">
                    Conversational (Reactive):{" "}
                  </strong>
                  <span className="lang-en">
                    Reacts based on user prompts (input)
                  </span>
                </div>
                <div>
                  <strong className="lang-en">General-Purpose API: </strong>
                  <span className="lang-en">
                    Foundational tech applicable to various services
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .nav-link {
          transition:
            color 0.3s,
            border-bottom-color 0.3s;
          border-bottom: 2px solid transparent;
        }
        .nav-link:hover,
        .nav-link.active {
          color: #8b5cf6;
          border-bottom-color: #8b5cf6;
        }
      `}</style>
    </div>
  );
}
