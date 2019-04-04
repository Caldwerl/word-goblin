import { DB } from "./firebase";

function getVault(userID) {
    const targetRef = DB.ref(`vaults/${userID}`);

    return targetRef;
}

function saveVaultItem(userID, currentVaultSelectionIndex, currentDictionaryTitle, dictionaryItems) {
    const targetRef = DB.ref(`vaults/${userID}/${currentVaultSelectionIndex}`);

    return targetRef.set({
        title: currentDictionaryTitle,
        dictionary: dictionaryItems,
    });
}

function saveSuggestion(suggestionObject) {
    const targetRef = DB.ref("suggestions").push();

    return targetRef.set(suggestionObject);
}

export default {
    getVault,
    saveVaultItem,
    saveSuggestion,
};
