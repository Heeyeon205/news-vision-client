# 📙 NEWSION Preview

<br/>
<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white" alt="TailwindCSS" />
  <br/>
</p>
<br/>


### 메인 페이지
- NEWSION 공식 계정에서 발행한 뉴스 콘텐츠를 최근 3일 이내 인기순으로 제공합니다.
- 상단에서는 현재 진행 중인 투표를 확인하고 참여할 수 있으며, 하단 슬라이더를 통해 모든 진행 중인 투표 목록을 편리하게 열람할 수 있습니다.
<br/>

|메인 페이지|
|--|
|![01_뉴스메인](https://github.com/user-attachments/assets/dc07942f-4a30-48be-b67c-3823ffacf457)|
<br/>

### [회원가입]
- 아이디, 비밀번호, 이메일은 입력 단계에서 유효성 검사가 진행되며, 이메일 인증 절차를 통해 사용자 본인 확인 후 회원 가입이 완료됩니다.
- 로그인은 자체 회원가입 계정을 통해 가능하며, 편의성을 위해 세 가지 소셜 로그인 기능도 지원됩니다.
- 비밀번호를 분실한 경우, 등록된 이메일 인증을 통해 본인 확인 후 비밀번호를 재설정할 수 있습니다.
<br/>

|회원가입|
|--|
|![02_회원가입로그인](https://github.com/user-attachments/assets/69ee9cdf-28ca-4e2c-995a-14a732f14de2)|
<br/>

### [마이페이지]
- 프로필 사진, 인증 이메일, 자기소개를 수정할 수 있는 프로필 편집 기능을 제공합니다.
- 팔로워 및 팔로잉 목록, 작성한 뉴스 및 커뮤니티 게시글 등 사용자의 활동 내역을 확인하고 관리할 수 있습니다.
<br/>

|마이페이지|
|--|
|![03_마이페이지](https://github.com/user-attachments/assets/9adf4090-3c66-45de-b336-6c40953097de)|
<br/>

### [알림]
- SSE Emitter를 활용하여 클라이언트에 서버로부터 실시간 데이터를 전송하는 방식으로 구현됩니다.
- 서버에서 클라이언트로 데이터를 전송하는 단방향 스트리밍 방식을 사용하며, HTTP 기반 프로토콜로 동작합니다.
- 네트워크 단절 시 클라이언트가 자동으로 재 연결을 시도해 알람 시스템 구현에 사용했습니다.
- 사용자는 뉴스, 게시글, 팔로우 등 주요 활동에 대한 알림을 실시간으로 수신하며, 알림을 통해 해당 사용자나 게시물로 즉시 이동할 수 있습니다.
<br/>

|알림|
|--|
|![04_알림](https://github.com/user-attachments/assets/2fcbb53e-9e1d-4434-a3e1-67b82802742a)|

<br/>

### [뉴스 작성]
- 뉴스 콘텐츠를 발행하는 크리에이터의 창작 활동을 지원하기 위해 Naver News Search API를 활용하여 참고용 뉴스를 검색 및 활용할 수 있도록 제공합니다.
- 뉴스 콘텐츠는 NEWSION의 핵심 가치로, 최소 300자에서 최대 3,000자까지 작성할 수 있으며, 콘텐츠 품질 유지를 위해 유효성 검사가 적용됩니다.
<br/>

|뉴스 작성|
|--|
|![05_뉴스 작성](https://github.com/user-attachments/assets/c66954ee-8f2f-4f70-8cc0-3b677782f6f1)|

<br/>

### [뉴스 상세페이지]
- 사용자는 크리에이터가 발행한 뉴스에 대해 좋아요, 스크랩, URL 공유 등의 방식으로 컨텐츠에 대한 반응을 표현할 수 있습니다.
<br/>

|뉴스 상세페이지|
|--|
|![06_뉴스 상세](https://github.com/user-attachments/assets/b773c3fa-4f09-476b-8ef7-018122f1dc02)|

<br/>

### [핵심 브리핑]
- LLM 기반 생성형 AI인 ChatGPT를 활용하여 매일 오전 6시에 인기 뉴스 TOP 10을 자동으로 요약하여 요약 뉴스 서비스를 제공합니다.
<br/>

|핵심 브리핑|
|--|
|![07_핵심 브리핑](https://github.com/user-attachments/assets/41bb1ae8-4490-44ff-b483-781b363ff61a)|


<br/>

### [아티클]
- NEWSION 공식 계정 및 크리에이터 권한을 부여받은 사용자가 발행한 뉴스 콘텐츠를 카테고리별로 분류하여 열람할 수 있습니다.
- 팔로우한 크리에이터의 콘텐츠만 필터링하여 확인할 수 있으며, 최신 뉴스 순으로 정렬되어 제공합니다.
<br/>

|아티클|
|--|
|![07_아티클](https://github.com/user-attachments/assets/aed7af38-289e-4ec2-a9a3-738fb03c9cd7)|
<br/>

### [검색]
- Elasticsearch를 활용하여 대용량 데이터에 대한 고속 검색 및 분석 기능을 제공합니다.
- 사용자에게 현재 인기 있는 검색어를 실시간으로 제공하여 검색 편의성을 높였습니다.
<br/>

|검색|
|--|
|![11_검색](https://github.com/user-attachments/assets/eb6e2b84-7981-42ed-a3d4-891673bd1a9c)|

<br/>

### [투표]
- 크리에이터는 현재 인기 있는 뉴스 주제를 중심으로 사용자가 참여할 수 있는 투표를 생성할 수 있습니다.
- 각 투표는 최소 2개, 최대 4개의 선택지로 구성되며, 사용자는 해당 주제에 대한 의견을 간단히 표현할 수 있습니다.
<br/>

|투표|
|--|
|![08_투표](https://github.com/user-attachments/assets/3dd922e0-80ed-4e28-88f5-77012f4b3caa)|
<br/>

### [커뮤니티]
- 크리에이터와 일반 사용자가 함께 소통하며 지식을 공유할 수 있는 공간입니다.
<br/>

|커뮤니티|
|--|
|![09_커뮤 메인](https://github.com/user-attachments/assets/3c28d63e-95ac-4fe4-a4b6-12583a56ed8e)|
<br/>

### [커뮤니티 상세 페이지]
- 댓글을 통해 해당 커뮤니티 게시글에 대한 의견을 나눌 수 있으며, 좋아요 및 공유 등의 방식으로 반응을 표현할 수 있습니다.
<br/>

|커뮤니티 상세 페이지|
|--|
|![10_커뮤 상세](https://github.com/user-attachments/assets/d9afd2c9-6eff-4c71-9a24-c6a7e3f4fee0)|
<br/>

### [신고 처리]
- 커뮤니티 게시글 및 댓글 중 불쾌감을 주거나 NEWSION의 지식·정보 기준에 부합하지 않는 내용을 사용자가 신고할 수 있습니다.
- 관리자는 접수된 신고를 검토한 후, 해당 게시글이나 댓글에 대해 숨김 처리 등의 조치를 취할 수 있습니다.
<br/>

|신고 처리|
|--|
|![13_신고](https://github.com/user-attachments/assets/fb3af00f-055c-4fb9-87ab-9ed9c246fe6f)|

<br/>

### [카테고리 관리]
- 관리자는 뉴스 및 커뮤니티의 카테고리를 추가하거나 삭제하여 관리할 수 있습니다.
<br/>

|카테고리 관리|
|--|
|![12_카테고리](https://github.com/user-attachments/assets/34e0ec3b-b798-4a81-95b5-90c18b8ffcdf)|

<br/>
