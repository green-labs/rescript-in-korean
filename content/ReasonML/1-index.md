---
title: 'GraphQL-PPX Nullable 쿼리의 코드 생성 차이'
metaTitle: 'Syntax Highlighting is the meta title tag for this page'
metaDescription: 'This is the meta description for this page'
---

### Nullable

```graphql
type Query {
  shipRequests: ship_request
}
```

```javascript
function parse(value) {
  var value$1 = value.shipRequests;
  return {
    shipRequests: !(value$1 == null)
      ? {
          __typename: value$1.__typename,
          id: value$1.id,
          user_id: value$1.user_id,
          species: value$1.species,
          quantity: value$1.quantity,
          created_at: value$1.created_at,
        }
      : undefined,
  };
}
```

### Non-Nullable

```gql
type Query {
  shipRequests: ship_request!
}
```

```javascript
function parse(value) {
  var value$1 = value.shipRequests;
  return {
    shipRequests: {
      __typename: value$1.__typename,
      id: value$1.id,
      user_id: value$1.user_id,
      species: value$1.species,
      quantity: value$1.quantity,
      created_at: value$1.created_at,
    },
  };
}
```
