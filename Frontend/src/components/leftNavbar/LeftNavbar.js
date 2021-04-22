import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import './LeftNavbar.css';

var useremail = localStorage.getItem('user');

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
        axios.get("http://localhost:3001/usergroup/" + useremail).
        then((response) =>{
            this.setState({
                groupList : this.state.groupList.concat(response.data)

            });
        });
    
    }
  render() {

    let details = this.state.groupList.map(groupLists => {
        return(
            
            <tr>
                <Link to ={`/GroupPage/${groupLists.group_name}`}><a><td>{groupLists.group_name}</td></a></Link>
            </tr>
        
        )
    })
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
