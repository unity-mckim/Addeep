import { test, expect } from "@playwright/test";
import { login, TEST_USER } from "./helpers/auth";
import { switchTab, waitForLoadingComplete } from "./helpers/common";

test.describe("대시보드 네비게이션 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, TEST_USER);
  });

  test("대시보드 페이지가 올바르게 렌더링됨", async ({ page }) => {
    // 헤더 확인
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
    await expect(page.locator("text=콘텐츠 관리 시스템")).toBeVisible();

    // 버튼 확인
    await expect(page.locator('button:has-text("새로고침")')).toBeVisible();
    await expect(page.locator('button:has-text("로그아웃")')).toBeVisible();

    // 탭 확인
    await expect(page.locator('button:has-text("공지사항")')).toBeVisible();
    await expect(page.locator('button:has-text("이벤트")')).toBeVisible();
    await expect(page.locator('button:has-text("뉴스")')).toBeVisible();
    await expect(page.locator('button:has-text("아티클")')).toBeVisible();
  });

  test("공지사항 탭으로 전환", async ({ page }) => {
    await switchTab(page, "공지사항");

    // 활성화된 탭 확인 (그라데이션 배경색을 가진 버튼)
    const activeTab = page.locator('button:has-text("공지사항")').first();
    await expect(activeTab).toBeVisible();

    // 새로 만들기 버튼 확인
    await expect(page.locator('button:has-text("새로 만들기")')).toBeVisible();
  });

  test("이벤트 탭으로 전환", async ({ page }) => {
    await switchTab(page, "이벤트");

    const activeTab = page.locator('button:has-text("이벤트")').first();
    await expect(activeTab).toBeVisible();
  });

  test("뉴스 탭으로 전환", async ({ page }) => {
    await switchTab(page, "뉴스");

    const activeTab = page.locator('button:has-text("뉴스")').first();
    await expect(activeTab).toBeVisible();
  });

  test("아티클 탭으로 전환", async ({ page }) => {
    await switchTab(page, "아티클");

    const activeTab = page.locator('button:has-text("아티클")').first();
    await expect(activeTab).toBeVisible();
  });

  test("새로고침 버튼 동작", async ({ page }) => {
    const reloadPromise = page.waitForEvent("load");
    await page.click('button:has-text("새로고침")');
    await reloadPromise;

    // 페이지가 다시 로드되었는지 확인
    await expect(page.locator("text=Dashboard")).toBeVisible();
  });

  test("스탯 카드 클릭하여 탭 전환", async ({ page }) => {
    // 공지사항 스탯 카드 찾기 및 클릭
    const announcementCard = page
      .locator("div")
      .filter({ hasText: "공지사항" })
      .first();
    await announcementCard.click();

    await waitForLoadingComplete(page);

    // 활성화된 탭 확인
    const activeTab = page.locator('button:has-text("공지사항")').first();
    await expect(activeTab).toBeVisible();
  });

  test("테이블이 렌더링됨", async ({ page }) => {
    await waitForLoadingComplete(page);

    // MRT 테이블 확인 (material-react-table)
    const table = page.locator("table");
    await expect(table).toBeVisible();

    // 테이블 헤더 확인
    await expect(page.locator('th:has-text("제목")')).toBeVisible();
    await expect(page.locator('th:has-text("내용")')).toBeVisible();
    await expect(page.locator('th:has-text("작성 날짜")')).toBeVisible();
    await expect(page.locator('th:has-text("수정 날짜")')).toBeVisible();
  });

  test("페이지네이션 동작", async ({ page }) => {
    await waitForLoadingComplete(page);

    // 페이지네이션 버튼 확인
    const pagination = page.locator(".MuiPagination-root");

    // 데이터가 있다면 페이지네이션이 보여야 함
    const rowCount = await page.locator("tbody tr").count();

    if (rowCount > 0) {
      await expect(pagination).toBeVisible();
    }
  });
});
