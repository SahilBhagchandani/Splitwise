import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import './LeftNavbar.css';
import backendServer from "../../webConfig";

var useremail = localStorage.getItem('email');

export class LeftNavbar extends Component {
    constructor(props){
        super(props);
        this.state={
            groupList:[]
        }
    }

    // async getGroups() {
    //     const res = await axios.get("http://localhost:3001/usergroup/" + useremail)
    //     const data = res.data
    //     console.log(res.data)
    //     let options = data.map(d => ({"value": d.group_name, "label": d.group_name}))

    //     this.setState({groupList: options})

    // }

    componentDidMount(){
      const data ={
        useremail : useremail
      }
      console.log("hello", data.useremail)
         axios.post(`${backendServer}/grouplist`, data).
        then((response) =>{
            // this.setState({
            //     groupList : this.state.groupList.concat(response.data)

            // });
            console.log("hhh",response.data[0].groupPartOf.length)
            if(response.data[0].groupPartOf.length === 0)
            {

            }
            else{
            this.setState({
              groupList: response.data[0].groupPartOf

            });
        
          
          }
        });
        
    
    }

    
  
  render() {
    

    let details = this.state.groupList.map(groupLists => {
        return(
            
            <tr>
                <Link to ={`/GroupPage/${groupLists}`}><a><td>{groupLists}</td></a></Link>
            </tr>
        
        )
    })
    console.log(this.state.groupList)
    
    
    return (
      <div>
        <div className="leftNavbarmain">
          <ul className="leftnavlist">
            <li>
             <Link to='/home'><a>Dashboard</a></Link>
            </li>
            <li>
              <b>Groups: </b>
            </li>
            <table>
                <tbody>
                    {details}
                </tbody>
            </table>
            <li>
              <Link to='/createGroup'><a>Create Group</a></Link>
            </li>
            <li>
              <Link to='/invitation'><a>View Invitation</a></Link>
            </li>
          </ul>
          
        </div>
      </div>
    );
  }
}

export default LeftNavbar;
