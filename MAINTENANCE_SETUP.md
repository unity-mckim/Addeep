# 서버 점검 모드 설정 가이드

## 📋 목차

1. [Supabase 테이블 생성](#1-supabase-테이블-생성)
2. [구현된 기능](#2-구현된-기능)
3. [사용 방법](#3-사용-방법)
4. [특징](#4-특징)

---

## 1. Supabase 테이블 생성

Supabase Dashboard(https://supabase.com)에 로그인하여 SQL Editor에서 다음 SQL을 실행하세요:

```sql
-- maintenance_mode 테이블 생성
CREATE TABLE IF NOT EXISTS maintenance_mode (
  id INT PRIMARY KEY DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT false,
  message TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (id = 1) -- 단일 레코드만 허용
);

-- 초기 레코드 삽입
INSERT INTO maintenance_mode (id, is_active, message)
VALUES (1, false, '서비스 점검 중입니다. 빠른 시일 내에 정상화하겠습니다.')
ON CONFLICT (id) DO NOTHING;

-- RLS (Row Level Security) 활성화
ALTER TABLE maintenance_mode ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽을 수 있도록 정책 설정 (anon, authenticated)
CREATE POLICY "Anyone can read maintenance mode"
  ON maintenance_mode
  FOR SELECT
  USING (true);

-- 인증된 사용자만 업데이트 가능 (관리자용)
CREATE POLICY "Authenticated users can update maintenance mode"
  ON maintenance_mode
  FOR UPDATE
  USING (auth.role() = 'authenticated');
```

### ⚠️ 주의사항

- 위의 SQL을 반드시 순서대로 실행하세요.
- 테이블은 단일 레코드(id=1)만 유지됩니다.

---

## 2. 구현된 기능

### 메인 앱 (Landing Page)

- **파일**: `/src/app/layout.tsx`
  - MaintenanceChecker 컴포넌트 통합
- **파일**: `/src/components/MaintenanceChecker.tsx`
  - 점검 모드 상태 실시간 모니터링
  - 모바일/태블릿 환경 감지
  - Supabase Realtime 구독으로 즉시 상태 업데이트
- **파일**: `/src/components/MaintenancePage.tsx`
  - 모바일/데스크톱 반응형 점검 페이지
  - 애니메이션 효과 및 사용자 친화적 UI

### 어드민 대시보드

- **파일**: `/admin/src/app/dashboard/page.tsx`
  - 점검 모드 토글 버튼 추가
  - 실시간 상태 표시 (ON/OFF)
- **파일**: `/admin/src/app/dashboard/maintenance-actions.ts`
  - 점검 모드 토글 서버 액션

---

## 3. 사용 방법

### Step 1: Supabase 테이블 생성

위의 [1. Supabase 테이블 생성](#1-supabase-테이블-생성)의 SQL을 실행하세요.

### Step 2: 어드민 대시보드 접속

1. 어드민 페이지에 로그인
2. Dashboard 페이지 상단에서 "점검 모드 OFF" 또는 "점검 모드 ON" 버튼 확인

### Step 3: 점검 모드 활성화

1. "점검 모드 OFF" 버튼 클릭
2. 상태가 "점검 모드 ON"으로 변경됨
3. 모바일/태블릿 사용자에게 점검 페이지가 표시됨

### Step 4: 점검 모드 비활성화

1. "점검 모드 ON" 버튼 클릭
2. 상태가 "점검 모드 OFF"로 변경됨
3. 모든 사용자가 정상적으로 사이트에 접속 가능

---

## 4. 특징

### ✅ 주요 기능

- **실시간 동기화**: Supabase Realtime을 통한 즉각적인 상태 업데이트
- **모바일 우선**: 현재 모바일/태블릿 환경에서만 점검 페이지 표시
- **원클릭 제어**: 어드민에서 버튼 한 번으로 점검 모드 ON/OFF
- **반응형 디자인**: 모든 디바이스에 최적화된 점검 페이지
- **시각적 피드백**: 현재 상태를 명확하게 표시하는 UI

### 🎨 UI/UX

- 그라데이션 배경과 애니메이션 효과
- 명확한 아이콘 및 메시지
- 문의처 정보 제공
- 점검 모드 상태에 따른 버튼 색상 변경 (빨강/초록)

### 🔧 기술 스택

- **State Management**: TanStack React Query
- **Real-time**: Supabase Realtime Subscription
- **Responsive**: useResponsive 훅 활용
- **Styling**: Tailwind CSS

### 📱 디바이스 지원

- **모바일**: 최대 768px (점검 페이지 표시)
- **태블릿**: 768px ~ 1024px (점검 페이지 표시)
- **데스크톱**: 1024px 이상 (정상 접속, 향후 확장 가능)

---

## 5. 향후 확장 가능성

### 데스크톱 점검 모드 추가

`MaintenanceChecker.tsx`의 조건을 수정하여 데스크톱에서도 점검 모드 적용 가능:

```typescript
// 현재 (모바일/태블릿만)
if (maintenanceStatus?.is_active && isMobileTablet) {
  return <MaintenancePage />;
}

// 모든 디바이스 (데스크톱 포함)
if (maintenanceStatus?.is_active) {
  return <MaintenancePage />;
}
```

### 커스텀 메시지 관리

점검 페이지에 표시할 메시지를 어드민에서 수정할 수 있도록 확장 가능합니다.

### 예약 점검 기능

특정 시간에 자동으로 점검 모드를 활성화/비활성화하는 기능 추가 가능합니다.

---

## 6. 문제 해결

### 점검 모드가 활성화되지 않는 경우

1. Supabase 테이블이 올바르게 생성되었는지 확인
2. RLS 정책이 올바르게 설정되었는지 확인
3. 브라우저 콘솔에서 에러 로그 확인

### 실시간 업데이트가 작동하지 않는 경우

1. Supabase Realtime이 활성화되어 있는지 확인
2. 네트워크 연결 상태 확인
3. 브라우저를 새로고침하여 재연결 시도

### 버튼을 눌러도 상태가 변경되지 않는 경우

1. 어드민 계정이 인증된 사용자인지 확인
2. Supabase UPDATE 권한 확인
3. 브라우저 콘솔에서 에러 메시지 확인

---

## 7. 지원

문제가 발생하거나 문의사항이 있으시면 개발팀에 연락주세요.

📧 Email: support@addeep.com
