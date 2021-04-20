import axios from "axios";
import React, { Component } from "react";
// import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
// import Modal from "react-modal";
import { Button, Form, FormControl, ControlLabel } from "react-bootstrap";
import TopNavbar from "../topNavbar/TopNavbar";
import LeftNavbar from "../leftNavbar/LeftNavbar";


export class GroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      membersList: [],
      groupname: this.props.history.location.pathname.substring(11),
      show: false,
      expensedescription: "",
      amount: "",
      bill: false,
      billshow: []
    };
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.handleBillSubmit = this.handleBillSubmit.bind(this);
  }


  handleModalOpen = (e) => {
    this.setState({
        show : true
    })
  }
handleModalClose = (e) => {
    this.setState({
        show : false
    })
  }
handleDescription = (e) => {
    this.setState({
        expensedescription : e.target.value
    })
  }

handleAmount = (e) => {
    this.setState({
        amount : e.target.value
    })
  }

  componentDidMount() {
    const info = {
      groupname: this.state.groupname,
      expensedescription: this.state.expensedescription,
      amount: this.state.amount
    };
    axios
      .get("http://localhost:3001/GroupPage/" + this.state.groupname, info)
      .then((response) => {
        this.setState({
          membersList: this.state.membersList.concat(response.data)
        });
      });
    console.log(this.state.membersList);

    axios.post("http://localhost:3001/getbilldetails", info).then((response)=>{
        this.setState({
            billshow: this.state.billshow.concat(response.data)
        })

    });

  }

  handleBillSubmit = (e) => {
    const info = {
        groupname: this.state.groupname,
        expensedescription: this.state.expensedescription,
        amount: this.state.amount
      };
    axios.post("http://localhost:3001/billdetails", info).then((response)=>{

        console.log("Status Code : ", response.status);
        console.log("Data Sent ", response.info);
        if (response.status === 200) {
            this.setState({bill: true})
        } else if (response.status === 202) {
            this.setState({bill: false, error: response.data})

        }
    });

    axios.post("http://localhost:3001/getbilldetails", info).then((response)=>{
        this.setState({
            billshow: this.state.billshow.concat(response.data)
        })

    });
    this.setState({
        show: false
    })
    

  }
  render() {

    const {
        groupname, expensedescription, amount
    }= this.state
    let details = this.state.membersList.map((membersLists) => {
      return (
        <div className="leftNavbarmain">
        <ul className="leftnavlist">
          <li>{membersLists.email}</li>
        </ul>
        </div>
      );
    });

    let bill = this.state.billshow.map((billshows)=>{
        return(
          <div className="leftNavbarmain">
            <ul className="leftnavlist" style={{marginLeft: "300px"}}>
                <li><b>Description: </b>{billshows.description}</li>
                <li><b>Total amount: </b>{billshows.total_amount}$</li>
            </ul>
            </div>
        )
    })

    
    return (
      <div>
        <div>
          <TopNavbar/>
          
        </div>

        <div className="leftNavbarmain">
            <div className="leftnavlist">

            <Button onClick={this.handleModalOpen} style={{marginLeft: "300px"}}>Add an expense</Button>
            <table>
          <tbody><h3 style={{marginLeft: "300px", marginTop: "15px"}}><b>Bill Details</b></h3>{bill}</tbody>
          
        </table>
        <table>
        <tbody><b style={{marginLeft:"100px"}}>Group members</b>:{details}</tbody>
        
        </table>
        </div>
        </div>
        
        <div>
            <Modal show={this.state.show} style={{opacity:1}}>
                <Modal.Header>Add a bill</Modal.Header>
                <Modal.Body>
                <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    onChange={this.handleDescription}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter amount"
                    onChange={this.handleAmount}
                  />
                  </Form.Group>
                 </Form>
                </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleModalClose}>
                    Close Bill
                </Button>
                <Button onClick={this.handleBillSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
                
                </Modal>
        </div>
      </div>
    );
  }
}

export default GroupPage;
