/* ============================================
   XML VALIDATOR
============================================ */

function initTool() {

    const container =
        document.getElementById("tool-container");


    container.innerHTML = `

        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        XML Validator
                    </h2>

                    <p class="tool-panel-description">
                        XML auf Syntaxfehler und korrekte Verschachtelung prüfen.
                    </p>

                </div>

            </div>


            <textarea
                id="xml-validator-input"
                class="tool-textarea"
                placeholder='<?xml version="1.0" encoding="UTF-8"?>
<users>
    <user id="1">
        <name>Max</name>
        <active>true</active>
    </user>
</users>'
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="xml-validator-validate"
                    class="tool-button primary"
                    type="button"
                >
                    XML prüfen
                </button>


                <button
                    id="xml-validator-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="xml-validator-invalid"
                    class="tool-button"
                    type="button"
                >
                    Fehlerbeispiel
                </button>


                <button
                    id="xml-validator-clear"
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
                        Ergebnis der XML-Prüfung.
                    </p>

                </div>

            </div>


            <textarea
                id="xml-validator-output"
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
            "xml-validator-input"
        );


    const output =
        document.getElementById(
            "xml-validator-output"
        );


    const validateButton =
        document.getElementById(
            "xml-validator-validate"
        );


    const exampleButton =
        document.getElementById(
            "xml-validator-example"
        );


    const invalidButton =
        document.getElementById(
            "xml-validator-invalid"
        );


    const clearButton =
        document.getElementById(
            "xml-validator-clear"
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
                Math.max(
                    0,
                    index
                )
            );


        const lines =
            before.split("\n");


        return {

            line:
                lines.length,

            column:
                lines[lines.length - 1].length + 1

        };

    }


    /* ========================================
       XML ERROR POSITION
    ======================================== */

    function findErrorPosition(
        text,
        errorMessage
    ) {

        /*
         * Browser liefern bei DOMParser meistens
         * eine Zeile in der parsererror-Ausgabe.
         */

        const lineMatch =
            errorMessage.match(
                /line\s*(\d+)/i
            );


        const columnMatch =
            errorMessage.match(
                /column\s*(\d+)/i
            );


        if (
            lineMatch
        ) {

            const line =
                Number(
                    lineMatch[1]
                );


            const column =
                columnMatch
                    ? Number(
                        columnMatch[1]
                    )
                    : 1;


            const lines =
                text.split("\n");


            let index =
                0;


            for (
                let i = 0;
                i < line - 1 &&
                i < lines.length;
                i++
            ) {

                index +=
                    lines[i].length + 1;

            }


            return {
                index:
                    index +
                    column -
                    1,
                line,
                column
            };

        }


        return null;

    }


    /* ========================================
       VALIDATE
    ======================================== */

    function validateXml() {

        const value =
            input.value;


        if (
            !value.trim()
        ) {

            output.value =
                "Keine Eingabe vorhanden.";


            showToolStatus(
                "Bitte zuerst XML eingeben.",
                "warning"
            );

            return;

        }


        /*
         * XML wird ausschließlich geparst.
         * Es wird kein XML-Code ausgeführt.
         */

        const parser =
            new DOMParser();


        const document =
            parser.parseFromString(
                value,
                "application/xml"
            );


        const parserError =
            document.querySelector(
                "parsererror"
            );


        if (
            parserError
        ) {

            const errorMessage =
                parserError.textContent
                    .trim();


            const position =
                findErrorPosition(
                    value,
                    errorMessage
                );


            const result = [
                "✗ XML ist ungültig.",
                "",
                `Fehler: ${errorMessage}`
            ];


            if (
                position
            ) {

                result.push(
                    "",
                    `Zeile: ${position.line}`,
                    `Spalte: ${position.column}`
                );

            }


            output.value =
                result.join("\n");


            showToolStatus(
                "XML enthält einen Syntaxfehler.",
                "error"
            );


            return;

        }


        const root =
            document.documentElement;


        if (
            !root
        ) {

            output.value =
                [
                    "✗ XML ist ungültig.",
                    "",
                    "Fehler: Kein Root-Element gefunden."
                ].join("\n");


            showToolStatus(
                "Kein Root-Element gefunden.",
                "error"
            );


            return;

        }


        output.value =
            [
                "✓ XML ist gültig.",
                "",
                `Root-Element: <${root.nodeName}>`,
                `Elemente: ${root.getElementsByTagName("*").length}`,
                `Zeichen: ${value.length}`,
                "",
                "Die XML-Struktur konnte erfolgreich geparst werden."
            ].join("\n");


        showToolStatus(
            "XML ist gültig.",
            "success"
        );

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
`<?xml version="1.0" encoding="UTF-8"?>
<users>
    <user id="1">
        <name>Max</name>
        <active>true</active>
    </user>
    <user id="2">
        <name>Anna</name>
        <active>false</active>
    </user>
</users>`;


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
`<?xml version="1.0" encoding="UTF-8"?>
<users>
    <user>
        <name>Max</name>
    </users>
</users>`;


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
        validateXml
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