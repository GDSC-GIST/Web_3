import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { authService } from "fbase"

// 유저의 정보를 담는 객체 Auth
const Auth = () => {
    // 처음에 초기화해주자
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    // event로 onChange가 바뀌었을때
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email") {
            setEmail(value);
        }
        else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            let data;
            if(newAccount) {
            // create account
                const data = await createUserWithEmailAndPassword(authService,email,password);
            }
            else {
                // login
                const data = await signInWithEmailAndPassword(authService,email, password);
            }
            console.log(data);
        } catch(error){
            setError(error.message);
        }
    }
const toggleAccount = () => setNewAccount((prev) => !prev)
const onSocialClick = async(event) => { 
    const {target: {name},
    } = event;
    let provider;
    try {
        if(name === "google") {
            provider = new GoogleAuthProvider();
            const result = await signInWithPopup(authService, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
        }else if (name === "github") {
            provider = new GithubAuthProvider();
            const result = await signInWithPopup(authService, provider);
            const credential = GithubAuthProvider.credentialFromResult(result);
        }
    }
    catch (error) {
        console.log(error);
    }
}

return (
    <div>
        <form onSubmit={onSubmit}>
            <input name = "email" type="text" placeholder="Email" required value={email} onChange={onChange}/>
            <input name = "password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
            <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
        <div>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
            <button onClick={onSocialClick} name="github">Continue with Github</button>
        </div>
    </div>
);
}
export default Auth;
