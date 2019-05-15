(function main() {
    let dictionary = [];

    let selector = null;
    let selectorType = null;
    let isHomepage = false;

    if (window.location.origin.includes("word-goblin")) {
        isHomepage = true;
    } else if (window.location.origin.includes("somethingawful")) {
        selector = "postbody";
        selectorType = "class";
    } else if (window.location.origin.includes("reddit")) {
        selector = "Comment";
        selectorType = "class";
    } else if (window.location.origin.includes("ycombinator")) {
        selector = "commtext";
        selectorType = "class";
    } else if (window.location.origin.includes("nytimes") || window.location.origin.includes("medium")) {
        selector = "article";
        selectorType = "tag";
    }

    function walkTheDOM(node, searchText, replacementText, func) {
        func(node, searchText, replacementText);

        node = node.firstChild; // eslint-disable-line no-param-reassign

        while (node) {
            walkTheDOM(node, searchText, replacementText, func);
            node = node.nextSibling; // eslint-disable-line no-param-reassign
        }
    }

    function replaceText(node, searchText, replacementText) {
        if (node.nodeType === 3) { // Is it a Text node?
            const text = node.data;
            if (text.length > 0) { // Does it have non white-space text content?
                const regex = typeof searchText === "string" ? new RegExp(`\\b${searchText}\\b`, "ig") : searchText;

                if (regex.test(text)) {
                    node.data = text.replace(regex, replacementText);
                }
            }
        }
    }

    function findAndReplace(searchText, replacementText) {
        if (!searchText || typeof replacementText === "undefined") {
            return;
        }

        let targetNodes = [];

        switch (selectorType) {
        case "class":
            targetNodes = document.getElementsByClassName(selector);
            break;
        case "tag":
            targetNodes = document.getElementsByTagName(selector);
            break;
        default:
            break;
        }

        for (let index = 0; index < targetNodes.length; index += 1) {
            walkTheDOM(targetNodes[index], searchText, replacementText, replaceText);
        }
    }

    function saveStorageData() {
        const dictionarySourceEl = document.getElementById("dictionaryItems");

        browser.storage.local.set({
            dictionary: dictionarySourceEl.value,
        });
    }

    function homepageInterface(dictionaryString) {
        const dictionarySourceEl = document.getElementById("dictionaryItems");
        const extensionCheckboxEl = document.getElementById("extensionCheckbox");
        const saveSettingsEl = document.getElementById("save-settings");

        dictionarySourceEl.value = dictionaryString;
        dictionarySourceEl.dispatchEvent(new Event("change", { bubbles: true }));

        extensionCheckboxEl.checked = true;
        extensionCheckboxEl.dispatchEvent(new Event("click", { bubbles: true }));

        saveSettingsEl.addEventListener("click", saveStorageData);
    }

    async function getStorageData() {
        const storageItems = await browser.storage.local.get();

        if (isHomepage) {
            homepageInterface(storageItems.dictionary);
        } else {
            if (storageItems.dictionary) {
                dictionary = JSON.parse(storageItems.dictionary);
            }

            dictionary.forEach((item) => {
                findAndReplace(item.word, item.translation);
            });
        }
    }

    getStorageData();
}());
