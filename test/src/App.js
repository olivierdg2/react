import React from "react";
import "./App.css"
import Header from "./Components/Header";
import Feed from "./Components/Feed";
import Login from "./Components/Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{user}, dispatch] = useStateValue();
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
