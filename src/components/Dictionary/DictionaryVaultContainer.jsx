import React from "react";
import { array, func, object } from "prop-types";

import DOMPurify from "dompurify";

import api from "../common/api";

class DictionaryVaultContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDictionaryTitle: "",
            currentVaultSelectionIndex: 0,
            vaultData: [],
        };

        this.loadVault = this.loadVault.bind(this);
        this.loadVaultItem = this.loadVaultItem.bind(this);
        this.saveVaultItem = this.saveVaultItem.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleVaultSelect = this.handleVaultSelect.bind(this);
    }

    componentWillMount() {
        const { authUser } = this.props;

        if (authUser) {
            this.loadVault(authUser.uid);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { authUser } = this.props;

        if (!authUser && nextProps.authUser) {
            this.loadVault(nextProps.authUser.uid);
        }

        if (authUser && !nextProps.authUser) {
            return this.setState({
                currentVaultSelectionIndex: 0,
                vaultData: [],
            });
        }

        return null;
    }

    componentWillUnmount() {
        if (this.state.firebaseListener) {
            this.state.firebaseListener.off();
        }
    }

    loadVault(userID) {
        const firebaseListener = api.getVault(userID);

        firebaseListener.on("value", (snapshot) => {
            if (snapshot.val()) {
                this.setState({
                    currentVaultSelectionIndex: snapshot.val().length,
                    vaultData: snapshot.val(),
                });
            }
        });

        return this.setState({
            firebaseListener,
        });
    }

    loadVaultItem() {
        const { currentVaultSelectionIndex, vaultData } = this.state;
        const { loadDictionaryListFunc } = this.props;

        if (vaultData[currentVaultSelectionIndex]) {
            return this.setState({
                currentDictionaryTitle: vaultData[currentVaultSelectionIndex].title,
            }, () => loadDictionaryListFunc(vaultData[currentVaultSelectionIndex].dictionary));
        }

        return this.setState({
            currentDictionaryTitle: "Untitled Dictionary",
        }, () => loadDictionaryListFunc([]));
    }

    saveVaultItem() {
        const { currentDictionaryTitle, currentVaultSelectionIndex } = this.state;
        const { authUser, dictionaryItems } = this.props;
        const sanitizedTitleString = DOMPurify.sanitize(currentDictionaryTitle);

        const sanitizedDictionaryItems = dictionaryItems.map(dictionaryItem => ({
            translation: DOMPurify.sanitize(dictionaryItem.translation),
            word: DOMPurify.sanitize(dictionaryItem.word),
        }));

        api.saveVaultItem(authUser.uid, currentVaultSelectionIndex, sanitizedTitleString, sanitizedDictionaryItems);
    }

    handleTitleChange(event) {
        const { target } = event;
        const { value } = target;

        return this.setState({
            currentDictionaryTitle: value,
        });
    }

    handleVaultSelect(event) {
        const { target } = event;
        const { value } = target;

        return this.setState({
            currentVaultSelectionIndex: value,
        });
    }

    render() {
        const { currentDictionaryTitle, currentVaultSelectionIndex, vaultData } = this.state;
        const { authUser } = this.props;

        if (!authUser) {
            return (
                <section className="vault-container">
                    <div className="vault-details">
                        Sign In to access your Dictionary Vault
                    </div>
                </section>
            );
        }

        const vaultDataOptions = vaultData.map((vaultItem, index) => (
            <option key={`${vaultItem.title}-${index}`} value={index}>{vaultItem.title}</option> // eslint-disable-line react/no-array-index-key
        ));

        return (
            <section className="vault-container">
                <div className="vault-details">
                    <h2>Dictionary Vault</h2>

                    <span>
                        <label htmlFor="dictionary-title">Dictionary Title:</label>
                        <input
                            id="dictionary-title"
                            name="dictionary-title"
                            onChange={this.handleTitleChange}
                            type="text"
                            value={currentDictionaryTitle}
                        />
                    </span>
                    <button
                        className="save-button"
                        onClick={this.saveVaultItem}
                    >
                        {
                            parseInt(currentVaultSelectionIndex, 10) === vaultDataOptions.length ?
                                "Save New Dictionary" :
                                "Save Current Dictionary"
                        }
                    </button>

                    <button
                        className="load-button"
                        onClick={this.loadVaultItem}
                    >
                        {
                            parseInt(currentVaultSelectionIndex, 10) === vaultDataOptions.length ?
                                "Create a New Dictionary" :
                                "Load this Dictionary"
                        }
                    </button>

                    <select
                        id="dictionary-select"
                        value={currentVaultSelectionIndex}
                        onChange={this.handleVaultSelect}
                    >
                        {vaultDataOptions}
                        <option value={vaultDataOptions.length}>Create a New Dictionary</option>
                    </select>
                </div>
            </section>
        );
    }
}

DictionaryVaultContainer.propTypes = {
    authUser: object,
    dictionaryItems: array.isRequired,
    loadDictionaryListFunc: func.isRequired,
};

DictionaryVaultContainer.defaultProps = {
    authUser: null,
};

export default DictionaryVaultContainer;
