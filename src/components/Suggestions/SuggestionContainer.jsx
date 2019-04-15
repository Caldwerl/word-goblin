import React, { useContext, useState } from "react";

import DOMPurify from "dompurify";

import { AuthUserContext } from "../App";
import api from "../common/api";
import ImageHeadline from "../common/ImageHeadline/ImageHeadline";

import "./SuggestionContainer.scss";

function SuggestionContainer() {
    const [suggestionString, setSuggestionString] = useState("");
    const [responseString, setResponseString] = useState("");
    const authUser = useContext(AuthUserContext);

    function saveSuggestion() {
        const sanitizedInputString = DOMPurify.sanitize(suggestionString);

        if (sanitizedInputString.length) {
            api.saveSuggestion({
                user: authUser ? authUser.uid : "anonymous",
                suggestion: sanitizedInputString,
            })
                .then(() => {
                    setResponseString("Thank you for the suggestion!");
                    setSuggestionString("");
                })
                .catch(() => (
                    setResponseString("There was an error! Please try again later.")
                ));
        }
    }

    return (
        <section className="suggestion-container container">
            <ImageHeadline
                text="Suggestion Box"
            />
            <h3>Have a favorite website you want Word Goblin to support?</h3>
            <h3>An improvement or issue? Let us know here!</h3>
            <textarea
                className="form-control"
                onChange={event => setSuggestionString(event.target.value)}
                rows="4"
                value={suggestionString}
            />
            <button
                className="btn btn-primary"
                disabled={!suggestionString.length}
                onClick={saveSuggestion}
            >
                Submit
            </button>
            <h3>{responseString}</h3>
        </section>
    );
}

export default SuggestionContainer;
