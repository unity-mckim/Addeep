/**
 * 이 파일은 E2E 테스트 작성 예제입니다.
 * 실제 테스트가 아니므로 실행되지 않습니다.
 *
 * 새로운 테스트를 작성할 때 참고하세요.
 */

import { test, expect } from "@playwright/test";
import { login, TEST_USER } from "./helpers/auth";
import {
  switchTab,
  clickCreateButton,
  generateTestData,
  waitForLoadingComplete,
} from "./helpers/common";

// 테스트 스위트 정의
test.describe.skip("예제 테스트 스위트", () => {
  // 각 테스트 전에 실행되는 설정
  test.beforeEach(async ({ page }) => {
    // 로그인
    await login(page, TEST_USER);

    // 특정 탭으로 이동
    await switchTab(page, "뉴스");
  });

  // 각 테스트 후에 실행되는 정리
  test.afterEach(async ({ page }) => {
    // 필요시 정리 작업
  });

  // 기본 테스트 예제
  test("페이지가 올바르게 렌더링됨", async ({ page }) => {
    // 요소가 보이는지 확인
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();

    // 특정 텍스트가 있는지 확인
    await expect(page).toHaveURL(/\/dashboard/);

    // 버튼이 활성화되어 있는지 확인
    const button = page.locator('button:has-text("새로 만들기")');
    await expect(button).toBeEnabled();
  });

  // 폼 제출 테스트 예제
  test("폼을 제출할 수 있음", async ({ page }) => {
    // 생성 페이지로 이동
    await clickCreateButton(page);

    // 테스트 데이터 생성
    const testData = generateTestData("테스트");

    // 폼 필드 채우기
    await page.fill('input[name="title"]', testData.title);
    await page.fill('textarea[name="content"]', testData.content);

    // 제출 버튼 클릭
    await page.click('button[type="submit"]');

    // 성공 메시지 확인
    await expect(page.locator("text=성공")).toBeVisible();
  });

  // 테이블 상호작용 테스트 예제
  test("테이블에서 행을 클릭할 수 있음", async ({ page }) => {
    // 로딩 완료 대기
    await waitForLoadingComplete(page);

    // 테이블 행 개수 확인
    const rowCount = await page.locator("tbody tr").count();

    if (rowCount > 0) {
      // 첫 번째 행 클릭
      await page.locator("tbody tr").first().click();

      // 상세 페이지로 이동 확인
      await page.waitForURL(/\/dashboard\/news\/\d+/);

      // 상세 페이지 요소 확인
      await expect(page.locator('button:has-text("수정")')).toBeVisible();
      await expect(page.locator('button:has-text("삭제")')).toBeVisible();
    } else {
      test.skip();
    }
  });

  // 모달 테스트 예제
  test("모달을 열고 닫을 수 있음", async ({ page }) => {
    await waitForLoadingComplete(page);

    const rowCount = await page.locator("tbody tr").count();

    if (rowCount > 0) {
      // 상세 페이지로 이동
      await page.locator("tbody tr").first().click();
      await page.waitForURL(/\/dashboard\/news\/\d+/);

      // 삭제 버튼 클릭하여 모달 열기
      await page.click('button:has-text("삭제")');

      // 모달이 보이는지 확인
      await expect(page.locator('h2:has-text("삭제 확인")')).toBeVisible();

      // 취소 버튼 클릭
      const cancelButton = page.locator('button:has-text("취소")').last();
      await cancelButton.click();

      // 모달이 닫혔는지 확인
      await expect(page.locator('h2:has-text("삭제 확인")')).not.toBeVisible();
    } else {
      test.skip();
    }
  });

  // 네비게이션 테스트 예제
  test("뒤로 가기가 동작함", async ({ page }) => {
    // 현재 URL 저장
    const dashboardUrl = page.url();

    // 생성 페이지로 이동
    await clickCreateButton(page);
    await expect(page).toHaveURL(/\/create/);

    // 뒤로 가기 버튼 클릭
    await page.click('button:has-text("뒤로 가기")');

    // 대시보드로 돌아왔는지 확인
    await expect(page).toHaveURL(dashboardUrl);
  });

  // 유효성 검사 테스트 예제
  test("빈 폼 제출 시 에러 메시지가 표시됨", async ({ page }) => {
    await clickCreateButton(page);

    // 빈 폼 제출
    await page.click('button[type="submit"]');

    // 에러 메시지 확인
    await expect(page.locator("text=제목을 입력해주세요.")).toBeVisible();
    await expect(page.locator("text=내용을 입력해주세요.")).toBeVisible();
  });

  // Alert 핸들링 예제
  test("Alert를 처리할 수 있음", async ({ page }) => {
    // Alert 핸들러 설정
    page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("alert");
      expect(dialog.message()).toContain("성공");
      await dialog.accept();
    });

    // Alert를 발생시키는 액션
    // await page.click('button:has-text("제출")');
  });

  // 이미지 업로드 테스트 예제
  test("이미지 URL을 입력하면 프리뷰가 표시됨", async ({ page }) => {
    await clickCreateButton(page);

    // 이미지 URL 입력
    const imageUrl = "https://via.placeholder.com/800x600";
    await page.fill('input[name="image"]', imageUrl);

    // 프리뷰 이미지 확인
    const previewImage = page.locator('img[alt="Preview"]');
    await expect(previewImage).toBeVisible();
    await expect(previewImage).toHaveAttribute("src", imageUrl);
  });

  // 조건부 테스트 예제
  test("데이터가 있을 때만 테스트 실행", async ({ page }) => {
    await waitForLoadingComplete(page);

    const rowCount = await page.locator("tbody tr").count();

    // 데이터가 없으면 테스트 건너뛰기
    test.skip(rowCount === 0, "테이블에 데이터가 없습니다");

    // 데이터가 있을 때만 실행되는 코드
    await page.locator("tbody tr").first().click();
    await expect(page).toHaveURL(/\/\d+/);
  });

  // 스크린샷 캡처 예제
  test("스크린샷 캡처", async ({ page }) => {
    // 전체 페이지 스크린샷
    await page.screenshot({ path: "screenshot-full.png", fullPage: true });

    // 특정 요소 스크린샷
    const element = page.locator("h1");
    await element.screenshot({ path: "screenshot-element.png" });
  });

  // 여러 브라우저 컨텍스트 사용 예제
  test("새 탭에서 작업", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("http://localhost:3001");
    await expect(page.locator("text=Admin Dashboard")).toBeVisible();

    await context.close();
  });

  // 네트워크 요청 모니터링 예제
  test("API 요청 확인", async ({ page }) => {
    // 특정 요청 대기
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes("/api/news") && response.status() === 200
    );

    // 요청을 발생시키는 액션
    await page.click('button:has-text("새로고침")');

    // 응답 확인
    const response = await responsePromise;
    expect(response.ok()).toBeTruthy();
  });

  // 로컬 스토리지 조작 예제
  test("로컬 스토리지 사용", async ({ page }) => {
    // 로컬 스토리지 설정
    await page.evaluate(() => {
      localStorage.setItem("test", "value");
    });

    // 로컬 스토리지 읽기
    const value = await page.evaluate(() => {
      return localStorage.getItem("test");
    });

    expect(value).toBe("value");
  });
});
