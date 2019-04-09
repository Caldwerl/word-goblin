import React from "react";

function ExtensionLinksComponent() {
    return (
        <section className="extension-links">
            <h2>Get the Word-Goblin extension for your browser!</h2>
            <img alt="word-goblin logo" src="./images/word-goblin-48.png" />
            <div>
                <a
                    href="https://chrome.google.com/webstore/detail/word-goblin/flhfdnddbbolekjiljaijkpbjopnmglf?hl=en-US"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Get this Extension for Chrome
                </a>
            </div>
            <div>
                <a
                    href="https://addons.mozilla.org/en-US/android/addon/word-goblin/"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Get this Extension for <span role="img" aria-label="firefox emoji">🦊</span> Firefox
                </a>
            </div>
        </section>
    );
}

export default ExtensionLinksComponent;
