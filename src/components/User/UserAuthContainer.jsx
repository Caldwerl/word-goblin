import React, { useContext } from "react";

import { AuthUserContext } from "../App";
import { Auth, authProviders, authProviderNames } from "../common/firebase";

import "./UserAuthContainer.scss";

function UserAuthContainer() {
    const authUser = useContext(AuthUserContext);

    function handleSignInSuccess() {
        console.log("Sign In Successful");
    }

    function handleSignInError(error) {
        console.error(error);
    }

    function signInWith(providerType) {
        return Auth.signInWithPopup(authProviders[providerType])
            .then(handleSignInSuccess)
            .catch(handleSignInError);
    }

    function signOut() {
        Auth.signOut();
    }

    const authButtons = authProviderNames.map(authSource => (
        <div
            key={authSource}
            className="col-md-4 col-sm-6"
        >
            <button
                className="btn btn-primary"
                onClick={() => signInWith(authSource)}
            >
                Sign in with {authSource}
            </button>
        </div>
    ));

    return (
        <div className="user-container">
            {authUser ?
                <div className="user-details row">
                    <div className="col-md-4 col-md-offset-4">
                        <img alt="profile" src={authUser.photoURL} />
                        <h3>{authUser.email}</h3>
                    </div>
                    <div className="col-md-4">
                        <button
                            className="btn btn-warning"
                            onClick={signOut}
                        >
                            Sign Out
                        </button>
                    </div>
                </div> :
                <div className="user-details row">
                    {authButtons}
                </div>
            }
        </div>
    );
}

export default UserAuthContainer;
