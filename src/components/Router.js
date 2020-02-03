import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import ArticleList from "./ArticleList.js";
import Article from "./Article";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/article" component={ArticleList} />
      <Route exact path="/article/:article" component={Article} />
    </Switch>
  </BrowserRouter>
);
export default Router;
