# 3.1

## can't submit Nweet (ver.9)

in `src/fbase.js`

``` javascript
import "firebase/firestore";
.
.
.
export const dbService = firebase.firestore();  // ERROR
```

try

``` javascript
import { getFirestore } from "firebase/firestore";
.
.
.
export const dbService = getFirestore();
```

and in `src/routes/Home.js`

``` javascript
const onSubmit =  async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            nweet,
            createdAt: Date.now()
        }); // ERROR
        setNweet("");
    };
```

try

``` javascript
import { collection, addDoc } from "firebase/firestore"
.
.
.
const onSubmit =  async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            nweet,
            createdAt: Date.now()
        });
        setNweet("");
    };
```