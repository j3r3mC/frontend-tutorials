import React, { Component } from "react";
import UserDataService from "../services/user.service";
import { Link } from "react-router-dom";


export default class Register extends Component {
    constructor(props) {
      super(props);
      this.onChangeName                   = this.onChangeName.bind(this);
      this.onChangeEmail                  = this.onChangeEmail.bind(this);
      this.onChangePassword               = this.onChangePassword.bind(this);
      this.onChangePasswordConfirm        = this.onChangePasswordConfirm.bind(this);
      this.onChangeVisibleName            = this.onChangeVisibleName.bind(this);
      this.onChangeVisibleEmail           = this.onChangeVisibleEmail.bind(this);
      this.onChangeVisiblePassword        = this.onChangeVisiblePassword.bind(this);
      this.onChangeVisiblePasswordConfirm = this.onChangeVisiblePasswordConfirm.bind(this);
      this.saveUser                       = this.saveUser.bind(this);
      this.newUser                        = this.newUser.bind(this);
      
      this.state = {
        id                       : null,
        name                     : "",
        email                    : "", 
        password                 : "",
        passwordConfirm          : "",
        isVisibleName            : false,
        isVisibleEmail           : false,
        isVisiblePassword        : false,
        isVisiblePasswordConfirm : false,
  
        submitted: false
      };
    }
  
    onChangeName(e) {
      this.setState({
        isVisibleName:false,
        name: e.target.value
      });
    }
  
    onChangeEmail(e) {
      this.setState({
        isVisibleEmail:false,
        email: e.target.value
      });
    }

    onChangePassword(e) {
        this.setState({
          isVisiblePassword:false,
            password: e.target.value
        });
    }

    onChangePasswordConfirm(e) {
            this.setState({
                isVisiblePasswordConfirm:false,
                passwordConfirm: e.target.value
            });       
    }

    onChangeVisibleName(e) {
      this.setState({
        isVisibleName : true
      });
    }
    onChangeVisibleEmail(e) {
      this.setState({
        isVisibleEmail : true
      });
    }
    onChangeVisiblePassword(e) {
      this.setState({
        isVisiblePassword : true
      });
    }
    onChangeVisiblePasswordConfirm(e) {
      this.setState({
        isVisiblePasswordConfirm : true
      });
    }
  
    saveUser() {
      var data = {
        name            : this.state.name,
        email           : this.state.email,
        password        : this.state.password,
        passwordConfirm : this.state.passwordConfirm
      };

      if(!data.name || data.name.length > 50){
        this.onChangeVisibleName();
        
        return;
      }

      if(!data.email){
        this.onChangeVisibleEmail();
        console.log("email should not be empty");
        return;
      }

      if((!data.email.includes(".com") && !data.email.includes(".fr")) || !data.email.includes("@")){
        this.onChangeVisiblePassword();
        console.log("email should be includes: @ && .com || @ && .fr");
        return;
      }

      if(!data.password || data.password.length <= 8){
        this.onChangeVisiblePassword();
        
        return;
      }

      if(!data.passwordConfirm || data.password !== data.passwordConfirm){
        this.onChangeVisiblePasswordConfirm();

        return;
      }

      UserDataService.create(data)
        .then(response => {
          this.setState({
            id              : response.data.id,
            name            : response.data.name,
            email           : response.data.email,
            password        : response.data.password,
            passwordConfirm : response.data.passwordConfirm,

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
        id              : null,
        name            : "",
        email           : "",
        password        : "",
        passwordConfirm : "",
  
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
              <div className="titleForm">
                <label htmlFor="titleForm">
                  <h4 className="titlefor">Sign up</h4>
                </label>
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
                  <p className="red">{this.state.isVisibleName
                    ? " name should not empty or name length should be lower than 50 characters" 
                    : null}
                  </p>
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
                    <p className="red">{this.state.isVisibleEmail
                      ? " email should not empty and should contain @ and finish by .com or .fr" 
                      : null}
                  </p>
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
                  <p className="red">{this.state.isVisiblePassword
                    ? "password  should not empty or password length should not be lower than 8 characters" 
                    : null}
                  </p>
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
                  <p className="red">{this.state.isVisiblePasswordConfirm
                    ? "Password and confirm password should be the same !! " 
                    : null}
                  </p>
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
  