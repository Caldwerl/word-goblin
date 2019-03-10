let colorSetting = "";
let boldSetting = "";
let dictionary = [];

const isSA = window.location.origin.includes("somethingawful");

chrome.storage.local.get((res) => {
    if (res.colorFlag) {
        colorSetting = `color: ${res.color};`;
    }

    if (res.boldFlag) {
        boldSetting = "font-weight: bolder;";
    }

    if (res.dictionary) {
        dictionary = JSON.parse(res.dictionary);
    }

    dictionary.forEach((item) => {
        findAndReplace(item.word, item.translation);
    });
});

function findAndReplace(searchText, replacement) {
    if (!searchText || typeof replacement === "undefined") {
        return;
    }

    var regex = typeof searchText === "string" ? new RegExp(`\\b${searchText}\\b`, "ig") : searchText;
    // If location is SomethingAwful select by postbody, otherwise location is reddit select by p tags
    var childNodes = isSA ? document.getElementsByClassName("postbody") : document.getElementsByTagName("p");

    for (let childNode of childNodes) {
        const nodeText = childNode.innerHTML;

        if (regex.test(nodeText)) {
            const matchedString = nodeText.match(regex);

            childNode.innerHTML = nodeText.replace(regex, `<span style="${colorSetting} ${boldSetting}"><abbr title="${matchedString}">${replacement}</abbr></span>`);
        }
    }
}
