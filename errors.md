# firebase.js > fbase.js

import 경로의 firebase를 모두 fbase로 고치기 (`fbase.js` 제외)

```javascript
import something from "firebase";   // ERROR
```
```javascript
import something from "fbase"; 
```



# API key error

1. API key 확인
2. `.env` 파일이 루트 폴더에 있는지 확인
3. 루트 폴더에 있는데도 오류가 난다면

    <https://hello-bryan.tistory.com/134>

`.env`**는 수정하고 나면 재시작해야합니다!**



# can't import from "firebase/app" (ver.9)

(`"firebase/auth"`는 그대로 써야 오류 안 나는데 얘만 오류 남...)

in `src/fbase.js`
```javascript
import firebase from "firebase/app" //ERROR
```
```javascript
import firebase from "firebase/compat/app"
```



# no default export in fbase.js

set default export

`src/fbase.js`

```javascript
export default firebase.initializeApp(firebaseConfig);
```



# .auth() method in fbase.js (ver.9)

`.auth()` 대신 `getAuth()`

in `src/fbase.js`, try

```javascript
import {getAuth} from "firebase/auth";
.
.
.
export default firebase.initializeApp(firebaseConfig);
export const firebaseInstance = firebase;
export const authService = getAuth();
```



# 메일 계정 만들기 오류 (ver.9)

in `src/routes/Auth.js`

```javascript
if (newAccount) {
    data = await authService.createUserWithEmailAndPassword(email,password);
} else {
    data = await authService.signInWithEmailAndPassword(email, password);   //ERROR
```

try

```javascript
import { createUserWithEmailAndPassword, signInWithPopup,signInWithEmailAndPassword } from "firebase/auth";
.
.
.
if (newAccount) {
    const data = await createUserWithEmailAndPassword(authService,email,password);
} else {
    const data = await signInWithEmailAndPassword(authService,email,password);
} 
```

# 소셜 계정 만들기 오류 (ver.9)

in `src/routes/Auth.js`

```javascript
if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);  //ERROR
```

try

```javascript
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
.
.
.
 if (name == "google") {
    provider = new GoogleAuthProvider();
} else if (name == "github") {
    provider = new GithubAuthProvider();
}
const data = await signInWithPopup(authService,provider);
console.log(data);
```