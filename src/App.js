import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import Register from "./components/register.component";
import Login from "./components/login.component";


class App extends Component {
  render() {
    return(
      <div>
        <nav className="navbar navbar-expand">
          <Link to={"/tutorials"} className="navbar-brand sub nav-item">
            J3r3mC
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/auth/login"} className="nav-link">
                Login 
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/auth/register"} className="nav-link">
                Register 
              </Link>
            </li>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path = "/"              element = {<TutorialsList />} />
            <Route path = "/tutorials"     element= {<TutorialsList />} />
            <Route path = "/add"           element= {<AddTutorial />} />
            <Route path = "/tutorials/:id" element = {<Tutorial />} />
            <Route path = "/auth/register" element = {<Register/>}/>
            <Route path = "/auth/login"    element  = {<Login/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
