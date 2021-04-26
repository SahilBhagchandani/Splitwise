import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../js/actions/types";
import PropTypes from "prop-types";
import axios from "axios";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import './SignUp.css'
import Navbar from '../Navbar/Navbar';
import backendServer from "../../webConfig"

export class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      authFlag: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    console.log("previous user")
    this.props.register(data);
    this.setState({ name: "", email: "", password: "" });
    console.log("user data")

    axios.defaults.withCredentials = true;

    axios
      .post(`${backendServer}/signup`, data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            authFlag: true,
          });
        }
        if (response.status === 422) {
          this.setState({
            authFlag: true,
          });
        }
      })
      .catch((err) => {
        this.setState({
          showError: true,
        });
      });
  }
  render() {
    const { name, email, password, authFlag } = this.state;
    let redirectVar = null;
    console.log(authFlag)
    if (authFlag) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        <div>
          <Navbar/>
        </div>
      <form post="" onSubmit={this.handleSubmit}>
        <div class="container">
          {redirectVar}
          
          <div class="login-form">
            <div>
              <div class="form-group">
                <div>
                <input className="form-input"
                  type="text"
                  placeholder="Full name"
                  name="name"
                  value={name}
                  required
                  onChange={this.handleChange}
                ></input>
                </div>
              </div>
              <div class="form-group">
                <input className="form-input"
                  type="email"
                  placeholder="email"
                  name="email"
                  value={email}
                  required
                  onChange={this.handleChange}
                ></input>
              </div>
              <div class="form-group">
                <input className="form-input"
                  type="password"
                  placeholder="password"
                  name="password"
                  value={password}
                  required
                  onChange={this.handleChange}
                ></input>
              </div>
              <div class="form-group">
                <button type="submit" className="submitbtn" onClick={this.handleSubmit}>
                  signup
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  register: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    // user: state.SignUp.user
  };
};
function mapDispatchToProps(dispatch) {
  return {
    register: (user) => dispatch(register(user)),
  };
}

export default connect(mapStateToProps, { register })(SignUp);
