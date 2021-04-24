import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Navbar from "../Navbar/Navbar";
import LeftNavbar from "../leftNavbar/LeftNavbar";
import TopNavbar from "../topNavbar/TopNavbar";
import {Table} from "react-bootstrap";
import backendServer from "../../webConfig";


var useremail= localStorage.getItem('email')
class dashboard extends Component {
  constructor() {
    super();
    this.state = {
      email: useremail
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3001/home").then((response) => {
      //update the state with the response data
      this.setState({});
    });

    const data ={
      email: useremail

    }

    axios.post(`${backendServer}/youareowed`, data)
    .then((response) => {
    //   let data = response.data;
    //   console.log("ddd", data)
    //   console.log("ggg", response.data)
    //  let options = data.map(d => ({"value": d._id}))

    //  // let options = res.data;
    //  this.setState({groupId: options})
    //  this.setState({
    //    groupinvitedlist: this.state.groupinvitedlist.concat(response.data)

    //  })
     
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

            <Table striped bordered hover>
  <thead>
    <tr>
      <th>Total Balance</th>
      <th>You owe</th>
      <th>You are owed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    
  </tbody>
</Table>
        </div>
        <div>
            
        </div>
      </div>
    );
  }
}
//export Home Component
export default dashboard;
