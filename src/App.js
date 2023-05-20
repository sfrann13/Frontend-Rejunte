import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTrago from "./components/add-trago.component";
import Trago from "./components/trago.component";
import TragoList from "./components/tragos-list.component";

class App extends Component {
  render() {
    return (
      <div style= {{height:'100vh', backgroundColor:'#E0EFEB'}}>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/trago"} className="navbar-brand">
            Rejunte
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/trago"} className="nav-link">
                Trago
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<TragoList/>} />
            <Route path="/trago" element={<TragoList/>} />
            <Route path="/add" element={<AddTrago/>} />
            <Route path="/trago/:id" element={<Trago/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
