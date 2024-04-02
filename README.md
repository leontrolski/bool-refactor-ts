Running

```bash
npm install
npm test
```

Transforms the source

```typescript
const isFoo = a || b
```

To:

```typescript
const isFoo = a && b
```
