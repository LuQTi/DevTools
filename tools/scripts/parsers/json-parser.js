/* ============================================
   JSON PARSER
============================================ */


/* ============================================
   INIT
============================================ */

function initTool() {

    const container =
        document.getElementById("tool-container");


    container.innerHTML = `

        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        JSON Parser
                    </h2>

                    <p class="tool-panel-description">
                        JSON analysieren, validieren und strukturiert darstellen.
                    </p>

                </div>

            </div>


            <textarea
                id="json-parser-input"
                class="tool-textarea"
                placeholder='{"name":"Max","age":25,"active":true}'
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="json-parser-parse"
                    class="tool-button primary"
                    type="button"
                >
                    Analysieren
                </button>


                <button
                    id="json-parser-format"
                    class="tool-button"
                    type="button"
                >
                    Formatieren
                </button>


                <button
                    id="json-parser-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="json-parser-clear"
                    class="tool-button"
                    type="button"
                >
                    Leeren
                </button>

            </div>


            <div
                id="status"
                class="tool-status"
                role="status"
                aria-live="polite"
            ></div>

        </section>


        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        Struktur
                    </h2>

                    <p class="tool-panel-description">
                        Erkannte Eigenschaften und Datentypen.
                    </p>

                </div>

            </div>


            <textarea
                id="json-parser-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Struktur erscheint hier..."
            ></textarea>

        </section>


        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        Statistiken
                    </h2>

                </div>

            </div>


            <div class="tool-actions">

                <button
                    class="tool-button"
                    type="button"
                >
                    Typ:
                    <span id="json-parser-type">
                        —
                    </span>
                </button>


                <button
                    class="tool-button"
                    type="button"
                >
                    Eigenschaften:
                    <span id="json-parser-properties">
                        —
                    </span>
                </button>


                <button
                    class="tool-button"
                    type="button"
                >
                    Elemente:
                    <span id="json-parser-elements">
                        —
                    </span>
                </button>

            </div>

        </section>

    `;


    /* ========================================
       ELEMENTS
    ======================================== */

    const input =
        document.getElementById(
            "json-parser-input"
        );


    const output =
        document.getElementById(
            "json-parser-output"
        );


    const parseButton =
        document.getElementById(
            "json-parser-parse"
        );


    const formatButton =
        document.getElementById(
            "json-parser-format"
        );


    const exampleButton =
        document.getElementById(
            "json-parser-example"
        );


    const clearButton =
        document.getElementById(
            "json-parser-clear"
        );


    const typeOutput =
        document.getElementById(
            "json-parser-type"
        );


    const propertiesOutput =
        document.getElementById(
            "json-parser-properties"
        );


    const elementsOutput =
        document.getElementById(
            "json-parser-elements"
        );


    /* ========================================
       TYPE
    ======================================== */

    function getJsonType(
        value
    ) {

        if (
            value === null
        ) {

            return "null";

        }


        if (
            Array.isArray(value)
        ) {

            return "array";

        }


        return typeof value;

    }


    /* ========================================
       COUNT VALUES
    ======================================== */

    function countValues(
        value
    ) {

        if (
            value === null ||
            typeof value !== "object"
        ) {

            return 1;

        }


        if (
            Array.isArray(value)
        ) {

            return value.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    countValues(item),
                0
            );

        }


        return Object.values(
            value
        ).reduce(
            (
                total,
                item
            ) =>
                total +
                countValues(item),
            0
        );

    }


    /* ========================================
       COUNT PROPERTIES
    ======================================== */

    function countProperties(
        value
    ) {

        if (
            value === null ||
            typeof value !== "object"
        ) {

            return 0;

        }


        if (
            Array.isArray(value)
        ) {

            return value.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    countProperties(item),
                0
            );

        }


        return Object.entries(
            value
        ).reduce(
            (
                total,
                [
                    ,
                    item
                ]
            ) =>
                total +
                1 +
                countProperties(item),
            0
        );

    }


    /* ========================================
       PARSE
    ======================================== */

    function parseJson() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst JSON eingeben.",
                "warning"
            );

            return;

        }


        try {

            const parsed =
                JSON.parse(value);


            const type =
                getJsonType(
                    parsed
                );


            typeOutput.textContent =
                type;


            propertiesOutput.textContent =
                countProperties(
                    parsed
                );


            elementsOutput.textContent =
                countValues(
                    parsed
                );


            output.value =
                JSON.stringify(
                    parsed,
                    null,
                    4
                );


            showToolStatus(
                "JSON erfolgreich analysiert.",
                "success"
            );

        } catch (error) {

            clearResults();


            showToolStatus(
                `Ungültiges JSON: ${error.message}`,
                "error"
            );

        }

    }


    /* ========================================
       FORMAT
    ======================================== */

    function formatJson() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst JSON eingeben.",
                "warning"
            );

            return;

        }


        try {

            const parsed =
                JSON.parse(value);


            input.value =
                JSON.stringify(
                    parsed,
                    null,
                    4
                );


            showToolStatus(
                "JSON erfolgreich formatiert.",
                "success"
            );

        } catch (error) {

            showToolStatus(
                `JSON konnte nicht formatiert werden: ${error.message}`,
                "error"
            );

        }

    }


    /* ========================================
       CLEAR RESULTS
    ======================================== */

    function clearResults() {

        output.value =
            "";


        typeOutput.textContent =
            "—";


        propertiesOutput.textContent =
            "—";


        elementsOutput.textContent =
            "—";

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            JSON.stringify(
                {
                    name: "Max",
                    age: 25,
                    active: true,
                    languages: [
                        "JavaScript",
                        "Java",
                        "PHP"
                    ],
                    address: {
                        city: "Berlin",
                        country: "Germany"
                    }
                },
                null,
                4
            );


        parseJson();

    }


    /* ========================================
       CLEAR
    ======================================== */

    function clearTool() {

        input.value =
            "";


        clearResults();


        showToolStatus(
            "Eingabe und Ergebnisse geleert.",
            "success"
        );


        input.focus();

    }


    /* ========================================
       EVENTS
    ======================================== */

    parseButton.addEventListener(
        "click",
        parseJson
    );


    formatButton.addEventListener(
        "click",
        formatJson
    );


    exampleButton.addEventListener(
        "click",
        loadExample
    );


    clearButton.addEventListener(
        "click",
        clearTool
    );

}