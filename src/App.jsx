import React from "react";
import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";

import NavC from "./app/components/Nav";
import Home from "./app/screens/Home";
import IVDrip from "./app/screens/IVDrip";
import Therapies from "./app/screens/Therapies";
import Services from "./app/screens/Services";
import Team from "./app/screens/Team";

function App() {
  return (
    <Router>
      <div>
        <NavC />
        <div className="container">
          <Route exact path="/" component={Home} />
          <Route exact path="/ivdrip/:slug" component={IVDrip} />
          <Route exact path="/therapies/:slug" component={Therapies} />
          <Route exact path="/services/:slug" component={Services} />
          <Route exact path="/team/:slug" component={Team} />
        </div>
      </div>
    </Router>
  );
}

export default App;
