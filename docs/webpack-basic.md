# 2020년 1월 18일 - 웹팩 개념 정리 (기초)

# Webpack 이란?

![2020%E1%84%82%E1%85%A7%E1%86%AB%201%E1%84%8B%E1%85%AF%E1%86%AF%2018%E1%84%8B%E1%85%B5%E1%86%AF%20-%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%A2%E1%86%A8%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20(%E1%84%80%E1%85%B5%E1%84%8E%E1%85%A9)%20efe4ca931fb540529e5e76a0172cd991/Untitled.png](2020%E1%84%82%E1%85%A7%E1%86%AB%201%E1%84%8B%E1%85%AF%E1%86%AF%2018%E1%84%8B%E1%85%B5%E1%86%AF%20-%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%A2%E1%86%A8%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20(%E1%84%80%E1%85%B5%E1%84%8E%E1%85%A9)%20efe4ca931fb540529e5e76a0172cd991/Untitled.png)

웹팩은 Front-end 프레임워크에서 많이 사용되는 모듈 번들러이다. 모듈 번들러는 웹 애플리케이션을 구성하는 자원(HTML, CSS, Javascript, Images 등)을 각각의 모듈로 보고 이를 병합하여 하나의 파일로 만들어주는 도구이다.

## Entry

웹 애플리케이션에서 각 자원들을 사용할 때 위 그림의 왼쪽처럼 의존성을 갖게 된다. 그 의존 관계의 시작점을 웹팩에서는 엔트리(entry)라고 하며 이 엔트리를 통해 필요한 모듈을 로딩하고 하나의 파일로 묶는다.

# Webpack 사용법

Webpack을 사용하여 번들링하기 전에 일반 웹 페이지를 작성하고 그 후에 번들링을 수행해보자.

## HTML, Javascript 예제 작성

```
|- index.html
|- /src
	|- index.js
	|- math.js
```

```jsx
// math.js
export const sum = (a, b) => a + b;
```

```jsx
// index.js
import { sum } from './math.js';

const num = sum(10, 20);
console.log(num); // 30
```

```html
<!-- index.html -->
...
<script type="module" src="src/index.js"></script>
...
```

프레임워크가 아닌 HTML, Javascript를 최근에 접하지 않았다면 위 `script` 태그의 `type="module"` 이 낯설 수 있다. 자바스크립트 모듈(import, export, require 등)을 사용한다면 `script` 태그에 `type="module"`을 지정해주어야 해당 자바스크립트를 모듈로 인식하고 정상 작동한다.

이제 index.html 파일을 브라우저로 실행해보자.

❗️ **CORS 오류가 발생했다.**

![2020%E1%84%82%E1%85%A7%E1%86%AB%201%E1%84%8B%E1%85%AF%E1%86%AF%2018%E1%84%8B%E1%85%B5%E1%86%AF%20-%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%A2%E1%86%A8%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20(%E1%84%80%E1%85%B5%E1%84%8E%E1%85%A9)%20efe4ca931fb540529e5e76a0172cd991/Untitled%201.png](2020%E1%84%82%E1%85%A7%E1%86%AB%201%E1%84%8B%E1%85%AF%E1%86%AF%2018%E1%84%8B%E1%85%B5%E1%86%AF%20-%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%A2%E1%86%A8%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20(%E1%84%80%E1%85%B5%E1%84%8E%E1%85%A9)%20efe4ca931fb540529e5e76a0172cd991/Untitled%201.png)

## 🤔 왜 로컬에서 실행했는데 CORS 오류가 발생할까?

![2020%E1%84%82%E1%85%A7%E1%86%AB%201%E1%84%8B%E1%85%AF%E1%86%AF%2018%E1%84%8B%E1%85%B5%E1%86%AF%20-%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%A2%E1%86%A8%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20(%E1%84%80%E1%85%B5%E1%84%8E%E1%85%A9)%20efe4ca931fb540529e5e76a0172cd991/Untitled%202.png](2020%E1%84%82%E1%85%A7%E1%86%AB%201%E1%84%8B%E1%85%AF%E1%86%AF%2018%E1%84%8B%E1%85%B5%E1%86%AF%20-%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%A2%E1%86%A8%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20(%E1%84%80%E1%85%B5%E1%84%8E%E1%85%A9)%20efe4ca931fb540529e5e76a0172cd991/Untitled%202.png)

1. [MDN Web Docs의 Javascript modules 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules)에 따르면 로컬에서 `<script type="module"></script>` HTML 파일을 로드하려고 할 때 자바스크립트 모듈 보안 요구 사항으로 인해 CORS 오류가 발생한다고 한다.
2. 로컬의 리소스를 요청할 때 origin을 null로 인식하기 때문에 현재 도메인과 다른 도메인으로 인식하여 CORS 정책에 따라 제한되는 것이다.

## 🛠 해결

로컬 환경에서 실행할 때 VSCode의 익스텐션인 Live server나 Node.js의 라이브러리인 http-server 등을 설치하고 로컬 서버에 올려 주소 및 포트를 동일하게 만들면 문제가 발생하지 않는다. 대부분 프레임 워크를 사용하여 webpack-dev-server 또는 서버에 올려 확인했기 때문에 이런 문제를 쉽게 접하지 못했을 것이다.

그럼 위의 해결책을 수행하고 index.html을 실행해보자

![2020%E1%84%82%E1%85%A7%E1%86%AB%201%E1%84%8B%E1%85%AF%E1%86%AF%2018%E1%84%8B%E1%85%B5%E1%86%AF%20-%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%A2%E1%86%A8%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20(%E1%84%80%E1%85%B5%E1%84%8E%E1%85%A9)%20efe4ca931fb540529e5e76a0172cd991/Untitled%203.png](2020%E1%84%82%E1%85%A7%E1%86%AB%201%E1%84%8B%E1%85%AF%E1%86%AF%2018%E1%84%8B%E1%85%B5%E1%86%AF%20-%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%A2%E1%86%A8%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20(%E1%84%80%E1%85%B5%E1%84%8E%E1%85%A9)%20efe4ca931fb540529e5e76a0172cd991/Untitled%203.png)

정상적으로 출력되는 것을 확인할 수 있다.

## Webpack을 사용하여 모듈 번들링하기

webpack을 사용하기 위해서 webpack, webpack-cli 모듈을 설치해야 한다.

```bash
$ npm install webpack webpack-cli
```

설치가 완료됐다면 webpack 명령어를 사용하여 모듈 번들링할 수 있다.

```bash
$ npx webpack
```

`npx`는 현재 프로젝트 node_modules/.bin 폴더를 가리킨다.

프로젝트의 구조를 보면 `dist` 디렉토리안에 `main.js` 파일이 생겼을 것이다. webpack의 기본 옵션으로 엔트리는 `src/index.js`이며 번들링된 파일을 `dist/main.js`로 출력한다. 이는 옵션 또는 config 파일을 통해 변경할 수 있다. 그럼 이제 `dist/main.js`를 `index.html`에서 사용하여 확인해보자.

```html
<!-- index.html -->
...
<script type="module" src="dist/main.js"></script>
...
```

![2020%E1%84%82%E1%85%A7%E1%86%AB%201%E1%84%8B%E1%85%AF%E1%86%AF%2018%E1%84%8B%E1%85%B5%E1%86%AF%20-%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%A2%E1%86%A8%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20(%E1%84%80%E1%85%B5%E1%84%8E%E1%85%A9)%20efe4ca931fb540529e5e76a0172cd991/Untitled%204.png](2020%E1%84%82%E1%85%A7%E1%86%AB%201%E1%84%8B%E1%85%AF%E1%86%AF%2018%E1%84%8B%E1%85%B5%E1%86%AF%20-%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%A2%E1%86%A8%20%E1%84%80%E1%85%A2%E1%84%82%E1%85%A7%E1%86%B7%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20(%E1%84%80%E1%85%B5%E1%84%8E%E1%85%A9)%20efe4ca931fb540529e5e76a0172cd991/Untitled%204.png)

번들링된 `dist/main.js` 파일을 열어보면 모듈 번들링 과정에서 필요하지 않은 선언이나 공백 등을 압축하여 번들링한 모습을 볼 수 있다.

```jsx
(()=>{"use strict";console.log(30)})();
```

## Configuration 사용하기

webpack은 파일에 미리 설정 내용을 만들어 모듈 번들링을 수행할 수 있다. 기본 설정된 파일의 이름은 `webpack.config.js`이며 자기가 원하는 이름의 파일을 사용할 수도 있다. 물론 webpack cli에서 제공하는 옵션을 사용하여도 좋지만 협업을 하는 경우에는 이러한 설정 파일을 만들어 작업하는 것이 효율적일 수 있다.

```jsx
// webpack.config.js

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

프로젝트 root 디렉토리에 위와 같은 파일을 만들어 놓고 webpack 명령을 수행할 때 어떤 설정 파일을 사용할지 결정하는 옵션을 사용하여 적용할 수 있다.

```bash
$ npx webpack --config webpack.config.js
```

그럼 `main.js` 파일이 아닌 `bundle.js` 파일로 번들링되어 출력되는 것을 확인할 수 있다.

위의 `webpack.config.js`는 보여주기 위한 내용이며 `webpack.config.js` 이름의 파일이 있을 경우 `—config` 옵션을 붙이지 않아도 해당 파일의 설정을 적용하여 번들링한다.