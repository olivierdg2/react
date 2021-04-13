import React, { useEffect, useState } from "react";
import "./Feed.css";
import MessageSender from "./MessageSender";
import Post from "./Post";
import db from "../services/firebase";
import { useStateValue } from "../StateProvider";

function Feed() {
    const [{ user }, dispatch] = useStateValue();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        //Get user's follows
        var fetch = db.collection('users_info').where("uid","==",user.uid).get()
        fetch.then((user_info) =>{
            const follows = user_info.docs[0].data().follows;
            try {
                //Firestore doesn't allow to make more than 10 selection at a time 
                db.collection('posts')
                .where("uid","in",follows)
                .onSnapshot((snapshot) => {
                    var post_temp = [];
                    post_temp = [...post_temp,...snapshot.docs.map( doc => ({ id: doc.id, data: doc.data() }))]
                    post_temp = post_temp.sort((a, b) => a.data.timestamp < b.data.timestamp ? 1 : -1)
                    //Finally set posts
                    setPosts(post_temp);
                })
            }
            catch {
                
            }
        })
        //Get the posts related to the user's follows

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