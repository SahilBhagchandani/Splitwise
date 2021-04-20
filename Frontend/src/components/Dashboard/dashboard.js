import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Navbar from "../Navbar/Navbar";
import LeftNavbar from "../leftNavbar/LeftNavbar";
import TopNavbar from "../topNavbar/TopNavbar";

class dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    axios.get("http://localhost:3001/home").then((response) => {
      //update the state with the response data
      this.setState({});
    });
  }

  render() {
    //iterate over books to create a table row
    //if not logged in go to login page
    
    let redirectVar = null;
        if(localStorage.getItem('token')){
          console.log("fff")
            
        }
        else{
          redirectVar = <Redirect to= "/login"/>

          console.log("ggg")
        }
    return (
      <div>
        {redirectVar}
        <div>
          <TopNavbar />
        </div>
        <div>
          <LeftNavbar />
          <table class="table">
                <tr>
                    <td>total balance</td>
                    <td>total balance</td>
                    <td>total balance</td>
                </tr>
            </table>
        </div>
        <div>
            
        </div>
      </div>
    );
  }
}
//export Home Component
export default dashboard;
