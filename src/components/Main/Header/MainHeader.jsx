import React from "react";

import UserAuthContainer from "../../User/UserAuthContainer";

import "./MainHeader.scss";

import "../../../icons/word-goblin-48.png";

function MainHeader() {
    return (
        <header className="main-header">
            <nav>
                <img alt="word-goblin logo" src="./images/word-goblin-48.png" />
                <h1>Word Goblin</h1>
                <h3>Dictionary</h3>
                <h3>About</h3>

                <UserAuthContainer />
            </nav>
        </header>
    );
}

export default MainHeader;
