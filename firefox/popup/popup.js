function listenForClicks() {
    document.addEventListener("click", (e) => {
        function reportError(error) {
            console.error("Word-Goblin Error:", error);
        }

        if (e.target.classList.contains("dictionary")) {
            const opening = browser.runtime.openOptionsPage();

            opening
                .then(() => {
                    console.log("Word-Goblin Options page opened.");
                })
                .catch(reportError);
        }
    });
}

listenForClicks();
