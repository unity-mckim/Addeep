"use server";

import { supabaseAdmin } from "../../../../lib/supabase";

export async function createIRMaterial(data: {
  title: string;
  description: string;
  file_url?: string;
  file_name?: string;
  file_type?: string;
  file_size?: number;
  category?: string;
  published_date?: string;
  is_published: boolean;
}) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("ir_materials")
      .insert([
        {
          title: data.title,
          description: data.description,
          file_url: data.file_url,
          file_name: data.file_name,
          file_type: data.file_type,
          file_size: data.file_size,
          category: data.category,
          published_date: data.published_date,
          is_published: data.is_published,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase 에러:", error);
      throw error;
    }

    return { success: true, data: result };
  } catch (err) {
    console.error("createIRMaterial 에러:", err);
    throw err;
  }
}

export async function updateIRMaterial(
  id: number,
  data: {
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
) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("ir_materials")
      .update({
        title: data.title,
        description: data.description,
        file_url: data.file_url,
        file_name: data.file_name,
        file_type: data.file_type,
        file_size: data.file_size,
        category: data.category,
        published_date: data.published_date,
        is_published: data.is_published,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase 에러:", error);
      throw error;
    }

    return { success: true, data: result };
  } catch (err) {
    console.error("updateIRMaterial 에러:", err);
    throw err;
  }
}

export async function deleteIRMaterial(id: number) {
  try {
    const { data, error } = await supabaseAdmin
      .from("ir_materials")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase 에러:", error);
      throw error;
    }

    return { success: true, data };
  } catch (err) {
    console.error("deleteIRMaterial 에러:", err);
    throw err;
  }
}

export async function uploadIRFile(file: File) {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `ir-materials/${fileName}`;

    const { data, error } = await supabaseAdmin.storage
      .from("ir-materials")
      .upload(filePath, file);

    if (error) {
      console.error("파일 업로드 에러:", error);
      throw error;
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage
      .from("ir-materials")
      .getPublicUrl(filePath);

    return {
      success: true,
      file_url: publicUrl,
      file_name: file.name,
      file_type: file.type,
      file_size: file.size,
    };
  } catch (err) {
    console.error("uploadIRFile 에러:", err);
    throw err;
  }
}
