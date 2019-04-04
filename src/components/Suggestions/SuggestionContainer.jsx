import React from "react";
import { object } from "prop-types";

import DOMPurify from "dompurify";

import api from "../common/api";

class SuggestionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestionInputString: "",
            responseString: "",
        };

        this.saveSuggestion = this.saveSuggestion.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    saveSuggestion() {
        const { suggestionInputString } = this.state;
        const { authUser } = this.props;
        const sanitizedInputString = DOMPurify.sanitize(suggestionInputString);

        api.saveSuggestion({
            user: authUser ? authUser.uid : "anonymous",
            suggestion: sanitizedInputString,
        })
            .then(() => (
                this.setState({
                    suggestionInputString: "",
                    responseString: "Thank you for the suggestion!",
                })
            ))
            .catch(() => (
                this.setState({
                    responseString: "There was an error. Try again later.",
                })
            ));
    }

    handleInputChange(event) {
        const { target } = event;
        const { value } = target;

        return this.setState({
            suggestionInputString: value,
        });
    }

    render() {
        const { suggestionInputString, responseString } = this.state;

        return (
            <section className="suggestion-container">
                <h2>Suggestion Box</h2>
                <p>Have a favorite website you want Word-Goblin to support?</p>
                <p>An improvement or issue? Let us know here!</p>
                <input type="text" onChange={this.handleInputChange} value={suggestionInputString} />
                <button onClick={this.saveSuggestion}>Submit</button>
                <p>{responseString}</p>
            </section>
        );
    }
}

SuggestionContainer.propTypes = {
    authUser: object,
};

SuggestionContainer.defaultProps = {
    authUser: null,
};

export default SuggestionContainer;
