import React, { useContext, useState } from "react";

import DOMPurify from "dompurify";

import { AuthUserContext } from "../App";
import api from "../common/api";

function SuggestionContainer() {
    const [suggestionString, setSuggestionString] = useState("");
    const [responseString, setResponseString] = useState("");
    const authUser = useContext(AuthUserContext);

    function saveSuggestion() {
        const sanitizedInputString = DOMPurify.sanitize(suggestionString);

        api.saveSuggestion({
            user: authUser ? authUser.uid : "anonymous",
            suggestion: sanitizedInputString,
        })
            .then(() => {
                setResponseString("Thank you for the suggestion!");
                setSuggestionString("");
            })
            .catch(() => (
                setResponseString("There was an error. Try again later.")
            ));
    }

    return (
        <section className="suggestion-container">
            <h2>Suggestion Box</h2>
            <p>Have a favorite website you want Word-Goblin to support?</p>
            <p>An improvement or issue? Let us know here!</p>
            <textarea
                onChange={event => setSuggestionString(event.target.value)}
                rows="4"
                value={suggestionString}
            />
            <button onClick={saveSuggestion}>Submit</button>
            <p>{responseString}</p>
        </section>
    );
}

export default SuggestionContainer;
