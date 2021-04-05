import React, { useEffect, useState } from "react";
import "./Feed.css";
import MessageSender from "./MessageSender";
import Post from "./Post";
import db from "../services/firebase";

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('posts')
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => 
            setPosts(snapshot.docs.map( doc => ({ id: doc.id, data: doc.data() })))
        );
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

export default Feed;