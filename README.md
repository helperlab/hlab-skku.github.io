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
- `src/data/` - 연구 과제 데이터 파일
  - `research-areas.json` - 연구 영역 기본 정보
  - `projects/` - 연구 과제별 개별 파일
- `public/images/` - 이미지 파일
- `.github/workflows/` - GitHub Actions 워크플로우

## 연구 과제 관리

연구 과제는 텍스트 파일(JSON)로 관리되며, 코드 수정 없이 내용을 추가/수정할 수 있습니다.

### 파일 구조

```
src/data/
├── research-areas.json          # 연구 영역 기본 정보
└── projects/
    ├── robot_ai/                # Robot Physical AI 프로젝트
    │   ├── whole-body-control.json
    │   ├── sim2real-transfer.json
    │   └── robot-manipulation.json
    ├── assist_ai/               # Human Assistive AI 프로젝트
    │   ├── rag-llm.json
    │   └── multimodal-learning.json
    └── health_ai/               # Healthcare AI 프로젝트
        ├── gait-analysis.json
        ├── activity-tracking.json
        ├── clinical-data-mining.json
        └── early-detection-children.json

public/
└── projects/                    # 프로젝트별 이미지 (JSON 파일명과 동일한 폴더명)
    ├── robot_ai/
    │   ├── whole-body-control/  # whole-body-control.json의 이미지
    │   └── sim2real-transfer/    # sim2real-transfer.json의 이미지
    ├── assist_ai/
    └── health_ai/
```

**파일 보관:**
- JSON: `src/data/projects/{areaId}/프로젝트명.json`
- 이미지: `public/projects/{areaId}/프로젝트명/` (JSON 파일명과 동일)

### 새 연구 과제 추가하기

1. **프로젝트 JSON 파일 생성**

   `src/data/projects/{areaId}/` 폴더에 새 JSON 파일을 생성합니다.

   예: `src/data/projects/robot_ai/new-project.json`

   (이미지는 필요시 `public/projects/robot_ai/new-project/` 폴더에 저장)

   ```json
   {
     "title": "프로젝트 제목",
     "description": "짧은 설명 (영문)",
     "iconName": "Bot",
     "overview": {
       "description": "연구 목표 및 배경 설명...",
       "images": ["/projects/robot_ai/new-project/overview.png"],
       "videos": [{"url": "https://www.youtube.com/embed/VIDEO_ID", "title": "제목"}]
     },
     "content": {
       "description": "연구 내용 및 방법 설명...",
       "images": ["/projects/robot_ai/new-project/content.png"],
       "videos": []
     },
     "expectedEffects": "기대 효과 및 기여도 설명...",
     "url": null
   }
   ```

2. **연구 영역 파일에 프로젝트 추가**

   `src/data/research-areas.json` 파일에서 해당 연구 영역의 `projectFiles` 배열에 새 프로젝트 파일 경로를 추가합니다.

   ```json
   {
     "id": "robot_ai",
     "projectFiles": [
       "projects/robot_ai/whole-body-control.json",
       "projects/robot_ai/sim2real-transfer.json",
       "projects/robot_ai/new-project.json"  // 새 프로젝트 추가
     ]
   }
   ```

3. **Research 페이지에 import 추가**

   `src/app/research/page.tsx` 파일에서:
   - 프로젝트 파일을 import합니다
   - `projectMap` 객체에 매핑을 추가합니다

   ```typescript
   // import 추가
   import newProject from "@/data/projects/robot/new-project.json";

   // projectMap에 추가
   const projectMap: Record<string, any> = {
       // ... 기존 프로젝트들
       "projects/robot/new-project.json": newProject,
   };
   ```

### 기존 연구 과제 수정하기

해당 프로젝트의 JSON 파일만 편집하면 됩니다.

예: `src/data/projects/robot/whole-body-control.json` 파일을 열어 내용을 수정합니다.

### 프로젝트 JSON 파일 필드 설명

- **title** (필수): 프로젝트 제목
- **description** (필수): 짧은 설명 (영문)
- **iconName** (필수): 아이콘 이름
  - 사용 가능: `Bot`, `Brain`, `HeartPulse`, `Microscope`, `Cpu`, `Database`
- **overview** (선택): 연구 개요
  - **description**: 연구 목표 및 배경 설명
  - **images**: 이미지 경로 배열 (예: `["/projects/robot_ai/project-name/image.png"]`)
  - **videos**: 동영상 배열 (예: `[{"url": "https://youtube.com/embed/ID", "title": "제목"}]`)
- **content** (선택): 연구 내용
  - **description**: 연구 내용 및 방법 설명
  - **images**: 이미지 경로 배열
  - **videos**: 동영상 배열
- **expectedEffects** (선택): 기대 효과 설명
- **url** (선택): 외부 링크 URL (없으면 `null`)

### 이미지 및 동영상 관리

**간단한 규칙:**

1. **이미지 폴더**: JSON 파일명과 동일한 이름의 폴더에 저장
   - JSON: `robot_ai/whole-body-control.json`
   - 폴더: `public/projects/robot_ai/whole-body-control/`

2. **경로 작성**: `/projects/{areaId}/{projectName}/파일명`
   ```json
   {
     "overview": {
       "images": ["/projects/robot_ai/whole-body-control/overview.png"]
     }
   }
   ```

3. **동영상**: YouTube URL 사용 권장
   ```json
   {
     "videos": [{"url": "https://www.youtube.com/embed/VIDEO_ID", "title": "제목"}]
   }
   ```

### 텍스트 포맷

- 줄바꿈은 `\n\n`을 사용하여 단락을 구분합니다
- 마크다운 형식은 지원되지 않으며, 일반 텍스트로 작성합니다
