import React, { Component } from "react";
import axios from "axios";
import {Card, Button} from "react-bootstrap";
import backendServer from "../../webConfig";
import LeftNavbar from "../leftNavbar/LeftNavbar";
import TopNavbar from "../topNavbar/TopNavbar";
import {img} from "../Navbar/logo.png"


var ToggleDisplay = require('react-toggle-display');





var useremail = localStorage.getItem('email');
export default class invitaion extends Component {

    constructor(props){
        super(props);
         this.state={
             groupname: "",
             user_created: "",
             email: "",
             groupinvitedlist: [],
             groupId: []
         }
         this.inviteAccepted = this.inviteAccepted.bind(this)
         this.inviteDeclined = this.inviteDeclined.bind(this)

         
    }
    getInvitation(){
        const res = axios.get(`${backendServer}/getinvitation`);
        const data = res.data
        console.log(res.data)

     }

     inviteAccepted = (e) =>{
       e.preventDefault()
       let id = e.target.value
       let user = localStorage.getItem('userID')
       console.log("kkk", user)
       const data ={
        user: useremail,
        objectid: id,
        userid : user
        }
       axios.post(`${backendServer}/inviteaccepted`, data)
       
       
       

     }

     inviteDeclined = (e) =>{
       e.preventDefault()
       let id = e.target.value
       console.log("kkk", id)
       const data ={
        user: useremail,
        objectid: id
        }
       axios.post(`${backendServer}/invitedeclined`, data)
     }
    
     componentDidMount(){
       
        //  this.getInvitation();
         const data ={
             user: useremail
         }
         console.log(data.user);
         
         axios.post(`${backendServer}/getinvitation`, data)
         .then((response) => {
           let data = response.data;
           console.log("ddd", data)
           console.log("ggg", response.data)
          let options = data.map(d => ({"value": d._id}))

          // let options = res.data;
          this.setState({groupId: options})
          this.setState({
            groupinvitedlist: this.state.groupinvitedlist.concat(response.data)

          })
          
          });

        
    
     }


    render() {
      
      console.log(this.state.groupinvitedlist);
      let invitation = this.state.groupinvitedlist.map(book => {
        return(
          

          // <div class="card" style="width: 18rem;">
          //  <div class="card-body">
          //   <h5 class="card-title">Card title</h5>
          //   <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          //      <a href="#" class="btn btn-primary">{book.groupname}</a>
                      
          //  </div>
          //  </div>

          <Card style={{ width: '35rem' }}>
  <Card.Body>
    <Card.Title>Invites</Card.Title>
    <Card.Text>
      {book.created_by} has invited you to join {book.groupname}
    </Card.Text>
    <Button onClick={this.inviteAccepted} variant="primary" value={book._id}>Accept</Button>
    <Button variant="primary" onClick={this.inviteDeclined} value={book._id} style={{marginLeft: "5px"}}>Decline</Button>
  </Card.Body>
</Card>

        )
    })
    return (
      <div>
         <div>
          <TopNavbar/>
      </div>
      <div class="container">
        <div class="row">
        <div class="col" style={{width: "200px"}}>
        <LeftNavbar/>
        </div>
        <div class="col" style={{width: "700px"}}>
        {invitation}
        </div>
        </div>
         </div>
      </div>
    );
  }
}
