import React, { useEffect } from "react";
import "./App.css"
import Header from "./Components/Header";
import Feed from "./Components/Feed";
import Login from "./Components/Login";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function App() {
  console.log(JSON.parse(localStorage.getItem('user')))
  const [{user}, dispatch] = useStateValue();
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
      ) : (
        <>
          <Header/>

          <div className="app__body">
              <Feed/>
            </div>
        </>
      )}
      
    </div>

  );
}

export default App;
