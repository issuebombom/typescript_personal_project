# 온라인 공연 예매 서비스 for TypeScript

## @types 설치를 통해 기존 설치 패키지와 TS의 sync 맞추기

## passport Flow
[passport로 로그인 인증 구현하기 참고](https://github.com/issuebombom/nodejs_study_alone/blob/main/express_auth_passport.md)

## ERD 아이디어
[ERD 참고](https://www.erdcloud.com/d/Yvhz55CSctDAJnfhm)
### 좌석 예약 FLOW

공연장(Place) 테이블과 공연(Show) 테이블을 생성하였고, 이 둘의 조합 +@로 판매될 좌석(티켓) 데이터를 생성하여 티켓(seatPrice) 테이블에 저장하는 방식을 취했다. 해당 티켓 테이블 목록에서 status가 avaliable한 경우 유저의 구매가 가능하도록 구현했으며, 구매 즉시 status는 'booked'가 된다.. 예약 쿼리는 예약데이터 생성, 포인트 차감, 티켓 상태 변경을 트랜잭션으로 일괄 처리하고, 선착순 예약제 이므로 해당 쿼리의 격리수준(ISOLATION LEVEL)을 READ COMMITTED로 설정하여 트랜잭션 점유 시 타 클라이언트의 수정이 불가하도록 한다.  

### 구체적인 티켓 생성 방식
공연장 테이블에는 `보유 좌석의 등급`과 `각 등급별 좌석 수`를 csv 형태의 string으로 저장하도록 한다. 만약 A 공연장이 보유한 좌석 등급이 VIP, R, S, A라면 "VIP, R, S, A"와 같은 형태로 저장하도록 한다. 또한 각 등급별 좌석수를 "50, 100, 150, 300"으로 입력하도록 한다. 이렇게 되면 VIP 석은 총 50석이, R석은 100석이 존재함을 의미한다. (가령 VIP석이 50석이므로 VIP-1부터 VIP-50까지의 좌석번호가 주어진다고 가정했다.)

여기에 티켓(seatPrice) 테이블에 판매할 티켓(좌석)정보를 생성할 때는 추가적으로 등급별 price를 입력받는데 이 때 "110000, 90000, 70000, 50000"과 같은 형태로 받는다. 이렇게 되면 좌석 등급, 좌석 수, 등급별 가격을 각각 콤마(,)를 기준으로 split했을 때 length가 4인 배열이 생성되고, 각 배열에서 동일한 인덱스가 한 묶음이 된다.  

먼저 VIP의 총 좌석 수가 50이면 이를 1 - 50 까지 생성되도록 반복문을 활용하여, VIP-1: 110000 ~ VIP-50: 110000의 정보가 생성되도록 한다. 이와 같은 방식으로 관리자가 사전에 티켓 데이터를 생성한다.

### 공연 테이블과 티켓 테이블 사이에 공연장 테이블을 끼워 둔 이유
최초 설계 시 투어 콘서트를 고려했다. 가령 아이유 투어 콘서트가 서울, 대구, 대전, 부산 등등에서 진행된다고 했을 때 해당 콘서트(공연)의 정보과 티켓 가격은 전국 동일할 것이다.(지역별 차등을 둬서 좋을 것은 없을 것이다. 만약 다르다해도 새로운 공연으로 생성하면 된다.) 그렇다면 콘서트에 대한 정보는 Show 테이블에서 하나만 존재하면 된다고 판단했다. 그리고 지역별 공연장에 대한 각각의 정보(좌석등급, 좌석수 정보 포함)를 Place 테이블에 저장한다면 투어 콘서트의 경우 하나의 공연에 여러 공연장을 1:1로 매칭해서 티켓을 간편하게 생성할 수 있게 된다고 생각했다.  

만약 공연장(좌석정보) 테이블을 따로 두지 않는다면 매 공연 티켓 정보 생성 시 좌석 등급, 좌석 번호, 등급별 가격을 직접 찾아서 입력해야 할 것이다. 하지만 대체적으로 공연장 별 좌석 등급과 좌석 수는 고정되어 있기 때문에 공연장 테이블에서 각 공연장에 대한 정보를 따로 보관해 두는 것이 업무상 효율적일 것이다.

### 추가로 고려되어야 할 사항
위 로직에서는 등급이 곧 좌석번호가 된다는 것을 전제로 작성되었다. 하지만 실제 티켓팅을 보면 좌석 등급과 실 좌석 번호는 분리되어 있다. 가령 G-38 좌석이 VIP석일 수 있다. 이 부분이 고려되어 있지 않기 때문에 이 점을 보완하기 위해서는 추가적인 고민이 필요할 것 같다. 개인적으로 공연장의 총 좌석 수만큼 공연장 정보를 테이블에 생성하고 싶지는 않기 때문에 고민이 필요하다.
