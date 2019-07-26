import React from "react";
import { array, func, object } from "prop-types";

import DOMPurify from "dompurify";

import api from "../common/api";
import ImageHeadline from "../common/ImageHeadline/ImageHeadline";
import UserAuthContainer from "../User/UserAuthContainer";

class DictionaryVaultContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkboxes: [],
            currentDictionaryTitle: "",
            currentVaultSelectionIndex: 0,
            vaultData: [],
        };

        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleCheckAll = this.handleCheckAll.bind(this);
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

    handleCheckbox(index, checkedBool) {
        const { checkboxes } = this.state;

        checkboxes[index] = checkedBool;

        return this.setState({
            checkboxes,
        });
    }

    handleCheckAll(checkedBool) {
        const { checkboxes } = this.state;

        return this.setState({
            checkboxes: checkboxes.map(() => checkedBool),
        });
    }

    loadVault(userID) {
        const firebaseListener = api.getVault(userID);

        firebaseListener.on("value", (snapshot) => {
            if (snapshot.val()) {
                this.setState({
                    checkboxes: snapshot.val().map(() => false),
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
        let sanitizedTitleString = DOMPurify.sanitize(currentDictionaryTitle);
        sanitizedTitleString = sanitizedTitleString || "Unnamed Dictionary";

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
        const { checkboxes, currentDictionaryTitle, currentVaultSelectionIndex, vaultData } = this.state;
        const { authUser } = this.props;

        if (!authUser) {
            return (
                <section className="vault-container container">
                    <div className="vault-details">
                        <h3>Sign In to access your Dictionary Vault</h3>
                        <h3>Conveniently Save and Load your dictionaries and easily transfer them between your devices.</h3>

                        <UserAuthContainer />
                    </div>
                </section>
            );
        }

        const vaultDataOptions = vaultData.map((vaultItem, index) => (
            <option key={`${vaultItem.title}-${index}`} value={index}>{vaultItem.title}</option> // eslint-disable-line react/no-array-index-key
        ));

        const vaultDataCheckboxes = vaultData.map((vaultItem, index) => (
            <div key={`${vaultItem.title}-${index}`} className="col-md-4">{/* eslint-disable-line react/no-array-index-key */}
                <input
                    type="checkbox"
                    id={index}
                    value={index}
                    onChange={event => this.handleCheckbox(index, event.target.checked)}
                    checked={checkboxes[index]}
                />
                <label htmlFor={index}>{vaultItem.title}</label>
            </div>
        ));

        return (
            <section className="vault-container container">
                <div className="vault-details row">
                    <div className="col-md-12">
                        {vaultDataCheckboxes}

                        <div className="col-md-6">
                            <button
                                className="btn btn-success"
                                disabled={!vaultDataCheckboxes.length}
                                onClick={() => this.handleCheckAll(true)}
                            >
                                Check All
                            </button>
                        </div>

                        <div className="col-md-6">
                            <button
                                className="btn btn-danger"
                                disabled={!vaultDataCheckboxes.length}
                                onClick={() => this.handleCheckAll(false)}
                            >
                                Uncheck All
                            </button>
                        </div>

                        <div style={{ display: "none" }}>
                            <input
                                id="dictionaryItems"
                                className="form-control"
                                readOnly
                                type="text"
                                value={JSON.stringify(vaultData.filter((value, index) => checkboxes[index]).reduce((accumulator, value) => (accumulator.concat(value.dictionary)), []))}
                            />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <ImageHeadline
                            text="Dictionary Vault"
                        />
                    </div>
                    <UserAuthContainer />

                    <h3>Conveniently Save and Load your dictionaries and easily transfer them between your devices.</h3>

                    <div className="col-md-12">
                        <ImageHeadline
                            text="Load / Save Dictionaries to Vault"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="dictionary-title">Current Dictionary Title:</label>
                        <input
                            id="dictionary-title"
                            className="form-control"
                            name="dictionary-title"
                            onChange={this.handleTitleChange}
                            type="text"
                            value={currentDictionaryTitle}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={this.saveVaultItem}
                        >
                            {
                                parseInt(currentVaultSelectionIndex, 10) === vaultDataOptions.length ?
                                    "Save New Dictionary To Vault" :
                                    "Save Current Dictionary To Vault"
                            }
                        </button>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="dictionary-select">Your Dictionary List:</label>
                        <select
                            className="form-control"
                            id="dictionary-select"
                            value={currentVaultSelectionIndex}
                            onChange={this.handleVaultSelect}
                        >
                            {vaultDataOptions}
                            <option value={vaultDataOptions.length}>Create a New Dictionary</option>
                        </select>
                        <button
                            className="btn btn-warning"
                            onClick={this.loadVaultItem}
                        >
                            {
                                parseInt(currentVaultSelectionIndex, 10) === vaultDataOptions.length ?
                                    "Create a New Dictionary" :
                                    "Load this Dictionary from Vault"
                            }
                        </button>
                    </div>
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
