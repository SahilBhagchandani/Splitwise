import axios from "axios";
import React, { Component } from "react";
import Select from 'react-select';
import { Redirect } from 'react-router'
import './CreateGroup.css'
import LeftNavbar from "../leftNavbar/LeftNavbar";
import TopNavbar from "../topNavbar/TopNavbar";

var useremail = localStorage.getItem('email');
export class CreateGroup extends Component{

    constructor(props){
        super(props)

        this.state={
            emailList: [],
            value: [],
            groupCreated: false,
            error: "",
            groupname: null
            
            
        };
        this.handleGroupnameChange = this.handleGroupnameChange.bind(this);
        this.addgroup =this.addgroup.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleGroupnameChange = (e)=>{
        this.setState({
            groupname: e.target.value
        })
    };


    handleChange = (opt)=>{
        let memberList=[]
        memberList.push(opt)
        this.setState({value: memberList})
    }

    async getOptions() {
        const res = await axios.get("http://localhost:3001/getuserlist/" + useremail)
        const data = res.data
        console.log(res.data)
        let options = data.map(d => ({"value": d.email, "label": d.email}))

        this.setState({emailList: options})
    }


    
    addgroup = (e)=>{
        e.preventDefault();
        const data = {
            groupmemberemails: this.state.value,
            groupname: this.state.groupname
        }
        console.log("useremail"+useremail)
        axios.post('http://localhost:3001/creategroup/' + useremail, data).then(response => {
            console.log("Status Code : ", response.status);
            console.log("Data Sent ", response.data);
            if (response.status === 200) {
                this.setState({groupCreated: true})
                window.location.href ="http://localhost:3000/home"
            } else if (response.status === 202) {
                this.setState({groupCreated: false, error: response.data})

            }

        });
    }

    componentDidMount(){
        this.getOptions()
    }
    render(){

        var redirectVar = null;
        console.log("From render", this.state.value)

        if (!localStorage.getItem('user')) 
            redirectVar = <Redirect to="/login"/>

        return(
            <div>
                <TopNavbar/>
                <div >
                    <div>
                        <h2><b><center>Create Group</center></b></h2>
                    </div>
                    <div>
                    <h3><b><center>Group Name</center></b></h3>
                </div>
                <div >
                    <center>
                    <input type="name" name="groupname" className="groupName" required  onChange={this.handleGroupnameChange}></input>
                    </center>
                </div>
                <div>
                    <h3><b><center>Add members</center></b></h3>
                </div>
                <div>
                <Select classNamePrefix="filter" options={
                                    this.state.emailList
                                }
                                isMulti
                                onChange={
                                    (opt) => this.handleChange(opt)
                                }/>
                        </div>
                        <div>
                            <center>
                            <button className="createGroupbtn" onClick={this.addgroup}>Create Group</button>
                            </center>
                        </div>
                        </div>
                </div>

        );

    }
}

export default CreateGroup;