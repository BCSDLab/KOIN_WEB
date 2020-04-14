KOIN_WEB_REACT
---

This project is KOIN community (ver. React framework)

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
    │   │   ├── LostComponents
    │   │   ├── MarketComponents
    │   │   ├── PromotionComponents
    │   │   ├── SearchComponents
    │   │   ├── SharedComponents
    │   │   ├── TimeTableComponents
    │   │   └── UserComponents
    │   ├── containers
    │   │   ├── BoardContainers
    │   │   ├── IndexContainers
    │   │   ├── InfoContainers
    │   │   ├── LostContainers
    │   │   ├── MarketContainers
    │   │   ├── PromotionContainers
    │   │   └── UserContainers
    │   ├── hooks
    │   ├── lib
    │   ├── modules
    │   ├── pages
    │   │   ├── BoardPages
    │   │   ├── InfoPages
    │   │   ├── LostPages
    │   │   ├── MarketPages
    │   │   └── UserPages
    │   ├── sagas
    │   └── staic
    └── static
___

## PATCH NOTE

**version_1.0.0**

Vue to React 마이그레이션

## Technology Stack

- React
- Redux
    - Redux-saga
    - Redux-thunk
- styled-components