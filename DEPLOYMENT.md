# 추천인닷컴 배포 가이드

## 현재 배포 구성

- 호스팅: Cloudflare Workers
- Worker 이름: `falling-term-609f`
- 기준 도메인: `https://chucheonin.com`
- 정적 파일 디렉터리: `deploy-ready-v2`
- 배포 설정 파일: `wrangler.toml`
- Worker 파일: `worker.js`
- 사이트맵: `https://chucheonin.com/sitemap.xml`

`worker.js`는 대표 도메인 리다이렉트, `/index.html` 정리, 깨끗한 URL 라우팅을 처리합니다.

## GitHub 자동 배포

GitHub 저장소의 `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 실행되어 Cloudflare Workers에 자동 배포됩니다.

GitHub 저장소에는 아래 Actions Secrets가 필요합니다.

```text
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

Secrets 등록 위치:

1. GitHub 저장소 접속
2. **Settings**
3. **Secrets and variables**
4. **Actions**
5. **New repository secret**

자동 배포가 연결되면 일반 작업 흐름은 아래와 같습니다.

```text
파일 수정 → git commit → git push → GitHub Actions 자동 배포
```

## 수동 Cloudflare Workers 배포

자동 배포를 쓰지 않고 로컬에서 직접 배포할 경우:

```powershell
$env:PATH='C:\Users\PC\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;C:\Users\PC\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin;'+$env:PATH
& 'C:\Users\PC\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' dlx wrangler@latest deploy
```

## 배포 전 확인

1. 수정한 원본 파일이 `deploy-ready-v2`에도 반영되어 있는지 확인합니다.
2. `sitemap.xml`의 새 URL과 `lastmod`를 확인합니다.
3. 추천코드, 외부 이동 링크, 파트너스 고지 문구를 확인합니다.
4. 개인정보처리방침과 문의 이메일을 확인합니다.

## 검색엔진 등록

1. Google Search Console에 `https://chucheonin.com/sitemap.xml`을 제출합니다.
2. 네이버 서치어드바이저에 동일한 사이트맵을 제출합니다.
3. 메인 페이지와 각 상세 페이지의 색인 생성을 요청합니다.

## 배포 후 점검

- 데스크톱과 모바일에서 레이아웃 확인
- 추천코드 복사 기능 확인
- 외부 앱 이동 버튼 확인
- 404 페이지 확인
- HTTPS 및 `www`/비-`www` 대표 주소 통일 확인
- Search Console 색인 및 구조화 데이터 오류 확인
