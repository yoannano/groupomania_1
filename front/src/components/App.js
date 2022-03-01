import React from "react";
import Banner from "./Banner";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Post from "./Post";
import userAccount from "./UserAccount";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Route path="/home" exact component={Banner} />
          <Route path="/profile" exact component={Banner} />
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/home" exact component={Post} />
          <Route path="/home" exact component={Home} />
          <Route path="/profile" exact component={userAccount} />
        </div>
      </div>
    </Router>
  );
}

export default App;
