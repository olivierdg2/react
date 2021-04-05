import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import db, { auth, provider } from "../services/firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
import firebase from "firebase/app";

function Login() {
    const [state, dispatch] = useStateValue();
    
    const signIn = () => {
        auth
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            auth
            .signInWithPopup(provider)
            .then((result) => {
                db.collection('users_info')
                .where("uid","==",result.user.uid.toString())
                .onSnapshot((snapshot) => {
                    if (snapshot.docs.length == 0){
                        db.collection('users_info').add({
                            uid: result.user.uid,
                            profilePic: result.user.photoURL,
                            username: result.user.displayName,
                            follows: []})
                    }
                });
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
                localStorage.setItem("user", JSON.stringify(result.user))
            })
            .catch((error) => alert(error.message));
        })
        .catch((error) => alert(error.message));
    };
    return (
        <div className="login">
            <div className="login__logo">
                <img
                src="https://i.ibb.co/6XTpQwW/q-Oap-H6-Tl-400x400.jpg"
                alt=""
                />

            </div>
            <h3>Olbook</h3>
            <Button type="submti" onClick={signIn}>
                Sign In with Google
            </Button>

        </div>
    )
}

export default Login;