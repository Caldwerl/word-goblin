import React from "react";

import "./MainHeader.scss";

import "../../../icons/word-goblin-48.png";

function MainHeader() {
    return (
        <header className="main-header">
            <nav>
                <img alt="word-goblin logo" src="./images/word-goblin-48.png" />
                <h1>
                    Word Goblin
                </h1>
            </nav>
        </header>
    );
}

export default MainHeader;
