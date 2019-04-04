import React from "react";
import { object } from "prop-types";

import DictionaryContainer from "./../../Dictionary/DictionaryContainer";
import SuggestionContainer from "./../../Suggestions/SuggestionContainer";

function LandingContainer({ authUser }) {
    return (
        <main className="landing-container">
            <h2>Edit / Save / Load your personal Language Translation Dictionaries</h2>
            <DictionaryContainer authUser={authUser} />

            <SuggestionContainer authUser={authUser} />
        </main>
    );
}

LandingContainer.propTypes = {
    authUser: object,
};

LandingContainer.defaultProps = {
    authUser: null,
};

export default LandingContainer;
