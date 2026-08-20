/* ============================================
   JSON VALIDATOR
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
                        JSON Validator
                    </h2>

                    <p class="tool-panel-description">
                        JSON prüfen und Syntaxfehler verständlich anzeigen.
                    </p>

                </div>

            </div>


            <textarea
                id="json-validator-input"
                class="tool-textarea"
                placeholder='{
    "name": "Max",
    "age": 25,
    "active": true
}'
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="json-validator-validate"
                    class="tool-button primary"
                    type="button"
                >
                    JSON prüfen
                </button>


                <button
                    id="json-validator-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="json-validator-invalid"
                    class="tool-button"
                    type="button"
                >
                    Fehlerbeispiel
                </button>


                <button
                    id="json-validator-clear"
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
                        Validierung
                    </h2>

                    <p class="tool-panel-description">
                        Ergebnis der JSON-Prüfung.
                    </p>

                </div>

            </div>


            <textarea
                id="json-validator-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Noch keine Prüfung durchgeführt."
            ></textarea>

        </section>

    `;


    /* ========================================
       ELEMENTS
    ======================================== */

    const input =
        document.getElementById(
            "json-validator-input"
        );


    const output =
        document.getElementById(
            "json-validator-output"
        );


    const validateButton =
        document.getElementById(
            "json-validator-validate"
        );


    const exampleButton =
        document.getElementById(
            "json-validator-example"
        );


    const invalidButton =
        document.getElementById(
            "json-validator-invalid"
        );


    const clearButton =
        document.getElementById(
            "json-validator-clear"
        );


    /* ========================================
       POSITION
    ======================================== */

    function getPosition(
        text,
        index
    ) {

        const before =
            text.slice(
                0,
                index
            );


        const lines =
            before.split(
                "\n"
            );


        return {

            line:
                lines.length,

            column:
                lines[lines.length - 1].length + 1,

            character:
                index + 1

        };

    }


    /* ========================================
       FIND ERROR POSITION
    ======================================== */

    function findErrorPosition(
        text,
        error
    ) {

        /*
         * Moderne Browser liefern bei JSON.parse()
         * leider nicht zuverlässig eine exakte
         * Zeichenposition.
         *
         * Wir versuchen deshalb zunächst,
         * eine Position aus der Fehlermeldung
         * zu extrahieren.
         */

        const match =
            error.message.match(
                /position\s+(\d+)/i
            );


        if (
            match
        ) {

            return Number(
                match[1]
            );

        }


        /*
         * Fallback:
         * Manche Fehlermeldungen enthalten
         * "line X column Y".
         */

        const lineMatch =
            error.message.match(
                /line\s+(\d+)/i
            );


        const columnMatch =
            error.message.match(
                /column\s+(\d+)/i
            );


        if (
            lineMatch &&
            columnMatch
        ) {

            const line =
                Number(
                    lineMatch[1]
                );


            const column =
                Number(
                    columnMatch[1]
                );


            const lines =
                text.split(
                    "\n"
                );


            let position =
                0;


            for (
                let i = 0;
                i < line - 1 &&
                i < lines.length;
                i++
            ) {

                position +=
                    lines[i].length + 1;

            }


            return (
                position +
                column -
                1
            );

        }


        return null;

    }


    /* ========================================
       CREATE ERROR CONTEXT
    ======================================== */

    function createErrorContext(
        text,
        position
    ) {

        if (
            position === null
        ) {

            return "";

        }


        const start =
            Math.max(
                0,
                position - 25
            );


        const end =
            Math.min(
                text.length,
                position + 25
            );


        const context =
            text.slice(
                start,
                end
            );


        const pointer =
            " ".repeat(
                Math.max(
                    0,
                    position - start
                )
            ) +
            "^";


        return [
            "",
            "Kontext:",
            context,
            pointer
        ].join("\n");

    }


    /* ========================================
       VALIDATE
    ======================================== */

    function validateJson() {

        const value =
            input.value;


        if (
            !value.trim()
        ) {

            output.value =
                "Keine Eingabe vorhanden.";


            showToolStatus(
                "Bitte zuerst JSON eingeben.",
                "warning"
            );

            return;

        }


        try {

            const result =
                JSON.parse(
                    value
                );


            const type =
                Array.isArray(
                    result
                )
                    ? "Array"
                    : result === null
                        ? "null"
                        : typeof result;


            output.value =
                [
                    "✓ JSON ist gültig.",
                    "",
                    `Datentyp: ${type}`,
                    `Zeichen: ${value.length}`
                ].join("\n");


            showToolStatus(
                "JSON ist gültig.",
                "success"
            );

        } catch (error) {

            const position =
                findErrorPosition(
                    value,
                    error
                );


            const positionInfo =
                position !== null
                    ? getPosition(
                        value,
                        position
                    )
                    : null;


            const context =
                createErrorContext(
                    value,
                    position
                );


            const lines = [
                "✗ JSON ist ungültig.",
                "",
                `Fehler: ${error.message}`
            ];


            if (
                positionInfo
            ) {

                lines.push(
                    "",
                    `Zeile: ${positionInfo.line}`,
                    `Spalte: ${positionInfo.column}`,
                    `Zeichen: ${positionInfo.character}`
                );

            }


            lines.push(
                context
            );


            output.value =
                lines.join(
                    "\n"
                );


            showToolStatus(
                "JSON enthält einen Syntaxfehler.",
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
`{
    "name": "Max",
    "age": 25,
    "languages": [
        "JavaScript",
        "HTML",
        "CSS"
    ],
    "developer": true
}`;


        output.value =
            "";


        showToolStatus(
            "Gültiges Beispiel geladen.",
            "success"
        );


        input.focus();

    }


    /* ========================================
       INVALID EXAMPLE
    ======================================== */

    function loadInvalidExample() {

        input.value =
`{
    "name": "Max",
    "age": 25,
    "active": true,
}`;


        output.value =
            "";


        showToolStatus(
            "Fehlerbeispiel geladen.",
            "warning"
        );


        input.focus();

    }


    /* ========================================
       CLEAR
    ======================================== */

    function clearTool() {

        input.value =
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

    validateButton.addEventListener(
        "click",
        validateJson
    );


    exampleButton.addEventListener(
        "click",
        loadExample
    );


    invalidButton.addEventListener(
        "click",
        loadInvalidExample
    );


    clearButton.addEventListener(
        "click",
        clearTool
    );

}