function listenForClicks() {
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("options")) {
            chrome.runtime.openOptionsPage();
        }
    });
}

listenForClicks();
