# server

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.30. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Folder

```js
  ├── src/
  │   ├── config/
  │   │   └── index.ts
  │   ├── controllers/
  │   │   └── index.ts
  │   ├── services/
  │   │   ├── grpcService.ts
  │   │   ├── eventBusService.ts
  │   │   ├── graphqlService.ts
  │   │   └── index.ts
  │   ├── repositories/
  │   │   └── index.ts
  │   ├── models/
  │   │   └── index.ts
  │   ├── middlewares/
  │   │   └── index.ts
  │   ├── utils/
  │   │   └── index.ts
  │   ├── app.ts
  │   └── server.ts
  ├── tests/
  │   ├── unit/
  │   ├── integration/
  │   └── e2e/
  ├── .gitignore
  ├── package.json
  ├── tsconfig.json
  └── README.md
```
