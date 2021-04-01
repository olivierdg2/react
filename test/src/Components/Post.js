import { Avatar } from "@material-ui/core";
import React from "react";
import "./Post.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutLineIcon from "@material-ui/icons/ChatBubbleOutline"
import { useStateValue } from "../StateProvider";
import db from "../services/firebase";

function Post({id, profilePic, image, username, timestamp, message, likedBy, comments}) {
    const [{ user }, dispatch] = useStateValue();
    const like = () => {   
        var check = false;
        likedBy.forEach(element => {
            if (user.email === element){
                check = true;
            };
        });
        //Case not liked yet 
        if (check === false){
            likedBy.push(user.email);
            db.collection("posts").doc(id.toString()).update({likedBy: likedBy});
        }
        //Unlike
        else {
            for( var i = 0; i < likedBy.length; i++){ 
                                   
                if ( likedBy[i] === user.email) { 
                    likedBy.splice(i, 1); 
                    i--; 
                }
            }
            db.collection("posts").doc(id.toString()).update({likedBy: likedBy});
        };
    };
    return (
        <div className="post">
            <div className="post__top">
                <Avatar src={profilePic}
                className="post__avatar"/>
                <div className="post__topinfo">
                    <h3>{username}</h3>
                    <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
                </div>
            </div>

            <div className="post__bottom">
                <p>{message}</p>
            </div>

            <div className="post__image">
                <img src={image} alt="" />
            </div>

            <div className="post_footer">
                <div className="footer__option">
                    <ThumbUpIcon/> 
                    {likedBy.length} 
                </div>
            </div>

            <div className="post__options">
                <div className="post__option" onClick={like}> 
                    <ThumbUpIcon/>
                    <p>Like</p>
                </div>
                <div className="post__option">
                    <ChatBubbleOutLineIcon/>
                    <p>Comment</p>
                </div>
            </div>

        </div>
    )
}

export default Post;