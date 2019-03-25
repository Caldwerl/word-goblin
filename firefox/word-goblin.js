(function main() {
    let dictionary = [];

    let classType = null;

    if (window.location.origin.includes("somethingawful")) {
        classType = "postbody";
    } else if (window.location.origin.includes("reddit")) {
        classType = "Comment";
    } else if (window.location.origin.includes("ycombinator")) {
        classType = "commtext";
    }

    function walkTheDOM(node, searchText, replacementText, func) {
        func(node, searchText, replacementText);

        node = node.firstChild;

        while (node) {
            walkTheDOM(node, searchText, replacementText, func);
            node = node.nextSibling;
        }
    }

    function replaceText(node, searchText, replacementText) {
        if (node.nodeType === 3) { // Is it a Text node?
            const text = node.data.trim();
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

        const targetNodes = document.getElementsByClassName(classType) || [];

        for (let index = 0; index < targetNodes.length; index += 1) {
            walkTheDOM(targetNodes[index], searchText, replacementText, replaceText);
        }
    }

    function getStorageData() {
        const storageItems = browser.storage.local.get();

        storageItems.then((res) => {
            if (res.dictionary) {
                dictionary = JSON.parse(res.dictionary);
            }

            dictionary.forEach((item) => {
                findAndReplace(item.word, item.translation);
            });
        });
    }

    getStorageData();
}());
