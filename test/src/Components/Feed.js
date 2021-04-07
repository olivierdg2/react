import React, { useEffect, useState } from "react";
import "./Feed.css";
import MessageSender from "./MessageSender";
import Post from "./Post";
import db from "../services/firebase";
import { useStateValue } from "../StateProvider";

function Feed() {
    const [{ user }, dispatch] = useStateValue();
    const [posts, setPosts] = useState([]);
    const [follows, setFollows] = useState([]);

    useEffect(() => {
        //Get user's follows
        db.collection('users_info')
        .where("uid","==",user.uid)
        .onSnapshot((snapshot) => {
            try {
                setFollows(snapshot.docs[0].data().follows)
            }
            catch{

            }
        }   
        );
        //Get the posts related to the user's follows
        try {
            //Firestore doesn't allow to make more than 10 selection at a time 
            var post_temp = [];
            for (var i = 0; i==Math.floor(follows.length/10);i++){
                //Last fetch
                if (i == (Math.floor(follows.length/10))){
                    db.collection('posts')
                    .where("uid","in",follows.slice(i*10,follows.length+1))
                    .onSnapshot((snapshot) => {
                        //Combine post_temp and new fetched posts 
                        post_temp = [...post_temp,...snapshot.docs.map( doc => ({ id: doc.id, data: doc.data() }))]
                        post_temp = post_temp.sort((a, b) => a.data.timestamp < b.data.timestamp ? 1 : -1)
                        //Finally set posts
                        setPosts(post_temp);
                    });
                }
                //normal fetch
                else {
                    db.collection('posts')
                    .where("uid","in",follows.slice(i*10,i*10+10))
                    .onSnapshot((snapshot) => 
                        post_temp = [...post_temp,...snapshot.docs.map( doc => ({ id: doc.id, data: doc.data() }))]
                    );
                };
            };
        }
        catch {
            
        }
    }, [follows]);
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