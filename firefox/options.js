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

    return;
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

    return;
}

function removeDictionaryItem(removalIndex) {
    dictionaryValues.splice(removalIndex, 1);

    return insertDictionaryToDom(dictionaryValues);
}

function saveOptions(e) {
    e.preventDefault();

    browser.storage.local.set({
        boldFlag: !!boldFlag.checked,
        color: !!colorFlag.checked ? color.value : null,
        colorFlag: !!colorFlag.checked,
        dictionary: JSON.stringify(dictionaryValues),
    });

    return;
}

function restoreOptions() {
    const storageItems = browser.storage.local.get();

    storageItems.then((res) => {
        if (res.color) {
            color.value = res.color;
        }

        colorFlag.checked = !!res.colorFlag;
        color.disabled = !colorFlag.checked;
        exampleText.style.color = colorFlag.checked ? res.color : "initial";

        boldFlag.checked = !!res.boldFlag;
        exampleText.style.fontWeight = !!res.boldFlag ? "bold" : "initial";

        dictionaryValues = res.dictionary ? JSON.parse(res.dictionary) : []

        return insertDictionaryToDom(dictionaryValues);
    });

    return;
}

function updateColor() {
    exampleText.style.color = color.value;
}

function updateBoldFlag() {
    exampleText.style.fontWeight = boldFlag.checked ? "bold" : "normal";
}

function updateColorFlag() {
    color.disabled = !colorFlag.checked;
    exampleText.style.color = colorFlag.checked ? color.value : "initial";
}

const colorFlag = document.querySelector("#color-flag");
const color = document.querySelector("#color");
const boldFlag = document.querySelector("#bold-flag");
const exampleText = document.querySelector("#example-text");
const undoButton = document.querySelectorAll(".undo-button");
const saveButton = document.querySelectorAll(".save-button");
const addButton = document.querySelector("#add-button");
const dictionaryContainer = document.querySelector(".dictionary");
const newWord = document.querySelector("#new-word");
const newTranslation = document.querySelector("#new-translation");

let dictionaryValues = [];

document.addEventListener("DOMContentLoaded", restoreOptions);

saveButton.forEach(el => el.addEventListener("click", saveOptions, false));
undoButton.forEach(el => el.addEventListener("click", restoreOptions, false));
addButton.addEventListener("click", addDictionaryItem, false);

colorFlag.addEventListener("change", updateColorFlag, false);
color.addEventListener("change", updateColor, false);
boldFlag.addEventListener("change", updateBoldFlag, false);
