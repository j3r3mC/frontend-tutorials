import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Dashboard from "./components/dashboard/Dashboard";
import Preferences from "./components/preference/Preferences";
import Login from './components/login/Login';
import useToken from './useToken';
import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import Register from "./components/register.component";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div class="menuItem">
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
            <Link to={"/auth/register"} className="nav-link">
              Register
            </Link>
          </li>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<TutorialsList />} />
        <Route path="/tutorials" className="tuto" element={<TutorialsList />} />
        <Route path="/add" element={<AddTutorial />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/tutorials/:id" element={<Tutorial />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/login" className="logginStyle" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;