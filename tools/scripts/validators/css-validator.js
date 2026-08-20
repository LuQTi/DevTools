function initTool() {

    const container =
        document.getElementById("tool-container");


    container.innerHTML = `

        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        CSS Validator
                    </h2>

                    <p class="tool-panel-description">
                        CSS auf Syntaxfehler und ungültige Regeln prüfen.
                    </p>

                </div>

            </div>


            <textarea
                id="css-validator-input"
                class="tool-textarea"
                placeholder="body {
    color: red;
    background: white;
}"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="css-validator-validate"
                    class="tool-button primary"
                    type="button"
                >
                    CSS prüfen
                </button>


                <button
                    id="css-validator-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="css-validator-invalid"
                    class="tool-button"
                    type="button"
                >
                    Fehlerbeispiel
                </button>


                <button
                    id="css-validator-clear"
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
                        Gefundene Fehler und Hinweise.
                    </p>

                </div>

            </div>


            <textarea
                id="css-validator-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Noch keine Prüfung durchgeführt."
            ></textarea>

        </section>

    `;


    const input =
        document.getElementById(
            "css-validator-input"
        );


    const output =
        document.getElementById(
            "css-validator-output"
        );


    const validateButton =
        document.getElementById(
            "css-validator-validate"
        );


    const exampleButton =
        document.getElementById(
            "css-validator-example"
        );


    const invalidButton =
        document.getElementById(
            "css-validator-invalid"
        );


    const clearButton =
        document.getElementById(
            "css-validator-clear"
        );


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
            before.split("\n");


        return {

            line:
                lines.length,

            column:
                lines[lines.length - 1].length + 1

        };

    }


    function validateCss(
        css
    ) {

        const errors = [];

        let braces = 0;

        let parentheses = 0;

        let brackets = 0;

        let quote = null;

        let comment = false;


        for (
            let i = 0;
            i < css.length;
            i++
        ) {

            const char =
                css[i];

            const next =
                css[i + 1];


            if (
                comment
            ) {

                if (
                    char === "*" &&
                    next === "/"
                ) {

                    comment = false;

                    i++;

                }

                continue;

            }


            if (
                char === "/" &&
                next === "*"
            ) {

                comment = true;

                i++;

                continue;

            }


            if (
                quote
            ) {

                if (
                    char === "\\" 
                ) {

                    i++;

                    continue;

                }


                if (
                    char === quote
                ) {

                    quote = null;

                }

                continue;

            }


            if (
                char === '"' ||
                char === "'"
            ) {

                quote = char;

                continue;

            }


            if (
                char === "{"
            ) {

                braces++;

            } else if (
                char === "}"
            ) {

                braces--;

                if (
                    braces < 0
                ) {

                    errors.push({
                        message:
                            "Schließende geschweifte Klammer ohne passende öffnende Klammer.",
                        index:
                            i
                    });

                    braces = 0;

                }

            } else if (
                char === "("
            ) {

                parentheses++;

            } else if (
                char === ")"
            ) {

                parentheses--;

                if (
                    parentheses < 0
                ) {

                    errors.push({
                        message:
                            "Schließende runde Klammer ohne passende öffnende Klammer.",
                        index:
                            i
                    });

                    parentheses = 0;

                }

            } else if (
                char === "["
            ) {

                brackets++;

            } else if (
                char === "]"
            ) {

                brackets--;

                if (
                    brackets < 0
                ) {

                    errors.push({
                        message:
                            "Schließende eckige Klammer ohne passende öffnende Klammer.",
                        index:
                            i
                    });

                    brackets = 0;

                }

            }

        }


        if (
            comment
        ) {

            errors.push({
                message:
                    "CSS-Kommentar wurde nicht geschlossen.",
                index:
                    css.lastIndexOf("/*")
            });

        }


        if (
            quote
        ) {

            errors.push({
                message:
                    "Zeichenkette wurde nicht geschlossen.",
                index:
                    css.lastIndexOf(quote)
            });

        }


        if (
            braces > 0
        ) {

            errors.push({
                message:
                    "Nicht alle geschweiften Klammern wurden geschlossen.",
                index:
                    css.lastIndexOf("{")
            });

        }


        if (
            parentheses > 0
        ) {

            errors.push({
                message:
                    "Nicht alle runden Klammern wurden geschlossen.",
                index:
                    css.lastIndexOf("(")
            });

        }


        if (
            brackets > 0
        ) {

            errors.push({
                message:
                    "Nicht alle eckigen Klammern wurden geschlossen.",
                index:
                    css.lastIndexOf("[")
            });

        }


        /*
         * Regeln innerhalb von { } prüfen.
         */

        const blocks =
            /{([^{}]*)}/g;

        let block;


        while (
            (
                block =
                    blocks.exec(css)
            ) !== null
        ) {

            const content =
                block[1];


            const declarations =
                content
                    .split(";")
                    .map(
                        part =>
                            part.trim()
                    )
                    .filter(
                        Boolean
                    );


            declarations.forEach(
                declaration => {

                    /*
                     * CSS At-Rules wie
                     * @include oder @apply
                     * nicht als normale
                     * property:value-Deklaration behandeln.
                     */

                    if (
                        declaration.startsWith("@")
                    ) {

                        return;

                    }


                    if (
                        !declaration.includes(":")
                    ) {

                        const index =
                            block.index +
                            block[0].indexOf(
                                declaration
                            );


                        errors.push({
                            message:
                                `Ungültige CSS-Deklaration "${declaration}". Erwartet wird "eigenschaft: wert".`,
                            index
                        });

                    }

                }
            );

        }


        return errors;

    }


    function validate() {

        const value =
            input.value;


        if (
            !value.trim()
        ) {

            output.value =
                "Keine Eingabe vorhanden.";


            showToolStatus(
                "Bitte zuerst CSS eingeben.",
                "warning"
            );

            return;

        }


        const errors =
            validateCss(
                value
            );


        if (
            errors.length === 0
        ) {

            output.value =
                [
                    "✓ CSS-Syntax ist gültig.",
                    "",
                    `Zeichen: ${value.length}`,
                    "Keine grundlegenden Syntaxfehler gefunden."
                ].join("\n");


            showToolStatus(
                "CSS ist gültig.",
                "success"
            );


            return;

        }


        errors.sort(
            (
                a,
                b
            ) =>
                a.index -
                b.index
        );


        const result = [
            `✗ ${errors.length} Fehler gefunden.`,
            ""
        ];


        errors.forEach(
            (
                error,
                index
            ) => {

                const position =
                    getPosition(
                        value,
                        Math.max(
                            0,
                            error.index
                        )
                    );


                result.push(
                    `${index + 1}. ${error.message}`,
                    `   Zeile: ${position.line}, Spalte: ${position.column}`,
                    ""
                );

            }
        );


        output.value =
            result.join("\n");


        showToolStatus(
            `${errors.length} CSS-Fehler gefunden.`,
            "error"
        );

    }


    function loadExample() {

        input.value =
`body {
    color: #333;
    background-color: white;
}

.container {
    width: 100%;
    padding: 20px;
}`;


        output.value =
            "";


        showToolStatus(
            "Gültiges Beispiel geladen.",
            "success"
        );


        input.focus();

    }


    function loadInvalidExample() {

        input.value =
`body {
    color: red
    background: white;
}`;


        output.value =
            "";


        showToolStatus(
            "Fehlerbeispiel geladen.",
            "warning"
        );


        input.focus();

    }


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


    validateButton.addEventListener(
        "click",
        validate
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