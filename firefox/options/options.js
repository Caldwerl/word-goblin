const undoButton = document.querySelectorAll(".undo-button");
const saveButton = document.querySelectorAll(".save-button");
const addButton = document.querySelector("#add-button");
const dictionaryContainer = document.querySelector(".dictionary");
const newWord = document.querySelector("#new-word");
const newTranslation = document.querySelector("#new-translation");

let dictionaryValues = [];

function insertDictionaryToDom(dictionaryArray) {
    const dictionaryDomString = dictionaryArray
        .map((dictionaryItem, index) => {
            const wordString = `
                <span>
                    <label>Word(s):</label>
                    <input id="word-${index}" type="text" value="${dictionaryItem.word}" disabled />
                </span>`;
            const translationString = `
                <span>
                    <label>Translation:</label>
                    <input id="translation-${index}" type="text" value="${dictionaryItem.translation}" disabled />
                    <button id="remove-${index}" class="remove-button">Remove</button>
                </span>`;

            return `${wordString}${translationString}`;
        }).join("");

    dictionaryContainer.innerHTML = dictionaryDomString;

    document.querySelectorAll(".remove-button").forEach((el, index) => {
        el.addEventListener("click", () => removeDictionaryItem(index));
    });
}


function addDictionaryItem() {
    if (newWord.value.trim() && newTranslation.value.trim()) {
        dictionaryValues.push({
            word: newWord.value.trim(),
            translation: newTranslation.value.trim(),
        });

        newWord.value = "";
        newTranslation.value = "";

        insertDictionaryToDom(dictionaryValues);
    }
}

function removeDictionaryItem(removalIndex) {
    dictionaryValues.splice(removalIndex, 1);

    return insertDictionaryToDom(dictionaryValues);
}

function saveOptions(e) {
    e.preventDefault();

    browser.storage.local.set({
        dictionary: JSON.stringify(dictionaryValues),
    });
}

function restoreOptions() {
    const storageItems = browser.storage.local.get();

    storageItems.then((res) => {
        dictionaryValues = res.dictionary ? JSON.parse(res.dictionary) : [];

        return insertDictionaryToDom(dictionaryValues);
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);

saveButton.forEach(el => el.addEventListener("click", saveOptions, false));
undoButton.forEach(el => el.addEventListener("click", restoreOptions, false));
addButton.addEventListener("click", addDictionaryItem, false);
