import React, { useState } from "react";
import { object } from "prop-types";

import DictionaryVaultContainer from "./DictionaryVaultContainer";

import "./DictionaryContainer.scss";

function DictionaryContainer({ authUser }) {
    const [dictionaryItems, setDictionaryItems] = useState([]);
    const [hasExtension, setHasExtension] = useState(false);
    const [newItemTranslation, setNewItemTranslation] = useState("");
    const [newItemWord, setNewItemWord] = useState("");

    function loadDictionaryList(newDictionary) {
        setDictionaryItems(newDictionary);
    }

    function handleDictionaryInsertion(event) {
        const { target } = event;
        const { value } = target;

        if (value && value !== "undefined") {
            setDictionaryItems(JSON.parse(value));
        }

        setHasExtension(true);
    }

    function handleItemChange(index, type, value) {
        const updatedDictionaryItems = dictionaryItems.slice(0);

        updatedDictionaryItems[index][type] = value;

        setDictionaryItems(updatedDictionaryItems);
    }

    function addDictionaryItem() {
        setNewItemTranslation("");
        setNewItemWord("");
        setDictionaryItems(dictionaryItems.concat([{
            word: newItemWord.trim(),
            translation: newItemTranslation.trim(),
        }]));
    }

    function removeDictionaryItem(removalIndex) {
        const newDictionaryItemsArray = dictionaryItems.slice(0);

        newDictionaryItemsArray.splice(removalIndex, 1);

        setDictionaryItems(newDictionaryItemsArray.slice(0));
    }

    if (!hasExtension) {
        return (
            <section className="dictionary-container">
                <h2>Get the Word-Goblin extension for your browser!</h2>
                <img alt="word-goblin logo" src="./images/word-goblin-48.png" />
                <span>
                    <div>
                        <a
                            href="https://chrome.google.com/webstore/detail/word-goblin/flhfdnddbbolekjiljaijkpbjopnmglf?hl=en-US"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Get this Extension for Chrome
                        </a>
                    </div>
                    <div>
                        <a
                            href="https://addons.mozilla.org/en-US/android/addon/word-goblin/"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Get this Extension for <span role="img" aria-label="firefox emoji">🦊</span> Firefox
                        </a>
                    </div>
                </span>


                <div style={{ display: "none" }}>
                    <input
                        id="dictionaryItems"
                        type="text"
                        onChange={handleDictionaryInsertion}
                        value={JSON.stringify(dictionaryItems)}
                    />
                </div>
            </section>
        );
    }

    const dictionaryItemsEl = dictionaryItems
        .map((dictionaryItem, index) => (
            <div
                key={`dictionary-item-${index}`} // eslint-disable-line react/no-array-index-key
                className="dictionary-item"
            >
                <span>
                    <label htmlFor={`word-${index}`}>Word(s):</label>
                    <input
                        id={`word-${index}`}
                        name={`word-${index}`}
                        onChange={event => handleItemChange(index, "word", event.target.value)}
                        type="text"
                        value={dictionaryItem.word}
                    />
                </span>

                <span>
                    <label htmlFor={`translation-${index}`}>Translation:</label>
                    <input
                        id={`translation-${index}`}
                        name={`translation-${index}`}
                        onChange={event => handleItemChange(index, "translation", event.target.value)}
                        type="text"
                        value={dictionaryItem.translation}
                    />
                </span>
                <button
                    id={`remove-${index}`}
                    className="remove-button"
                    onClick={() => removeDictionaryItem(index)}
                >
                    Remove Item
                </button>
            </div>
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

                <div className="dictionary-items">
                    {dictionaryItemsEl}
                </div>
            </div>


            <button id="save-settings" className="save-button">Save Settings</button>

            <div className="new-input">
                <h2>New Item Input</h2>
                <p>Word(s) can search for multiple values using ( | ) to replace with one Translation.</p>
                <p>For example: Word(s): (stomach|boat|pear) Translation: 배</p>
                <p>Capitalization is ignored.</p>

                <span>
                    <label htmlFor="new-word">Word(s):</label>
                    <input
                        id="newItemWord"
                        name="new-word"
                        onChange={event => setNewItemWord(event.target.value)}
                        type="text"
                        value={newItemWord}
                    />
                </span>
                <span>
                    <label htmlFor="new-translation">Translation:</label>
                    <input
                        id="newItemTranslation"
                        name="new-translation"
                        onChange={event => setNewItemTranslation(event.target.value)}
                        type="text"
                        value={newItemTranslation}
                    />
                </span>
                <button
                    id="add-button"
                    className="add-button"
                    onClick={addDictionaryItem}
                >
                    Add Item
                </button>
            </div>

            <div style={{ display: "none" }}>
                <input
                    id="dictionaryItems"
                    type="text"
                    onChange={handleDictionaryInsertion}
                    value={JSON.stringify(dictionaryItems)}
                />
            </div>
        </section>
    );
}

DictionaryContainer.propTypes = {
    authUser: object,
};

DictionaryContainer.defaultProps = {
    authUser: null,
};

export default DictionaryContainer;
