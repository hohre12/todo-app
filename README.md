# To-Do List Application

사용자가 할 일을 효율적으로 관리할 수 있도록 도와주는 간단한 Todo List 웹 애플리케이션입니다.
할 일 추가, 수정, 삭제, 완료 상태 변경 등 기본적인 Todo 관리 기능을 제공합니다.

React 기반으로 제작되었으며, 직관적인 UI와 간편한 사용성을 목표로 설계되었습니다.

## 1. 폴더 구조 및 주요 코드 설명
```
├─node_modules
├─public
└─src
    ├─assets
    │  └─svg                                    # svg파일 폴더
    ├─components                                # 재사용 가능한 컴포넌트
    │  ├─button                                 # (공통) 버튼 컴포넌트
    │  ├─checkBox                               # (공통) 체크박스 컴포넌트
    │  ├─confirm                                # (공통) 컨펌 컴포넌트
    │  ├─errorText                              # (공통) 에러텍스트 컴포넌트
    │  ├─globalNavigationBar                    # (공통) GNB 컴포넌트
    │  ├─input                                  # (공통) 인풋 컴포넌트
    │  ├─searchBox                              # (공통) 검색 컴포넌트
    │  ├─sideNavigationBar                      # (공통) SNB 컴포넌트    
    │  ├─svgIcon                                # (공통) 동적 svg 로딩 컴포넌트
    │  ├─tableRow                               # (공통) 목록 로우 컴포넌트
    │  └─toast                                  # (공통) 토스트 알림 컴포넌트
    ├─constants                                 # 상수
    ├─hooks                                     # 커스텀 훅
    ├─mocks                                     # mock API
    ├─pages                                     # 페이지별 컴포넌트
    │  └─Todo                                   # 찜 페이지
    │      └─List                               # 찜 목록 페이지
    │         └─components                      # 도서검색 목록에서만 사용되는 컴포넌트
    │             └─editModal                   # 수정 모달 컴포넌트    
    │             └─floatingMenu                # 플로팅 모달 컴포넌트    
    │             └─registModal                 # 등록 모달 컴포넌트    
    ├─services                                  # API 요청 관련 로직
    ├─state                                     # Recoil 상태 관리
    ├─styles                                    # 스타일
    ├─types                                     # TypeScript 타입 정의
    └─utils                                     # 글로벌 함수
```

## 2. 라이브러리 선택 이유

- **recoil & recoil-persist**: 전역 상태 관리 및 로컬스토리지 기반 데이터 유지
- **axios**: API 데이터 요청
- **tanstack/react-query**: API 데이터 요청 및 캐싱 최적화
- **styled-components**: 컴포넌트 기반 스타일링 적용
- **react-router-dom**: 페이지 네비게이션을 위해 사용
- **react-datepicker**: 할일 기한 선택을 위해 사용
- **types/lodash**: Infinite Scroll 구현시 debounce사용
- **moment**: Date 핸들링을 위해 사용

## 3. 주요 기능
- 할 일 등록, 단일 수정, 단일 삭제, 멀티 삭제
- 할 일 완료 처리
- 할 일 기한 선택
- 검색 기능 (세션과 상관없이 검색어 유지)
- 수정/삭제 시 토스트 알림
- 무한스크롤
- 전체 선택

## 4. 강조하고 싶은 내용

### 4.1 Git Flow 준수
  
### 4.2 사용성 고려
- 할일 생성후 목록에서 등록 기준으로 최신순으로 기본 정렬

### 4.3 직관적인 UI

### 4.4 Tanstack Query를 활용한 API 캐싱



