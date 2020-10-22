import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewTeam from "./pages/NewTeam";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";


export default function Routes() {
  return (
    <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <UnauthenticatedRoute exact path="/login">
            <Login />
        </UnauthenticatedRoute>
        <UnauthenticatedRoute exact path="/signup">
            <Signup />
        </UnauthenticatedRoute>
        <AuthenticatedRoute exact path="/teams/new">
            <NewTeam />
        </AuthenticatedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}