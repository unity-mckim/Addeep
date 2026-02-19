type NoticeItem = {
  id: string;
  title: string;
  description: string;
  created_at: string; // "2024-01-08" 또는 Date ISO
  href?: string; // 상세 페이지 링크 (옵션)
};

interface NoticeListProps {
  items: NoticeItem[];
  title?: string;
}
