import { dbService } from "fbase";
import { doc, deleteDoc } from "firebase/firestore"
import React from "react";

const Nweet = ({nweetObj, isOwner}) => {
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you watn to delete this nweet?");
        
        if(ok) {
            //delete nweet
            await deleteDoc(doc(dbService, "nweets", '$nweetObj.id'));
        }
    }
return (
    <div>
        <h4>{nweetObj.text}</h4>
        {isOwner && (
            <>
            <button onClick= {onDeleteClick} >Delete Nweet</button>
            <button>Edit Nweet</button>
            </>
        )}
    </div>
    );
}

export default Nweet;