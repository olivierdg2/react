import React, { useEffect, useState } from "react";
import "./Feed.css";
import Post from "./Post";
import db from "../services/firebase";
import { useStateValue } from "../StateProvider";
import { Avatar } from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CheckIcon from '@material-ui/icons/Check';

function UserFeed() {
    const [{user,mode}, dispatch] = useStateValue();
    const [posts, setPosts] = useState([]);
    const [status, setStatus] = useState();

    useEffect(() => {
        console.log(mode.uid)
        db.collection('posts')
        .where("uid","==",mode.uid)
        .onSnapshot((snapshot) => {
            var p = snapshot.docs.map( doc => ({ id: doc.id, data: doc.data() }));
            p = p.sort((a, b) => a.data.timestamp < b.data.timestamp ? 1 : -1);
            setPosts(p)
        });
        db.collection('users_info')
        .where("uid","==",user.uid)
        .onSnapshot((snapshot) =>{
            try {
                if (snapshot.docs[0].data().follows.includes(mode.uid)){
                    setStatus(true)
                }
                else{
                    setStatus(false)
                }
            }
            catch {

            }
        });
    },[mode]);
    
    const follow = async () => {
        var follows = db.collection('users_info').where("uid","==",user.uid).get()
        follows.then((value) =>{
            var result = value.docs[0].data().follows
            if (result.includes(mode.uid)){
                for( var i = 0; i < result.length; i++){ 
                                   
                    if ( result[i] === mode.uid) { 
                        result.splice(i, 1); 
                        i--; 
                    }
                }
            }
            else {
                result.push(mode.uid)
            }
            db.collection('users_info')
            .doc(value.docs[0].id)
            .update({follows:result})
            console.log(result)

        });

    };

    return <div className="feed">
        <div className="feed__header">
            <div className="user__info">
                <Avatar src={mode.profilePic} className="user__avatar"/>
                <div>{mode.username}'s posts</div>
                <div>
                {user.uid === mode.uid ? (
                    <div></div>
                ) : (status ? (
                                <CheckIcon onClick={follow}/>
                    ) : (
                        <PersonAddIcon onClick={follow}/>
                    )
                )}

                </div>
            </div>
        </div>

        
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

export default UserFeed;