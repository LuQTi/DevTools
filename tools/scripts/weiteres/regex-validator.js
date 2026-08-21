/* ============================================
   REGEX VALIDATOR
============================================ */

function initTool() {

    const container =
        document.getElementById("tool-container");


    container.innerHTML = `

        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        Regex Validator
                    </h2>

                    <p class="tool-panel-description">
                        Reguläre Ausdrücke auf gültige Syntax prüfen und testen.
                    </p>

                </div>

            </div>


            <input
                id="regex-validator-pattern"
                class="tool-input"
                type="text"
                placeholder="^[a-zA-Z0-9]+$"
                spellcheck="false"
            />


            <input
                id="regex-validator-flags"
                class="tool-input"
                type="text"
                placeholder="Flags, z. B. gim"
                spellcheck="false"
            />


            <textarea
                id="regex-validator-test"
                class="tool-textarea"
                placeholder="Hier kannst du einen Text zum Testen eingeben..."
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="regex-validator-validate"
                    class="tool-button primary"
                    type="button"
                >
                    Regex prüfen
                </button>


                <button
                    id="regex-validator-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="regex-validator-invalid"
                    class="tool-button"
                    type="button"
                >
                    Fehlerbeispiel
                </button>


                <button
                    id="regex-validator-clear"
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
                        Ergebnis der Regex-Prüfung und gefundene Treffer.
                    </p>

                </div>

            </div>


            <textarea
                id="regex-validator-output"
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

    const patternInput =
        document.getElementById(
            "regex-validator-pattern"
        );


    const flagsInput =
        document.getElementById(
            "regex-validator-flags"
        );


    const testInput =
        document.getElementById(
            "regex-validator-test"
        );


    const output =
        document.getElementById(
            "regex-validator-output"
        );


    const validateButton =
        document.getElementById(
            "regex-validator-validate"
        );


    const exampleButton =
        document.getElementById(
            "regex-validator-example"
        );


    const invalidButton =
        document.getElementById(
            "regex-validator-invalid"
        );


    const clearButton =
        document.getElementById(
            "regex-validator-clear"
        );


    /* ========================================
       VALID FLAGS
    ======================================== */

    const validFlags =
        new Set([
            "d",
            "g",
            "i",
            "m",
            "s",
            "u",
            "v",
            "y"
        ]);


    /* ========================================
       VALIDATE FLAGS
    ======================================== */

    function validateFlags(
        flags
    ) {

        const errors = [];

        const seen =
            new Set();


        for (
            let i = 0;
            i < flags.length;
            i++
        ) {

            const flag =
                flags[i];


            if (
                !validFlags.has(
                    flag
                )
            ) {

                errors.push(
                    `Unbekanntes Flag "${flag}".`
                );

                continue;

            }


            if (
                seen.has(
                    flag
                )
            ) {

                errors.push(
                    `Flag "${flag}" wurde doppelt angegeben.`
                );

            }


            seen.add(
                flag
            );

        }


        return errors;

    }


    /* ========================================
       VALIDATE REGEX
    ======================================== */

    function validateRegex() {

        const pattern =
            patternInput.value;


        const flags =
            flagsInput.value.trim();


        const testText =
            testInput.value;


        if (
            !pattern
        ) {

            output.value =
                "Kein Regex eingegeben.";


            showToolStatus(
                "Bitte zuerst einen Regex eingeben.",
                "warning"
            );

            return;

        }


        const flagErrors =
            validateFlags(
                flags
            );


        if (
            flagErrors.length
        ) {

            output.value =
                [
                    "✗ Regex ist ungültig.",
                    "",
                    ...flagErrors.map(
                        (
                            error,
                            index
                        ) =>
                            `${index + 1}. ${error}`
                    )
                ].join("\n");


            showToolStatus(
                "Ungültige Regex-Flags.",
                "error"
            );

            return;

        }


        let regex;


        try {

            regex =
                new RegExp(
                    pattern,
                    flags
                );

        } catch (error) {

            output.value =
                [
                    "✗ Regex ist ungültig.",
                    "",
                    `Fehler: ${error.message}`,
                    "",
                    `Pattern: ${pattern}`,
                    `Flags: ${flags || "Keine"}`
                ].join("\n");


            showToolStatus(
                "Regex enthält einen Syntaxfehler.",
                "error"
            );

            return;

        }


        /*
         * Regex ist syntaktisch gültig.
         */

        const result = [
            "✓ Regex ist gültig.",
            "",
            `Pattern: ${pattern}`,
            `Flags: ${flags || "Keine"}`
        ];


        /*
         * Optionalen Testtext prüfen.
         */

        if (
            testText
        ) {

            /*
             * Für matchAll muss das globale
             * Flag gesetzt sein. Wir erzeugen
             * deshalb eine separate Regex.
             */

            const globalFlags =
                flags.includes("g")
                    ? flags
                    : flags + "g";


            const globalRegex =
                new RegExp(
                    pattern,
                    globalFlags
                );


            const matches =
                [
                    ...testText.matchAll(
                        globalRegex
                    )
                ];


            result.push(
                "",
                `Treffer: ${matches.length}`
            );


            if (
                matches.length
            ) {

                result.push(
                    "",
                    "Gefundene Treffer:"
                );


                matches.forEach(
                    (
                        match,
                        index
                    ) => {

                        result.push(
                            `${index + 1}. "${match[0]}" — Position ${match.index}`
                        );

                    }
                );

            } else {

                result.push(
                    "Keine Treffer gefunden."
                );

            }

        }


        output.value =
            result.join(
                "\n"
            );


        showToolStatus(
            "Regex ist gültig.",
            "success"
        );

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        patternInput.value =
            "^[a-zA-Z0-9]+$";


        flagsInput.value =
            "";


        testInput.value =
            "Hello123";


        output.value =
            "";


        showToolStatus(
            "Gültiges Beispiel geladen.",
            "success"
        );


        patternInput.focus();

    }


    /* ========================================
       INVALID EXAMPLE
    ======================================== */

    function loadInvalidExample() {

        patternInput.value =
            "[a-z";


        flagsInput.value =
            "";


        testInput.value =
            "Hello World";


        output.value =
            "";


        showToolStatus(
            "Fehlerbeispiel geladen.",
            "warning"
        );


        patternInput.focus();

    }


    /* ========================================
       CLEAR
    ======================================== */

    function clearTool() {

        patternInput.value =
            "";


        flagsInput.value =
            "";


        testInput.value =
            "";


        output.value =
            "";


        showToolStatus(
            "Eingabe und Ergebnis geleert.",
            "success"
        );


        patternInput.focus();

    }


    /* ========================================
       EVENTS
    ======================================== */

    validateButton.addEventListener(
        "click",
        validateRegex
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