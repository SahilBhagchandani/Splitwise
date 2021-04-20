import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import './Navbar.css';

//create the Navbar Component
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    // this.handleLogout = this.handleLogout.bind(this);
  }
  //handle logout to destroy the cookie
  // handleLogout = () => {
  //   cookie.remove("cookie", { path: "/" });
  // };

  render() {
    //if Cookie is set render Logout Button
    let navLogin = null;
    if (cookie.load("cookie")) {
      console.log("Able to read cookie");
      navLogin = (
        <li>
          <Link to="/login" onClick={this.handleLogout}>
            <span class="glyphicon glyphicon-user"></span>Logout
          </Link>
        </li>
      );
    } else {
      //Else display login button
      console.log("Not Able to read cookie");
      navLogin = (
        <Link to="/login">
          <button
            class="btn pull-right landingbtn btn-lg"
            style={{
            //   marginLeft: "5em",
            //   marginRight: "1em",
              backgroundColor: "#48be9d",
              color: "#ffffff",
            }}
          >
            Login
          </button>
        </Link>
      );
    }
    let redirectVar = null;
    if (cookie.load("cookie")) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        {redirectVar}
        <ul className="navbar-ul">
            <li className="navbar">
                <img src={require('./logo.png')}></img>
            </li>
          <li className="navbar">
            <h2 style={{color: "#ffffff", marginTop: "20px"}} className="textlogo">Splitwise</h2>
          </li>
          <li className="navbar btnnav">
          <Link to="/signup">
          <button
            class="btn pull-right landingbtn btn-lg"
            style={{
              
            //   marginRight: "2em",
            //   marginTop: "2em",
              backgroundColor: "#48be9d",
              color: "#ffffff",
            }}
          >
            Signup
          </button>
        </Link>
          </li>
          <li className="navbar btnnav">
          {navLogin}
          </li>
        </ul>


       
      </div>
    );
  }
}

