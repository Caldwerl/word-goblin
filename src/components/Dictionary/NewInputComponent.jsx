import React, { useState } from "react";
import { func } from "prop-types";

function NewInputComponent({ addDictionaryItem }) {
    const [newItemTranslation, setNewItemTranslation] = useState("");
    const [newItemWord, setNewItemWord] = useState("");

    return (
        <div className="new-input">
            <h2>New Item Input</h2>
            <p>Word(s) can search for multiple values using ( | ) to replace with one Translation.</p>
            <p>For example: Word(s): (stomach|boat|pear) Translation: 배</p>
            <p>Capitalization is ignored.</p>

            <table className="dictionary-items">
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
                                name="new-word"
                                onChange={event => setNewItemWord(event.target.value)}
                                type="text"
                                value={newItemWord}
                            />
                        </td>
                        <td>
                            <input
                                id="newItemTranslation"
                                name="new-translation"
                                onChange={event => setNewItemTranslation(event.target.value)}
                                type="text"
                                value={newItemTranslation}
                            />
                        </td>
                        <td>
                            <button
                                id="add-button"
                                className="add-button"
                                onClick={() => {
                                    addDictionaryItem(newItemWord, newItemTranslation);
                                    setNewItemTranslation("");
                                    setNewItemWord("");
                                }}
                            >
                                Add Item
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

NewInputComponent.propTypes = {
    addDictionaryItem: func.isRequired,
};

export default NewInputComponent;
