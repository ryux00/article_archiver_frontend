import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import ArticleList from "./ArticleList.js";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/article" component={ArticleList} />
    </Switch>
  </BrowserRouter>
);
export default Router;
