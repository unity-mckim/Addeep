"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useResponsive } from "../../../../../lib/useResponsive";
import { images } from "../../../../../constants/images";

export default function JaeyoungPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [tabState, setTabState] = useState("GPR");

  const { isMobile, isTablet } = useResponsive();

  const handleTabChange = (tab: string) => {
    switch (tab) {
      case "GPR":
        setTabState("GPR");
        break;
      case "ACI":
        setTabState("ACI");
        break;
      case "S2E":
        setTabState("S2E");
        break;
    }
  };

  const data =
    isMobile || isTablet
      ? [
          {
            name: "S/W Engineer",
            years: 15,
            color: "rgba(139, 92, 246, 1.0)",
          },
          {
            name: "TITAN Platform",
            years: 10,
            color: "rgba(139, 92, 246, 0.8)",
          },
          {
            name: "글로벌 경영",
            years: 7,
            color: "rgba(139, 92, 246, 0.6)",
          },
          {
            name: "Addeep",
            years: 5,
            color: "rgba(139, 92, 246, 0.4)",
          },
        ]
      : [
          {
            name: "S/W Engineer(보안/네트워크/UTM)",
            years: 15,
            color: "rgba(139, 92, 246, 1.0)",
          },
          {
            name: "TITAN Platform (Founder/CEO)",
            years: 10,
            color: "rgba(139, 92, 246, 0.8)",
          },
          {
            name: "글로벌 경영 (미국/중국/싱가포르)",
            years: 7,
            color: "rgba(139, 92, 246, 0.6)",
          },
          {
            name: "Addeep (Founder/CVO)",
            years: 5,
            color: "rgba(139, 92, 246, 0.4)",
          },
        ];

  const content = {
    hero: {
      title: "Architect of the Augmented Future",
      subtitle: "Architect of the Augmented Future",
      name: "Kevin Jaeyoung Yoon",
      education: [
        "Hayfield University MBA",
        "Seoul National University Graduate School of Business",
        "CFO Academy",
        "Current) Director, Korea AGI Association",
        "Former) TiTAN Platform Corp. Founder & CEO",
      ],
      slogan: '"We Bridge Values"',
      description:
        "Technology creator, global executive, and innovative visionary. With 25 years of experience, he builds a fairer, more intelligent, human-centric digital ecosystem. His expertise across ICT: Networks, Information Security, Cloud, Platform, AI, DeepTech, and Augmented AI opens up a new future for Web 3.0",
    },
    summary: {
      title: "Introduction",
      subTitle:
        "Jaeyoung Yoon, an AI Innovator Opening the Horizon of the Future Technology",
      description: [
        "Jaeyoung Yoon has established himself as an innovation leader spanning the AI, platform, cloud, and ICT industries by adding business insight to his solid technical foundation as a software engineer. His journey, which began with a major in electronic data processing in high school, was completed with a unique expertise that fuses technology and management through an MBA and the completion of the CFO program at Seoul National University's Graduate School of Business.",
        "His outstanding leadership, proven while serving as CEO of TiTAN Platform Corp., is now the driving force leading innovation towards the future as the Chairman/CVO of Addeep Inc. and a director of the Korea AGI Association. Over the past 25 years, he has internalized core competencies of the ICT industry, such as business planning, product development, and business strategy, laying a solid foundation for turning ideas into reality.",
        "He has demonstrated exceptional competence in transforming imaginary technologies into businesses by successfully commercializing an AI-based social media platform, OTT smart content, and an AI social robot series. In particular, he proved he is at the center of technological innovation by personally creating the 'TCI & ACI' technology, which presents a new paradigm for data sovereignty and digital copyright protection, and the 'ACT' automatic content convergence technology, which opened up the possibilities of generative augmented AI.",
        "His vision has led to successful global management achievements across borders in Korea, the US, China, Singapore, and Southeast Asia. He succeeded in attracting cumulative investments of 55 billion KRW from investors, gaining recognition for his technological management competitiveness, and the 2017 Prime Minister's Award and the US White House Donald Trump Presidential Award are honorable testaments to his innovative leadership.",
        "Currently, Jaeyoung Yoon is leading future technology with constant challenges and innovation. As a visionary business leader opening a new horizon in the augmented AI and deep tech industries, he is creating the value of coexistence for the next era, where 'technology should not exist to replace humans, but to augment and connect human value.'",
      ],
    },
    vision: {
      title: "Vision and Philosophy",
      description:
        "All his innovation stems from a single philosophy: 'Value Bridging.' Connecting disconnected values and providing fair compensation to everyone who contributes to the ecosystem is the core of the future he designs.",
    },
  };

  const currentContent = content;

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "summary",
        "vision",
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isMobile || isTablet) {
    return (
      <div className="min-h-screen bg-white text-gray-800">
        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-60 mx-1 rounded-lg" />
          <div>
            <div className="relative max-w-7xl mx-auto p-6">
              <div className="text-center">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
                  <img
                    src={images.teamWork.jaeyoung}
                    alt="Kevin Jaeyoung Yoon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-3xl font-bold text-white font-montserrat mb-3">
                  {currentContent.hero.name}
                </h1>
                <h2 className="text-xl font-semibold text-purple-600 font-poppins mb-4">
                  {currentContent.hero.title}
                </h2>
                <div className="text-md text-white font-poppins mb-6 flex flex-col gap-2">
                  {currentContent.hero.education.map((education) => (
                    <p key={education}>{education}</p>
                  ))}
                </div>
                <h2 className="text-xl font-semibold text-blue-600 font-poppins mb-6">
                  {currentContent.hero.slogan}
                </h2>
                <p className="text-lg text-white font-poppins max-w-3xl mx-auto leading-relaxed">
                  {currentContent.hero.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section id="summary" className="bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-purple-600 font-montserrat mb-8">
                {currentContent.summary.title}
              </h2>
              <h2 className="text-xl font-bold text-gray-900 font-montserrat mb-8 text-left">
                {currentContent.summary.subTitle}
              </h2>
              <div className="text-lg text-gray-700 font-poppins leading-relaxed flex flex-col gap-4">
                {currentContent.summary.description.map((description, idx) => (
                  <div key={idx}>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="bg-purple-50 p-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-purple-600 font-montserrat mb-8">
              {currentContent.vision.title}
            </h2>
            <p className="text-lg text-gray-700 font-poppins max-w-4xl mx-auto leading-relaxed">
              {currentContent.vision.description}
            </p>
            <div className="flex flex-col items-center gap-10 mt-10">
              <div className="rounded-lg">
                <h3 className="text-xl font-semibold font-montserrat mb-4">
                  Evolution of Technical Philosophy
                </h3>
                <p className="text-gray-700 font-poppins font-normal leading-relaxed">
                  His technical journey follows a single thread. Starting with
                  network technology, he laid the foundation of protecting
                  assets with information security technology, connected the
                  rights of creators transparently through TCI & ACI technology,
                  and evolved to the current Addeep augmented AI, which
                  intelligently connects and amplifies the value of all
                  participants.
                </p>
                <div className="flex flex-col gap-8 mt-8">
                  <button
                    disabled
                    className="text-purple-600 font-bold text-lg font-poppins bg-purple-200/50 rounded-lg p-2 min-w-20"
                  >
                    N/W
                  </button>
                  <button
                    disabled
                    className="text-purple-600 font-bold text-lg font-poppins bg-purple-200/50 rounded-lg p-2 min-w-24"
                  >
                    Info Security
                  </button>
                  <button
                    disabled
                    className="text-purple-600 font-bold text-lg font-poppins bg-purple-200/50 rounded-lg p-2 min-w-28"
                  >
                    TCI & ACI
                  </button>
                  <button
                    disabled
                    className="text-purple-600 font-bold text-lg font-poppins bg-purple-200/50 rounded-lg p-2 min-w-48"
                  >
                    Addeep Augmented AI GPR-1
                  </button>
                </div>
              </div>
              <div className="rounded-lg shadow-lg flex flex-col items-center justify-center bg-purple-100 p-6">
                <h2 className="text-3xl font-bold text-purple-600 font-montserrat">
                  Vision
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section id="technologies" className="bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-purple-600 font-montserrat mb-12">
              Core Technologies: The Pillars of the Future Economy
            </h2>

            <div className="flex flex-col gap-6 justify-center p-4 mb-8">
              <button
                className={clsx(
                  "font-semibold text-lg rounded-full p-4 min-w-48 font-poppins",
                  tabState === "GPR" && "bg-purple-600 text-white",
                  tabState !== "GPR" && "bg-gray-200/50"
                )}
                onClick={() => handleTabChange("GPR")}
              >
                Augmented AI: Addeeep GPR-1
              </button>
              <button
                className={clsx(
                  "font-semibold text-lg rounded-full p-4 min-w-48 font-poppins",
                  tabState === "ACI" && "bg-purple-600 text-white",
                  tabState !== "ACI" && "bg-gray-200/50"
                )}
                onClick={() => handleTabChange("ACI")}
              >
                Content Economy: ACI & ACT
              </button>
              <button
                className={clsx(
                  "font-semibold text-lg rounded-full p-4 min-w-48 font-poppins",
                  tabState === "S2E" && "bg-purple-600 text-white",
                  tabState !== "S2E" && "bg-gray-200/50"
                )}
                onClick={() => handleTabChange("S2E")}
              >
                Reward Ecosystem: S2E
              </button>
            </div>

            <div className="flex items-center justify-center max-w-4xl mx-auto">
              {tabState === "GPR" && (
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-purple-600 font-montserrat mb-4">
                    Addeep GPR-1: Non-conversational AI Paradigm
                  </h3>
                  <p className="text-gray-700 font-poppins font-normal leading-relaxed">
                    Unlike mainstream conversational AI, Addeep GPR-1
                    proactively understands the user's intent and 'first
                    proposes' the optimal result. By modeling the user's
                    'mindset' through an innovative LMM(Large Mind-mining Model)
                    inference model, it automatically generates necessary
                    content, advertisements, and SNS posts without explicit
                    commands. This innovation shifts the interaction between
                    humans and AI from 'commands and execution' to 'proposals
                    and selections'.
                  </p>
                </div>
              )}
              {tabState === "ACI" && (
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-purple-600 font-montserrat mb-4">
                    ACI & ACT: Dual Engines for Transparent Content Economy
                  </h3>
                  <p className="text-gray-700 font-poppins font-normal mb-4">
                    ACI (Addeep Content Identifier): A unique identifier similar
                    to the DNA of content. Based on blockchain-based patent
                    technology, it directly inserts an encrypted identification
                    code into the original content file so that even if it is
                    copied or modified, the ownership and流通 history of the
                    original can be permanently traced. This is equivalent to
                    issuing a 'digital notarization' with legal effect for all
                    digital content, serving as the foundation for transparent
                    copyright protection and revenue settlement.
                  </p>
                  <p className="text-gray-700 font-poppins font-normal">
                    ACT (Addeep Automatic Content Convergence): Converts
                    protected and identified content assets into GPR-1 AI to
                    create new value in real-time. Automatically combines
                    creator's creative work and advertiser's brand message in
                    the most appropriate form to create high-quality 'native
                    augmented content' without rejection. This is an innovative
                    approach that provides new revenue models for both creators
                    and advertisers.
                  </p>
                </div>
              )}
              {tabState === "S2E" && (
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-purple-600 font-montserrat mb-4">
                    Social 2 Earn: S2E Revolution
                  </h3>
                  <p className="text-gray-700 font-poppins font-normal">
                    A new economic protocol completed by combining GPR-1, ACI,
                    and ACT technologies. It reverses the data exploitation
                    structure of Web 2.0 and provides rewards to all
                    participants who create value. By returning 50% of
                    advertising revenue to the ecosystem, it realizes Users,
                    Creators, and Marketers to Earn.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* GPR-1 Model Section */}
        <section id="gpr1" className="p-6">
          <div className="max-w-7xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-purple-600 font-montserrat mb-8">
              GPR-1: Augmented AI Inference Model
            </h2>
            <p className="text-lg text-gray-700 font-poppins font-normal max-w-4xl mx-auto leading-relaxed">
              Addeep GPR-1 is a core engine of 'augmented intelligence' that not
              only understands the user's potential intent but also acts first.
              Its technical foundation lies in an innovative model called LMM.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-lg mt-4 mb-4">
              <h3 className="text-xl font-semibold text-purple-600 font-montserrat mb-4">
                Concept of LMM (Large Mind-mining Model)
              </h3>
              <p className="text-gray-700 font-poppins font-normal leading-relaxed">
                Unlike LLM(Large Language Model) that focuses on text data
                learning, LMM analyzes comprehensive personalized data to infer
                the user's 'mindset'. Mindset refers to the comprehensive set of
                thoughts, emotions, and intentions that an individual may have
                in a specific situation. LMM learns unstructured data such as
                communication metrics, activity patterns, demographic
                information, and content consumption history in depth to model
                this mindset probabilistically.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg mt-4 mb-4">
              <h3 className="text-xl font-semibold text-purple-600 font-montserrat mb-4">
                Difference from LLM: Understanding 'Intent' rather than
                'Command'
              </h3>
              <p className="text-gray-700 font-poppins font-normal leading-relaxed">
                Conversational AI based on LLM is optimized to accurately
                understand the user's 'command (Command)' and answer in text. In
                contrast, GPR-1 based on LMM focuses on understanding the user's
                latent 'intent (Intent)' that is not explicitly expressed. For
                example, when a user posts 'today's weather is good', LLM
                analyzes the meaning of this sentence, but LMM infers that the
                user is in a positive emotional state and has a high probability
                of reacting to content or advertisements related to outdoor
                activities and refreshing feelings. Based on this inference,
                GPR-1 automatically generates and proposes relevant content and
                advertisements without waiting for questions.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-purple-600 font-montserrat mb-12">
              Key Projects and Product Development
            </h2>
            <p className="text-lg text-gray-700 font-poppins font-normal max-w-4xl mx-auto leading-relaxed">
              His product development journey started with information security
              solutions, expanded to cloud-based platform services, and AI and
              deep tech fields. During this process, he proved his exceptional
              execution ability to turn ideas into reality.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-8 mb-6">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 font-montserrat mb-4">
                  OTT Platform Innovation 'TiTAN Play'
                </h3>
                <p className="text-gray-700 font-poppins font-normal leading-relaxed">
                  As a core technology, we developed an OTT service that
                  provides a new media consumption experience centered on
                  creators, launching 'TiTAN Play'.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 font-montserrat mb-4">
                  AI Social Robot 'TiTAN AI'
                </h3>
                <p className="text-gray-700 font-poppins font-normal leading-relaxed">
                  Developed and commercialized an AI-based social robot series
                  equipped with a camera, speaker, and display to communicate
                  with family members and provide information.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 font-montserrat mb-4">
                  TiTAN Core
                </h3>
                <p className="text-gray-700 font-poppins font-normal leading-relaxed">
                  Developed and commercialized various IoT smart home devices
                  linked to the platform to provide an integrated platform
                  ecosystem that extends from content consumption to everyday
                  living spaces.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Entrepreneurial Journey Section */}
        <section id="journey" className="p-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-purple-600 font-montserrat mb-12">
              Entrepreneurial Journey: From Engineer to Global Leader
            </h2>
            <div className="flex flex-col gap-8 mb-12">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 font-montserrat mb-4">
                  Foundation of Technology
                </h3>
                <p className="text-gray-700 font-poppins font-normal">
                  Started as a software engineer, grew into a network and
                  security technology expert, laying a solid foundation for
                  future technological innovation. In particular, the experience
                  of developing a network unified security system (UTM) deepened
                  his technical depth.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 font-montserrat mb-4">
                  Global Expansion
                </h3>
                <p className="text-gray-700 font-poppins font-normal">
                  After founding TiTAN Platform, he managed seven overseas
                  subsidiaries for seven years, raised cumulative investments of
                  550 billion won, and proved his capabilities as a global
                  manager.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 font-montserrat mb-4">
                  Achievement of Vision
                </h3>
                <p className="text-gray-700 font-poppins font-normal">
                  After founding TiTAN Platform, he managed seven overseas
                  subsidiaries for seven years, raised cumulative investments of
                  550 billion won, and proved his capabilities as a global
                  manager.
                </p>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} layout="vertical">
                  <XAxis type="number" domain={[0, 16]} />
                  <YAxis dataKey="name" type="category" width={70} />
                  <Tooltip formatter={(value) => [`${value}년`, "기간"]} />
                  <Bar dataKey="years" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Accolades Section */}
        <section id="accolades" className="bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto mb-12 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 font-montserrat mb-12">
              Achievement and Recognition: A Legacy of Excellence
            </h2>

            <div className="flex flex-col gap-8">
              <div className="bg-purple-100 p-8 rounded-lg shadow-lg text-center flex flex-col items-center justify-center">
                <h3 className="text-4xl font-semibold text-purple-600 font-montserrat">
                  Awards
                </h3>
              </div>

              <div className="flex flex-col gap-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h3 className="text-lg font-semibold text-purple-600 font-montserrat mb-4">
                      U.S. President's Award for Innovation and Volunteerism
                    </h3>
                    <p className="text-gray-700 font-poppins font-normal">
                      2017, White House, USA
                    </p>
                  </div>
                  <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h3 className="text-lg font-semibold text-purple-600 font-montserrat mb-4">
                      Prime Minister's Award
                    </h3>
                    <p className="text-gray-700 font-poppins font-normal">
                      2017, Ministry of SMEs and Startups
                    </p>
                  </div>
                  <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h3 className="text-lg font-semibold text-purple-600 font-montserrat mb-4">
                      Copyright Technology Award
                    </h3>
                    <p className="text-gray-700 font-poppins font-normal">
                      2016, ICOTEC
                    </p>
                  </div>
                  <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h3 className="text-lg font-semibold text-purple-600 font-montserrat mb-4">
                      A company specializing in brain power
                    </h3>
                    <p className="text-gray-700 font-poppins font-normal">
                      2017, Ministry of Trade, Industry and Energy
                    </p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <h3 className="text-lg font-semibold text-purple-600 font-montserrat mb-4">
                    Books and Columns
                  </h3>
                  <p className="text-gray-700 font-poppins font-normal">
                    Through the publication of 'Smart Platform: A Single Core'
                    and numerous column contributions, he has demonstrated
                    intellectual leadership in shaping industry discourse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="rounded-lg shadow-lg text-center p-12 bg-slate-800">
          <h3 className="text-2xl font-bold text-white font-montserrat mb-4">
            Kevin Jaeyoung Yoon
          </h3>
          <p className="text-gray-400 font-poppins font-normal leading-relaxed">
            Technology should not replace humans, but exist to enhance and
            connect human value.
          </p>

          <hr className="mt-4 mb-4 border-gray-500" />

          <h3 className="text-lg font-semibold text-white font-montserrat mt-8 mb-4">
            Contact
          </h3>
          <h3 className="text-lg font-semibold text-gray-400 font-montserrat mb-4">
            addeepcvo@gmail.com
          </h3>
          <h3 className="text-sm font-medium text-gray-400 font-montserrat mt-8 mb-4">
            © 2025 Kevin Jaeyoung Yoon. All Rights Reserved.
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-['Inter','Noto_Sans_KR',sans-serif]">
      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden">
        <div className="absolute h-[800px] inset-0 bg-black bg-opacity-60 mt-32 mx-1 rounded-lg" />
        <div>
          <div className="relative max-w-7xl mx-auto p-28">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
                <img
                  src={images.teamWork.jaeyoung}
                  alt="Kevin Jaeyoung Yoon"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                {currentContent.hero.name}
              </h1>
              <h2 className="text-2xl md:text-2xl font-semibold text-purple-600 mb-4">
                {currentContent.hero.title}
              </h2>
              <div className="text-lg text-gray-200 mb-4">
                {currentContent.hero.education.map((education) => (
                  <p key={education}>{education}</p>
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-6">
                {currentContent.hero.slogan}
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                {currentContent.hero.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section id="summary" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col">
            <h2 className="text-4xl text-center font-bold text-purple-600 mb-8">
              {currentContent.summary.title}
            </h2>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-left">
              {currentContent.summary.subTitle}
            </h2>
            <div className="text-xl text-gray-700 leading-relaxed flex flex-col gap-12">
              {currentContent.summary.description.map((description, idx) => (
                <div key={idx}>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-purple-600 mb-8">
              {currentContent.vision.title}
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {currentContent.vision.description}
            </p>
          </div>
          <div className="flex flex-row items-center gap-24 mt-24">
            <div className="rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Evolution of Technical Philosophy
              </h3>
              <p className="text-gray-700">
                His technical journey follows a single thread. Starting with
                network technology, he laid the foundation of protecting assets
                with information security technology, connected the rights of
                creators transparently through TCI & ACI technology, and evolved
                to the current Addeep augmented AI, which intelligently connects
                and amplifies the value of all participants.
              </p>
              <div className="flex flex-row items-center gap-8 mt-8">
                <button
                  disabled
                  className="text-purple-600 font-bold text-lg bg-purple-200/50 rounded-lg p-2 min-w-20"
                >
                  N/W
                </button>
                <button
                  disabled
                  className="text-purple-600 font-bold text-lg bg-purple-200/50 rounded-lg p-2 min-w-24"
                >
                  Info Security
                </button>
                <button
                  disabled
                  className="text-purple-600 font-bold text-lg bg-purple-200/50 rounded-lg p-2 min-w-28"
                >
                  TCI & ACI
                </button>
                <button
                  disabled
                  className="text-purple-600 font-bold text-lg bg-purple-200/50 rounded-lg p-2 min-w-48"
                >
                  Addeep Augmented AI GPR-1
                </button>
              </div>
            </div>
            <div className="p-8 rounded-lg shadow-lg w-[1000px] h-[400px] flex flex-col items-center justify-center bg-purple-100">
              <h2 className="text-[80px] font-bold text-purple-600 mb-4">
                Vision
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section
        id="technologies"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-purple-600 text-center mb-12">
            Core Technologies: Pillars of the Future Economy
          </h2>

          <div className="flex flex-row items-center gap-2 justify-center p-4 mb-8">
            <button
              className={clsx(
                "font-semibold text-lg rounded-full p-4 min-w-48",
                tabState === "GPR" && "bg-purple-600 text-white",
                tabState !== "GPR" && "bg-gray-200/50"
              )}
              onClick={() => handleTabChange("GPR")}
            >
              Augmented AI: Addeeep GPR-1
            </button>
            <button
              className={clsx(
                "font-semibold text-lg rounded-full p-4 min-w-48",
                tabState === "ACI" && "bg-purple-600 text-white",
                tabState !== "ACI" && "bg-gray-200/50"
              )}
              onClick={() => handleTabChange("ACI")}
            >
              Content Economy: ACI & ACT
            </button>
            <button
              className={clsx(
                "font-semibold text-lg rounded-full p-4 min-w-48",
                tabState === "S2E" && "bg-purple-600 text-white",
                tabState !== "S2E" && "bg-gray-200/50"
              )}
              onClick={() => handleTabChange("S2E")}
            >
              Reward Ecosystem: S2E
            </button>
          </div>

          <div className="flex items-center justify-center max-w-4xl mx-auto">
            {tabState === "GPR" && (
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 mb-4">
                  Addeep GPR-1: Non-conversational AI Paradigm
                </h3>
                <p className="text-gray-700">
                  Unlike mainstream conversational AI, Addeep GPR-1 proactively
                  understands the user's intent and 'first proposes' the optimal
                  result. By modeling the user's 'mindset' through an innovative
                  LMM(Large Mind-mining Model) inference model, it automatically
                  generates necessary content, advertisements, and SNS posts
                  without explicit commands. This innovation shifts the
                  interaction between humans and AI from 'commands and
                  execution' to 'proposals and selections'.
                </p>
              </div>
            )}
            {tabState === "ACI" && (
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 mb-4">
                  ACI & ACT: Dual Engines for Transparent Content Economy
                </h3>
                <p className="text-gray-700 mb-4">
                  ACI (Addeep Content Identifier): A unique identifier similar
                  to the DNA of content. Based on blockchain-based patent
                  technology, it directly inserts an encrypted identification
                  code into the original content file so that even if it is
                  copied or modified, the ownership and流通 history of the
                  original can be permanently traced. This is equivalent to
                  issuing a 'digital notarization' with legal effect for all
                  digital content, serving as the foundation for transparent
                  copyright protection and revenue settlement.
                </p>
                <p className="text-gray-700">
                  ACT (Addeep Automatic Content Convergence): Converts protected
                  and identified content assets into GPR-1 AI to create new
                  value in real-time. Automatically combines creator's creative
                  work and advertiser's brand message in the most appropriate
                  form to create high-quality 'native augmented content' without
                  rejection. This is an innovative approach that provides new
                  revenue models for both creators and advertisers.
                </p>
              </div>
            )}
            {tabState === "S2E" && (
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-600 mb-4">
                  Social 2 Earn: S2E Revolution
                </h3>
                <p className="text-gray-700">
                  A new economic protocol completed by combining GPR-1, ACI, and
                  ACT technologies. It reverses the data exploitation structure
                  of Web 2.0 and provides rewards to all participants who create
                  value. By returning 50% of advertising revenue to the
                  ecosystem, it realizes Users, Creators, and Marketers to Earn.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* GPR-1 Model Section */}
      <section id="gpr1" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-purple-600 mb-8">
              GPR-1: The Augmented AI Inference Model
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Addeep GPR-1 is a core engine of 'augmented intelligence' that not
              only understands the user's potential intent but also acts first.
              Its technical foundation lies in an innovative model called LMM.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg mt-4 mb-4">
            <h3 className="text-xl font-semibold text-purple-600 mb-4">
              Concept of LMM (Large Mind-mining Model)
            </h3>
            <p className="text-gray-700">
              Unlike LLM(Large Language Model) that focuses on text data
              learning, LMM analyzes comprehensive personalized data to infer
              the user's 'mindset'. Mindset refers to the comprehensive set of
              thoughts, emotions, and intentions that an individual may have in
              a specific situation. LMM learns unstructured data such as
              communication metrics, activity patterns, demographic information,
              and content consumption history in depth to model this mindset
              probabilistically.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg mt-4 mb-4">
            <h3 className="text-xl font-semibold text-purple-600 mb-4">
              Difference from LLM: Understanding 'Intent' rather than 'Command'
            </h3>
            <p className="text-gray-700">
              Conversational AI based on LLM is optimized to accurately
              understand the user's 'command (Command)' and answer in text. In
              contrast, GPR-1 based on LMM focuses on understanding the user's
              latent 'intent (Intent)' that is not explicitly expressed. For
              example, when a user posts 'today's weather is good', LLM analyzes
              the meaning of this sentence, but LMM infers that the user is in a
              positive emotional state and has a high probability of reacting to
              content or advertisements related to outdoor activities and
              refreshing feelings. Based on this inference, GPR-1 automatically
              generates and proposes relevant content and advertisements without
              waiting for questions.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-purple-600 text-center mb-12">
            Key Projects & Product Development
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            His product development journey started with information security
            solutions, expanded to cloud-based platform services, and AI and
            deep tech fields. During this process, he proved his exceptional
            execution ability to turn ideas into reality.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-6 mb-6">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">
                OTT Platform Innovation 'TiTAN Play'
              </h3>
              <p className="text-gray-700">
                As a core technology, we developed an OTT service that provides
                a new media consumption experience centered on creators,
                launching 'TiTAN Play'.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">
                AI Social Robot 'TiTAN AI'
              </h3>
              <p className="text-gray-700">
                Developed and commercialized an AI-based social robot series
                equipped with a camera, speaker, and display to communicate with
                family members and provide information.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">
                TiTAN Core
              </h3>
              <p className="text-gray-700">
                Developed and commercialized various IoT smart home devices
                linked to the platform to provide an integrated platform
                ecosystem that extends from content consumption to everyday
                living spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Entrepreneurial Journey Section */}
      <section id="journey" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-purple-600 text-center mb-12">
            Entrepreneurial Journey: From Engineer to Global Leader
          </h2>
          <div className="flex flex-row gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">
                Foundation of Technology
              </h3>
              <p className="text-gray-700">
                Started as a software engineer, grew into a network and security
                technology expert, laying a solid foundation for future
                technological innovation. In particular, the experience of
                developing a network unified security system (UTM) deepened his
                technical depth.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">
                Global Expansion
              </h3>
              <p className="text-gray-700">
                After founding TiTAN Platform, he managed seven overseas
                subsidiaries for seven years, raised cumulative investments of
                550 billion won, and proved his capabilities as a global
                manager.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">
                Achievement of Vision
              </h3>
              <p className="text-gray-700">
                After founding TiTAN Platform, he managed seven overseas
                subsidiaries for seven years, raised cumulative investments of
                550 billion won, and proved his capabilities as a global
                manager.
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data} layout="vertical">
                <XAxis type="number" domain={[0, 16]} />
                <YAxis dataKey="name" type="category" width={200} />
                <Tooltip formatter={(value) => [`${value}년`, "기간"]} />
                <Bar dataKey="years" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Accolades Section */}
      <section id="accolades" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Accolades: A Legacy of Excellence
          </h2>

          <div className="flex flex-row justify-between gap-8 w-[1200px]">
            <div className="bg-purple-100 p-8 rounded-lg shadow-lg text-center w-[1200px] flex flex-col items-center justify-center">
              <h3 className="text-[80px] font-semibold text-purple-600 mb-4">
                Awards
              </h3>
            </div>

            <div className="flex flex-col gap-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <h3 className="text-lg font-semibold text-purple-600 mb-4">
                    U.S. President's Award for Innovation and Volunteerism
                  </h3>
                  <p className="text-gray-700">2017, White House, USA</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <h3 className="text-lg font-semibold text-purple-600 mb-4">
                    Prime Minister's Award
                  </h3>
                  <p className="text-gray-700">
                    2017, Ministry of SMEs and Startups
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <h3 className="text-lg font-semibold text-purple-600 mb-4">
                    Copyright Technology Award
                  </h3>
                  <p className="text-gray-700">2016, ICOTEC</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <h3 className="text-lg font-semibold text-purple-600 mb-4">
                    A company specializing in brain power
                  </h3>
                  <p className="text-gray-700">
                    2017, Ministry of Trade, Industry and Energy
                  </p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h3 className="text-lg font-semibold text-purple-600 mb-4">
                  Books and Columns
                </h3>
                <p className="text-gray-700">
                  Through the publication of 'Smart Platform: A Single Core' and
                  numerous column contributions, he has demonstrated
                  intellectual leadership in shaping industry discourse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="rounded-lg shadow-lg text-center p-12 bg-slate-800 hidden">
        <h3 className="text-3xl font-bold text-white mb-4">
          Kevin Jaeyoung Yoon
        </h3>
        <p className="text-gray-400 text-lg">
          Technology should not replace humans, but exist to enhance and connect
          human value.
        </p>

        <hr className="mt-4 mb-4 border-gray-500" />

        <h3 className="text-xl font-semibold text-white mt-8 mb-4">Contact</h3>
        <h3 className="text-xl font-semibold text-gray-400 mb-4">
          addeepcvo@gmail.com
        </h3>
        <h3 className="text-md font-medium text-gray-400 mt-8 mb-4">
          © 2025 Kevin Jaeyoung Yoon. All Rights Reserved.
        </h3>
      </div>

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
