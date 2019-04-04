import React, { createContext, useEffect, useState } from "react";

import { Auth } from "./common/firebase";

import MainHeader from "./Main/Header/MainHeader";
import LandingContainer from "./Main/Landing/LandingContainer";

import "./App.scss";

export const AuthUserContext = createContext(null);

function App() {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        // Maintain auth state if user has already signed in, on refresh or return visits
        const unsubscribe = Auth.onAuthStateChanged(setAuthUser);

        return function cleanUp() {
            unsubscribe();
        };
    }, []);

    return (
        <div className="App">
            <AuthUserContext.Provider value={authUser}>
                <MainHeader />

                <LandingContainer />
            </AuthUserContext.Provider>
        </div>
    );
}

export default App;
