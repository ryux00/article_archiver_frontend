import React from "react";
// import { Button, Form, Icon, Input, Checkbox } from "antd";
// import { Redirect } from "react-router-dom";
// import { render } from "@testing-library/react";

class ArticleList extends React.Component {
  state = {
    article_list: [],
    status: false
  };
  fetch_article() {
    fetch("http://127.0.0.1:8000/api/article_list/", {
      headers: {
        Authorization: "token " + localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
        this.setState({ article_list: data.articles, status: true });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  render() {
    if (!this.state.status) {
      this.fetch_article();
    }
    const article = this.state.article_list;

    return (
      <ul>
        {article.map((value, index) => {
          if (value.article_id) {
            return <li key={index}>{value.article_id.title}</li>;
          }
        })}
      </ul>
    );
  }
}

export default ArticleList;
