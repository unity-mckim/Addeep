import { Page, expect } from "@playwright/test";

/**
 * 특정 시간만큼 대기
 */
export async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 로딩이 완료될 때까지 대기
 */
export async function waitForLoadingComplete(
  page: Page,
  timeout: number = 10000
): Promise<void> {
  try {
    // "Loading..." 텍스트가 사라질 때까지 대기
    await page.waitForSelector("text=Loading...", { state: "hidden", timeout });
  } catch (error) {
    // 이미 로딩이 끝났을 수 있음
  }
}

/**
 * 특정 탭으로 전환
 */
export async function switchTab(
  page: Page,
  tabName: "공지사항" | "이벤트" | "뉴스" | "아티클"
): Promise<void> {
  await page.click(`button:has-text("${tabName}")`);
  await waitForLoadingComplete(page);
}

/**
 * 새로 만들기 버튼 클릭
 */
export async function clickCreateButton(page: Page): Promise<void> {
  await page.click('button:has-text("새로 만들기")');
  await page.waitForURL("**/create", { timeout: 5000 });
}

/**
 * 테이블에서 첫 번째 행 클릭
 */
export async function clickFirstTableRow(page: Page): Promise<void> {
  const firstRow = page.locator("tbody tr").first();
  await expect(firstRow).toBeVisible();
  await firstRow.click();
  await page.waitForURL(/\/\d+$/, { timeout: 5000 });
}

/**
 * 모달 확인 버튼 클릭
 */
export async function confirmModal(page: Page): Promise<void> {
  await page.click('button:has-text("삭제하기")');
  await wait(1000); // Alert 대기
}

/**
 * 모달 취소 버튼 클릭
 */
export async function cancelModal(page: Page): Promise<void> {
  await page.click('button:has-text("취소")');
}

/**
 * Alert 핸들러 설정
 */
export function setupAlertHandler(page: Page, expectedMessage?: string): void {
  page.on("dialog", async (dialog) => {
    if (expectedMessage) {
      expect(dialog.message()).toContain(expectedMessage);
    }
    await dialog.accept();
  });
}

/**
 * 랜덤 문자열 생성
 */
export function generateRandomString(length: number = 8): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 테스트용 데이터 생성
 */
export interface TestData {
  title: string;
  content: string;
  image?: string;
}

export function generateTestData(prefix: string = "Test"): TestData {
  const timestamp = Date.now();
  return {
    title: `${prefix} Title ${timestamp}`,
    content: `${prefix} Content ${timestamp} - This is a test content for E2E testing.`,
    image: "https://via.placeholder.com/800x600",
  };
}
