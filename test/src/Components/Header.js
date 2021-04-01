import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import SupervisedUserCirecleIcon from "@material-ui/icons/SupervisedUserCircle";
import { Avatar, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import NotificationActiveIcon from "@material-ui/icons/NotificationsActive";
import { useStateValue } from "../StateProvider";
function Header() {
    const [{user }, dispatch] = useStateValue();

    return (
        <div className="header">
            <div className="header__left"></div>
                <div className="header__input">
                    <SearchIcon/>
                    <input placeholder="Search a friend" type="text"/>
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
            </div>
        </div>
    )
}

export default Header