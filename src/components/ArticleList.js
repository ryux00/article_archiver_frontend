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
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
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
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Search
            placeholder="input search text"
            enterButton="Save"
            size="large"
          />
        </Modal>
      </div>
    );
  }
}

export default ArticleList;
