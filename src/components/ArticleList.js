import React from "react";
import { Button, Form, Icon, Input, Checkbox, Empty } from "antd";
import ArticleGrid from "./ArticleGrid";
import { Redirect } from "react-router-dom";
// import { render } from "@testing-library/react";

class ArticleList extends React.Component {
  state = {
    article_list: [],
    status: false,
    redirect: false
  };
  fetch_article() {
    fetch("http://127.0.0.1:8000/api/article_list/", {
      headers: {
        Authorization: "token " + localStorage.getItem("token")
      }
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then(data => {
        console.log("Success:", data);
        this.setState({ article_list: data.articles, status: true });
      })
      .catch(error => {
        console.error("Error:", error);
        this.setState({ redirect: true, status: true });
      });
  }

  render() {
    if (!this.state.status) {
      this.fetch_article();
    }
    if (this.state.redirect && this.state.status) {
      return <Redirect to="/login" />;
    }

    let article = this.state.article_list;
    if (article.length == 0) {
      return <Empty />;
    }
    return (
      <div className="container">
        <div className="article_grid_container">
          <ArticleGrid articles={article}></ArticleGrid>
        </div>
      </div>
    );
  }
}

export default ArticleList;
