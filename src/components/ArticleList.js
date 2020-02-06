import React from "react";
import {
  Button,
  Form,
  Icon,
  Input,
  Checkbox,
  Empty,
  Menu,
  Avatar,
  Modal
} from "antd";
import { Layout } from "antd";

import ArticleGrid from "./ArticleGrid";
import { Redirect } from "react-router-dom";
// import { render } from "@testing-library/react";

class ArticleList extends React.Component {
  state = {
    article_list: [],
    status: false,
    redirect: false,
    add_new_modal_visible: false
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleSave = (value, event) => {
    let request_body = { url: value, tags: [] };
    fetch("http://127.0.0.1:8000/api/article/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: "token " + localStorage.getItem("token")
      },
      body: JSON.stringify(request_body)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
        this.handleCancel();
        let article_list = this.state.article_list;
        article_list.push(data)
        this.fetch_article();
      })
      .catch(error => {
        console.error("Error:", error);
        this.handleCancel();
      });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
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
    if (article.length === 0) {
      return <Empty />;
    }
    const { Header, Footer, Sider, Content } = Layout;
    const { Search } = Input;
    return (
      <div className="container">
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1" style={{ float: "right" }}>
            <Avatar icon="user" />
          </Menu.Item>
          <Menu.Item key="2" style={{ float: "right" }}>
            <Button shape="circle" icon="plus" onClick={this.showModal} />
          </Menu.Item>
        </Menu>

        <div className="article_grid_container">
          <ArticleGrid articles={article}></ArticleGrid>
        </div>
        <Modal
          title="Add New Article"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Search
            placeholder="Enter Article URL"
            enterButton="Save"
            size="large"
            required={true}
            onSearch={this.handleSave}
            type={Input.url}
          />
        </Modal>
      </div>
    );
  }
}

export default ArticleList;
