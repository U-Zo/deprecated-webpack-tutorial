# Nuxt Webpack 설정 변경

# Nuxt Webpack 커스텀하기

Nuxt를 사용하기위한 설정은 `nuxt.config.js` 파일을 통해 할 수 있다. 웹팩에 대한 설정은 `build` 속성을 정의하여 변경할 수 있다.

## build 속성의 extend

Nuxt에서 webpack 설정을 변경하려면 `build` 속성의 `extend` 메소드를 사용하여 변경할 수 있고 extend 메소드는 2개의 매개 변수를 받는다.

**예제**

```jsx
export default {
  build: {
    extend(config, { isDev, isClient }) {
      // ..
      config.module.rules.push({
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      })
      // Sets webpack's mode to development if `isDev` is true.
      if (isDev) {
        config.mode = 'development'
      }
    }
  }
}
```

첫 번째 매개변수인 `config`는 Nuxt 프로젝트의 webpack 객체를 전달해주며 두 번째의 매개변수는 부울 속성이 있는 컨텍스트 객체이다. `{ isDev, isClient, isServer, loaders }`

- isDev: 개발 모드 여부
- isClient: 클라이언트 사이드 여부
- isServer: 서버 사이드 여부
- loaders: Nuxt의 loader들의 설정 정보

## 기존 loader 설정 변경하기

Nuxt는 webpack에서 사용하는 `loader`들이 이미 정의되어 있기 때문에 해당 `loader`의 설정을 변경하려면 기존의 `rule` 객체를 수정해주어야 한다. `rule`은 webpack 객체의 `module` 객체의 `rules` 라는 배열에 정의되어 있으므로 이를 찾아 수정하면 된다.

**예제**

```jsx
build: {
  extend(config, ctx) {
    const babelLoader = config.module.rules[2];
    babelLoader.exclude = [/(node_modules)/, /static\/js/];
  }
},
```

이 예제는 `babel-loader`의 제외 대상을 지정해주는 예제이다. `rules`를 출력해본 결과 배열 인덱스 2에
`babel-loader`를 사용하고 있으므로 이를 변수에 저장하여 `exclude` 속성을 설정해주었다.

> `exclude` 속성은 파일이나 폴더를 loader의 적용 범위로부터 제외하는 속성이다.

webpack의 loader, plugin 등의 사용 여부로 빌드 속도의 차이는 분명하게 나타나므로 필요 시 적절한 webpack 설정을 통해 빌드 성능 향상을 구현하도록 하면 좋겠다.

참고: [Nuxt.js - How to extend webpack config?](https://nuxtjs.org/faq/extend-webpack/)