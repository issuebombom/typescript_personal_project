# 온라인 공연 예매 서비스 for TypeScript

## @types 설치를 통해 기존 설치 패키지와 TS의 sync 맞추기

## passport Flow

authRouter -> 로그인 요청 -> 로그인유무 확인 -> passportLocal.Strategy가 설정된 파일(localStrategy.ts)로 이동 -> 인증결과를 done 콜백함수에 전달 -> 성공 시 req.login()으로 인해 serializeUser 함수가 있는 곳(index.ts)으로 이동 -> 세션에 저장할 데이터를 선택하여 저장(userId) -> deserializeUser로 이동해서 userId기반 유저 정보 조회 및 next()

망할 Express.User타입