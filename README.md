KOIN_WEB_REACT
---

This project is KOIN community (ver. React library)

### Deploy Command

```shell script
npm run build
# if you using yarn
yarn build
```
### Development Command

```shell script
npm start
# if you using yarn
yarn start
```

### Testing Command

```shell script
npm run test
# if you using yarn
yarn test
```

### Directory Structure

    │
    ├── public
    ├── src
    │   ├── api
    │   ├── components
    │   │   ├── BoardComponents
    │   │   ├── IndexComponents
    │   │   ├── InfoComponents
    │   │   ├── SharedComponents
    │   │   ├── TimeTableComponents
    │   │   └── UserComponents
    │   ├── containers
    │   │   ├── BoardContainers
    │   │   ├── IndexContainers
    │   │   ├── InfoContainers
    │   │   └── UserContainers
    │   ├── hooks
    │   ├── lib
    │   ├── modules
    │   ├── pages
    │   │   ├── BoardPages
    │   │   ├── InfoPages
    │   │   └── UserPages
    │   ├── sagas
    │   └── staic
    └── static
___

## PATCH NOTE

**version_1.0.0**

Vue to React 마이그레이션

**version_1.1.0**

- 코인 서비스 축소
    - 다음 서비스들을 삭제하였습니다.
    - 중고장터
    - 게시판(공지사항 제외)
    - 분실물
    - 검색 기능

## Technology Stack

- React
- Redux
    - Redux-saga
    - Redux-thunk
- styled-components
