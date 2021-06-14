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
import { actionTypes } from "../reducer";
import Autocomplete from '@material-ui/lab/Autocomplete';
import db from "../services/firebase";
import LanguageIcon from '@material-ui/icons/Language';

function Header() {
    const [{user,mode }, dispatch] = useStateValue();
    const [users, setUsers] = useState([]);

    //At each load, set the users in the search bar
    useEffect(() => {
        db.collection('users_info')
        .onSnapshot((snapshot) => 
            setUsers(snapshot.docs.map( doc => ({ id: doc.id, data: doc.data() })))
        );
    }, []);

    //Log out button
    const logOut = () => {
        localStorage.clear();
        dispatch({
            type: actionTypes.SET_USER,
            user: null
          });
    };

    //Home button
    const home = () => {
        dispatch({
            type: actionTypes.SET_MODE,
            mode: "home"
          });
    }

    //Global_feed button
    const global = () => {
        dispatch({
            type: actionTypes.SET_MODE,
            mode: "global"
            });
    }

    //Follows buttons
    const follows = () => {
        dispatch({
            type: actionTypes.SET_MODE,
            mode: "follows"
          });
    }

    return (
        <div className="header">
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
                            onSelect={(event, newValue) => {
                                if (newValue != null){
                                    dispatch({
                                        type: actionTypes.SET_MODE,
                                        mode: newValue.data
                                      });
                                }
                              }}
                            onChange={(event, newValue) => {
                                if (newValue != null){
                                    dispatch({
                                        type: actionTypes.SET_MODE,
                                        mode: newValue.data
                                        });
                                }
                                }}
                            id="disable-clearable"
                            renderInput={(params) => <TextField {...params} label="Search on Olbook" margin="normal"/>}
                        />
                    </div>
                </div>

            {mode === "home" ? (
                <div className="header__center">
                <div className="header__option header__option--active" onClick={home}>
                        <HomeIcon fontSize="large"/>
                    </div>
                    <div className="header__option" onClick={global}>
                        <LanguageIcon fontSize="large"/>
                    </div>
                    {/*
                    <div className="header__option" onClick={follows}>
                        <SupervisedUserCirecleIcon fontSize="large"/>
                    </div>
                    */}

                </div>
            ):(mode==="global" ?(
                <div className="header__center">
                    <div className="header__option" onClick={home}>
                        <HomeIcon fontSize="large"/>
                    </div>
                    <div className="header__option header__option--active" onClick={global}>
                        <LanguageIcon fontSize="large"/>
                    </div>
                    {/*
                    <div className="header__option" onClick={follows}>
                        <SupervisedUserCirecleIcon fontSize="large"/>
                    </div>
                    */}
                </div>
            ):(mode ==="follows"?(
                <div className="header__center">
                    <div className="header__option" onClick={home}>
                        <HomeIcon fontSize="large"/>
                    </div>
                    <div className="header__option" onClick={global}>
                        <LanguageIcon fontSize="large"/>
                    </div>
                    {/*
                    <div className="header__option header__option--active"" onClick={follows}>
                        <SupervisedUserCirecleIcon fontSize="large"/>
                    </div>
                    */}
                </div>
            ):(
                <div className="header__center">
                    <div className="header__option" onClick={home}>
                        <HomeIcon fontSize="large"/>
                    </div>
                    <div className="header__option" onClick={global}>
                        <LanguageIcon fontSize="large"/>
                    </div>
                    {/*
                    <div className="header__option" onClick={follows}>
                        <SupervisedUserCirecleIcon fontSize="large"/>
                    </div>
                    */}
                </div> 
            )
            )
            )}

            <div className="header__right">
                <div className="header__info">
                    <Avatar src={user.photoURL}/>
                    <h4>{user.displayName}</h4>
                </div>
                
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