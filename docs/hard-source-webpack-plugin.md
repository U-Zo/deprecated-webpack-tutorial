# Hard Source Webpack Plugin

# Webpack 캐싱을 위한Hard Source Webpack Plugin

대규모 프로젝트 진행에 앞서 빌드할 프로젝트의 파일 개수가 많을 예정이기 때문에 빌드 속도는 느릴 것이 분명하였다. 프로젝트 시작 전에 이러한 빌드 속도가 오래 걸릴 것을 예방하기 위해 어떻게 하면 Webpack을 사용한 빌드 속도를 개선할 수 있을지 고민하는 와중에 **Hard Source Webpack Plugin**이라는 것을 적용 시도해보았다.

## Hard Source Webpack Plugin이란?

Webpack이 수행하는 작업은 `loader`, `plugin`를 제외한 외부 모듈들을 이용하는 것이기 때문에 통상적으로 캐싱하려고 하지 않는다. 그렇기 때문에 매번 빌드할 때마다 변경되지 않은 파일도 다시 번들링하는 것이고 자연스레 프로젝트가 클 수록 번들링 속도는 점점 느려지는 상태가 될 수 밖에 없는 것이다.

이를 해결하기 위해 방안을 마련하는 중 **Hard Source Webpack Plugin**을 알게 되었다. **Hard Source Webpack Plugin**은 웹팩 내부 모듈 처리의 중간 결과를 캐싱하도록 설계된 플러그인이다. 이 플러그인을 적용하면 웹팩이 다시 외부 모듈들을 탐색하는 등의 작업을 캐시내역으로 읽기 때문에 빠른 빌드를 수행한다. 그렇기 때문에 첫 빌드는 오래 걸리지만 두 번째 빌드부터는 빠른 속도를 체감할 수 있었기에 해결 방안이 될 수 있다고 생각했다.

### 적용 전

![Hard%20Source%20Webpack%20Plugin%20f28e67bcf6654c47a6aac973952bf8db/Untitled.png](Hard%20Source%20Webpack%20Plugin%20f28e67bcf6654c47a6aac973952bf8db/Untitled.png)

### 적용 후

![Hard%20Source%20Webpack%20Plugin%20f28e67bcf6654c47a6aac973952bf8db/Untitled%201.png](Hard%20Source%20Webpack%20Plugin%20f28e67bcf6654c47a6aac973952bf8db/Untitled%201.png)

## 🚨문제 발생

```bash
ERROR  [hardsource:b4a7ef3c] Could not freeze ./node_modules/core-js/modules/_an-instance.js: Cannot read property 'hash' of undefined                                                       13:01:57

ERROR  [hardsource:b4a7ef3c] Could not freeze ./node_modules/core-js/modules/_for-of.js: Cannot read property 'hash' of undefined                                                            13:01:57

ERROR  [hardsource:b4a7ef3c] Could not freeze ./node_modules/core-js/modules/_invoke.js: Cannot read property 'hash' of undefined                                                            13:01:57

ERROR  [hardsource:b4a7ef3c] Could not freeze ./node_modules/core-js/modules/_microtask.js: Cannot read property 'hash' of undefined                                                         13:01:57

ERROR  [hardsource:b4a7ef3c] Could not freeze ./node_modules/core-js/modules/_perform.js: Cannot read property 'hash' of undefined                                                           13:01:57

ERROR  [hardsource:b4a7ef3c] Could not freeze ./node_modules/core-js/modules/_user-agent.js: Cannot read property 'hash' of undefined                                                        13:01:57

ERROR  [hardsource:b4a7ef3c] Could not freeze ./node_modules/core-js/modules/_redefine-all.js: Cannot read property 'hash' of undefined                                                      13:01:57

ERROR  [hardsource:b4a7ef3c] Could not freeze ./node_modules/core-js/modules/_object-assign.js: Cannot read property 'hash' of undefined                                                     13:01:57

...
```

현 시점에서 여러 커뮤니티의 해결법으로 제안되는 것이 `node_modules/.cache/` 디렉토리를 삭제하는 것이라고 한다. 하지만 이 디렉토리를 삭제하는 것은 빌드하면서 캐싱했던 캐시들을 지우는 것이기 때문에 플러그인을 사용하는 의미가 없다.

### 문제 발생 이유

Hard Source Webpack Plugin은 웹팩 번들링의 중간 과정 결과를 캐싱한 것이기 때문에 의존 관계가 조금이라도 변경(추가, 수정, 삭제)되면 오류가 발생하게 된다. 그렇기 때문에 변경되는 일이 발생할 때마다 캐시를 업데이트 시키거나 수동으로 삭제해줘야 하는데 이는 빌드 속도를 근본적으로 향상 시키는 결과를 도출하지 못한다.

현 시점으로 이 플러그인은 2년 전에 업데이트가 중단되었다.