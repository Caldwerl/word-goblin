import React from "react";

import DictionaryContainer from "./../../Dictionary/DictionaryContainer";
import AboutContainer from "../../About/AboutContainer";
import SuggestionContainer from "./../../Suggestions/SuggestionContainer";

function LandingContainer() {
    return (
        <main className="landing-container">
            <AboutContainer />

            <DictionaryContainer />

            <SuggestionContainer />
        </main>
    );
}

export default LandingContainer;
