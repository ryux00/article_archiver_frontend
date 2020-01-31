import React from "react";
import { Button, Form, Icon, Input, Checkbox } from "antd";
import { Redirect } from "react-router-dom";
// const { Form, Icon, Input, Button, Checkbox } = antd;
import "antd/dist/antd.css";
class NormalLoginForm extends React.Component {
  state = {
    redirect: false
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const request_body = {
          username: values.username,
          password: values.password
        };
        fetch("http://127.0.0.1:8000/api/login/", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(request_body)
        })
          .then(response => response.json())
          .then(data => {
            console.log("Success:", data);
            localStorage.setItem("token", data["token"]);
            this.setState({ redirect: true });
          })
          .catch(error => {
            console.error("Error:", error);
          });
        console.log("Received values of form: ", request_body);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div id="container">
        <div id="form_container">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <span className="login_header">Login</span>

            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="/reset-password">
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <a href="/register">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);
export default WrappedNormalLoginForm;
