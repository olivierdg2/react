import React, { useEffect, useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import SupervisedUserCirecleIcon from "@material-ui/icons/SupervisedUserCircle";
import { Avatar, IconButton, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import NotificationActiveIcon from "@material-ui/icons/NotificationsActive";
import { useStateValue } from "../StateProvider";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Login from "./Login";
import { actionTypes } from "../reducer";
import Autocomplete from '@material-ui/lab/Autocomplete';
import db from "../services/firebase";

function Header() {
    const [{user }, dispatch] = useStateValue();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        db.collection('users_info')
        .onSnapshot((snapshot) => 
            setUsers(snapshot.docs.map( doc => ({ id: doc.id, data: doc.data() })))
        );
        console.log(users)
    }, []);

    const logOut = () => {
        localStorage.clear();
        dispatch({
            type: actionTypes.SET_USER,
            user: null
          });
    };

    const goto = () => {
        console.log("ok")
    };
    return (
        <div className="header">
            <div className="header__left"></div>
                <div className="header__input">
                    <SearchIcon/>
                    <div className="searchbar">
                        <Autocomplete
                            options= {users}
                            getOptionLabel= {option => option.data.username}
                            renderOption={option => {
                                return (
                                    <div className="user__searcher">
                                        <Avatar src={option.data.profilePic}/>
                                        <div className="user__searcher_username">{option.data.username}</div>
                                    </div>
                                );
                            }}
                            id="disable-clearable"
                            renderInput={(params) => <TextField {...params} label="Search on" margin="normal" />}
                        />
                    </div>
                </div>
            <div className="header__center">
                <div className="header__option
                header__option--active">
                    <HomeIcon fontSize="large"/>
                </div>
                <div className="header__option">
                    <SupervisedUserCirecleIcon fontSize="large"/>
                </div>
            </div>


            <div className="header__right">
                <div className="header__info">
                    <Avatar src={user.photoURL}/>
                    <h4>{user.displayName}</h4>
                </div>

                <IconButton>
                    <AddIcon/>
                </IconButton>
                <IconButton>
                    <NotificationActiveIcon/>
                </IconButton>
                <IconButton onClick={logOut}>
                    <ExitToAppIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default Header