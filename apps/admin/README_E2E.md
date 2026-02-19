# Admin Dashboard E2E Tests

Admin 대시보드의 주요 기능을 검증하는 Playwright 기반 E2E 테스트입니다.

## 🎯 테스트 범위

### 1. 인증 (Authentication)

- 로그인/로그아웃
- 비밀번호 표시/숨김
- 인증되지 않은 접근 차단
- 유효성 검사

### 2. 대시보드 (Dashboard)

- 페이지 렌더링
- 탭 전환 (공지사항, 이벤트, 뉴스, 아티클)
- 테이블 표시
- 페이지네이션

### 3. CRUD 기능

각 엔티티(공지사항, 이벤트, 뉴스, 아티클)에 대해:

- ✅ Create (생성)
- ✅ Read (조회)
- ✅ Update (수정)
- ✅ Delete (삭제)

## 🚀 빠른 시작

### 1. Playwright 설치

```bash
cd admin
yarn install
npx playwright install
```

### 2. 환경 변수 설정

```bash
cp e2e.env.example .env
```

`.env` 파일을 열어 테스트용 계정 정보를 입력합니다:

```env
TEST_USER_EMAIL=your_test_email@example.com
TEST_USER_PASSWORD=your_test_password
```

### 3. 개발 서버 실행 (별도 터미널)

```bash
yarn dev
```

### 4. 테스트 실행

```bash
# 전체 테스트 실행
yarn test:e2e

# UI 모드로 실행 (추천)
yarn test:e2e:ui

# 디버그 모드
yarn test:e2e:debug

# 특정 테스트만 실행
npx playwright test e2e/auth.spec.ts
```

## 📊 테스트 명령어

| 명령어                 | 설명                             |
| ---------------------- | -------------------------------- |
| `yarn test:e2e`        | 모든 E2E 테스트 실행             |
| `yarn test:e2e:ui`     | Playwright UI 모드로 테스트 실행 |
| `yarn test:e2e:debug`  | 디버그 모드로 테스트 실행        |
| `yarn test:e2e:report` | 테스트 리포트 열기               |

## 📁 테스트 파일 구조

```
admin/
├── e2e/
│   ├── helpers/
│   │   ├── auth.ts           # 로그인/로그아웃 헬퍼
│   │   └── common.ts          # 공통 유틸리티
│   ├── auth.spec.ts           # 인증 테스트
│   ├── dashboard.spec.ts      # 대시보드 테스트
│   ├── news.spec.ts          # 뉴스 CRUD
│   ├── announcement.spec.ts   # 공지사항 CRUD
│   ├── events.spec.ts        # 이벤트 CRUD
│   ├── article.spec.ts       # 아티클 CRUD
│   └── README.md             # 상세 문서
├── playwright.config.ts       # Playwright 설정
└── package.json              # 테스트 스크립트
```

## 🔧 주요 설정

### `playwright.config.ts`

- **Base URL**: `http://localhost:3001`
- **Timeout**: 30초
- **Retries**: CI에서 2번, 로컬에서 0번
- **Reporters**: HTML, List
- **Screenshots**: 실패 시
- **Videos**: 실패 시
- **Traces**: 재시도 시

## 📝 테스트 작성 예제

```typescript
import { test, expect } from "@playwright/test";
import { login, TEST_USER } from "./helpers/auth";

test.describe("내 기능 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, TEST_USER);
  });

  test("특정 기능이 동작함", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.locator("text=Dashboard")).toBeVisible();
  });
});
```

## 🐛 디버깅 팁

### 1. UI 모드 사용

```bash
yarn test:e2e:ui
```

각 단계를 시각적으로 확인하고 재생할 수 있습니다.

### 2. 특정 테스트만 실행

```bash
npx playwright test auth.spec.ts
```

### 3. 브라우저를 보면서 실행

```bash
npx playwright test --headed
```

### 4. Slow Motion으로 실행

```bash
npx playwright test --slow-mo=1000
```

### 5. Debug 모드

```bash
npx playwright test --debug
```

## ⚠️ 주의사항

1. **테스트용 계정 사용**: 실제 프로덕션 계정을 사용하지 마세요
2. **개발 환경에서만 실행**: 프로덕션 DB에 연결하지 마세요
3. **병렬 실행 주의**: 데이터 충돌을 방지하기 위해 `fullyParallel: false` 설정
4. **환경 변수 보안**: `.env` 파일은 절대 커밋하지 마세요

## 🔍 문제 해결

### 테스트가 타임아웃됨

- 개발 서버가 실행 중인지 확인
- `playwright.config.ts`의 timeout 설정 증가

### 로그인 실패

- `.env` 파일의 테스트 계정 정보 확인
- Supabase 연결 확인

### 요소를 찾을 수 없음

- 페이지 로딩 대기: `await page.waitForSelector()`
- 선택자 확인: Playwright Inspector 사용

## 📚 참고 자료

- [Playwright 공식 문서](https://playwright.dev/)
- [E2E 테스트 베스트 프랙티스](https://playwright.dev/docs/best-practices)
- [Playwright API](https://playwright.dev/docs/api/class-playwright)

## 📈 테스트 커버리지

현재 테스트는 다음 주요 사용자 플로우를 커버합니다:

- ✅ 로그인 → 대시보드 접근
- ✅ 각 탭(공지사항, 이벤트, 뉴스, 아티클) 전환
- ✅ 항목 생성 (폼 유효성 검사 포함)
- ✅ 항목 목록 조회
- ✅ 항목 상세 보기
- ✅ 항목 수정
- ✅ 항목 삭제 (모달 확인 포함)
- ✅ 네비게이션 (뒤로가기, 취소 등)

## 🚀 CI/CD 통합

GitHub Actions에서 실행하려면:

```yaml
- name: Install dependencies
  run: yarn install

- name: Install Playwright Browsers
  run: npx playwright install --with-deps

- name: Run E2E tests
  run: yarn test:e2e
  env:
    TEST_USER_EMAIL: ${{ secrets.TEST_USER_EMAIL }}
    TEST_USER_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}
```
