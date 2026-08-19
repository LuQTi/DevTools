/* ============================================
   JSON FORMATTER
============================================ */


/* ============================================
   ELEMENTS
============================================ */

const jsonInput =
    document.getElementById(
        "json-input"
    );


const jsonOutput =
    document.getElementById(
        "json-output"
    );


const formatButton =
    document.getElementById(
        "format-json"
    );


const minifyButton =
    document.getElementById(
        "minify-json"
    );


const validateButton =
    document.getElementById(
        "validate-json"
    );


const exampleButton =
    document.getElementById(
        "example-json"
    );


const clearButton =
    document.getElementById(
        "clear-json"
    );


/* ============================================
   GET JSON
============================================ */

function parseJSON() {

    const value =
        jsonInput.value.trim();


    if (!value) {

        showToolStatus(
            "Bitte zuerst JSON eingeben.",
            "warning"
        );

        return null;
    }


    try {

        return JSON.parse(
            value
        );

    } catch (error) {

        showToolStatus(
            `Ungültiges JSON: ${error.message}`,
            "error"
        );

        return null;
    }

}


/* ============================================
   FORMAT
============================================ */

function formatJSON() {

    const data =
        parseJSON();


    if (data === null) {
        return;
    }


    jsonOutput.value =
        JSON.stringify(
            data,
            null,
            2
        );


    showToolStatus(
        "JSON erfolgreich formatiert.",
        "success"
    );

}


/* ============================================
   MINIFY
============================================ */

function minifyJSON() {

    const data =
        parseJSON();


    if (data === null) {
        return;
    }


    jsonOutput.value =
        JSON.stringify(
            data
        );


    showToolStatus(
        "JSON erfolgreich minimiert.",
        "success"
    );

}


/* ============================================
   VALIDATE
============================================ */

function validateJSON() {

    const value =
        jsonInput.value.trim();


    if (!value) {

        showToolStatus(
            "Bitte zuerst JSON eingeben.",
            "warning"
        );

        return;
    }


    try {

        JSON.parse(
            value
        );


        showToolStatus(
            "✓ Gültiges JSON.",
            "success"
        );

    } catch (error) {

        showToolStatus(
            `✕ Ungültiges JSON: ${error.message}`,
            "error"
        );

    }

}


/* ============================================
   EXAMPLE
============================================ */

function loadJSONExample() {

    const example = {

        user: {

            active: true,

            name: "Max",

            skills: [
                "JavaScript",
                "PHP",
                "SQL",
                "Linux"
            ],

            age: 24,

            address: {

                zip: 50667,

                city: "Köln",

                country: "Deutschland"

            },

            projects: [

                {

                    name:
                        "Developer Toolbox",

                    completed:
                        false,

                    tags: [
                        "HTML",
                        "CSS",
                        "JS"
                    ]

                },

                {

                    name:
                        "Website",

                    completed:
                        true,

                    tags: [
                        "PHP",
                        "SQL"
                    ]

                }

            ]

        },


        settings: {

            darkMode: true,

            notifications: false,

            fontSize: 14

        },


        statistics: {

            visits: 1250,

            rating: 4.8,

            lastLogin: null

        }

    };


    jsonInput.value =
        JSON.stringify(
            example,
            null,
            2
        );


    jsonOutput.value = "";


    showToolStatus(
        "Beispiel eingefügt.",
        "success"
    );

}


/* ============================================
   CLEAR
============================================ */

function clearJSON() {

    jsonInput.value = "";

    jsonOutput.value = "";


    const status =
        document.getElementById(
            "status"
        );


    if (status) {

        status.classList.remove(
            "show"
        );

    }


    jsonInput.focus();

}


/* ============================================
   EVENTS
============================================ */

formatButton.addEventListener(
    "click",
    formatJSON
);


minifyButton.addEventListener(
    "click",
    minifyJSON
);


validateButton.addEventListener(
    "click",
    validateJSON
);


exampleButton.addEventListener(
    "click",
    loadJSONExample
);


clearButton.addEventListener(
    "click",
    clearJSON
);


/* ============================================
   KEYBOARD SHORTCUT
============================================ */

jsonInput.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey ||
                event.metaKey) &&
            event.key === "Enter"
        ) {

            event.preventDefault();

            formatJSON();

        }

    }
);