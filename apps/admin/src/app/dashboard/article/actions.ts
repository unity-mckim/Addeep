"use server";

import { supabaseAdmin } from "../../../../lib/supabase";

export async function createArticle(data: {
  title: string;
  description: string;
  pdf_url?: string;
}) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("article")
      .insert([
        {
          title: data.title,
          description: data.description,
          pdf_url: data.pdf_url,
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
    console.error("createArticle 에러:", err);
    throw err;
  }
}

export async function updateArticle(
  id: number,
  data: {
    title: string;
    description: string;
    pdf_url?: string;
  }
) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("article")
      .update({
        title: data.title,
        description: data.description,
        pdf_url: data.pdf_url,
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
    console.error("updateArticle 에러:", err);
    throw err;
  }
}

export async function deleteArticle(id: number) {
  try {
    const { data, error } = await supabaseAdmin
      .from("article")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase 에러:", error);
      throw error;
    }

    return { success: true, data };
  } catch (err) {
    console.error("deleteArticle 에러:", err);
    throw err;
  }
}
