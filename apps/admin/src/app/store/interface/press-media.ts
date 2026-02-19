export interface PressMedia {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  file_url?: string;
  published_date: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
