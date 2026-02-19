import { test, expect } from "@playwright/test";
import { login, TEST_USER } from "./helpers/auth";
import {
  switchTab,
  clickCreateButton,
  generateTestData,
  waitForLoadingComplete,
  setupAlertHandler,
  wait,
} from "./helpers/common";

test.describe("공지사항 CRUD 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, TEST_USER);
    await switchTab(page, "공지사항");
  });

  test("공지사항 생성 페이지로 이동", async ({ page }) => {
    await clickCreateButton(page);

    // 생성 페이지 확인
    await expect(page).toHaveURL(/\/dashboard\/announcement\/create/);
    await expect(page.locator('h1:has-text("공지사항 만들기")')).toBeVisible();

    // 폼 필드 확인
    await expect(page.locator('input[name="title"]')).toBeVisible();
    await expect(page.locator('textarea[name="description"]')).toBeVisible();

    // 버튼 확인
    await expect(page.locator('button:has-text("취소")')).toBeVisible();
    await expect(page.locator('button:has-text("생성하기")')).toBeVisible();
  });

  test("공지사항 생성 - 빈 폼 제출 시 유효성 검사", async ({ page }) => {
    await clickCreateButton(page);

    // 빈 폼 제출
    await page.click('button[type="submit"]:has-text("생성하기")');

    // 에러 메시지 확인
    await expect(page.locator("text=제목을 입력해주세요.")).toBeVisible();
  });

  test("공지사항 생성 - 유효한 데이터로 생성", async ({ page }) => {
    await clickCreateButton(page);

    const testData = generateTestData("공지사항");

    // Alert 핸들러 설정
    setupAlertHandler(page);

    // 폼 작성
    await page.fill('input[name="title"]', testData.title);
    await page.fill('textarea[name="description"]', testData.content);

    // 제출
    await page.click('button[type="submit"]:has-text("생성하기")');

    await wait(1000);
  });

  test("공지사항 목록에서 항목 클릭하여 상세 페이지 이동", async ({ page }) => {
    await waitForLoadingComplete(page);

    const rowCount = await page.locator("tbody tr").count();

    if (rowCount > 0) {
      // 첫 번째 행 클릭
      const firstRow = page.locator("tbody tr").first();
      await firstRow.click();

      // 상세 페이지로 이동 확인
      await page.waitForURL(/\/dashboard\/announcement\/\d+/, {
        timeout: 5000,
      });

      // 상세 페이지 요소 확인
      await expect(page.locator("text=공지사항")).toBeVisible();
      await expect(page.locator('button:has-text("수정")')).toBeVisible();
      await expect(page.locator('button:has-text("삭제")')).toBeVisible();
    }
  });

  test("공지사항 상세 페이지 - 수정 페이지로 이동", async ({ page }) => {
    await waitForLoadingComplete(page);

    const rowCount = await page.locator("tbody tr").count();

    if (rowCount > 0) {
      // 상세 페이지로 이동
      await page.locator("tbody tr").first().click();
      await page.waitForURL(/\/dashboard\/announcement\/\d+/);

      // 수정 버튼 클릭
      await page.click('button:has-text("수정")');

      // 수정 페이지로 이동 확인
      await page.waitForURL(/\/dashboard\/announcement\/edit\/\d+/, {
        timeout: 5000,
      });
      await expect(
        page.locator('h1:has-text("공지사항 수정하기")')
      ).toBeVisible();

      // 폼 필드에 기존 데이터가 로드되어 있는지 확인
      const titleInput = page.locator('input[name="title"]');
      await expect(titleInput).not.toHaveValue("");
    }
  });

  test("공지사항 상세 페이지 - 삭제 모달 열기/닫기", async ({ page }) => {
    await waitForLoadingComplete(page);

    const rowCount = await page.locator("tbody tr").count();

    if (rowCount > 0) {
      // 상세 페이지로 이동
      await page.locator("tbody tr").first().click();
      await page.waitForURL(/\/dashboard\/announcement\/\d+/);

      // 삭제 버튼 클릭
      await page.click('button:has-text("삭제")');

      // 모달 확인
      await expect(page.locator('h2:has-text("삭제 확인")')).toBeVisible();

      // 취소 버튼 클릭
      const cancelButton = page.locator('button:has-text("취소")').last();
      await cancelButton.click();

      // 모달이 닫혔는지 확인
      await expect(page.locator('h2:has-text("삭제 확인")')).not.toBeVisible();
    }
  });

  test("공지사항 수정 페이지 - 취소 버튼", async ({ page }) => {
    await waitForLoadingComplete(page);

    const rowCount = await page.locator("tbody tr").count();

    if (rowCount > 0) {
      // 수정 페이지로 이동
      await page.locator("tbody tr").first().click();
      await page.waitForURL(/\/dashboard\/announcement\/\d+/);
      const announcementId = page.url().split("/").pop();

      await page.click('button:has-text("수정")');
      await page.waitForURL(/\/dashboard\/announcement\/edit\/\d+/);

      // 취소 버튼 클릭
      const cancelButton = page.locator('button:has-text("취소")').first();
      await cancelButton.click();

      // 상세 페이지로 돌아갔는지 확인
      await expect(page).toHaveURL(
        new RegExp(`/dashboard/announcement/${announcementId}`)
      );
    }
  });

  test("공지사항 테이블 렌더링", async ({ page }) => {
    await waitForLoadingComplete(page);

    // 테이블 확인
    const table = page.locator("table");
    await expect(table).toBeVisible();

    // 헤더 확인
    await expect(page.locator('th:has-text("제목")')).toBeVisible();
    await expect(page.locator('th:has-text("내용")')).toBeVisible();
  });
});
