# 온라인 공연 예매 서비스 for TypeScript

## @types 설치를 통해 기존 설치 패키지와 TS의 sync 맞추기

## passport Flow

authRouter -> 로그인 요청 -> 로그인유무 확인 -> passportLocal.Strategy가 설정된 파일(localStrategy.ts)로 이동 -> 인증결과를 done 콜백함수에 전달 -> 성공 시 req.login()으로 인해 serializeUser 함수가 있는 곳(index.ts)으로 이동 -> 세션에 저장할 데이터를 선택하여 저장(userId) -> deserializeUser로 이동해서 userId기반 유저 정보 조회 및 next()

## TODO

- auth 컨트롤러도 service까지 분리할 수 있으면 해라
- service에서 에러처리하고 controller에서는 결과를 받기만 한다.
  -> 타 컨트롤러에서 다른 service를 써야할 경우가 있기 때문이다.
- seatPrice 컨트롤러 작성 중임

## CustomError 클래스를 활용한 메시지 생성

해당 프로젝트는 Routers, Controllers, Services 구조로 설계되었으며 Service 파일에서 데이터베이스 조회 결과에 따른 에러를 처리합니다.

Services에서 일괄적으로 상황에 따른 에러 처리를 하며 각 에러 상황에 따른 결과는 CustomError 클래스로 인스턴스를 생성하여 Controller에 넘겨줍니다.(throw)

```typescript
class CustomError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

export default CustomError;
```

위 클래스는 constructor를 통해 message와 status를 입력받아 message는 Error 클래스에 고스란히 전달되고, status는 신규 프로퍼티로 추가해 줍니다. name의 경우 contructor의 name 프로퍼티로 접근하면 클래스 이름 자체를 string 타입으로 가져올 수 있어 이를 그대로 this.name으로 지정합니다.

```typescript
// service.ts
isPermitted = async (userId: number, targetUserId: number) => {
  if (userId !== targetUserId) {
    throw new CustomError(403, '타 유저 프로필 접근 권한 없음');
  }
  return true;
};
```

검증이 필요한 상황에서 통과하지 못할 경우 service layer에서 CustomError 인스턴스를 생성하여 throw 합니다. 이는 Controller layer로 전달됩니다.

```typescript
findUser = async (req: Request, res: Response) => {
    const userId: string = req.params.userId; // 프론트에서 보낸 폼데이터를 받는다.

    try {
      // 요청을 보낸 유저
      const me = req.user as Client;

      // 조회 대상 프로필이 본인 프로필인지 검증
      const isApproval: boolean = await this.clientService.isPermitted(Number(userId), me.userId);
      /*
      유저 검색 로직...
      */
      }
    } catch (err) {
      if (err instanceof CustomError) {
        console.error(err.stack);
        return res.status(err.status).send({ message: `${err.message}` });
      }
    }
```

Service layer에서 isApproval() 함수가 throw한 CustomError 정보는 그대로 catch의 err 변수에 할당됩니다. 하지만 catch문의 err 변수는 기본적으로 unknown 타입으로 지정됩니다. 그렇기에 우리가 원하는 err 변수가 CustomError 타입일 경우 에러 메시지가 전달되도록 instanceof 기능을 적용했습니다.

터미널에서의 에러 결과는 아래와 같이 출력되며 프론트에서도 status code와 에러 메시지가 잘 전될되는 것을 확인했습니다.

```zsh
CustomError: 타 유저 프로필 접근 권한 없음
    at ClientService.isPermitted (/Users/leitmotiv/my-project/sparta_project/typescript_personal_project/dist/services/client.service.js:21:23)
    at ClientController.findUser (/Users/leitmotiv/my-project/sparta_project/typescript_personal_project/dist/controllers/client.controller.js:17:61)
    at Layer.handle [as handle_request] (/Users/leitmotiv/my-project/sparta_project/typescript_personal_project/node_modules/express/lib/router/layer.js:95:5)
    at next (/Users/leitmotiv/my-project/sparta_project/typescript_personal_project/node_modules/express/lib/router/route.js:144:13)
    at isLoggedIn (/Users/leitmotiv/my-project/sparta_project/typescript_personal_project/dist/middlewares/index.js:6:9)
    at Layer.handle [as handle_request] (/Users/leitmotiv/my-project/sparta_project/typescript_personal_project/node_modules/express/lib/router/layer.js:95:5)
    at next (/Users/leitmotiv/my-project/sparta_project/typescript_personal_project/node_modules/express/lib/router/route.js:144:13)
    at Route.dispatch (/Users/leitmotiv/my-project/sparta_project/typescript_personal_project/node_modules/express/lib/router/route.js:114:3)
    at Layer.handle [as handle_request] (/Users/leitmotiv/my-project/sparta_project/typescript_personal_project/node_modules/express/lib/router/layer.js:95:5)
    at /Users/leitmotiv/my-project/sparta_project/typescript_personal_project/node_modules/express/lib/router/index.js:284:15
```
