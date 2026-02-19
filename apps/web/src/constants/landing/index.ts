import { images } from "../images";

export const collageData = [
  {
    text: ["We", "Bridge", "Values"],
    image: images.landing.jessica,
    position: "top-left",
  },
  {
    text: ["기술을 넘어", "사람과 사람을", "사람과 가치를", "연결합니다"],
    image: images.landing.social,
    position: "middle-left",
    gradient: true,
  },
  {
    text: [],
    image: images.landing.goodFace,
    position: "bottom-right",
  },
];

export const splitScreenData = {
  text: [
    "가치는 연결될 때 비로소 커집니다",
    "모든 행동이 의미가 되고",
    "모든 참여가 가치가 되도록",
    "애딥은 사람이 중심이 되는 구조로 설계합니다",
  ],
  Image: images.landing.background,
};
