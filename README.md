# 유치원행정실무사 교육본부 (Kindergarten Admin Master)

이 프로젝트는 React + Vite로 구축된 **유치원행정실무사 교육본부** 랜딩 페이지입니다.
Cloudflare Pages를 통해 배포되며, GitHub 저장소와 연동되어 있습니다.

## 🚀 배포 및 업데이트 가이드

이 웹사이트는 **[Cloudflare Pages](https://pages.cloudflare.com/)**에 배포되어 있으며,
GitHub의 `main` 브랜치가 업데이트될 때마다 **자동으로 감지하여 배포**됩니다.

### 웹사이트 수정 방법

1.  **코드 수정**: VS Code 등 에디터에서 원하는 코드를 수정합니다.
2.  **로컬 테스트**: 터미널에서 아래 명령어로 수정 사항을 미리 확인합니다.
    ```bash
    npm run dev
    ```
    (브라우저에서 `http://localhost:5173` 접속)
3.  **GitHub에 업로드 (배포 시작)**:
    수정이 완료되면 터미널에 아래 명령어들을 순서대로 입력합니다.

    ```bash
    # 1. 변경된 파일 모두 선택
    git add .

    # 2. 변경 내용 설명 기록 (따옴표 안에 내용을 적으세요)
    git commit -m "수정 사항 설명"

    # 3. GitHub로 전송 (이때 자동으로 배포됨)
    git push origin main
    ```

4.  **배포 확인**:
    `git push` 후 약 1~2분 뒤에 웹사이트 주소로 접속하면 변경 사항이 반영되어 있습니다.

---

## 🛠 주요 명령어

- `npm install`: 의존성 설치 (최초 1회)
- `npm run dev`: 개발 서버 실행
- `npm run build`: 배포용 빌드

## 📁 프로젝트 구조

- `src/App.jsx`: 메인 페이지 코드 (텍스트, 이미지 등 수정 시 이곳 확인)
- `src/assets/`: 이미지 파일들이 위치한 폴더
