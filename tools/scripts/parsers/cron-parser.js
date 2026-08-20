/* ============================================
   CRON PARSER
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
                        Cron Parser
                    </h2>

                    <p class="tool-panel-description">
                        Cron-Ausdrücke analysieren und ihre Bedeutung verständlich anzeigen.
                    </p>

                </div>

            </div>


            <textarea
                id="cron-parser-input"
                class="tool-textarea"
                placeholder="*/5 * * * *"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="cron-parser-parse"
                    class="tool-button primary"
                    type="button"
                >
                    Analysieren
                </button>


                <button
                    id="cron-parser-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="cron-parser-clear"
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
                        Bestandteile
                    </h2>

                    <p class="tool-panel-description">
                        Die fünf Felder des Cron-Ausdrucks.
                    </p>

                </div>

            </div>


            <textarea
                id="cron-parser-fields"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Felder erscheinen hier..."
            ></textarea>

        </section>


        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        Bedeutung
                    </h2>

                    <p class="tool-panel-description">
                        Verständliche Beschreibung des Cron-Ausdrucks.
                    </p>

                </div>

            </div>


            <textarea
                id="cron-parser-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Beschreibung erscheint hier..."
            ></textarea>

        </section>

    `;


    /* ========================================
       ELEMENTS
    ======================================== */

    const input =
        document.getElementById(
            "cron-parser-input"
        );


    const fieldsOutput =
        document.getElementById(
            "cron-parser-fields"
        );


    const output =
        document.getElementById(
            "cron-parser-output"
        );


    const parseButton =
        document.getElementById(
            "cron-parser-parse"
        );


    const exampleButton =
        document.getElementById(
            "cron-parser-example"
        );


    const clearButton =
        document.getElementById(
            "cron-parser-clear"
        );


    /* ========================================
       FIELD DESCRIPTIONS
    ======================================== */

    const fieldNames = [
        "Minute",
        "Stunde",
        "Tag des Monats",
        "Monat",
        "Wochentag"
    ];


    /* ========================================
       DESCRIBE FIELD
    ======================================== */

    function describeField(
        value,
        fieldName
    ) {

        if (
            value === "*"
        ) {

            return `${fieldName}: jeder Wert`;

        }


        if (
            value.startsWith("*/")
        ) {

            const interval =
                value.slice(2);


            return `${fieldName}: alle ${interval} Einheiten`;

        }


        if (
            value.includes(",")
        ) {

            return `${fieldName}: Werte ${value}`;

        }


        if (
            value.includes("-")
        ) {

            return `${fieldName}: Bereich ${value}`;

        }


        return `${fieldName}: ${value}`;

    }


    /* ========================================
       PARSE
    ======================================== */

    function parseCron() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst einen Cron-Ausdruck eingeben.",
                "warning"
            );

            return;

        }


        const fields =
            value.split(/\s+/);


        if (
            fields.length !== 5
        ) {

            fieldsOutput.value =
                "";


            output.value =
                "";


            showToolStatus(
                "Ungültiger Cron-Ausdruck: Es werden genau 5 Felder erwartet.",
                "error"
            );

            return;

        }


        const descriptions =
            fields.map(
                (
                    field,
                    index
                ) =>
                    describeField(
                        field,
                        fieldNames[index]
                    )
            );


        fieldsOutput.value =
            fields
                .map(
                    (
                        field,
                        index
                    ) =>
                        `${fieldNames[index]}: ${field}`
                )
                .join("\n");


        output.value =
            descriptions.join("\n");


        showToolStatus(
            "Cron-Ausdruck erfolgreich analysiert.",
            "success"
        );

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            "*/5 * * * *";


        parseCron();

    }


    /* ========================================
       CLEAR
    ======================================== */

    function clearTool() {

        input.value =
            "";


        fieldsOutput.value =
            "";


        output.value =
            "";


        showToolStatus(
            "Eingabe und Ergebnis geleert.",
            "success"
        );


        input.focus();

    }


    /* ========================================
       EVENTS
    ======================================== */

    parseButton.addEventListener(
        "click",
        parseCron
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