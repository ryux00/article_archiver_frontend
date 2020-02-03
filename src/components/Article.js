import React from "react";
import { Redirect } from "react-router-dom";

class Article extends React.Component {
  state = {
    article_data: {},
    status: false,
    redirect: false
  };
  fetch_article() {
    const request_body = {
      article_id: this.props.match.params.article
    };
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: "token " + localStorage.getItem("token")
      },
      redirect: "follow"
    };
    fetch(
      "http://127.0.0.1:8000/api/article/" + this.props.match.params.article,
      requestOptions
    )
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then(data => {
        console.log("Success:", data);
        this.setState({ article_data: data, status: true });
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
    console.log(this.props.match.params.article);
    console.log(this.state);
    return (
      <div className="container">
        <h1>{this.state.article_data.title}</h1>
        <div>{}</div>
        <div
          dangerouslySetInnerHTML={{ __html: this.state.article_data.content }}
        />
      </div>
    );
  }
}

export default Article;
