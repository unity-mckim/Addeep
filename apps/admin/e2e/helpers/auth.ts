import { Page, expect } from "@playwright/test";

export interface TestCredentials {
  email: string;
  password: string;
}

// 테스트용 계정 정보 (실제 환경에서는 환경변수로 관리하는 것이 좋습니다)
export const TEST_USER: TestCredentials = {
  email: process.env.TEST_USER_EMAIL || "test@example.com",
  password: process.env.TEST_USER_PASSWORD || "testpassword123",
};

/**
 * 로그인 헬퍼 함수
 */
export async function login(
  page: Page,
  credentials: TestCredentials = TEST_USER
) {
  await page.goto("/");

  // 로그인 페이지 확인
  await expect(page.locator("text=Admin Dashboard")).toBeVisible();

  // 이메일과 비밀번호 입력
  await page.fill('input[name="email"]', credentials.email);
  await page.fill('input[name="password"]', credentials.password);

  // 로그인 버튼 클릭
  await page.click('button[type="submit"]');

  // 대시보드로 리다이렉트 되는지 확인
  await page.waitForURL("**/dashboard**", { timeout: 10000 });
  await expect(page.locator("text=Dashboard")).toBeVisible();
}

/**
 * 로그아웃 헬퍼 함수
 */
export async function logout(page: Page) {
  // 로그아웃 버튼 클릭 (Dashboard에서 "로그아웃" 버튼)
  await page.click('button:has-text("로그아웃")');

  // 로그인 페이지로 리다이렉트 확인
  await page.waitForURL("/", { timeout: 5000 });
  await expect(page.locator("text=Admin Dashboard")).toBeVisible();
}

/**
 * 인증된 페이지 상태 저장
 */
export async function saveAuthState(page: Page, path: string) {
  await page.context().storageState({ path });
}
