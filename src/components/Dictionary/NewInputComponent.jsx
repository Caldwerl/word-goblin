import React, { useState } from "react";
import { func } from "prop-types";

function NewInputComponent({ addDictionaryItem }) {
    const [newItemTranslation, setNewItemTranslation] = useState("");
    const [newItemWord, setNewItemWord] = useState("");

    return (
        <div className="new-input">
            <h2>New Item Input</h2>
            <table className="dictionary-items table">
                <caption style={{ display: "none" }}>Inputs for new translations</caption>
                <thead>
                    <tr>
                        <th>Word(s)</th>
                        <th>Translation</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input
                                id="newItemWord"
                                className="form-control"
                                name="new-word"
                                onChange={event => setNewItemWord(event.target.value)}
                                type="text"
                                value={newItemWord}
                            />
                        </td>
                        <td>
                            <input
                                id="newItemTranslation"
                                className="form-control"
                                name="new-translation"
                                onChange={event => setNewItemTranslation(event.target.value)}
                                type="text"
                                value={newItemTranslation}
                            />
                        </td>
                        <td>
                            <button
                                id="add-button"
                                className="btn btn-success"
                                onClick={() => {
                                    addDictionaryItem(newItemWord, newItemTranslation);
                                    setNewItemTranslation("");
                                    setNewItemWord("");
                                }}
                            >
                                Add
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h4>Word(s) can search for multiple values using ( | ) to replace with one Translation.</h4>
            <h4>For example: Word(s): (stomach|boat|pear) Translation: 배</h4>
            <h4>Capitalization is ignored.</h4>
        </div>
    );
}

NewInputComponent.propTypes = {
    addDictionaryItem: func.isRequired,
};

export default NewInputComponent;
