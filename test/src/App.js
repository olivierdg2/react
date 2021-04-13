import React, { useEffect } from "react";
import "./App.css"
import Header from "./Components/Header";
import Feed from "./Components/Feed";
import Login from "./Components/Login";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import UserFeed from "./Components/UserFeed";
import Global_feed from "./Components/Global_feed";
import Follows from "./Components/follows";

function App() {
  const [{user,mode}, dispatch] = useStateValue();
  //Get the user in the local storage 
  useEffect (() => {
    const result = JSON.parse(localStorage.getItem('user'));
    dispatch({
      type: actionTypes.SET_USER,
      user: result,
    });
  }, []);
  return (
    <div className="app">
      {!user ? (
        <Login/>
      ) : (mode === "home" ? (
          <>
            <Header/>
            <div className="app__body">
                <Feed/>
            </div>
          </>
          ) : (mode ==="global" ? (
            <>
              <Header/>
              <div className="app__body">
                  <Global_feed/>
              </div>
            </>
            ) /*: (mode==="follows" ?(
              <>
                <Header/>
                <div className="app__body">
                    <Follows/>
                </div>
              </>
            )*/ : (
              <>
              <Header/>
              <div className="app__body">
                  <UserFeed/>
              </div>
              </>
            )
          )
      )}
      
    </div>

  );
}

export default App;
