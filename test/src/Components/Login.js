import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "../services/firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

function Login() {
    const [state, dispatch] = useStateValue();
    
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
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
                Sign In
            </Button>

        </div>
    )
}

export default Login;