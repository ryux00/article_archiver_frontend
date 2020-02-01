import React from "react";
import { Button, Form, Icon, Input, Checkbox, Empty, List, Avatar } from "antd";
// import { Redirect } from "react-router-dom";
// import { render } from "@testing-library/react";

class ArticleGrid extends React.Component {
  render() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.props.articles}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{item.article_id.site_name[0]}</Avatar>}
              title={<a href="https://ant.design">{item.article_id.title}</a>}
              description={item.article_id.site_name}
            />
            <span>{Math.ceil(item.article_id.length / 800)} minute read</span>
          </List.Item>
        )}
      />
    );
  }
}

export default ArticleGrid;

{
  /* <ul>
{this.props.articles.map((value, index) => {
  if (value.article_id) {
    return <li key={index}>{value.article_id.title}</li>;
  }
})}
</ul> */
}
