"use server";

import { supabaseAdmin } from "../../../../lib/supabase";

interface PersonItem {
  en_name: string;
  title: string;
  sub_title: string;
  speaker: string;
  desc: string[];
  speaker_image?: string;
}

interface ScheduleItem {
  time: string;
  title: string;
  subTitle?: string;
  duration: string;
  speaker?: string;
  desc?: string[];
}

interface OverviewItem {
  title: string;
  description: string;
}

export async function uploadEventImage(file: File, folder: string = "event-images") {
  try {
    // 이미지 파일 타입 체크
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error:
          "지원하지 않는 이미지 형식입니다. (JPG, PNG, GIF, WebP, SVG만 가능)",
      };
    }

    // 파일 크기 체크 (10MB 제한)
    if (file.size > 10 * 1024 * 1024) {
      return {
        success: false,
        error: "이미지 파일 크기는 10MB를 초과할 수 없습니다.",
      };
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const normalizedFolder = folder.replace(/\/+$/, "");
    const filePath = `${normalizedFolder}/${fileName}`;

    const { data, error } = await supabaseAdmin.storage
      .from("assets-addeep")
      .upload(filePath, file);

    if (error) {
      console.error("파일 업로드 에러:", error);
      
      // 버킷이 없는 경우 명확한 에러 메시지
      if (error.message?.includes("Bucket not found") || error.message?.includes("not found")) {
        return {
          success: false,
          error: "Storage 버킷 'assets-addeep'가 존재하지 않습니다. Supabase Dashboard에서 버킷을 생성해주세요.",
        };
      }
      
      return {
        success: false,
        error: error.message || "파일 업로드 중 오류가 발생했습니다.",
      };
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage
      .from("assets-addeep")
      .getPublicUrl(filePath);

    return {
      success: true,
      url: publicUrl,
    };
  } catch (err) {
    console.error("uploadEventImage 에러:", err);
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "파일 업로드 중 오류가 발생했습니다.",
    };
  }
}

export async function createEvent(data: {
  title: string;
  description: string;
  thumbnail_url?: string;
  video_link?: string;
  event_date?: string;
  location?: string;
  form_link?: string;
  participants?: string;
  detail_title?: string;
  detail_content?: string;
  banner_url?: string;
  manager_name?: string;
  manager_email?: string;
  persons?: PersonItem[];
  overview?: OverviewItem[];
  schedule?: ScheduleItem[];
}) {
  try {
    const payload: Record<string, any> = {
      title: data.title,
      description: data.description,
      thumbnail_url: data.thumbnail_url || null,
      video_link: data.video_link || null,
      event_date: data.event_date || null,
      location: data.location || null,
      form_link: data.form_link || null,
      participants: data.participants || null,
      detail_content: data.detail_content || null,
      banner_url: data.banner_url || null,
      manager_name: data.manager_name || null,
      manager_email: data.manager_email || null,
      Person: data.persons ? { data: data.persons } : null,
      Overview: data.overview ? { data: data.overview } : null,
      Schedule: data.schedule ? { data: data.schedule } : null,
    };
    if (data.detail_title !== undefined) {
      payload.detail_title = data.detail_title || null;
    }

    const { data: result, error } = await supabaseAdmin
      .from("events")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("Supabase 에러:", error);
      return {
        success: false,
        error: error.message || "이벤트 생성 중 오류가 발생했습니다.",
      };
    }

    return { success: true, data: result };
  } catch (err) {
    console.error("createEvent 에러:", err);
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "이벤트 생성 중 오류가 발생했습니다.",
    };
  }
}

export async function updateEvent(
  id: number,
  data: {
    title: string;
    description: string;
    thumbnail_url?: string;
    video_link?: string;
    event_date?: string;
    location?: string;
    form_link?: string;
    participants?: string;
    detail_title?: string;
    detail_content?: string;
    banner_url?: string;
    manager_name?: string;
    manager_email?: string;
    persons?: PersonItem[];
    overview?: OverviewItem[];
    schedule?: ScheduleItem[];
  }
) {
  try {
    const payload: Record<string, any> = {
      title: data.title,
      description: data.description,
      thumbnail_url: data.thumbnail_url || null,
      video_link: data.video_link || null,
      event_date: data.event_date || null,
      location: data.location || null,
      form_link: data.form_link || null,
      participants: data.participants || null,
      detail_content: data.detail_content || null,
      banner_url: data.banner_url || null,
      manager_name: data.manager_name || null,
      manager_email: data.manager_email || null,
      Person: data.persons ? { data: data.persons } : null,
      Overview: data.overview ? { data: data.overview } : null,
      Schedule: data.schedule ? { data: data.schedule } : null,
    };
    if (data.detail_title !== undefined) {
      payload.detail_title = data.detail_title || null;
    }

    const { data: result, error } = await supabaseAdmin
      .from("events")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase 에러:", error);
      return {
        success: false,
        error: error.message || "이벤트 수정 중 오류가 발생했습니다.",
      };
    }

    return { success: true, data: result };
  } catch (err) {
    console.error("updateEvent 에러:", err);
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "이벤트 수정 중 오류가 발생했습니다.",
    };
  }
}

export async function deleteEvent(id: number) {
  try {
    const { data, error } = await supabaseAdmin
      .from("events")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase 에러:", error);
      throw error;
    }

    return { success: true, data };
  } catch (err) {
    console.error("deleteEvent 에러:", err);
    throw err;
  }
}
