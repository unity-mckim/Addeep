export interface IRMaterial {
  id: number;
  title: string;
  description: string | null;
  file_url: string | null;
  file_name: string | null;
  file_type: string | null;
  file_size: number | null;
  category: string | null;
  published_date: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface IRMaterialFormData {
  title: string;
  description: string;
  file_url?: string;
  file_name?: string;
  file_type?: string;
  file_size?: number;
  category?: string;
  published_date?: string;
  is_published: boolean;
}
