import React from "react";
import { Redirect } from "react-router-dom";
import Article from "./Article";
import { Radio } from "antd";
class ArticlePage extends React.Component {
  state = {
    article_data: {},
    status: false,
    redirect: false,
    theme: "normal"
  };

  handleThemeChange = e => {
    this.setState({ theme: e.target.value });
  };
  fetch_article() {
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
    let class_name = "container " + this.state.theme;
    let class_name_radio = "theme_select " + this.state.theme;

    return (
      <div className={class_name}>
        <Radio.Group
          defaultValue="normal"
          buttonStyle="solid"
          className={class_name_radio}
          onChange={this.handleThemeChange}
        >
          <Radio.Button value="dark_theme" className="dark_theme_selector">
            Dark Theme
          </Radio.Button>
          <Radio.Button value="normal">Normal</Radio.Button>
          <Radio.Button value="night_mode" className="night_mode_selector">
            Night Mode
          </Radio.Button>
        </Radio.Group>
        <div className="article-container">
          <Article article_data={this.state.article_data}></Article>
        </div>
      </div>
    );
  }
}

export default ArticlePage;
