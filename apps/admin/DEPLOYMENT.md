# Admin Dashboard 배포 가이드

## 배포 환경에서 Supabase 설정

### 방법 1: Docker Compose 사용 (권장)

1. **환경 변수 파일 생성**

```bash
# .env.production 파일 생성
cp .env.production.example .env.production
```

2. **환경 변수 설정**
   `.env.production` 파일을 열고 실제 값으로 수정:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key
```

3. **Docker Compose로 실행**

```bash
docker-compose --env-file .env.production up -d
```

### 방법 2: Docker 직접 실행

```bash
# 이미지 빌드
docker build -t admin-dashboard .

# 컨테이너 실행 (환경 변수 직접 지정)
docker run -d \
  -p 3001:3001 \
  -e NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key \
  -e NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key \
  --name admin-dashboard \
  admin-dashboard
```

### 방법 3: Kubernetes / 클라우드 플랫폼

**Kubernetes Secret 예시:**

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: admin-supabase-secrets
type: Opaque
stringData:
  NEXT_PUBLIC_SUPABASE_URL: "https://your-project.supabase.co"
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "your_actual_anon_key"
  NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY: "your_actual_service_role_key"
```

**Deployment 설정:**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: admin-dashboard
spec:
  template:
    spec:
      containers:
        - name: admin
          image: your-registry/admin-dashboard:latest
          envFrom:
            - secretRef:
                name: admin-supabase-secrets
```

## 로컬 개발 환경

로컬 개발 시에는 `.env.local` 파일 사용:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://cgojadkcijfvmmxmstyq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_dev_key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_dev_service_key
```

```bash
yarn dev
```

## 보안 권장사항

1. **절대로 프로덕션 키를 Git에 커밋하지 마세요**
2. **서비스 역할 키는 매우 민감한 정보입니다** - RLS를 우회할 수 있습니다
3. **환경 변수는 시크릿 관리 시스템 사용 권장:**
   - AWS Secrets Manager
   - Google Cloud Secret Manager
   - HashiCorp Vault
   - Azure Key Vault

## 문제 해결

### "Invalid login credentials" 에러

- 환경 변수가 런타임에 제대로 전달되었는지 확인
- Supabase 프로젝트 URL이 정확한지 확인
- 키가 만료되지 않았는지 확인

### 환경 변수 확인

```bash
# 컨테이너 내부에서 확인
docker exec admin-dashboard env | grep SUPABASE
```

## 헬스 체크

애플리케이션이 정상적으로 실행 중인지 확인:

```bash
curl http://localhost:3001
```
