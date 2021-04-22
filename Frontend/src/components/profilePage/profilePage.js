// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import axios from "axios";

// import React from "react";
// import TopNavbar from "../topNavbar/TopNavbar";

// const profilePage = () => {
//   return (
//     <div>
//       <TopNavbar/>
//       <div class="container">
//         <form>
//           <h1>Your account</h1>
//           <p>Your name</p>
//           <p></p>
//           <div>
//             <p>Your email address</p>
//           </div>

//           <div>
//             <p>Your Phone number</p>
//           </div>
//           <div>
//             <p>Currency</p>
//             <div class="dropdown">
//               <button onclick="myFunction()" class="dropbtn">
//                 Dropdown
//               </button>
//               <div id="myDropdown" class="dropdown-content">
//                 <a href="#">Link 1</a>
//                 <a href="#">Link 2</a>
//                 <a href="#">Link 3</a>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// import React, { Component } from "react";
// import topNavbar from "../topNavbar/TopNavbar";
// import Axios from "axios";

// export default class profilePage extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: "",
//       phoneNumber: "",
//     };
//   }

 
//   componentDidMount(){

//     axios
//     .get("http://localhost:3001/getprofile" + this.state.groupname, info)
//     .then((response) => {
//       this.setState({
//         membersList: this.state.membersList.concat(response.data)
//       });
//     });
//   console.log(this.state.membersList);
//   }
//   render() {
//     return (
//       <div>
//         <Container>
//           <Row>
//             <Col>
//               <img src="./profilepic.jpg" alt="profils pic" />
//             </Col>
//             <Col>
//               <h1>User Profile</h1>
//               <Form className="form">
//                 {/* <p>{this.state.msg}</p> */}
//                 <Form.Group controlId="formCategory1">
//                   <Form.Label>Username</Form.Label>
//                   <Form.Control type="text" />
//                 </Form.Group>
//                 <Form.Group controlId="formCategory2">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control type="email" />
//                 </Form.Group>

//                 <Form.Group controlId="formCategory4">
//                   <Form.Label>Profile Image</Form.Label>
//                   <Form.Control
//                     type="file"
//                     name="profileImage"
//                     onChange={this.changeProfileImage}
//                   />
//                 </Form.Group>
//                 <Button variant="primary" onClick={this.UpdateProfileHandler}>
//                   Update Profile
//                 </Button>
//               </Form>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     );
//   }
// }

// export default profilePage;

import React, { Component } from 'react'
// import "../Profile/Profile.css";
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import { Button, Form, FormControl, ControlLabel } from "react-bootstrap";
import backendServer from "../../webConfig";
import defaultpic from "./profilepic.jpg";
import './profilePage.css';

localStorage.setItem('username', "Sahil")

var useremail = localStorage.getItem('email')
var username=localStorage.getItem('username')

export default class profilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        useremail:useremail,
        username:username,
        // selectedFile: '',
        selectedFile: defaultpic,
        amazonurl:'https://splitwiselab2.s3.us-east-2.amazonaws.com/df509c0992ce79fb787f038511b7f102.jpg'
    }
    // this.onFileChange=this.onFileChange.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
    this.imageHandler=this.imageHandler.bind(this)
}

async componentDidMount() {

    var data = {
        useremail: this.state.useremail
    }
    console.log("Email at frontend:", this.state.useremail)
    await axios.post(`${backendServer}/getimageonload`, data).then((res) => {
        if(res.status === 200)
                {
                  console.log("data: ",res.data)
                    console.log("Got response",res.data.imagelink[0].profileImg)
                    this.setState({amazonurl:res.data.imagelink[0].profileImg})
                }
                else
                {
                    console.log("There was some error!")
                }
        
    })
        
    }
    


imageHandler = (e) => {
    console.log(e.target.files[0])
    this.setState({selectedFile:e.target.files[0]})
    
}

onSubmit=(e, file)=> {
    
    const formData = new FormData()
    console.log("Inside submit data!")
    console.log("Got state of file:",file)
    formData.append('file',file)
    formData.append('useremail',useremail)
    axios.post(`${backendServer}/imageupload`,formData).then((res) => {
        if(res.status === 200)
        {
            console.log("Image uploaded on S3!")
            var data={
                useremail
            }
            console.log("Got email!",data.useremail)
            axios.post(`${backendServer}/getimage`,data).then((res) => {
                console.log("Inside frontend API!")
                if(res.status === 200)
                {
                  console.log("ddd: ", res.data.imagelink[0])
                    console.log("Got response",res.data.imagelink[0].profileImg)
                    this.setState({amazonurl:res.data.imagelink[0].profileImg})
                }
                else
                {
                    console.log("There was some error!")
                }
            })
            
        }
        else
        {
            console.log("There was some error!")
        }
    })

}

    
    render() {
        return (
          
           <center>
                <div><h2>YOUR ACCOUNT</h2></div>
                <br></br>
                <div><h5>Your name:</h5></div>
                {this.state.username}
                <br></br>
                <br></br>
                <div><h5>Your email id:</h5>
                {this.state.useremail}</div>
                <br></br>
                <div >
                <div>
                <h5>Add your Image</h5>
                        <div className="form-group">
                            <input type="file" id="file" accept=".png, .jpg, .jpeg"  onChange={this.imageHandler} />
                        </div>
                        <div className="img-holder">
                        {console.log(this.state.selectedFile)}
                        <img src={this.state.amazonurl} alt="" id="img" className="img" />
                    </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="button" onClick={(e) => { this.onSubmit(e, this.state.selectedFile)  }}>Upload</button>
                        </div>
                    
                </div>
                </div>
                
                
                </center>

                
              
        )
    }
    }

