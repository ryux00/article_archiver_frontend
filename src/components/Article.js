import React from "react";
import { Redirect } from "react-router-dom";

class Article extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.article_data.title}</h1>
        <h4 className="article-byline">{this.props.article_data.byline}</h4>
        <span>
          {this.props.article_data.estimated_reading_time
            ? this.props.article_data.estimated_reading_time
            : Math.ceil(this.props.article_data.length / 800)}{" "}
          minute read
        </span>
        <hr></hr>
        {/* Dangerous!!! */}
        <div
          dangerouslySetInnerHTML={{
            __html: this.props.article_data.content
          }}
        />
      </div>
    );
  }
}

export default Article;
