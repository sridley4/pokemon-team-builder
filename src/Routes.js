import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewTeam from "./pages/NewTeam";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/notes/new">
        <NewTeam />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}