import React from "react";

import ImageHeadline from "../common/ImageHeadline/ImageHeadline";

import "./AboutContainer.scss";

const siteList = [
    "nytimes.com",
    "news.ycombinator.com",
    "medium.com",
    "reddit.com",
];

function AboutContainer() {
    const siteListComponents = siteList.map(siteListing => (
        <div
            key={siteListing}
            className="site-listing col-md-4 col-sm-6"
        >
            <div className="panel panel-primary">
                <h3>{siteListing}</h3>
            </div>
        </div>
    ));

    return (
        <section className="about-container container">
            <ImageHeadline
                text="Get the Word-Goblin extension for your browser"
            />

            <div
                className="row"
            >
                <div className="links col-md-6 col-sm-6">
                    <a
                        href="https://chrome.google.com/webstore/detail/word-goblin/flhfdnddbbolekjiljaijkpbjopnmglf?hl=en-US"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <h3>Get the Word Goblin Extension for Chrome</h3>
                    </a>
                </div>
                <div className="links col-md-6 col-sm-6">
                    <a
                        href="https://addons.mozilla.org/en-US/firefox/addon/word-goblin/"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <h3>Get the Word Goblin Extension for <span role="img" aria-label="firefox emoji">🦊</span> Firefox</h3>
                    </a>
                </div>
            </div>


            <h3>Word Goblin is a light-weight, and unobtrusive word replacer / language learning aid.</h3>
            <h3>I built this extension to allow myself to have continuous exposure and reinforcement of new vocabulary that I am learning anywhere I go on the web.</h3>
            <h3>It will find and replace words on the following websites, quickly and without breaking any links or functionality of that site.</h3>

            <div className="row">
                {siteListComponents}
            </div>

            <h3>Want it to support more sites? Make a request in the Suggestion Box at the bottom of this page!</h3>

        </section>
    );
}

export default AboutContainer;
