"use server";

import { supabase } from "../../../lib/supabase";

export async function toggleMaintenanceMode() {
  try {
    // 현재 상태 조회
    const { data: currentStatus, error: fetchError } = await supabase
      .from("maintenance_mode")
      .select("is_active")
      .eq("id", 1)
      .single();

    if (fetchError) {
      console.error("Error fetching maintenance status:", fetchError);
      return {
        success: false,
        message: "점검 모드 상태 조회 실패",
        error: fetchError.message,
      };
    }

    // 상태 토글
    const newStatus = !currentStatus.is_active;
    const { error: updateError } = await supabase
      .from("maintenance_mode")
      .update({
        is_active: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

    if (updateError) {
      console.error("Error updating maintenance status:", updateError);
      return {
        success: false,
        message: "점검 모드 업데이트 실패",
        error: updateError.message,
      };
    }

    return {
      success: true,
      message: newStatus ? "점검 모드 활성화" : "점검 모드 비활성화",
      isActive: newStatus,
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      message: "예상치 못한 오류 발생",
      error: String(error),
    };
  }
}
