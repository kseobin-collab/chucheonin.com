# 추천인닷컴 배포 가이드

## 권장 구성

- 호스팅: Cloudflare Pages
- 기준 도메인: `chucheonin.com`
- 빌드 명령어: `exit 0`
- 빌드 출력 디렉터리: `.` (프로젝트 최상위 폴더)
- 사이트맵: `https://chucheonin.com/sitemap.xml`

이 프로젝트는 별도의 빌드 과정이나 서버가 필요 없는 정적 웹사이트입니다.

## 배포 전 확인

1. `chucheonin.com` 도메인의 실제 구매 가능 여부를 등록기관에서 확인합니다.
2. 다른 도메인을 사용할 경우 모든 HTML의 `canonical`, Open Graph URL과 `sitemap.xml`, `robots.txt`의 도메인을 교체합니다.
3. 빗썸 코드 `ABC1004`와 공식 이동 링크가 올바른지 최종 확인합니다.
4. 파트너스 고지 문구와 개인정보처리방침을 실제 운영 형태에 맞게 검토합니다.

## Cloudflare Pages 배포

1. GitHub에서 새 저장소를 만들고 이 폴더의 파일을 업로드합니다.
2. Cloudflare 대시보드에서 **Workers & Pages → Create → Pages → Connect to Git**을 선택합니다.
3. 생성한 GitHub 저장소를 연결합니다.
4. Framework preset은 `None`, Build command는 `exit 0`, Build output directory에는 `.`을 입력합니다.
5. 배포 완료 후 제공된 임시 주소에서 메인, 상세 페이지, 복사 버튼과 외부 이동 버튼을 확인합니다.
6. **Custom domains**에서 구매한 도메인을 연결합니다.
7. HTTPS 인증서가 활성화된 뒤 실제 도메인으로 다시 점검합니다.

Git을 사용하지 않으려면 Cloudflare Pages의 Direct Upload 방식으로 프로젝트 폴더 전체를 업로드할 수 있습니다.

## 검색엔진 등록

1. Google Search Console에 도메인 속성을 추가하고 DNS로 소유권을 인증합니다.
2. `https://chucheonin.com/sitemap.xml`을 제출합니다.
3. 네이버 서치어드바이저에 사이트를 등록하고 동일한 사이트맵을 제출합니다.
4. 메인 페이지와 빗썸 상세 페이지의 색인 생성을 요청합니다.

## 배포 후 점검

- 데스크톱과 모바일에서 레이아웃 확인
- `ABC1004` 복사 기능 확인
- 빗썸 공식 초대 페이지 이동 확인
- 404 페이지 확인
- HTTPS 및 `www`/비-`www` 대표 주소 통일
- Search Console 색인 및 구조화 데이터 오류 확인
