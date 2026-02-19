# Press Media 테이블 마이그레이션 가이드

## 문제 해결 요약

press-media 생성 시 500 에러가 발생했던 원인:

1. **Next.js 15 Server Actions의 보안 정책**: Server Actions에서 `throw` 된 에러는 보안상의 이유로 클라이언트에 세부 정보가 전달되지 않습니다.
2. **해결 방법**: 에러를 `throw`하는 대신 에러 객체를 `return`하도록 수정했습니다.

## Supabase 데이터베이스 마이그레이션

Supabase Dashboard(https://supabase.com)에 로그인하여 SQL Editor에서 다음 SQL을 실행하세요:

### 1. 파일 관련 컬럼 추가 (없는 경우만)

```sql
-- press_media 테이블에 파일 관련 컬럼 추가
ALTER TABLE press_media
  ADD COLUMN IF NOT EXISTS file_url TEXT,
  ADD COLUMN IF NOT EXISTS file_name TEXT,
  ADD COLUMN IF NOT EXISTS file_type TEXT,
  ADD COLUMN IF NOT EXISTS file_size INTEGER;
```

### 2. Storage 버킷 생성 (없는 경우만)

Supabase Dashboard에서:
1. **Storage** 메뉴로 이동
2. **Create bucket** 클릭
3. 버킷 이름: `press-media`
4. **Public bucket** 체크 (파일 다운로드를 위해)
5. **Save** 클릭

또는 SQL로 생성:

```sql
-- press-media storage bucket 생성 (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('press-media', 'press-media', true)
ON CONFLICT (id) DO NOTHING;

-- 모든 사용자가 파일을 읽을 수 있도록 정책 설정
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'press-media');

-- 인증된 사용자만 파일 업로드 가능
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'press-media' AND auth.role() = 'authenticated');

-- 인증된 사용자만 파일 삭제 가능
CREATE POLICY "Authenticated users can delete files"
ON storage.objects FOR DELETE
USING (bucket_id = 'press-media' AND auth.role() = 'authenticated');
```

### 3. 테이블 구조 확인

현재 `press_media` 테이블이 다음 컬럼들을 포함하는지 확인:

```sql
-- 테이블 구조 확인
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'press_media'
ORDER BY ordinal_position;
```

예상되는 컬럼 목록:
- `id` (uuid/text, primary key)
- `title` (text)
- `content` (text)
- `image_url` (text, nullable)
- `file_url` (text, nullable) ✨ 새로 추가
- `file_name` (text, nullable) ✨ 새로 추가
- `file_type` (text, nullable) ✨ 새로 추가
- `file_size` (integer, nullable) ✨ 새로 추가
- `published_date` (date)
- `is_featured` (boolean)
- `display_order` (integer)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## 코드 변경 사항

### 1. `press-media/actions.ts`
- ✅ 모든 함수에서 `throw` 대신 에러 객체 `return`
- ✅ 성공 시: `{ success: true, data: ... }`
- ✅ 실패 시: `{ success: false, error: "에러 메시지" }`

### 2. `press-media/create/page.tsx`
- ✅ `onSuccess`에서 `result.success` 확인
- ✅ `uploadPressFile` 결과 확인 및 에러 처리

### 3. `press-media/edit/[id]/page.tsx`
- ✅ `onSuccess`에서 `result.success` 확인

### 4. `interface/press-media.ts`
- ✅ 파일 관련 필드 추가 (file_url, file_name, file_type, file_size)

## 테스트 방법

1. Supabase SQL Editor에서 위의 SQL 실행
2. 개발 서버 재시작
   ```bash
   cd apps/admin
   yarn dev
   ```
3. 어드민 대시보드에서 보도자료 생성 테스트
   - 제목, 내용, 발행일 입력
   - 이미지 URL (선택)
   - 파일 업로드 (선택)
   - 생성 버튼 클릭

## 지원 파일 형식

- PDF (.pdf)
- Word (.doc, .docx)
- Excel (.xls, .xlsx)
- PowerPoint (.ppt, .pptx)
- ZIP (.zip)
- 최대 파일 크기: 50MB

## 참고 사항

- Next.js 15에서는 Server Actions의 보안이 강화되어 에러를 직접 throw하면 클라이언트에 세부 정보가 전달되지 않습니다.
- 대신 에러를 catch하고 적절한 형태로 return하여 클라이언트에서 처리해야 합니다.
- 이는 API 주소, 데이터베이스 정보 등 민감한 정보가 클라이언트에 노출되는 것을 방지하기 위한 조치입니다.

