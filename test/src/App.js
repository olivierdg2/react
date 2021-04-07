import React, { useEffect } from "react";
import "./App.css"
import Header from "./Components/Header";
import Feed from "./Components/Feed";
import Login from "./Components/Login";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import UserFeed from "./Components/UserFeed";
import db from "./services/firebase";

function App() {
  const [{user}, dispatch] = useStateValue();
  const [{mode}, setMode] = useStateValue();
  const [{follows}, setFollows] = useStateValue([]);
  //Get the user in the local storage 
  useEffect (() => {
    const result = JSON.parse(localStorage.getItem('user'));
    dispatch({
      type: actionTypes.SET_USER,
      user: result,
    });
    if (result != null){
      db.collection("users_info")
      .where("uid","==",result.uid.toString())
      .onSnapshot((snapshot) => 
          setFollows({
              type: actionTypes.SET_FOLLOWS,
              follows: snapshot.docs[0].data().follows,
          })
      );
    }
    else {
      try {
        db.collection("users_info")
        .where("uid","==",user.uid.toString())
        .onSnapshot((snapshot) => 
            setFollows({
                type: actionTypes.SET_FOLLOWS,
                follows: snapshot.docs[0].data().follows,
            })
        );
      }
      catch {

      }
    }
  }, []);
  return (
    <div className="app">
      {!user ? (
        <Login/>
      ) : (mode == "home" ? (
          <>
            <Header/>
            <div className="app__body">
                <Feed/>
            </div>
          </>
          ) : (
            <>
              <Header/>
              <div className="app__body">
                  <UserFeed/>
              </div>
            </>
          )

      )}
      
    </div>

  );
}

export default App;
