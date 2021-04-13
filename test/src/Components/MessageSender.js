import { Avatar } from "@material-ui/core";
import React, {useState} from "react";
import { useStateValue } from "../StateProvider";
import "./MessageSender.css";
import firebase from "firebase";
import { actionTypes } from "../reducer";

function MessageSender() {
    const [{ user,posts }, dispatch] = useStateValue();
    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');

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

    //Disable send button when the message is empty 
    const handleChange = (message) => {
        setInput(message);
        if (message !== ""){
            document.getElementById("sender").disabled = false;
        }
        else {
            document.getElementById("sender").disabled = true;
        }
    };

    return <div className="messageSender">
        <div className="messageSender__top">
            <Avatar src={user.photoURL}/>
            <form>
                <input 
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                className="messageSender__input"
                placeholder={"Write a message"}/>

                <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="image URL (Optional)"/>

                <button id="sender" type="submit" onClick={handleSubmit}>Send</button>
            </form>
        </div>

    </div>;
}

export default MessageSender;