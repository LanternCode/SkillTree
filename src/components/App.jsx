import React, { Component } from "react";
import { app } from "../base";
import SkillTree from "./SkillTree";
import Header from "./secondary/Header";
import Loading from "./secondary/Loading";
import Login from "./secondary/Login";

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            loading: true
        };
    }

    componentDidMount() {
        this.authListener();
    }

    authListener = () => {
        app.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user, loading: false });
            } else {
                this.setState({ user: null, loading: false });
            }
        });
    };
    render() {
        return this.state.user ? (
            <>
                <Header />
                <SkillTree />
            </>
        ) : this.state.loading ? (
            <Loading />
        ) : (
            <Login />
        );
    }
}

export default App;
