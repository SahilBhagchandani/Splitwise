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
      email: useremail,
      othermember: [],
      money: [],
      billareowed: 0
    };
  }

  componentDidMount() {
    // axios.get("http://localhost:3001/home").then((response) => {
    //   //update the state with the response data
    //   this.setState({});
    // });

    const data ={
      email: useremail

    }

    axios.post(`${backendServer}/youareowed`, data)
    .then((response) => {
      
      // for(let i =0; i< response.data.length; i++){

      //   console.log(response.data[i].moneyowe)
      //   this.setState=({
      //     othermember: this.state.othermember.concat(response.data[i].moneyowe)
      //   })

      // }
      for(let i =0; i< response.data.length; i++){

        
        console.log(response.data[i].members)
        
        // this.setState({

        //   billareowed:
          
        // })


      }
      this.setState({
        othermember: response.data
      });
      var temp = 0;
      temp= response.data.length-1;
      console.log(this.state.othermember)
      console.log("ss",response.data[temp].totalbill)
      this.setState({
        billareowed: response.data[temp].totalbill
      })

      
      
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
    console.log("lol",this.state.othermember)

    let details = this.state.othermember.map((othermembers) => {
      return (
        <div className="leftNavbarmain">
        <ul className="leftnavlist">
          <li>{othermembers.members+ ","} owes you {othermembers.moneyowe} in group {othermembers.groupname} for {othermembers.billdesc}</li>
        </ul>
        </div>
      );
    });
    let details2 = this.state.othermember.map((othermembers) => {
      return (
        <div className="leftNavbarmain">
        <ul className="leftnavlist">
          <li>{othermembers.totalbill}</li>
        </ul>
        </div>
      );
    });
    
    console.log("lolll,", this.state.othermember)
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
      <th>You owe</th>
      <th>You are owed<br></br>
      {this.state.billareowed}
      </th>
    </tr>
  </thead>
  <tbody>

  <tr>
      <td></td>
      <td>{details}</td>
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
