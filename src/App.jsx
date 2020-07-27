import React from "react";
import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";

import NavC from "./app/components/Nav";
import Home from "./app/screens/Home";
import IVDrip from "./app/screens/IVDrip";
import Therapies from "./app/screens/Therapies";
import Services from "./app/screens/Services";
import Team from "./app/screens/Team";
import EditServices from "./app/screens/EditServices";
import EditIVDrips from "./app/screens/EditIVDrips";
import EditTherapies from "./app/screens/EditTherapies";
import EditTeam from "./app/screens/EditTeam";
import AdminAdd from "./app/screens/Admin";

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
                  <Route exact path="/admin" component={AdminAdd} />

                  <Route exact path="/admin/services" component={EditServices} />
                  <Route exact path="/admin/ivdrips" component={EditIVDrips} />
                  <Route exact path="/admin/therapies" component={EditTherapies} />
                  <Route exact path="/admin/team" component={EditTeam} />
        </div>
      </div>
    </Router>
  );
}

export default App;
