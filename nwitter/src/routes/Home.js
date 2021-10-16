import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import { dbService } from "fbase";
import { addDoc, collection, onSnapshot, query, orderBy } from "@firebase/firestore";

const Home = ( {userObj} ) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    useEffect(() => {  // Snapshot부분이 Realtime으로 만들어줌
        const q = query(
            collection(dbService,"nweets"),
            orderBy("createAt","desc"),
        );
        onSnapshot(q, (snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
    }, []);
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"),{
                text:nweet,
                createAt:Date.now(),
                creatorId:userObj.uid,
            });
            console.log("Document written with ID: ", docRef.id);
        }
        catch (error) {
            console.error("Error adding document: ",error);
        }
    setNweet("");
    };
    const onChange = (event) => {
        const {
             target: { value },
        } = event;
        setNweet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value = {nweet} onChange={onChange} type = "text" placeholder="What's on your mind?" maxLength={120} />
                <input type= "submit" value = "Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj = {nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;