import React from "react";
import { Button, Form, Icon, Input } from "antd";
// const { Form, Icon, Input, Button, Checkbox } = antd;
import "antd/dist/antd.css";

function Login() {
  return (
    <div className="Login">
      <header className="App-header">
        <Form className="login-form">
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
          />
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
          <Button type="primary">Login</Button>
        </Form>
      </header>
    </div>
  );
}

export default Login;
