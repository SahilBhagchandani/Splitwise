import React, { Component } from "react";
import axios from "axios";


var useremail = localStorage.getItem('email');
export default class invitaion extends Component {

    constructor(props){
        super(props);
         this.state={
             groupname: "",
             user_created: "",
             email: ""
         }

         
    }
    getInvitation(){
        const res = axios.get("http://localhost:3001/api/getinvitation");
        const data = res.data
        console.log(res.data)

     }
    
     componentDidMount(){
       
        //  this.getInvitation();
         const data ={
             user: useremail
         }
         console.log(data.user);
         
         axios.post("http://localhost:3001/api/getinvitation", data)
         .then((response) => {
            // this.setState({
            //   membersList: this.state.membersList.concat(response.data)
            // });
          });
        // console.log(this.state.membersList);
    
     }


    render() {
    return (
      <div>
        {/* <Card>
          <Card.Header>Featured</Card.Header>
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional
              content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card> */}
      </div>
    );
  }
}
