import React, { useContext } from "react";

import { AuthUserContext } from "../App";
import { Auth, authProviders } from "../common/firebase";

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

    return (
        <section className="user-container">
            {authUser ?
                <div className="user-details">
                    <img alt="profile" src={authUser.photoURL} />
                    <div>
                        <p>{authUser.email}</p>
                        <button
                            className="sign-out-button"
                            onClick={signOut}
                        >
                            Sign Out
                        </button>
                    </div>
                </div> :
                <div className="user-details">
                    <button
                        className="auth-button"
                        onClick={() => signInWith("Google")}
                    >
                        Sign in with Google
                    </button>
                </div>
            }
        </section>
    );
}

export default UserAuthContainer;
