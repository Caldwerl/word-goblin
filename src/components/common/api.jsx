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

export default {
    getVault,
    saveVaultItem,
};
