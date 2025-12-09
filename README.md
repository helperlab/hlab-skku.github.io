# H-Lab Homepage

H-Lab (Helper Lab) 홈페이지입니다.

## Getting Started

개발 서버를 실행합니다:

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## Build

정적 사이트로 빌드합니다:

```bash
npm run build
```

빌드된 파일은 `out` 디렉토리에 생성됩니다.

## Deploy to GitHub Pages

이 프로젝트는 GitHub Pages에 자동으로 배포됩니다.

1. GitHub 리포지토리 설정에서 Pages를 활성화합니다.
2. Settings > Pages > Source에서 "GitHub Actions"를 선택합니다.
3. `main` 브랜치에 푸시하면 자동으로 빌드되고 배포됩니다.

또는 수동으로 배포하려면:

```bash
npm run build
# out 디렉토리의 내용을 gh-pages 브랜치에 푸시
```

## Project Structure

- `src/app/` - 페이지 컴포넌트
- `src/components/` - 재사용 가능한 컴포넌트
- `public/images/` - 이미지 파일
- `.github/workflows/` - GitHub Actions 워크플로우
