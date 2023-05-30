import React, { Component } from "react";
import UserDataService from "../services/user.service";
import { Link } from "react-router-dom";


export default class Register extends Component {
    constructor(props) {
      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
      this.saveUser = this.saveUser.bind(this);
      this.newUser = this.newUser.bind(this);
      this.state = {
        id: null,
        name: "",
        email: "", 
        password: "",
        passwordConfirm:"",
  
        submitted: false
      };
    }
  
    onChangeName(e) {
      this.setState({
        name: e.target.value
      });
    }
  
    onChangeEmail(e) {
      this.setState({
        email: e.target.value
      });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangePasswordConfirm(e) {
            this.setState({
                passwordConfirm: e.target.value
            });       
    }
  
    saveUser() {
      var data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        passwordConfirm: this.state.passwordConfirm
      };

      if(!data.name || data.name.length > 50){
        console.log("name imput should not empty or name length should be lower than 50 characters");
        return;
      }

      if(!data.email){
        console.log("email should not be empty");
        return;
      }

      if(!data.email.includes("@",".fr") || !data.email.includes("@", ".com")){
        console.log("email should be includes: @ && .com || @ && .fr");
        return;
      }

      if(!data.password || data.password.length <= 8){
        console.log("password imput should not empty or password length should be lower than 50 characters");
        return;
      }

      if(!data.passwordConfirm || data.password != data.passwordConfirm){
        console.log(data.password);
        console.log("PasswordConfirm should not be empty, or password input and passwordConfirm should be the same!");
        return;
      }
        
      UserDataService.create(data)
        .then(response => {
          this.setState({
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            password: response.data.password,
            passwordConfirm: response.data.passwordConfirm,

            submitted: true
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    newUser() {
      this.setState({
        id: null,
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
  
        submitted: false
      });
    }

    render() {
        return (
          <div className="submit-form" id="darky">
            {this.state.submitted ? (
              <div>
                <h4>User created successfully!</h4>
                <Link to={"/tutorials/"}
                                className="m-3 btn btn-sm btn-warning"
                                >
                                    Home
                                </Link>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={this.state.name}
                    onChange={this.onChangeName}
                    name="name"
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    required
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    required
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    name="password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="passwordConfirm">Confirm password</label>
                  <input
                    type="text"
                    className="form-control"
                    id="passwordConfirm"
                    required
                    onChange={this.onChangePasswordConfirm}
                    name="passwordConfirm"
                  />
                </div>
    
                <button onClick={this.saveUser} className="btn btn-success">
                  Registration
                </button>
              </div>
            )}
          </div>
        );
      }
    }
  