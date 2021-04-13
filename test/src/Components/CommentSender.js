import { Avatar } from "@material-ui/core";
import React, {useState} from "react";
import { useStateValue } from "../StateProvider";
import "./MessageSender.css";
import firebase from "firebase";
import db from "../services/firebase"

function CommentSender({id}) {
    const [{ user }, dispatch] = useStateValue();
    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input !== "" || imageUrl !== ""){
            db.collection('comments').add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                profilePic: user.photoURL,
                username: user.displayName,
                image: imageUrl,
                post_id: id
            })
    
            //Reset the values when refresh
            setInput("");
            setImageUrl("");
        }
    };
    const handleChange = (e) => {
        setInput(e.target.value);
        if (e.target.value !== ""){
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
                onChange={handleChange}
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

export default CommentSender;