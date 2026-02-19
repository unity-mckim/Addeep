type Item =
  | { label: string; href: string; external?: boolean }
  | { label: string; children: { label: string; href: string }[] };

export type DefaultLinkType = {
  label: string;
  href: string;
  external?: boolean;
};

export const NAV: Item[] = [
  { label: "홈", href: "/" },
  {
    label: "소개",
    children: [
      { label: "회사 소개", href: "/about-us/we-are" },
      { label: "팀 소개", href: "/about-us/team-work" },
      { label: "핵심 가치", href: "/about-us/core-value" },
    ],
  },
  {
    label: "애딥의 방향",
    children: [
      {
        label: "디지털 플랫폼 혁신",
        href: "/addeep-is/digital-platform-innovation",
      },
      { label: "Addeep GPR AI 개요", href: "/addeep-is/summary-ai" },
      {
        label: "Addeep S2E 소셜 미디어 개요",
        href: "/addeep-is/summary-sns",
      },
      { label: "Addeep Social to Earn(S2E)", href: "/addeep-is/platform-to-earn" },
    ],
  },
  { label: "블로그 & 소셜 미디어 채널", href: "/blog-social-media-channel" },
  { label: "공지사항", href: "/announcement" },
  { label: "보도자료", href: "/press-media" },
  { label: "IR 자료실", href: "/ir-library" },
  { label: "이벤트", href: "/events" },
];
