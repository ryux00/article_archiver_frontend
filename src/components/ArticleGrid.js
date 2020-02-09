import React from "react";
import { List, Avatar } from "antd";
// import { Redirect } from "react-router-dom";
// import { render } from "@testing-library/react";

class ArticleGrid extends React.Component {
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
                <a href={"article/" + item.article_data.id}>
                  {item.article_data.title}
                </a>
              }
              description={item.article_data.site_name}
            />
            <span>{this.get_reading_time(item.article_data)}</span>
          </List.Item>
        )}
      />
    );
  }
}

export default ArticleGrid;
