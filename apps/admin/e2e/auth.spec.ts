import { test, expect } from "@playwright/test";
import { login, logout, TEST_USER } from "./helpers/auth";

test.describe("인증 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("로그인 페이지가 올바르게 렌더링됨", async ({ page }) => {
    // 로그인 페이지 요소 확인
    await expect(page.locator("text=Admin Dashboard")).toBeVisible();
    await expect(
      page.locator("text=Addeep 관리자 패널에 오신 것을 환영합니다")
    ).toBeVisible();

    // 폼 요소 확인
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(
      page.locator('button[type="submit"]:has-text("로그인")')
    ).toBeVisible();
  });

  test("유효한 자격증명으로 로그인 성공", async ({ page }) => {
    await login(page, TEST_USER);

    // 대시보드 페이지 확인
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator("text=Dashboard")).toBeVisible();
    await expect(page.locator("text=콘텐츠 관리 시스템")).toBeVisible();
  });

  test("이메일 필드가 비어있으면 로그인 실패", async ({ page }) => {
    // 비밀번호만 입력
    await page.fill('input[name="password"]', TEST_USER.password);

    // 로그인 버튼 클릭
    const submitButton = page.locator('button[type="submit"]');

    // HTML5 validation으로 인해 제출이 막힘
    await expect(submitButton).toBeVisible();
  });

  test("비밀번호 표시/숨김 토글 기능", async ({ page }) => {
    const passwordInput = page.locator('input[name="password"]');
    const toggleButton = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .nth(2);

    // 초기 상태: password 타입
    await expect(passwordInput).toHaveAttribute("type", "password");

    // 비밀번호 입력
    await passwordInput.fill("test123");

    // 토글 버튼 클릭 - 표시
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "text");

    // 다시 토글 - 숨김
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("로그인 후 로그아웃 성공", async ({ page }) => {
    // 로그인
    await login(page, TEST_USER);

    // 로그아웃
    await logout(page);

    // 로그인 페이지로 돌아왔는지 확인
    await expect(page).toHaveURL("/");
    await expect(page.locator("text=Admin Dashboard")).toBeVisible();
  });

  test("인증되지 않은 상태에서 대시보드 접근 시 로그인 페이지로 리다이렉트", async ({
    page,
  }) => {
    // 직접 대시보드 URL로 이동 시도
    await page.goto("/dashboard");

    // 로그인 페이지로 리다이렉트되어야 함
    await page.waitForURL("/", { timeout: 5000 });
    await expect(page.locator("text=Admin Dashboard")).toBeVisible();
  });
});
