import React from "react";
import { func } from "prop-types";

import { connect } from "react-redux";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { firebaseAuth } from "./common/utils/firebase";
import { loadUserData, retrievedUserData } from "./common/Redux/UserReducer";
import api from "./common/utils/api";

import MainHeader from "./Main/Header/MainHeader";
import MainFooter from "./Main/Footer/MainFooter";
import LandingContainer from "./Main/Landing/LandingContainer";

import SignInContainer from "./User/UserAuth/SignInContainer";

import ErrorBoundary from "./common/ErrorBoundary/ErrorBoundary";
import ImagePreloader from "./common/ImagePreloader";
import ProblemLarge from "./common/ProblemLarge/ProblemLarge";
import ScrollToTop from "./common/ScrollToTop/ScrollToTop";
import SEOHelmet from "./common/SEOHelmet/SEOHelmet";

import "./App.scss";

function App({ dispatch }) {
    // Maintain auth state if user has already signed in, on refresh or return visits
    firebaseAuth.onAuthStateChanged((user) => {
        // User is already signed in.
        if (user) {
            // getIdToken with forceRefresh 'true'
            firebaseAuth.currentUser.getIdToken(true)
                .then((idToken) => {
                    // CALL /v3/accounts/sign-in to retrieve and save the eggbun X-Account-Id for the user
                    api.postUserSignIn(idToken)
                        .then((response) => {
                            dispatch(loadUserData({
                                name: response.name,
                                email: response.email,
                                accountId: response.id,
                                pictureUri: response.pictureUri,
                                idToken,
                            }));
                        });
                });
        } else {
            // User is not signed in
            dispatch(retrievedUserData());
        }
    });

    return (
        <BrowserRouter>
            <ScrollToTop>
                <SEOHelmet />

                <Route
                    component={MainHeader}
                    path="/"
                />

                <div className="App">
                    <ErrorBoundary>
                        <Switch>
                            <Route
                                component={LandingContainer}
                                exact
                                path="/"
                            />

                            <Route
                                component={SignInContainer}
                                path="/signin/:purpose?"
                            />

                            <Route
                                path="/404"
                                render={() => (<ProblemLarge />)}
                            />

                            {/* If there is no match, render the page not found view */}
                            <Route
                                render={() => (<Redirect push to="/404" />)}
                            />
                        </Switch>
                    </ErrorBoundary>
                </div>

                <MainFooter />

                <ImagePreloader />
            </ScrollToTop>
        </BrowserRouter>
    );
}

App.propTypes = {
    dispatch: func.isRequired,
};

export default connect()(App);
