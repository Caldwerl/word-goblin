import React, { useContext, useState } from "react";

import { AuthUserContext } from "../App";
import DictionaryVaultContainer from "./DictionaryVaultContainer";
import NewInputComponent from "./NewInputComponent";

import "./DictionaryContainer.scss";

function DictionaryContainer() {
    const [dictionaryItems, setDictionaryItems] = useState([]);
    const [haveExtension, setHaveExtension] = useState(false);
    const authUser = useContext(AuthUserContext);

    function loadDictionaryList(newDictionary) {
        setDictionaryItems(newDictionary);
    }

    function handleDictionaryInsertion(event) {
        const { target } = event;
        const { value } = target;

        if (value && value !== "undefined") {
            setDictionaryItems(JSON.parse(value));
        }
    }

    function handleItemChange(index, type, value) {
        const updatedDictionaryItems = dictionaryItems.slice(0);

        updatedDictionaryItems[index][type] = value;

        setDictionaryItems(updatedDictionaryItems);
    }

    function addDictionaryItem(word, translation) {
        setDictionaryItems(dictionaryItems.concat([{
            word: word.trim(),
            translation: translation.trim(),
        }]));
    }

    function removeDictionaryItem(removalIndex) {
        const newDictionaryItemsArray = dictionaryItems.slice(0);

        newDictionaryItemsArray.splice(removalIndex, 1);

        setDictionaryItems(newDictionaryItemsArray.slice(0));
    }

    const dictionaryItemsEl = dictionaryItems
        .map((dictionaryItem, index) => (
            <tr
                key={`dictionary-item-${index}`} // eslint-disable-line react/no-array-index-key
                className="dictionary-item"
            >
                <td>
                    <input
                        id={`word-${index}`}
                        name={`word-${index}`}
                        onChange={event => handleItemChange(index, "word", event.target.value)}
                        type="text"
                        value={dictionaryItem.word}
                    />
                </td>

                <td>
                    <input
                        id={`translation-${index}`}
                        name={`translation-${index}`}
                        onChange={event => handleItemChange(index, "translation", event.target.value)}
                        type="text"
                        value={dictionaryItem.translation}
                    />
                </td>

                <td>
                    <button
                        id={`remove-${index}`}
                        className="remove-button"
                        onClick={() => removeDictionaryItem(index)}
                    >
                        Remove Item
                    </button>
                </td>
            </tr>
        ));

    return (
        <section className="dictionary-container">
            <DictionaryVaultContainer
                authUser={authUser}
                dictionaryItems={dictionaryItems}
                loadDictionaryListFunc={loadDictionaryList}
            />

            <div>
                <h2>Translations Dictionary</h2>

                <table className="dictionary-items">
                    <caption style={{ display: "none" }}>List of Words and their Translations</caption>
                    <thead>
                        <tr>
                            <th>Word(s)</th>
                            <th>Translation</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {dictionaryItemsEl}
                    </tbody>
                </table>
            </div>


            <button id="save-settings" className="save-button" disabled={!haveExtension}>Save Settings</button>

            <NewInputComponent addDictionaryItem={addDictionaryItem} />

            <div style={{ display: "none" }}>
                <input
                    id="dictionaryItems"
                    type="text"
                    onChange={handleDictionaryInsertion}
                    value={JSON.stringify(dictionaryItems)}
                />
                <input
                    id="extensionCheckbox"
                    type="checkbox"
                    onChange={event => setHaveExtension(event.target.checked)}
                    checked={haveExtension}
                />
            </div>
        </section>
    );
}

export default DictionaryContainer;
