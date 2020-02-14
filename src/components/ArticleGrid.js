import React from "react";
import {
  List,
  Avatar,
  Icon,
  Menu,
  Dropdown,
  message,
  Modal,
  Select
} from "antd";
// import { Redirect } from "react-router-dom";
// import { render } from "@testing-library/react";
const { confirm } = Modal;

const { Option } = Select;
const children = [];

function handleChange(value) {
  children.push(<Option key={value}>{value}</Option>);
  console.log(<Option key={value}>{value}</Option>);
}
class ArticleGrid extends React.Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  ArticleMenuonClick = ({ key }) => {
    message.info(`Click on item ${key}`);
    // showDeleteConfirm(key);
    this.showModal();
  };
  showDeleteConfirm(key) {
    confirm({
      title: "Are you sure delete this article?",
      content: "This is not reversibile",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log(key + "deleted");
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }
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

  get_reading_time = article_data => {
    let reading_time = article_data.estimated_reading_time
      ? article_data.estimated_reading_time
      : Math.ceil(article_data.length / 800);
    if (!isNaN(reading_time)) {
      return reading_time + " minute read";
    }
    return "";
  };
  render() {
    return (
      <div>
        <List
          itemLayout="horizontal"
          dataSource={this.props.articles}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar>
                    {item.article_data.site_name
                      ? item.article_data.site_name[0]
                      : item.article_data.title[0]}
                  </Avatar>
                }
                title={
                  <a href={"article/" + item.id}>
                    {item.article_data.title}
                  </a>
                }
                description={this.get_reading_time(item.article_data)}
              />
              <span className="article_grid_menu_icon">
                {/* TODO move this to it's own component */}
                <Dropdown
                  overlay={
                    <Menu onClick={this.ArticleMenuonClick}>
                      <Menu.Item key={"tag_" + item.id}>
                        <Icon type="tags" onClick={this.showModal} /> Tag
                      </Menu.Item>
                      <Menu.Item key={"delete_" + item.id}>
                        <Icon type="delete" />
                        Delete{" "}
                      </Menu.Item>
                      <Menu.Item key={"archive_" + item.id}>
                        <Icon type="container" /> Archive
                      </Menu.Item>
                      <Menu.Item key={"mark_read_" + item.id}>
                        <Icon type="check" /> Mark as Read
                      </Menu.Item>
                      <Menu.Item key={"refetch_" + item.id}>
                        <Icon type="sync" spin /> Refetch Article
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Icon style={{ fontSize: "20px" }} type="ellipsis" />
                </Dropdown>
              </span>
            </List.Item>
          )}
        />
        <Modal
          title="Tag Article"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Add Tags"
            onChange={handleChange}
          >
            {children}
          </Select>
        </Modal>
      </div>
    );
  }
}

export default ArticleGrid;
