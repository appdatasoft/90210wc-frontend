import React, { useRef, useEffect, useState } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { HashRouter as Router, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

import "./App.css";
import NavC from "./app/components/Nav";
import Home from "./app/screens/Home";
import Ivdrip from "./app/screens/IVDrip";
import Therapies from "./app/screens/Therapies";
import Services from "./app/screens/Services";
import Team from "./app/screens/Team";
import Email from "./app/screens/Email";

const client = new ApolloClient({
  uri: "https://vj0qrrbnk5.execute-api.us-east-1.amazonaws.com/dev/graphql",
  cache: new InMemoryCache(),
});

const GET_MENU = gql`
  query GetMenuData {
    getIvdrips {
      title
      slug
      description
    }
    getServices {
      title
      slug
      description
    }
    getTeams {
      title
      slug
      description
    }
    getTherapies {
      title
      slug
      description
    }
  }
`;

function App() {
  const [showLoader, setShowloader] = useState(true);
  const [menuData, setMenuData] = useState({
    ivdrips: [],
    therapies: [],
    services: [],
    teams: [],
  });

  const getMenu = () => {
    ref.current.continuousStart();
    client
      .query({
        query: GET_MENU,
      })
      .then(({ data }) => {
        setMenuData({
          ivdrips: data.getIvdrips,
          therapies: data.getTherapies,
          teams: data.getTeams,
          services: data.getServices,
        });
        ref.current.complete();
        setShowloader(false);
      })
      .catch((err) => {
        ref.current.complete();
        setShowloader(false);
      });
  };
  const ref = useRef(null);

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {showLoader ? (
            <LoadingBar color="#f11946" ref={ref} />
          ) : (
            <>
              <NavC data={menuData} />
              <div className="container">
                <Route exact path="/" component={Home} />
                <Route
                  exact
                  path="/ivdrip/:slug"
                  render={(props) => (
                    <Ivdrip data={menuData.ivdrips} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/therapies/:slug"
                  render={(props) => (
                    <Therapies data={menuData.therapies} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/services/:slug"
                  render={(props) => (
                    <Services data={menuData.services} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/team/:slug"
                  render={(props) => <Team data={menuData.teams} {...props} />}
                />
                <Route exact path="/email" component={Email} />
              </div>
            </>
          )}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
