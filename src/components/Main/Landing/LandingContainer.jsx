import React from "react";

import DictionaryContainer from "./../../Dictionary/DictionaryContainer";
import ExtensionLinksContainer from "./../../Dictionary/ExtensionLinksComponent";
import SuggestionContainer from "./../../Suggestions/SuggestionContainer";

function LandingContainer() {
    return (
        <main className="landing-container">
            <ExtensionLinksContainer />
            <h2>Edit / Save / Load your personal Language Translation Dictionaries</h2>
            <DictionaryContainer />

            <SuggestionContainer />
        </main>
    );
}

export default LandingContainer;
