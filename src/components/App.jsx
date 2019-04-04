import React from "react";

import { Auth } from "./common/firebase";

import MainHeader from "./Main/Header/MainHeader";
import LandingContainer from "./Main/Landing/LandingContainer";

import "./App.scss";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
        };
    }

    componentDidMount() {
        // Maintain auth state if user has already signed in, on refresh or return visits
        Auth.onAuthStateChanged((authUser) => {
            this.setState({
                authUser,
            });
        });
    }

    render() {
        const { authUser } = this.state;

        return (
            <div className="App">
                <MainHeader authUser={authUser} />

                <LandingContainer authUser={authUser} />
            </div>
        );
    }
}

export default App;
