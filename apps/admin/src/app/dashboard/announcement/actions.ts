"use server";

import { supabaseAdmin } from "../../../../lib/supabase";

export async function createAnnouncement(data: {
  title: string;
  description: string;
}) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("announcement")
      .insert([
        {
          title: data.title,
          description: data.description,
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
    console.error("createAnnouncement 에러:", err);
    throw err;
  }
}

export async function updateAnnouncement(
  id: number,
  data: {
    title: string;
    description: string;
  }
) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("announcement")
      .update({
        title: data.title,
        description: data.description,
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
    console.error("updateAnnouncement 에러:", err);
    throw err;
  }
}

export async function deleteAnnouncement(id: number) {
  try {
    const { data, error } = await supabaseAdmin
      .from("announcement")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase 에러:", error);
      throw error;
    }

    return { success: true, data };
  } catch (err) {
    console.error("deleteAnnouncement 에러:", err);
    throw err;
  }
}
