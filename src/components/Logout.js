import React from "react";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {
  render() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    return <Redirect to="/login" />;
  }
}

export default Logout;
