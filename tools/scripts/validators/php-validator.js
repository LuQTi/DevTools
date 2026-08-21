/* ============================================
   PHP Validator
============================================ */

function initTool() {

    const container =
        document.getElementById("tool-container");


    container.innerHTML = `

        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        PHP Validator
                    </h2>

                    <p class="tool-panel-description">
                        PHP-Code auf grundlegende Syntaxfehler prüfen und Fehlerpositionen anzeigen.
                    </p>

                </div>

            </div>


            <textarea
                id="php-validator-input"
                class="tool-textarea"
                placeholder="<?php

$message = 'Hello World';

echo $message;

?>"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="php-validator-validate"
                    class="tool-button primary"
                    type="button"
                >
                    PHP prüfen
                </button>


                <button
                    id="php-validator-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="php-validator-invalid"
                    class="tool-button"
                    type="button"
                >
                    Fehlerbeispiel
                </button>


                <button
                    id="php-validator-clear"
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
                id="php-validator-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Noch keine Prüfung durchgeführt."
            ></textarea>

        </section>

    `;


    const input =
        document.getElementById(
            "php-validator-input"
        );


    const output =
        document.getElementById(
            "php-validator-output"
        );


    const validateButton =
        document.getElementById(
            "php-validator-validate"
        );


    const exampleButton =
        document.getElementById(
            "php-validator-example"
        );


    const invalidButton =
        document.getElementById(
            "php-validator-invalid"
        );


    const clearButton =
        document.getElementById(
            "php-validator-clear"
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


    function addError(
        errors,
        message,
        index
    ) {

        errors.push({

            message,

            index:
                Math.max(
                    0,
                    index
                )

        });

    }


    function validatePhp(
        php
    ) {

        const errors = [];

        let braces = 0;

        let parentheses = 0;

        let brackets = 0;

        let quote = null;

        let comment = null;

        let quoteStart = -1;

        let commentStart = -1;

        let escaped = false;


        for (
            let i = 0;
            i < php.length;
            i++
        ) {

            const char =
                php[i];

            const next =
                php[i + 1];


            if (
                comment === "line"
            ) {

                if (
                    char === "\n"
                ) {

                    comment = null;

                }

                continue;

            }


            if (
                comment === "block"
            ) {

                if (
                    char === "*" &&
                    next === "/"
                ) {

                    comment = null;

                    i++;

                }

                continue;

            }


            if (
                quote
            ) {

                if (
                    escaped
                ) {

                    escaped = false;

                    continue;

                }


                if (
                    char === "\\"
                ) {

                    escaped = true;

                    continue;

                }


                if (
                    char === quote
                ) {

                    quote = null;

                    quoteStart = -1;

                }

                continue;

            }


            if (
                char === "'" ||
                char === "\""
            ) {

                quote =
                    char;

                quoteStart =
                    i;

                continue;

            }


            if (
                char === "/" &&
                next === "/"
            ) {

                comment =
                    "line";

                commentStart =
                    i;

                i++;

                continue;

            }


            if (
                char === "#"
            ) {

                comment =
                    "line";

                commentStart =
                    i;

                continue;

            }


            if (
                char === "/" &&
                next === "*"
            ) {

                comment =
                    "block";

                commentStart =
                    i;

                i++;

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

                    addError(
                        errors,
                        "Schließende geschweifte Klammer ohne passende öffnende Klammer.",
                        i
                    );

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

                    addError(
                        errors,
                        "Schließende runde Klammer ohne passende öffnende Klammer.",
                        i
                    );

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

                    addError(
                        errors,
                        "Schließende eckige Klammer ohne passende öffnende Klammer.",
                        i
                    );

                    brackets = 0;

                }

            }

        }


        if (
            quote
        ) {

            addError(
                errors,
                "String wurde nicht geschlossen.",
                quoteStart
            );

        }


        if (
            comment === "block"
        ) {

            addError(
                errors,
                "PHP-Kommentar wurde nicht geschlossen.",
                commentStart
            );

        }


        if (
            braces > 0
        ) {

            addError(
                errors,
                "Nicht alle geschweiften Klammern wurden geschlossen.",
                php.lastIndexOf("{")
            );

        }


        if (
            parentheses > 0
        ) {

            addError(
                errors,
                "Nicht alle runden Klammern wurden geschlossen.",
                php.lastIndexOf("(")
            );

        }


        if (
            brackets > 0
        ) {

            addError(
                errors,
                "Nicht alle eckigen Klammern wurden geschlossen.",
                php.lastIndexOf("[")
            );

        }


        const lines =
            php.split("\n");


        lines.forEach(
            (
                line,
                lineIndex
            ) => {

                const trimmed =
                    line.trim();


                if (
                    !trimmed ||
                    trimmed.startsWith("//") ||
                    trimmed.startsWith("#") ||
                    trimmed.startsWith("/*") ||
                    trimmed.startsWith("*") ||
                    trimmed.startsWith("*/")
                ) {

                    return;

                }


                const cleanLine =
                    trimmed
                        .replace(
                            /\/\/.*$/,
                            ""
                        )
                        .trim();


                if (
                    !cleanLine
                ) {

                    return;

                }


                if (
                    cleanLine.startsWith("<?php") ||
                    cleanLine === "<?" ||
                    cleanLine === "?>" ||
                    cleanLine.endsWith("{") ||
                    cleanLine.endsWith("}") ||
                    cleanLine.endsWith(";") ||
                    cleanLine.endsWith(":") ||
                    cleanLine.endsWith(",") ||
                    cleanLine.endsWith("(")
                ) {

                    return;

                }


                const controlStatement =
                    /^(if|elseif|else|for|foreach|while|do|switch|case|default|try|catch|finally)\b/i.test(
                        cleanLine
                    );


                const declaration =
                    /^(class|interface|trait|enum|function|namespace|use|declare)\b/i.test(
                        cleanLine
                    );


                if (
                    controlStatement ||
                    declaration
                ) {

                    return;

                }


                const requiresSemicolon =
                    /^(echo|print|return|throw|include|include_once|require|require_once|break|continue|global|unset)\b/i.test(
                        cleanLine
                    ) ||
                    /^\$[A-Za-z_][A-Za-z0-9_]*\s*=/.test(
                        cleanLine
                    ) ||
                    /^(public|private|protected|static|readonly|final)\b/i.test(
                        cleanLine
                    );


                if (
                    requiresSemicolon &&
                    !cleanLine.endsWith(";")
                ) {

                    const lineStart =
                        php
                            .split("\n")
                            .slice(
                                0,
                                lineIndex
                            )
                            .reduce(
                                (
                                    total,
                                    currentLine
                                ) =>
                                    total +
                                    currentLine.length +
                                    1,
                                0
                            );


                    addError(
                        errors,
                        "Möglicherweise fehlendes Semikolon am Ende der Anweisung.",
                        lineStart +
                        Math.max(
                            0,
                            line.indexOf(
                                trimmed
                            )
                        )
                    );

                }

            }
        );


        const phpTags =
            (
                php.includes("<?") ||
                php.includes("<?=")
            );


        if (
            !phpTags &&
            php.trim()
        ) {

            addError(
                errors,
                "Kein PHP-Starttag gefunden. Erwartet wird beispielsweise '<?php'.",
                0
            );

        }


        const uniqueErrors = [];

        const seen = new Set();


        errors.forEach(
            error => {

                const key =
                    `${error.message}:${error.index}`;


                if (
                    !seen.has(
                        key
                    )
                ) {

                    seen.add(
                        key
                    );

                    uniqueErrors.push(
                        error
                    );

                }

            }
        );


        return uniqueErrors;

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
                "Bitte zuerst PHP-Code eingeben.",
                "warning"
            );

            return;

        }


        const errors =
            validatePhp(
                value
            );


        if (
            errors.length === 0
        ) {

            output.value =
                [
                    "✓ PHP-Syntax ist grundlegend gültig.",
                    "",
                    `Zeichen: ${value.length}`,
                    `Zeilen: ${value.split("\n").length}`,
                    "Keine grundlegenden Syntaxfehler gefunden.",
                    "",
                    "Hinweis: Die Validierung ersetzt keinen vollständigen PHP-Parser und prüft keine Laufzeit- oder Framework-Fehler."
                ].join("\n");


            showToolStatus(
                "PHP-Code ist grundlegend gültig.",
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
                        error.index
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
            `${errors.length} PHP-Fehler gefunden.`,
            "error"
        );

    }


    function loadExample() {

        input.value =
`<?php

class User {

    private string $name;

    public function __construct(string $name) {
        $this->name = $name;
    }

    public function getName(): string {
        return $this->name;
    }
}

$user = new User("Max");

echo $user->getName();

?>`;


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
`<?php

function greet($name) {

    echo "Hello " . $name

}

greet("Max");

?>`;


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