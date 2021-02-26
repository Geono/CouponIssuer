# CouponIssuer

# 개발스택
* Node, Vue, Postgres
# Prerequisites
* Docker, Docker Compose, node, npm, yarn
# 실행법
1. `$ sudo docker-compose up` 을 입력하여 POSTGRESQL 데이터베이스를 실행
2. backend/ 에서 `$ node initdb.js` 를 입력하여 데이터베이스 초기화
3. backend/ 에서 `$ yarn && yarn serve` 를 입력하여 백엔드 서버 실행
4. frontend/ 에서 `$ yarn && yarn serve` 를 입력하여 프론트엔드 서버 실행
5. 브라우저로 http://localhost:8080 접속
# 사용법
한 페이지에 두 개의 섹션이 있다.
1. Admin Page
    1. 쿠폰의 종류를 보여준다. Input에 쿠폰이름을 적고 'Create Coupon Type' 버튼을 누르면 쿠폰 종류를 추가할 수 있다.
2. User Page
    1. Issue Coupons - 쿠폰 종류중에 하나를 선택하여 쿠폰을 발급할 수 있다. 십만개 이상을 입력하면 수행하지 못한다. 로딩 indicator가 아쉽게도 아무것도 없다.
    2. List Coupons - 발급된 쿠폰 번호들을 볼 수 있다. 쿠폰 필터를 클릭하여 원하는 쿠폰들의 번호만 볼 수도 있고, 아무 필터도 선택하지 않으면 전체를 다 보여준다. Page Size 와 Page No 를 통해 페이지 크기와 페이지 번호를 옮겨가며 쿠폰 번호들을 확인할 수 있다.
