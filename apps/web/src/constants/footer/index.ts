import {
  FooterInstagramIcon,
  FooterFacebookIcon,
  FooterYoutubeIcon,
  FooterXICon,
  FooterBlogIcon,
} from "../../icons";

interface FooterLink {
  id: string;
  text: string;
  href: string;
  subItems?: FooterLink[];
}

interface FooterSocial {
  name: string;
  icon: React.ComponentType | string;
  link?: string;
}

export const footerLinks: FooterLink[] = [
  {
    id: "1",
    text: "홈",
    href: "/",
  },
  {
    id: "2",
    text: "소개",
    href: "/about-us/we-are",
    subItems: [
      { id: "2-1", text: "회사 소개", href: "/about-us/we-are" },
      { id: "2-2", text: "팀 소개", href: "/about-us/team-work" },
      { id: "2-3", text: "핵심 가치", href: "/about-us/core-value" },
    ],
  },
  {
    id: "3",
    text: "애딥의 방향",
    href: "/addeep-is/digital-platform-innovation",
    subItems: [
      {
        id: "3-1",
        text: "디지털 플랫폼 혁신",
        href: "/addeep-is/digital-platform-innovation",
      },
      { id: "3-2", text: "Addeep GPR AI 개요", href: "/addeep-is/summary-ai" },
      {
        id: "3-3",
        text: "Addeep S2E 소셜 미디어 개요",
        href: "/addeep-is/summary-sns",
      },
      {
        id: "3-4",
        text: "Addeep Social to Earn(S2E)",
        href: "/addeep-is/platform-to-earn",
      },
    ],
  },
  {
    id: "4",
    text: "블로그 & 소셜 미디어 채널",
    href: "/blog-social-media-channel",
  },
  {
    id: "5",
    text: "공지사항",
    href: "/announcement",
  },
  {
    id: "6",
    text: "보도자료",
    href: "/press-media",
  },
  {
    id: "7",
    text: "IR 자료실",
    href: "/ir-library",
  },
  { id: "8", text: "이벤트", href: "/events" },
];

export const socialIcons: FooterSocial[] = [
  {
    name: "블로그",
    icon: FooterBlogIcon,
    link: "https://addeep.blog/",
  },
  {
    name: "인스타그램",
    icon: FooterInstagramIcon,
    link: "https://www.instagram.com/addeep_/",
  },
  {
    name: "X",
    icon: FooterXICon,
    link: "https://x.com/Addeep_",
  },
  {
    name: "유튜브",
    icon: FooterYoutubeIcon,
    link: "https://www.youtube.com/@addeep_",
  },
];
