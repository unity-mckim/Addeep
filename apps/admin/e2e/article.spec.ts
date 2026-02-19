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

test.describe("아티클 CRUD 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, TEST_USER);
    await switchTab(page, "아티클");
  });

  test("아티클 생성 페이지로 이동", async ({ page }) => {
    await clickCreateButton(page);

    // 생성 페이지 확인
    await expect(page).toHaveURL(/\/dashboard\/article\/create/);
    await expect(page.locator('h1:has-text("아티클 만들기")')).toBeVisible();

    // 폼 필드 확인
    await expect(page.locator('input[name="title"]')).toBeVisible();

    // 버튼 확인
    await expect(page.locator('button:has-text("취소")')).toBeVisible();
    await expect(page.locator('button:has-text("생성하기")')).toBeVisible();
  });

  test("아티클 생성 - 빈 폼 제출 시 유효성 검사", async ({ page }) => {
    await clickCreateButton(page);

    // 빈 폼 제출
    await page.click('button[type="submit"]:has-text("생성하기")');

    // 에러 메시지 확인
    await expect(page.locator("text=제목을 입력해주세요.")).toBeVisible();
  });

  test("아티클 생성 - 취소 버튼 동작", async ({ page }) => {
    await clickCreateButton(page);

    // 데이터 일부 입력
    await page.fill('input[name="title"]', "Test Article");

    // 취소 버튼 클릭
    const cancelButton = page.locator('button:has-text("취소")').first();
    await cancelButton.click();

    // 대시보드로 돌아갔는지 확인
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("아티클 목록에서 항목 클릭하여 상세 페이지 이동", async ({ page }) => {
    await waitForLoadingComplete(page);

    const rowCount = await page.locator("tbody tr").count();

    if (rowCount > 0) {
      // 첫 번째 행 클릭
      const firstRow = page.locator("tbody tr").first();
      await firstRow.click();

      // 상세 페이지로 이동 확인
      await page.waitForURL(/\/dashboard\/article\/\d+/, { timeout: 5000 });

      // 상세 페이지 요소 확인
      await expect(page.locator("text=아티클")).toBeVisible();
      await expect(page.locator('button:has-text("수정")')).toBeVisible();
      await expect(page.locator('button:has-text("삭제")')).toBeVisible();
    }
  });

  test("아티클 상세 페이지 - 뒤로 가기 버튼", async ({ page }) => {
    await waitForLoadingComplete(page);

    const rowCount = await page.locator("tbody tr").count();

    if (rowCount > 0) {
      // 상세 페이지로 이동
      await page.locator("tbody tr").first().click();
      await page.waitForURL(/\/dashboard\/article\/\d+/);

      // 뒤로 가기 버튼 클릭
      await page.click('button:has-text("뒤로 가기")');

      // 대시보드로 돌아갔는지 확인
      await expect(page).toHaveURL(/\/dashboard/);
    }
  });

  test("아티클 상세 페이지 - 수정 페이지로 이동", async ({ page }) => {
    await waitForLoadingComplete(page);

    const rowCount = await page.locator("tbody tr").count();

    if (rowCount > 0) {
      // 상세 페이지로 이동
      await page.locator("tbody tr").first().click();
      await page.waitForURL(/\/dashboard\/article\/\d+/);

      // 수정 버튼 클릭
      await page.click('button:has-text("수정")');

      // 수정 페이지로 이동 확인
      await page.waitForURL(/\/dashboard\/article\/edit\/\d+/, {
        timeout: 5000,
      });
      await expect(
        page.locator('h1:has-text("아티클 수정하기")')
      ).toBeVisible();

      // 폼 필드에 기존 데이터가 로드되어 있는지 확인
      const titleInput = page.locator('input[name="title"]');
      await expect(titleInput).not.toHaveValue("");
    }
  });

  test("아티클 상세 페이지 - 삭제 모달 열기/닫기", async ({ page }) => {
    await waitForLoadingComplete(page);

    const rowCount = await page.locator("tbody tr").count();

    if (rowCount > 0) {
      // 상세 페이지로 이동
      await page.locator("tbody tr").first().click();
      await page.waitForURL(/\/dashboard\/article\/\d+/);

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

  test("아티클 수정 페이지 - 취소 버튼", async ({ page }) => {
    await waitForLoadingComplete(page);

    const rowCount = await page.locator("tbody tr").count();

    if (rowCount > 0) {
      // 수정 페이지로 이동
      await page.locator("tbody tr").first().click();
      await page.waitForURL(/\/dashboard\/article\/\d+/);
      const articleId = page.url().split("/").pop();

      await page.click('button:has-text("수정")');
      await page.waitForURL(/\/dashboard\/article\/edit\/\d+/);

      // 취소 버튼 클릭
      const cancelButton = page.locator('button:has-text("취소")').first();
      await cancelButton.click();

      // 상세 페이지로 돌아갔는지 확인
      await expect(page).toHaveURL(
        new RegExp(`/dashboard/article/${articleId}`)
      );
    }
  });

  test("아티클 테이블 렌더링", async ({ page }) => {
    await waitForLoadingComplete(page);

    // 테이블 확인
    const table = page.locator("table");
    await expect(table).toBeVisible();

    // 헤더 확인
    await expect(page.locator('th:has-text("제목")')).toBeVisible();
    await expect(page.locator('th:has-text("내용")')).toBeVisible();
    await expect(page.locator('th:has-text("작성 날짜")')).toBeVisible();
    await expect(page.locator('th:has-text("수정 날짜")')).toBeVisible();
  });

  test("아티클 수정 페이지 - 폼 로드 확인", async ({ page }) => {
    await waitForLoadingComplete(page);

    const rowCount = await page.locator("tbody tr").count();

    if (rowCount > 0) {
      // 상세 페이지로 이동
      await page.locator("tbody tr").first().click();
      await page.waitForURL(/\/dashboard\/article\/\d+/);

      // 수정 버튼 클릭
      await page.click('button:has-text("수정")');
      await page.waitForURL(/\/dashboard\/article\/edit\/\d+/);

      // 폼에 기존 데이터가 로드되어 있는지 확인
      const titleInput = page.locator('input[name="title"]');
      await expect(titleInput).not.toHaveValue("");
    }
  });
});
