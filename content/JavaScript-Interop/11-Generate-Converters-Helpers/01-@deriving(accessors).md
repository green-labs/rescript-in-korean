---
title: "@deriving(accessor)"
metaTitle: 'Inlining Constants'
metaDescription: 'Inlining constants'
sourceUrl: 'https://rescript-lang.org/docs/manual/latest/inlining-constants'
canonical: 'https://rescript-lang.org/docs/manual/latest/inlining-constants'
---

@deriving(acccessors)는 배리언트나 레코드에 사용할 수 있는 어노테이션입니다.

이 어노테이션이 사용되면 접근자 코드가 자동으로 생성됩니다.

## 1. 배리언트에 붙이기

배리언트에 `@deriving(accessors)`를 붙이면 각 태그별로 그에 해당하는 함수 혹은 상수에 해당하는 접근자를 만들어쥡니다.

배리언트 타입에 를 쓰면 각 생성자(태그)들에 대한 접근자 함수를 만들 수 있습니다.

```reason
@deriving(accessors)
type action =
  | Click
  | Submit(string)
  | Cancel;
```

위 예시에서 Submit과 같이 페이로드를 가지고 있는 배리언트 생성자는 함수로 생성되고, Click이나 Cancel같은 페이로드가 없는 태그는 평범한 정수가 생성됩니다. (정수는 배리언트의 내부 식별에 쓰임)

**주:**

- 접근자는 소문자로 생성됩니다.
- 이렇게 생성된 헬퍼 함수는 JS쪽에서도 쓸 수 있습니다. 그렇지만 이 값에 의존한 코드를 작성하지는 마세요.

### 사용법

```reason
let s = submit("hello"); /* gives Submit("hello") */
```

그렇다면 어떤 상황에서 굳이 이렇게 써야 할까요?

두 가지 경우가 있습니다.

- 접근자 함수를 고차 함수로 넘기고 싶을 때 (일반 배리언트 생성자는 이게 안됨)
- 배리언트 생성자를 JS에서도 쓰고 싶을 때 (JS에는 배리언트가 없으므로)

## 2. 레코드에 붙이기

레코드에 붙이면 각 필드에 해당하는 접근자를 만들어줍니다.

```reason
@deriving(accessors)
type pet = {name: string}

let pets = [|{name: "bob"}, {name: "bob2"}|

pets
 ->Belt.Array.map(name) // p => p.name
 ->Js.Array2.joinWith("&")
 ->Js.log
```

위 예시에서 name은 자동으로 생성된 함수입니다.
이게 없었더라면, `p => p.name` 같은 형태로 써야 합니다.
