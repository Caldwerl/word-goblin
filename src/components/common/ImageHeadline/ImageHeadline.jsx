import React from "react";
import { string } from "prop-types";

import "./ImageHeadline.scss";

import "../../../icons/word-goblin-38.png";

function ImageHeadline({ text }) {
    return (
        <div className="image-headline">
            <img alt="word-goblin logo" src="./images/word-goblin-38.png" />
            <h2>{text}</h2>
        </div>
    );
}

ImageHeadline.propTypes = {
    text: string.isRequired,
};

export default ImageHeadline;
