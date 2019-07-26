import React, { useContext, useState } from "react";

import { AuthUserContext } from "../App";
import DictionaryVaultContainer from "./DictionaryVaultContainer";
import ImageHeadline from "../common/ImageHeadline/ImageHeadline";
import NewInputComponent from "./NewInputComponent";

import "./DictionaryContainer.scss";

function DictionaryContainer() {
    const [dictionaryItems, setDictionaryItems] = useState([]);
    const [haveExtension, setHaveExtension] = useState(false);
    const authUser = useContext(AuthUserContext);

    function loadDictionaryList(newDictionary) {
        setDictionaryItems(newDictionary);
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
                    <h3>{index + 1}</h3>
                </td>
                <td className="form-group">
                    <input
                        id={`word-${index}`}
                        className="form-control"
                        name={`word-${index}`}
                        onChange={event => handleItemChange(index, "word", event.target.value)}
                        type="text"
                        value={dictionaryItem.word}
                    />
                </td>

                <td>
                    <input
                        id={`translation-${index}`}
                        className="form-control"
                        name={`translation-${index}`}
                        onChange={event => handleItemChange(index, "translation", event.target.value)}
                        type="text"
                        value={dictionaryItem.translation}
                    />
                </td>

                <td>
                    <button
                        id={`remove-${index}`}
                        className="btn btn-danger"
                        onClick={() => removeDictionaryItem(index)}
                    >
                        Remove
                    </button>
                </td>
            </tr>
        ));

    return (
        <section className="dictionary-container container">
            <div className="col-md-12">
                <ImageHeadline
                    text="List of Dictionaries to Apply"
                />
                <button
                    id="save-settings"
                    className="btn btn-primary"
                    disabled={!haveExtension}
                >
                    Apply these Dictionaries to Extension
                </button>

                <div style={{ display: "none" }}>
                    <input
                        id="extensionCheckbox"
                        className="form-control"
                        type="checkbox"
                        onChange={event => setHaveExtension(event.target.checked)}
                        checked={haveExtension}
                    />
                </div>
            </div>

            <DictionaryVaultContainer
                authUser={authUser}
                dictionaryItems={dictionaryItems}
                loadDictionaryListFunc={loadDictionaryList}
            />

            <div>
                <ImageHeadline
                    text="Translations Dictionary Editor"
                />

                <table className="dictionary-items table table-striped table-hover">
                    <caption style={{ display: "none" }}>List of Words and their Translations</caption>
                    <thead>
                        <tr>
                            <th>#</th>
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

            <NewInputComponent addDictionaryItem={addDictionaryItem} />
        </section>
    );
}

export default DictionaryContainer;
