# Fork Sync 담당자 설정 가이드 (Setup Guide)

> owner 레포(dev) → 개인 fork(dev) 자동 동기화를 위한 설정 문서입니다.
> 앞으로 담당자가 바뀌어도 이 문서의 절차만 따르면 sync workflow는 그대로 작동합니다.

---

## 1. 필요한 정보

새 담당자는 아래 3가지만 준비하면 됩니다.

### • GitHub 계정 아이디

예: `mckim`

### • Fork한 개인 레포 이름

예: `Addeep`

### • Personal Access Token (PAT)

* Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
* 권한: **repo (Full control of private repositories)**
* 이 Token을 fork 레포에 push할 때 사용합니다.

---

## 2. Owner Repo에 입력해야 하는 Secrets (필수)

Owner 레포의 GitHub Actions 설정에서 아래 3개를 등록/수정합니다.

| Secret Key   | 설명                    | 값 예시              |
| ------------ | --------------------- | ----------------- |
| `FORK_OWNER` | 포크 소유자 GitHub ID      | `user1234`    |
| `FORK_REPO`  | 포크 레포 이름              | `Addeep` |
| `FORK_TOKEN` | Personal Access Token | `ghp_xxxxx...`    |

### 위치

```
Owner Repo → Settings → Secrets and variables → Actions
```

Secrets 3개만 교체하면 자동 sync가 새 담당자로 전환됩니다.

---

## 3. 담당자 변경 시 해야 할 일 (3단계)

1. 새 담당자가 Personal Access Token 생성
2. 새 담당자가 fork 생성 후 레포 이름 확인
3. Owner repo의 Secrets 3개(FORK_OWNER, FORK_REPO, FORK_TOKEN) 변경

### ⚡ YAML 파일은 절대 수정할 필요 없음

sync workflow는 secrets 값만으로 자동으로 연동됩니다.

---

## 4. 정상 동작 테스트 방법

담당자가 Secrets를 모두 넣었으면 아래처럼 dev에 빈 커밋을 한 번 올립니다.

```
git commit --allow-empty -m "test sync"
git push origin dev
```

### GitHub Actions 로그에서 다음과 같은 메시지가 보이면 성공:

```
Pushed to https://github.com/{FORK_OWNER}/{FORK_REPO} (branch: dev)
```

---

## 5. 주의사항

### ❌ Token 권한 부족 시 sync 실패 (403 error)

반드시 Classic PAT 기준으로 **repo 전체 권한(Full control of private repositories)** 권한을 줘야 합니다.

### ❌ YAML 수정 금지

기존 sync 구조는 이미 완성된 형태입니다. Secrets 값만 해당 담당자로 교체하세요.

### ❌ Token은 반드시 담당자 개인 계정에서 발급

Fork 레포에 push해야 하므로 담당자 계정의 token이어야 합니다.

---

## 6. Sync 동작 구조 이해하기

```
owner repo dev push
        ↓
GitHub Actions Workflow 실행
        ↓
owner/dev checkout
        ↓
fork/dev 로 force-push (mirror sync)
```

새 담당자의 fork가 자동으로 최신 상태로 유지됩니다.

---

## 7. 마무리

이 문서만 fork 저장소에 비치해두면,
프론트 담당자가 바뀌어도 sync 자동화가 끊기지 않고 유지됩니다.
YAML 파일을 수정할 필요도 전혀 없습니다.

필요 시 token 발급 가이드, fork 생성 가이드도 추가 가능.
