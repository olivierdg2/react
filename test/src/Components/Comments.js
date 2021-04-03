import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Comments.css";
import db from "../services/firebase";
import CommentSender from "./CommentSender";

function Comments({id}) {
    const [comments, setComments] = useState([]);

    //Search for all comments related to the comment_id
    useEffect(() => {
        db.collection('comments')
        .where("post_id","==",id.toString())
        .onSnapshot((snapshot) =>
            setComments(snapshot.docs.map( doc => ({ id: doc.id, data: doc.data() }))));
    });
    
    return (
        <div className="post__comments">
            <CommentSender id={id}/>
            {comments.sort((a, b) => a.data.timestamp < b.data.timestamp ? 1 : -1).map(comment => (
                <div className="comment">
                    <Avatar src={comment.data.profilePic} className="comment__left"/>
                    <div className="comment__right">
                        <div className="comment_right_top">
                            <h3>{comment.data.username}</h3>
                            <p>{new Date(comment.data.timestamp?.toDate()).toUTCString()}</p>
                        </div>
                        <div className="comment_content">
                            <p>{comment.data.message}</p>
                            <img src={comment.data.image} alt="" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Comments;