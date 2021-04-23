import { Avatar } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import { useStateValue } from "../StateProvider";
import "./MessageSender.css";
import firebase from "firebase";
import { actionTypes } from "../reducer";

function MessageSender() {
    const [{ user,posts }, dispatch] = useStateValue();
    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [input_invalid, setInput_invalid] = useState(true);

    useEffect(() => {
        if (input.trim().length == 0 && imageUrl.trim().length == 0){
            setInput_invalid(true);
        }
        else {
            setInput_invalid(false);
        }
    }, [input,imageUrl]);

    //Send message
    const handleSubmit = (e) => {
        //Prevent form to refresh the page
        e.preventDefault();
        
        //Prevent from spaming useless empty messages
        if (input !== "" || imageUrl !== ""){
            const time = new Date().getTime();
            const post = {
                message: input,
                timestamp: time,
                profilePic: user.photoURL,
                username: user.displayName,
                image: imageUrl,
                likedBy: [],
                uid: user.uid
            }
            dispatch({
                type: actionTypes.ADD_POST,
                post: post,
              });
            console.log(posts)
            //Reset the inputs values
            setInput("");
            setImageUrl("");
        }
    };

    return <div className="messageSender">
        <div className="messageSender__top">
            <Avatar src={user.photoURL}/>
            <form>
                <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="messageSender__input"
                placeholder={"Write a message"}/>

                <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="image URL (Optional)"/>

                <button id="sender" type="submit" disabled={input_invalid} onClick={handleSubmit}>Send</button>
            </form>
        </div>

    </div>;
}

export default MessageSender;