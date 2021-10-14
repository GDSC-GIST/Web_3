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



# 3.2

### firebase ver.9

Unhandled Rejection (TypeError): fbase__WEBPACK_IMPORTED_MODULE_1__.dbService.collection is not a function

in `src/routes/Home.js`

``` javascript
const getNweets = async() => {
    const dbNweets = await dbService.collection("nweets").get() // ERROR
    dbNweets.forEach((document) => {
        const nweetObject = {
            ...document.data(),
            id: document.id,
        }
        setNweets((prev) => [nweetObject, ...prev]);
    });
}
```

try 

``` javascript
import { collection, addDoc, getDocs } from "firebase/firestore"
.
.
.
const getNweets = async() => {
    const dbNweets = await getDocs(collection(dbService, "nweets"));    // THIS LINE
    dbNweets.forEach((document) => {
        const nweetObject = {
            ...document.data(),
            id: document.id,
        }
        setNweets((prev) => [nweetObject, ...prev]);
    });
}
```



# 3.3

### firebase ver.9

in `src/routes/Home.js`

``` javascript
useEffect(() => {
    getNweets();
    dbService.collection("nweets").onSnapshot(snapshot =>{  // ERROR
        const nweetArray = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setNweets(nweetArray);
    });
}, []);
```

try

``` javascript
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
.
.
.
useEffect( () => {
    onSnapshot (
    query(collection(dbService, "nweets"), orderBy("createdAt", "desc")),
    (snapshot => {
        const nweetArray = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    setNweets(nweetArray);
    }));
}, []);
```



### warning

index.js:1 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

*오류는 아닌데... 어떻게 해결하지??*



# 3.5 - 3.6

### firebase ver.9

in `src/components/Nweets.js`

``` javascript
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
.
.
.
const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
        dbService.doc(`nweets/${nweetObj.id}`).delete(); // ERROR
    }
};
.
.
.
const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({   // ERROR
        text:newNweet,
    })
    setEditing(false);
};
```

try 

``` javascript
const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    console.log(ok);
    if (ok) {
        deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
    }
};
.
.
.
const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService,`nweets/${nweetObj.id}`), {
        text:newNweet,
    })
    setEditing(false);
};
```