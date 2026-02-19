export interface PersonItem {
  desc?: string[];
  en_name?: string;
  speaker?: string;
  sub_title?: string;
  title?: string;
  speaker_image?: string | null;
}

export interface ScheduleItem {
  time: string;
  title: string;
  subTitle?: string;
  duration: string;
  speaker?: string;
  desc?: string[];
}

// Overview JSONB 필드의 데이터 구조
export interface OverviewItem {
  title: string;
  description: string;
}

export interface Event {
  id: number;
  created_at: string;
  updated_at: string | null;

  // 기본 필드들 (스키마에서 null 가능)
  title: string | null;
  description: string | null;

  // 추가 필드들
  day?: string | null;
  thumbnail_url?: string | null;
  video_link?: string | null;
  event_date?: string | null;
  location?: string | null;
  form_link?: string | null;
  detail_content?: string | null;
  detail_title?: string | null;
  participants?: string | null;
  banner_url?: string | null;
  manager_name?: string | null;
  manager_email?: string | null;

  // JSONB 필드
  // 모든 JSONB 필드는 { data: [...] } 래퍼 구조로 통일
  Person?: {
    data: PersonItem[];
  } | null;
  Overview?: {
    data: OverviewItem[];
  } | null;
  Schedule?: {
    data: ScheduleItem[];
  } | null;
}
