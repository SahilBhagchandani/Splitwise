import React, { Component } from "react";
import { Link } from "react-router-dom";
import './topNavbar.css';
import cookie from 'react-cookies';
import { Redirect } from "react-router";


export default class topNavbar extends Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () =>{
    console.log("hello1")

    localStorage.clear();
    console.log("token:", localStorage.getItem('token'))
  };
  render() {
    let redirectVar = null;
    console.log("token:", localStorage.getItem('token'))
    if(!localStorage.getItem('token')){
        redirectVar = <Redirect to= "/"/>
        console.log("hello")
    }
    return (
      <div>
        {redirectVar}
        <ul className="topnavbar-ul">
          <li className="topnavbar-li">
            <img src={require("./logo.png")}></img>
          </li>
          <li className="topnavbar-li">
            <h2 style={{ color: "#ffffff" }} id="textlogo">
              Splitwise
            </h2>
          </li>
          <li className="topnavbar-li">
            <Link to="/profilePage">
              <button
                class="btn btn-lg"
                style={{
                    marginLeft: "1200px",
                    marginTop: "2em",
                  backgroundColor: "#48be9d",
                  color: "#ffffff",
                }}
              >
                Profile
              </button>
            </Link>
          </li>
          <li className="topnavbar-li">
            <Link to="/">
              <button onClick={this.handleLogout}
                class="btn pull-right landingbtn btn-lg"
                style={{
                    marginLeft: "10px",
                    marginTop: "2em",
                    marginBottom: "2em",
                  backgroundColor: "#48be9d",
                  color: "#ffffff",
                }}
              >
                Logout
              </button>
            </Link>
          </li>


        </ul>
        
      </div>
    );
  }
}
