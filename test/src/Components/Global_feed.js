import React, { useEffect, useState } from "react";
import "./Feed.css";
import MessageSender from "./MessageSender";
import Post from "./Post";
import db from "../services/firebase";

function Global_feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('posts')
        .onSnapshot((snapshot) => {
            var p = snapshot.docs.map( doc => ({ id: doc.id, data: doc.data() }));
            p = p.sort((a, b) => a.data.timestamp < b.data.timestamp ? 1 : -1);
            setPosts(p)
        })
    }, []);
    return <div className="feed">
        <MessageSender/>
        {posts.map(post => (
            <Post
                key={post.id}
                id={post.id}
                profilePic={post.data.profilePic}
                message = {post.data.message}
                timestamp = {post.data.timestamp}
                username = {post.data.username}
                image = {post.data.image}
                likedBy = {post.data.likedBy}
            />
        ))}

    </div>
}

export default Global_feed;