import React, { useEffect, useState } from "react";
import "./Feed.css";
import MessageSender from "./MessageSender";
import Post from "./Post";
import db from "../services/firebase";
import { useStateValue } from "../StateProvider";
import { Avatar } from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CheckIcon from '@material-ui/icons/Check';

function Follows() {
    const [{user, mode}, dispatch] = useStateValue();
    const [a,setUsers] = useState([]);
    
    useEffect(() => {
        //Get user's follows
        var fetch = db.collection('users_info').where("uid","==",user.uid).get()
        fetch.then((user_info) =>{
            const follows = user_info.docs[0].data().follows;
            try {
                //Firestore doesn't allow to make more than 10 selection at a time 
                db.collection('users_info').where("uid","in",follows).onSnapshot((snapshot)=>{
                    console.log([snapshot.docs.map( doc => (doc.data()))])
                    setUsers([snapshot.docs.map( doc => (doc.data()))]);
                })
            }
            catch {
                
            }
        })
        
    },[]);

    return (
        <div>
        {a.map(post => (
            <div>{post.username}</div>
        ))}
        </div>
    )
}

export default Follows;