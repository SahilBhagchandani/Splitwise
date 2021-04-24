import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Dashboard/dashboard';
import Navbar from './LandingPage/landingpage';
import SignUp from './SignUp/SignUp'
import dashboard from './Dashboard/dashboard';
import createGroup from './CreateGroup/CreateGroup';
import GroupPage from './GroupPage/GroupPage';
import ProfilePage from './profilePage/profilePage';
import Invitation from './Invitations/invitation';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                
                <Route path="/" exact component={Navbar}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/home" exact component={dashboard}/>
                <Route path="/signup" exact component={SignUp}/>
                <Route path="/createGroup" exact component={createGroup}/>
                <Route path="/GroupPage" component={GroupPage}/>
                <Route path="/profilePage" component={ProfilePage}/>
                <Route path="/invitation" component={Invitation}/>
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;