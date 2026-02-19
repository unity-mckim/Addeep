# Admin Dashboard E2E Tests

이 디렉토리는 Admin 대시보드의 E2E(End-to-End) 테스트를 포함합니다. Playwright를 사용하여 구현되었습니다.

## 📁 구조

```
e2e/
├── helpers/          # 테스트 헬퍼 함수
│   ├── auth.ts      # 로그인/로그아웃 헬퍼
│   └── common.ts    # 공통 유틸리티 함수
├── auth.spec.ts     # 인증 테스트
├── dashboard.spec.ts # 대시보드 네비게이션 테스트
├── news.spec.ts     # 뉴스 CRUD 테스트
├── announcement.spec.ts # 공지사항 CRUD 테스트
├── events.spec.ts   # 이벤트 CRUD 테스트
└── article.spec.ts  # 아티클 CRUD 테스트
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
yarn install
```

### 2. Playwright 브라우저 설치

```bash
npx playwright install
```

### 3. 환경 변수 설정

`.env` 파일을 생성하고 테스트용 사용자 정보를 설정합니다:

```bash
cp .env.example .env
```

`.env` 파일:

```
TEST_USER_EMAIL=your_test_email@example.com
TEST_USER_PASSWORD=your_test_password
```

⚠️ **중요**: 테스트용 계정을 별도로 만들어 사용하는 것을 권장합니다.

## 🧪 테스트 실행

### 전체 테스트 실행

```bash
yarn test:e2e
```

### UI 모드로 실행 (추천)

```bash
yarn test:e2e:ui
```

UI 모드에서는 각 테스트를 시각적으로 확인하고 디버깅할 수 있습니다.

### 디버그 모드로 실행

```bash
yarn test:e2e:debug
```

### 특정 테스트 파일만 실행

```bash
npx playwright test auth.spec.ts
```

### 특정 브라우저로 실행

```bash
npx playwright test --project=chromium
```

### 테스트 리포트 보기

```bash
yarn test:e2e:report
```

## 📝 테스트 구성

### 인증 테스트 (`auth.spec.ts`)

- ✅ 로그인 페이지 렌더링
- ✅ 유효한 자격증명으로 로그인
- ✅ 이메일/비밀번호 유효성 검사
- ✅ 비밀번호 표시/숨김 토글
- ✅ 로그아웃 기능
- ✅ 인증되지 않은 접근 리다이렉트

### 대시보드 테스트 (`dashboard.spec.ts`)

- ✅ 대시보드 페이지 렌더링
- ✅ 탭 전환 (공지사항, 이벤트, 뉴스, 아티클)
- ✅ 새로고침 버튼
- ✅ 스탯 카드 클릭
- ✅ 테이블 렌더링
- ✅ 페이지네이션

### CRUD 테스트

각 엔티티(뉴스, 공지사항, 이벤트, 아티클)에 대해 다음 기능을 테스트합니다:

#### 생성 (Create)

- ✅ 생성 페이지로 이동
- ✅ 폼 유효성 검사
- ✅ 유효한 데이터로 생성
- ✅ 취소 버튼

#### 읽기 (Read)

- ✅ 목록에서 항목 클릭
- ✅ 상세 페이지 렌더링
- ✅ 뒤로 가기 버튼

#### 수정 (Update)

- ✅ 수정 페이지로 이동
- ✅ 폼에 기존 데이터 로드
- ✅ 취소 버튼

#### 삭제 (Delete)

- ✅ 삭제 모달 열기/닫기
- ✅ 삭제 확인

#### 테이블 기능

- ✅ 테이블 렌더링
- ✅ 정렬 및 필터링
- ✅ 페이지네이션

## 🔧 설정

### `playwright.config.ts`

- **baseURL**: `http://localhost:3001`
- **테스트 디렉토리**: `./e2e`
- **브라우저**: Chromium (기본)
- **리포터**: HTML, List
- **스크린샷**: 실패 시에만
- **비디오**: 실패 시에만
- **Trace**: 재시도 시에만

### 웹 서버 자동 실행

테스트 실행 시 자동으로 개발 서버를 시작합니다 (`yarn dev`). CI 환경에서는 기존 서버를 재사용하지 않습니다.

## 📊 CI/CD 통합

CI 환경에서 테스트를 실행하려면:

```bash
CI=true yarn test:e2e
```

CI 모드에서는:

- 2번 재시도
- 병렬 실행 비활성화
- 기존 서버 재사용 비활성화

## 🛠️ 헬퍼 함수

### `auth.ts`

- `login(page, credentials)`: 로그인 수행
- `logout(page)`: 로그아웃 수행
- `saveAuthState(page, path)`: 인증 상태 저장

### `common.ts`

- `wait(ms)`: 대기
- `waitForLoadingComplete(page)`: 로딩 완료 대기
- `switchTab(page, tabName)`: 탭 전환
- `clickCreateButton(page)`: 새로 만들기 버튼 클릭
- `clickFirstTableRow(page)`: 첫 번째 행 클릭
- `confirmModal(page)`: 모달 확인
- `cancelModal(page)`: 모달 취소
- `setupAlertHandler(page, message)`: Alert 핸들러 설정
- `generateTestData(prefix)`: 테스트 데이터 생성

## 🐛 디버깅

### Playwright Inspector 사용

```bash
yarn test:e2e:debug
```

### 특정 테스트만 디버그

```bash
npx playwright test auth.spec.ts --debug
```

### 브라우저를 열어서 실행

```bash
npx playwright test --headed
```

### Slow Motion으로 실행

```bash
npx playwright test --slow-mo=1000
```

## 📝 베스트 프랙티스

1. **테스트 독립성**: 각 테스트는 독립적으로 실행 가능해야 합니다
2. **테스트 데이터**: 실제 프로덕션 데이터를 사용하지 마세요
3. **선택자**: 가능한 한 의미 있는 텍스트나 role 기반 선택자를 사용하세요
4. **대기**: `waitForSelector`, `waitForURL` 등을 적절히 사용하세요
5. **정리**: 테스트 후 생성된 데이터를 정리하세요 (필요한 경우)

## 🚨 주의사항

- 테스트는 **개발 환경**에서 실행됩니다 (port 3001)
- 프로덕션 데이터베이스에 연결하지 마세요
- 테스트용 계정을 별도로 만들어 사용하세요
- `.env` 파일은 절대 커밋하지 마세요

## 📚 참고 자료

- [Playwright 공식 문서](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
