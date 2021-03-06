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

        chrome.storage.local.set({
            dictionary: dictionarySourceEl.value,
        });
    }

    function homepageInterface() {
        const extensionCheckboxEl = document.getElementById("extensionCheckbox");
        const saveSettingsEl = document.getElementById("save-settings");

        extensionCheckboxEl.checked = true;
        extensionCheckboxEl.dispatchEvent(new Event("click", { bubbles: true }));

        saveSettingsEl.addEventListener("click", saveStorageData);
    }

    function getStorageData() {
        chrome.storage.local.get((res) => {
            if (isHomepage) {
                homepageInterface();
            } else {
                if (res.dictionary) {
                    dictionary = JSON.parse(res.dictionary);
                }

                dictionary.forEach((item) => {
                    findAndReplace(item.word, item.translation);
                });
            }
        });
    }

    getStorageData();
}());
