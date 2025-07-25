# SYNC-WAVE-FE

SYNC-WAVE-FE는 React 기반의 프론트엔드 애플리케이션으로, 사용자 인증, 할 일 관리, 스케줄 관리, 대시보드 등의 기능을 제공하는 웹 애플리케이션입니다.

## 📋 목차

- [기술 스택](#기술-스택)
- [주요 기능](#주요-기능)
- [프로젝트 구조](#프로젝트-구조)
- [설치 및 실행](#설치-및-실행)
- [API 엔드포인트](#api-엔드포인트)
- [주요 컴포넌트](#주요-컴포넌트)
- [상태 관리](#상태-관리)
- [라우팅](#라우팅)
- [스타일링](#스타일링)
- [환경 설정](#환경-설정)

## 🛠 기술 스택

### Frontend
- **React 19.0.0** - 사용자 인터페이스 구축
- **React Router DOM 7.1.1** - 클라이언트 사이드 라우팅
- **TypeScript 5.8.3** - 타입 안전성
- **Axios 1.7.9** - HTTP 클라이언트
- **Styled Components 6.1.13** - CSS-in-JS 스타일링
- **Date-fns 2.30.0** - 날짜 처리 라이브러리

### 개발 도구
- **Create React App** - React 애플리케이션 부트스트랩
- **ESLint** - 코드 품질 관리
- **Cross-env** - 환경 변수 관리

## ✨ 주요 기능

### 🔐 인증 시스템
- **로그인/로그아웃**: JWT 토큰 기반 인증
- **회원가입**: 사용자 등록 및 프로필 설정
- **비밀번호 재설정**: 이메일을 통한 비밀번호 재설정
- **권한 관리**: ROLE_MASTER, ROLE_USER 역할 기반 접근 제어

### 📊 대시보드
- **개요 정보**: 사용자별 일정 및 할 일 요약
- **진행 중인 일정**: 현재 진행 중인 스케줄 표시
- **할 일 현황**: 완료/미완료 할 일 통계
- **빠른 네비게이션**: 스케줄 및 할 일 페이지로 이동

### 📅 스케줄 관리
- **일정 목록**: 진행 중/만료된 일정 분류
- **일정 상세**: 제목, 설명, 시작/종료 시간 표시
- **상태 관리**: PENDING, IN_PROGRESS, COMPLETED, CANCELLED

### ✅ 할 일 관리
- **할 일 목록**: CRUD 기능 제공
- **상태 토글**: 완료/미완료 상태 변경
- **필터링**: 상태별 할 일 필터링
- **검색**: 할 일 제목 기반 검색

### 👤 사용자 관리
- **프로필 정보**: 사용자 정보 조회 및 수정
- **전화번호 검증**: 11자리 숫자 형식 검증
- **실시간 유효성 검사**: 입력 데이터 검증

## 📁 프로젝트 구조

```
src/
├── api/                    # API 호출 함수
│   └── todosApi.js
├── components/             # 재사용 가능한 컴포넌트
│   ├── auth/              # 인증 관련 컴포넌트
│   │   └── ProtectedRoute.js
│   ├── board/             # 게시판 관련 컴포넌트
│   ├── common/            # 공통 컴포넌트
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Sidebar.js
│   │   └── LoadingOverlay.js
│   └── todo/              # 할 일 관련 컴포넌트
│       ├── TodoForm.js
│       ├── TodoItem.js
│       └── TodoModal.js
├── contexts/              # React Context
│   ├── AuthContext.js     # 인증 상태 관리
│   └── LoadingContext.js  # 로딩 상태 관리
├── features/              # 기능별 모듈
│   ├── auth/
│   ├── board/
│   └── todo/
├── hooks/                 # 커스텀 훅
│   ├── useAuth.js
│   ├── useAuth.ts
│   └── useTodos.ts
├── pages/                 # 페이지 컴포넌트
│   ├── Home.js           # 대시보드
│   ├── Login.js          # 로그인
│   ├── Signup.js         # 회원가입
│   ├── MyInfo.js         # 내 정보
│   ├── TodoListPage.js   # 할 일 목록
│   ├── TodoDetailPage.js # 할 일 상세
│   ├── SchedulesPage.js  # 스케줄 목록
│   ├── Board.js          # 게시판
│   └── PasswordResetPage.js
├── services/              # API 서비스
│   ├── api.config.ts     # API 설정
│   ├── auth.service.ts   # 인증 서비스
│   ├── todo.service.ts   # 할 일 서비스
│   └── dashboard.service.js
├── styles/                # CSS 스타일 파일
├── types/                 # TypeScript 타입 정의
│   ├── auth.ts
│   └── todo.ts
├── util/                  # 유틸리티
│   └── axiosInstance.js  # Axios 인스턴스
└── App.js                # 메인 앱 컴포넌트
```

## 🚀 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경별 실행
```bash
# 로컬 환경
npm run start:local

# 개발 환경
npm run start:dev

# 프로덕션 환경
npm run start:prod
```

### 3. 빌드
```bash
# 개발 빌드
npm run build:dev

# 프로덕션 빌드
npm run build:prod
```

## 🔌 API 엔드포인트

### 인증 관련
- `POST /v1/auth/login` - 로그인
- `POST /v1/user/signUp` - 회원가입
- `POST /v1/auth/password-reset/email` - 비밀번호 재설정 요청
- `PUT /v1/auth/password` - 비밀번호 변경

### 사용자 정보
- `POST /v1/user/info` - 사용자 정보 조회
- `PATCH /v1/user` - 사용자 정보 수정

### 대시보드
- `GET /v1/dashboard` - 대시보드 데이터 조회

### 할 일 관리
- `GET /v1/todos` - 할 일 목록 조회
- `GET /v1/todos/{id}` - 할 일 상세 조회
- `POST /v1/todos` - 할 일 생성
- `PUT /v1/todos/{id}` - 할 일 수정
- `DELETE /v1/todos/{id}` - 할 일 삭제

## 🧩 주요 컴포넌트

### AuthContext
사용자 인증 상태를 전역적으로 관리하는 Context입니다.
- 로그인/로그아웃 상태 관리
- 사용자 정보 저장
- 권한 기반 접근 제어

### LoadingContext
전역 로딩 상태를 관리하는 Context입니다.
- API 호출 시 로딩 표시
- 사용자 경험 개선

### ProtectedRoute
인증이 필요한 페이지를 보호하는 컴포넌트입니다.
- 토큰 유효성 검사
- 비인증 사용자 리다이렉트

## 🔄 상태 관리

### Context API 활용
- **AuthContext**: 사용자 인증 상태 및 정보 관리
- **LoadingContext**: 전역 로딩 상태 관리

### 로컬 스토리지
- JWT 토큰 저장
- 사용자 이메일 정보 저장

## 🛣 라우팅

### 공개 라우트
- `/login` - 로그인 페이지
- `/signup` - 회원가입 페이지
- `/password/reset` - 비밀번호 재설정 페이지

### 보호된 라우트
- `/` - 대시보드 (홈)
- `/my-info` - 내 정보 페이지
- `/todos` - 할 일 목록 페이지
- `/todos/:id` - 할 일 상세 페이지
- `/schedules` - 스케줄 목록 페이지
- `/board` - 게시판 페이지

## 🎨 스타일링

### CSS 모듈
각 컴포넌트별로 독립적인 CSS 파일을 사용하여 스타일 관리

### 반응형 디자인
- 모바일, 태블릿, 데스크톱 환경 지원
- CSS Grid 및 Flexbox 활용

### 주요 스타일 파일
- `Global.css` - 전역 스타일
- `variables.css` - CSS 변수 정의
- 컴포넌트별 CSS 파일

## ⚙️ 환경 설정

### 환경 변수
```bash
# .env.local
REACT_APP_ENV=local
REACT_APP_API_BASE_URL=http://localhost:8080/service

# .env.development
REACT_APP_ENV=development
REACT_APP_API_BASE_URL=https://dev-api.example.com/service

# .env.production
REACT_APP_ENV=production
REACT_APP_API_BASE_URL=https://api.example.com/service
```

### 프록시 설정
```json
{
  "proxy": "http://localhost:8080"
}
```

## 🔧 개발 가이드

### 코드 컨벤션
- 함수형 컴포넌트 사용
- TypeScript 타입 정의 활용
- ESLint 규칙 준수

### API 호출 패턴
```javascript
// 서비스 레이어 사용
const response = await AuthService.login(credentials);

// 에러 처리
try {
  const data = await apiCall();
} catch (error) {
  console.error('Error:', error);
  // 사용자에게 에러 메시지 표시
}
```

### 상태 관리 패턴
```javascript
// Context 사용
const { user, login, logout } = useContext(AuthContext);
const { setIsLoading } = useLoading();
```

## 📝 주요 기능 구현 사항

### 1. 인증 시스템
- JWT 토큰 기반 인증 구현
- 자동 로그인 상태 유지
- 권한별 메뉴 표시 제어

### 2. 대시보드
- 실시간 데이터 조회
- 로딩 상태 관리
- 에러 처리 및 사용자 피드백

### 3. 할 일 관리
- CRUD 기능 완전 구현
- 실시간 상태 업데이트
- 검색 및 필터링 기능

### 4. 사용자 프로필
- 전화번호 유효성 검사
- 실시간 입력 검증
- 안전한 데이터 업데이트

## 🚨 주의사항

1. **API 호출**: 모든 API 호출은 서비스 레이어를 통해 처리
2. **에러 처리**: 사용자 친화적인 에러 메시지 표시
3. **로딩 상태**: API 호출 시 로딩 인디케이터 표시
4. **토큰 관리**: JWT 토큰 만료 시 자동 로그아웃 처리

## 📞 지원

프로젝트 관련 문의사항이나 버그 리포트는 이슈 트래커를 통해 제출해주세요.

---

**SYNC-WAVE-FE** - 효율적인 일정 및 할 일 관리 시스템
