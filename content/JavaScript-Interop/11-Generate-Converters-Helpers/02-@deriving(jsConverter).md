---
title: "@deriving(jsConverter)"
metaTitle: 'Inlining Constants'
metaDescription: 'Inlining constants'
sourceUrl: 'https://rescript-lang.org/docs/manual/latest/inlining-constants'
canonical: 'https://rescript-lang.org/docs/manual/latest/inlining-constants'
---

deriving(jsConverter)는 세 가지 용도에 사용됩니다.

1. 배리언트에 붙여서 JS 정수 enum으로의 변환기 생성하기
2. 폴리모픽 배리언트에 붙여서 JS 문자열 enum으로의 변환기 생성하기
3. 레코드에 붙여서 JS 객체로의 변환기 생성하기

## 1. 배리언트에 붙여서 JS 정수 enum으로의 변환기 생성하기

배리언트 타입에 deriving(jsConverter)를 쓰면 JS 정수 enum ↔ 리스크립트 배리언트 사이의 변환을 해주는 컨버터를 만들어줍니다.

```reason
@deriving(jsConverter)
type fruit =
  | Apple
  | Orange
  | Kiwi
  | Watermelon;
```

이렇게 하면(jsConverter가) 아래와 같은 타입의 함수를 만들어줍니다.

```reason
let fruitToJs: fruit => int;

let fruitFromJs: int => option(fruit);
```

fruitToJs 는 각각의 배리언트 생성자가 정수에 대응됩니다.
정수는 0부터 시작하고 정의된 순서대로 숫자를 부여합니다.

fruitFromJs는 option타입의 값을 반환하는데, 왜냐하면 모든 정수가 생성자에 대응하는 것은 아니기 때문입니다.

추가로, 각 생성자에 `@as 1234` 이런식으로 쓰면 그 생성되는 결과를 커스터마이징 할 수 있습니다.

### 사용법

```reason
@deriving(jsConverter)
type fruit =
  | Apple
  | @as 10 Orange
  | @as 100 Kiwi
  | Watermelon;

let zero = fruitToJs(Apple); /* 0 */

switch (fruitFromJs(100)) {
| Some(Kiwi) => Js.log("this is Kiwi")
| _ => Js.log("received something wrong from the JS side")
};
```

노트: `@as` 를 사용함으로써 부여받는 모든 숫자가 바뀝니다. 사과는 여전히 0이지만, 오랜지가 10, 키위가 100, 수박은 101이 됩니다.

### 더 안전하게

Js 객체 ↔ 레코드 때와 비슷하게, `newType`이라는 것을 써서 JS enums이 정수라는 사실으르 감출 수 있습니다.

```reason
@deriving {jsConverter: newType}
type fruit =
  | Apple
  | @as 100 Kiwi
  | Watermelon;
```

이 옵션은 `@deriving(jsConverter)`가 아래와 같은 타입의 함수를 생성하게 합니다.

```reason
let fruitToJs: fruit => abs_fruit;

let fruitFromJs: abs_fruit => fruit;
```

`fruitFromJs`는 아까와 같은 option을 반환하지 않습니다.
왜냐하면 잘못된 값을 넘길 방법이 없어지기 때문입니다.
abs_fruit를 만들 수 있는 유일한 방법은 fruitToJs를 사용하는 것 뿐입니다.


### 사용법

```reason
@deriving {jsConverter: newType}
type fruit =
  | Apple
  | @as 100 Kiwi
  | Watermelon;

let opaqueValue = fruitToJs(Apple);

@module "myJSFruits" external jsKiwi: abs_fruit = "iSwearThisIsAKiwi";
let kiwi = fruitFromJs(jsKiwi);

let error = fruitFromJs(100); /* 아무 숫자나 넣을 수 없음 */
```

## 2. 폴리모픽 배리언트에 붙여서 JS 문자열 enum으로의 변환기 생성하기

정수 변환기를 만들때와 비슷하게, `@deriving(jsConverter)` 를 폴리모픽 배리언트 타입에 쓰면 JS 문자열과 리스크립트 폴리모픽 배리언트 간의 변환기를 만들 수 있습니다.

### 사용법

```reason
@deriving(jsConverter)
type fruit =
  | `Apple
  | @as {j|"miniCoconut"|j} `Kiwi
  | `Watermelon
;

let appleString = fruitToJs(`Apple); /* "Apple" */
let kiwiString = fruitToJs(`Kiwi); /* "miniCoconut" */
```

전과 비슷하게 `@deriving {jsConverter:newType}` 이렇게 해서 추상 타입을 뱉어줄 수도 있습니다.


## 3. 레코드에 붙여서 JS 객체로의 변환기 생성하기

마지막으로 레코드에 붙이는 방법이 있는데, ReScript ≥ 7 부터는 레코드가 JS 객체로 컴파일됩니다.
따라서  `@deriving(jsConverter)`는 더 이상 알 필요가 없는 표현입니다. (굳이 읽어보기 👇)

레코드 타입에 `@deriving(jsConverter)`를 쓰면 레코드와 JS 객체 런타임 값 간의 변환이 가능합니다.

```reason
@deriving(jsConverter)
type coordinates = {
  x: int,
  y: int
};
```

위 구문은 아래 두 함수를 생성합니다.

```reason
let coordinatesToJs: coordinates => {"x": int, "y": int};

let coordinatesFromJs: {.. "x": int, "y": int} => coordinates;
```

**주**:

- `coordinatesFromJs` 는 열린 객체 타입을 사용하므로 추가적인 필드를 허용합니다.
- 변환기는 얕게(shallow) 동작합니다. 다시 말해 재귀적으로 세부 필드를 변환하지 않습니다. 이는 속도와 단순함을 유지하기 위한 결정인데, 유스케이스의 80%는 문제가 없을 것입니다.


### 사용법

아래 코드는`jsCoordinates` JS 객체(레코드가 아님!)를 JS로 내보냅니다.

```reason
let jsCoordinates = coordinatesToJs({x: 1, y: 2});
```

아래는 JS쪽의 `jsCoordiates`를 레코드로(JS 객체가 아니라!) 바인딩 합니다.
이 값은 JS쪽에서 `coordinatesFromJs`를 호출하여 생성되었을 것이라 가정합니다.

```reason
@module "myGame"
external jsCoordinates : coordinates = "jsCoordinates";
```

### 더 안전하게

위에서 생성된 함수들은 JS 객체 타입을 사용합니.
이 구현 디테일을 감추려면 객체 타입을 abstract으로 만들어야 합니다.
그렇게 하려면 `@deriving(jsConverter)`에 `newType` 옵션을 쓰면 됩니다.

```reason
@deriving {jsConverter: newType}
type coordinates = {
  x: int,
  y: int,
}
```

이 코드는 아래와 같은 함수를 생성합니다.

```reason
let coordinatesToJs: coordinates => abs_coordinates;

let coordinatesFromJs: abs_coordinates => coordinates;
```

### 사용법

newType을 쓰면 사용자들이 아래와 같은 부적절한 행동을 하지 못하게 막을 수 있습니다.

```reason
let myCoordinates = {
  x: 10,
  y: 20
};
let jsCoords = coordinatesToJs(myCoordinates);

let x = jsCoords"x"; /* 안됩니다! 객체의 내부에 직접 접근하지 마세요. */
```

생성된 결과는 똑같습니다.

잘못된 참조를 타입으로 막을 수 있다는게 멋지지 않나? 이게 아니라면 런타임에 체크를 해야합니다.
