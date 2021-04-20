import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { loginUser } from "../../js/actions/types";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from '../Navbar/Navbar';
const jwt_decode = require('jwt-decode');


//Define a Login Component
class Login extends Component {
  //call the constructor method
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      authFlag: false,
      user:"",
      token:""
    };

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  componentWillMount() {
    this.setState({
      authFlag: false,
    });
  }

  usernameChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  submitLogin = (e) => {
    var headers = new Headers();

    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };


    // this.props.loginUser(data);
    // this.setState({ email: "", password: "" });
    console.log("password:", this.state.password);

    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/api/login", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        localStorage.setItem('email', data.email)
        let em = localStorage.getItem('email')
        console.log(em)

        if (response.status === 200) {
          this.setState({
            token: response.data.token,
            authFlag: true,
            
          });
          console.log("token 1: ", this.state.token)
        }
      })
      .catch((err) => {
        this.setState({
          showError: true,
        });
      });
  };

  render() {
    const { email, password } = this.state;

    console.log(this.state.showError);

    // let redirectVar = null;
    // if (cookie.load("cookie")) {
    //   redirectVar = <Redirect to="/home" />;
    // }

    console.log("token: ", this.state.token.length);
    let redirectVar = null;
        if (this.state.token.length > 0) {
            localStorage.setItem("token", this.state.token);
            console.log("token: ", this.state.token);
            
            redirectVar = <Redirect to="/home" />;
        }
    return (
      <div>
        {redirectVar}
        <div>
          <Navbar/>
        </div>
        <div class="container">
          <div class="login-form">
            <div>
              <div class="form-group">
              <label for="code"></label>
                <input className="form-input"
                  onChange={this.usernameChangeHandler}
                  type="name"
                  // class="form-control"
                  name="email"
                  placeholder="Email"
                />
              
              </div>
              <div class="form-group">
              <label for="code"></label>
                <input className="form-input"
                  onChange={this.passwordChangeHandler}
                  type="password"
                  // class="form-control"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div class="form group">
              <button onClick={this.submitLogin} className="submitbtn">
                Login
              </button>
              </div>
              {this.state.showError ? ( <p style={{ color: "red" }}>Incorrect Username or Password</p>) : ( <p></p> )}                 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    // user: state.Login.user
  };
};
function mapDispatchToProps(dispatch) {
  return {
    loginUser: (user) => dispatch(loginUser(user)),
  };
}

export default connect(mapStateToProps, { loginUser })(Login);
