/* ============================================
   JAVASCRIPT VALIDATOR
============================================ */

function initTool() {

    const container =
        document.getElementById("tool-container");


    container.innerHTML = `

        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        JavaScript Validator
                    </h2>

                    <p class="tool-panel-description">
                        JavaScript auf Syntaxfehler prüfen und Fehlerposition anzeigen.
                    </p>

                </div>

            </div>


            <textarea
                id="javascript-validator-input"
                class="tool-textarea"
                placeholder='function greet(name) {
    return "Hello " + name;
}

console.log(greet("World"));'
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="javascript-validator-validate"
                    class="tool-button primary"
                    type="button"
                >
                    JavaScript prüfen
                </button>


                <button
                    id="javascript-validator-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="javascript-validator-invalid"
                    class="tool-button"
                    type="button"
                >
                    Fehlerbeispiel
                </button>


                <button
                    id="javascript-validator-clear"
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
                        Ergebnis der JavaScript-Prüfung.
                    </p>

                </div>

            </div>


            <textarea
                id="javascript-validator-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Noch keine Prüfung durchgeführt."
            ></textarea>

        </section>

    `;


    const input =
        document.getElementById(
            "javascript-validator-input"
        );


    const output =
        document.getElementById(
            "javascript-validator-output"
        );


    const validateButton =
        document.getElementById(
            "javascript-validator-validate"
        );


    const exampleButton =
        document.getElementById(
            "javascript-validator-example"
        );


    const invalidButton =
        document.getElementById(
            "javascript-validator-invalid"
        );


    const clearButton =
        document.getElementById(
            "javascript-validator-clear"
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
       VALIDATE
    ======================================== */

    function validateJavaScript() {

        const value =
            input.value;


        if (
            !value.trim()
        ) {

            output.value =
                "Keine Eingabe vorhanden.";


            showToolStatus(
                "Bitte zuerst JavaScript eingeben.",
                "warning"
            );

            return;

        }


        try {

            /*
             * Function-Konstruktor kompiliert den
             * Code, führt ihn aber nicht aus.
             *
             * Dadurch prüfen wir die Syntax,
             * ohne den eingegebenen Code auszuführen.
             */

            new Function(
                value
            );


            output.value =
                [
                    "✓ JavaScript-Syntax ist gültig.",
                    "",
                    `Zeichen: ${value.length}`,
                    "Keine Syntaxfehler gefunden."
                ].join("\n");


            showToolStatus(
                "JavaScript ist syntaktisch gültig.",
                "success"
            );

        } catch (error) {

            const message =
                error.message ||
                "Unbekannter Syntaxfehler.";


            /*
             * V8 / Chrome / Edge / Node liefern
             * häufig eine Position oder Zeile
             * in der Fehlermeldung.
             */

            const positionMatch =
                message.match(
                    /position\s+(\d+)/i
                );


            const lineMatch =
                message.match(
                    /line\s+(\d+)/i
                );


            let position =
                null;


            if (
                positionMatch
            ) {

                position =
                    Number(
                        positionMatch[1]
                    );

            }


            let positionInfo =
                null;


            if (
                position !== null
            ) {

                positionInfo =
                    getPosition(
                        value,
                        position
                    );

            } else if (
                lineMatch
            ) {

                const line =
                    Number(
                        lineMatch[1]
                    );


                const lines =
                    value.split("\n");


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


                positionInfo =
                    getPosition(
                        value,
                        index
                    );

            }


            const result = [
                "✗ JavaScript ist ungültig.",
                "",
                `Fehler: ${message}`
            ];


            if (
                positionInfo
            ) {

                result.push(
                    "",
                    `Zeile: ${positionInfo.line}`,
                    `Spalte: ${positionInfo.column}`
                );

            }


            result.push(
                "",
                "Hinweis:",
                "Der Code wurde ausschließlich auf Syntax geprüft und nicht ausgeführt."
            );


            output.value =
                result.join("\n");


            showToolStatus(
                "JavaScript enthält einen Syntaxfehler.",
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
`function greet(name) {
    return "Hello " + name;
}

const message = greet("World");

console.log(message);`;


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
`function greet(name) {
    return "Hello " + name;
}

console.log(greet("World");`;


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
        validateJavaScript
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