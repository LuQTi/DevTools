/* ============================================
   DEVTOOLS - SHARED TOOL JAVASCRIPT
============================================ */


/* ============================================
   INIT
============================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeToolTheme();

        initializeToolNavigation();

        initializeToolCopyButtons();

    }
);


/* ============================================
   THEME
============================================ */

function initializeToolTheme() {

    const savedTheme =
        localStorage.getItem(
            "devtools-theme"
        );


    if (savedTheme === "light") {

        document.documentElement
            .classList.add(
                "light-theme"
            );

    } else {

        document.documentElement
            .classList.remove(
                "light-theme"
            );

    }


    updateToolThemeIcon();
}


function toggleToolTheme() {

    document.documentElement
        .classList.toggle(
            "light-theme"
        );


    const isLight =
        document.documentElement
            .classList.contains(
                "light-theme"
            );


    localStorage.setItem(
        "devtools-theme",
        isLight
            ? "light"
            : "dark"
    );


    updateToolThemeIcon();
}


function updateToolThemeIcon() {

    const button =
        document.getElementById(
            "tool-theme"
        );


    if (!button) {
        return;
    }


    const isLight =
        document.documentElement
            .classList.contains(
                "light-theme"
            );


    button.textContent =
        isLight
            ? "🌙"
            : "☀️";
}


/* ============================================
   NAVIGATION
============================================ */

function initializeToolNavigation() {

    const backButton =
        document.getElementById(
            "tool-back"
        );


    if (backButton) {

        backButton.addEventListener(
            "click",
            () => {

                window.location.href =
                    "../../index.html";

            }
        );

    }


    const themeButton =
        document.getElementById(
            "tool-theme"
        );


    if (themeButton) {

        themeButton.addEventListener(
            "click",
            toggleToolTheme
        );

    }

}


/* ============================================
   COPY
============================================ */

function initializeToolCopyButtons() {

    document
        .querySelectorAll(
            "[data-copy-target]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    async () => {

                        const targetId =
                            button.dataset.copyTarget;


                        const target =
                            document.getElementById(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        await copyToClipboard(
                            target.value
                        );


                        const originalText =
                            button.textContent;


                        button.textContent =
                            "✓ Kopiert";


                        setTimeout(
                            () => {

                                button.textContent =
                                    originalText;

                            },
                            1500
                        );

                    }
                );

            }
        );
}


/* ============================================
   CLIPBOARD
============================================ */

async function copyToClipboard(text) {

    if (!text) {

        showToolStatus(
            "Nichts zum Kopieren vorhanden.",
            "error"
        );

        return false;
    }


    try {

        await navigator.clipboard.writeText(
            text
        );


        showToolStatus(
            "In Zwischenablage kopiert.",
            "success"
        );


        return true;

    } catch {

        showToolStatus(
            "Kopieren nicht möglich.",
            "error"
        );


        return false;

    }

}


/* ============================================
   STATUS
============================================ */

function showToolStatus(
    message,
    type = "success"
) {

    const status =
        document.getElementById(
            "status"
        );


    if (!status) {
        return;
    }


    status.textContent =
        message;


    status.className =
        `tool-status show ${type}`;


    clearTimeout(
        window.toolStatusTimeout
    );


    window.toolStatusTimeout =
        setTimeout(
            () => {

                status.classList.remove(
                    "show"
                );

            },
            2500
        );
}


/* ============================================
   HELPERS
============================================ */

function getElement(id) {

    return document.getElementById(id);

}


function getValue(id) {

    const element =
        getElement(id);


    return element
        ? element.value
        : "";

}


function setValue(
    id,
    value
) {

    const element =
        getElement(id);


    if (element) {

        element.value =
            value;

    }

}