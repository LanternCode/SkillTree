import React, { Component } from "react";
import { app } from "../../base";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    login = e => {
        e.preventDefault();
        app.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(u => {
                console.log(u.user.uid);
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    signup = e => {
        e.preventDefault();
        app.auth()
            .createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
            )
            .then(u => {
                console.log(u);
            })
            .then(u => {
                console.log(u);
            })
            .catch(error => {
                console.log(error);
            });
    };
    render() {
        return (
            <div className="col-md-6">
                <form>
                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            value={this.state.email}
                            onChange={this.handleChange}
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={this.login}
                        className="btn btn-primary"
                    >
                        Login
                    </button>
                    <button
                        onClick={this.signup}
                        style={{ marginLeft: "25px" }}
                        className="btn btn-success"
                    >
                        Signup
                    </button>
                </form>
            </div>
        );
    }
}
export default Login;
