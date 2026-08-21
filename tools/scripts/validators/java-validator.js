/* ============================================
   JAVA VALIDATOR
============================================ */

function initTool() {

    const container =
        document.getElementById("tool-container");


    container.innerHTML = `

        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        Java Validator
                    </h2>

                    <p class="tool-panel-description">
                        Java-Code auf grundlegende Syntaxfehler prüfen und Fehlerpositionen anzeigen.
                    </p>

                </div>

            </div>


            <textarea
                id="java-validator-input"
                class="tool-textarea"
                placeholder="public class Main {
    public static void main(String[] args) {
        System.out.println(&quot;Hello World&quot;);
    }
}"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="java-validator-validate"
                    class="tool-button primary"
                    type="button"
                >
                    Java prüfen
                </button>


                <button
                    id="java-validator-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="java-validator-invalid"
                    class="tool-button"
                    type="button"
                >
                    Fehlerbeispiel
                </button>


                <button
                    id="java-validator-clear"
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
                        Gefundene Syntaxfehler und Hinweise.
                    </p>

                </div>

            </div>


            <textarea
                id="java-validator-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Noch keine Prüfung durchgeführt."
            ></textarea>

        </section>

    `;


    const input =
        document.getElementById(
            "java-validator-input"
        );


    const output =
        document.getElementById(
            "java-validator-output"
        );


    const validateButton =
        document.getElementById(
            "java-validator-validate"
        );


    const exampleButton =
        document.getElementById(
            "java-validator-example"
        );


    const invalidButton =
        document.getElementById(
            "java-validator-invalid"
        );


    const clearButton =
        document.getElementById(
            "java-validator-clear"
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


    function maskCommentsAndStrings(
        java
    ) {

        let result =
            "";


        let state =
            "normal";


        for (
            let i = 0;
            i < java.length;
            i++
        ) {

            const char =
                java[i];

            const next =
                java[i + 1];


            if (
                state === "lineComment"
            ) {

                if (
                    char === "\n"
                ) {

                    state =
                        "normal";

                    result +=
                        "\n";

                } else {

                    result +=
                        " ";

                }

                continue;

            }


            if (
                state === "blockComment"
            ) {

                if (
                    char === "*" &&
                    next === "/"
                ) {

                    result +=
                        "  ";

                    i++;

                    state =
                        "normal";

                } else if (
                    char === "\n"
                ) {

                    result +=
                        "\n";

                } else {

                    result +=
                        " ";

                }

                continue;

            }


            if (
                state === "string"
            ) {

                if (
                    char === "\\"
                ) {

                    result +=
                        "  ";

                    i++;

                    continue;

                }


                if (
                    char === '"'
                ) {

                    result +=
                        " ";

                    state =
                        "normal";

                } else if (
                    char === "\n"
                ) {

                    result +=
                        "\n";

                } else {

                    result +=
                        " ";

                }

                continue;

            }


            if (
                state === "char"
            ) {

                if (
                    char === "\\"
                ) {

                    result +=
                        "  ";

                    i++;

                    continue;

                }


                if (
                    char === "'"
                ) {

                    result +=
                        " ";

                    state =
                        "normal";

                } else if (
                    char === "\n"
                ) {

                    result +=
                        "\n";

                } else {

                    result +=
                        " ";

                }

                continue;

            }


            if (
                char === "/" &&
                next === "/"
            ) {

                result +=
                    "  ";

                i++;

                state =
                    "lineComment";

                continue;

            }


            if (
                char === "/" &&
                next === "*"
            ) {

                result +=
                    "  ";

                i++;

                state =
                    "blockComment";

                continue;

            }


            if (
                char === '"'
            ) {

                result +=
                    " ";

                state =
                    "string";

                continue;

            }


            if (
                char === "'"
            ) {

                result +=
                    " ";

                state =
                    "char";

                continue;

            }


            result +=
                char;

        }


        return {

            text:
                result,

            state

        };

    }


    function validateJava(
        java
    ) {

        const errors = [];


        const masked =
            maskCommentsAndStrings(
                java
            );


        /*
         * Kommentare und Zeichenketten
         * auf korrektes Schließen prüfen.
         */

        if (
            masked.state === "lineComment"
        ) {

            /*
             * Line-Comments dürfen am Dateiende
             * ohne abschließenden Zeilenumbruch
             * enden.
             */

        } else if (
            masked.state === "blockComment"
        ) {

            errors.push({

                message:
                    "Block-Kommentar wurde nicht geschlossen.",

                index:
                    java.lastIndexOf("/*")

            });

        } else if (
            masked.state === "string"
        ) {

            errors.push({

                message:
                    "Zeichenkette wurde nicht geschlossen.",

                index:
                    java.lastIndexOf('"')

            });

        } else if (
            masked.state === "char"
        ) {

            errors.push({

                message:
                    "Zeichenliteral wurde nicht geschlossen.",

                index:
                    java.lastIndexOf("'")

            });

        }


        /*
         * Klammern prüfen.
         */

        const stack = [];


        const openingBrackets = {

            "(": ")",

            "[": "]",

            "{": "}"

        };


        const closingBrackets = {

            ")": "(",

            "]": "[",

            "}": "{"

        };


        for (
            let i = 0;
            i < masked.text.length;
            i++
        ) {

            const char =
                masked.text[i];


            if (
                openingBrackets[char]
            ) {

                stack.push({

                    char,

                    index:
                        i

                });

                continue;

            }


            if (
                closingBrackets[char]
            ) {

                if (
                    stack.length === 0
                ) {

                    errors.push({

                        message:
                            `Schließende Klammer "${char}" ohne passende öffnende Klammer.`,

                        index:
                            i

                    });

                    continue;

                }


                const opening =
                    stack.pop();


                if (
                    openingBrackets[
                        opening.char
                    ] !== char
                ) {

                    errors.push({

                        message:
                            `Klammer "${char}" passt nicht zur öffnenden Klammer "${opening.char}".`,

                        index:
                            i

                    });

                }

            }

        }


        while (
            stack.length > 0
        ) {

            const opening =
                stack.pop();


            errors.push({

                message:
                    `Öffnende Klammer "${opening.char}" wurde nicht geschlossen.`,

                index:
                    opening.index

            });

        }


        /*
         * Einfache Java-Syntaxprüfungen.
         */

        const lines =
            java.split("\n");


        let offset =
            0;


        lines.forEach(
            line => {

                const trimmed =
                    line.trim();


                const maskedLine =
                    masked.text.slice(
                        offset,
                        offset + line.length
                    );


                /*
                 * Fehlende Semikolons bei
                 * typischen Java-Anweisungen.
                 */

                if (
                    trimmed &&
                    !trimmed.startsWith("//") &&
                    !trimmed.startsWith("/*") &&
                    !trimmed.startsWith("*") &&
                    !trimmed.endsWith("{") &&
                    !trimmed.endsWith("}") &&
                    !trimmed.endsWith(";") &&
                    !trimmed.endsWith(":") &&
                    !trimmed.endsWith(",") &&
                    !trimmed.startsWith("@") &&
                    !trimmed.endsWith(")")
                ) {

                    const declarationPattern =
                        /^(?:public|private|protected|static|final|abstract|native|synchronized|volatile|transient|strictfp|\s)*(?:class|interface|enum|record)\b/;


                    const controlPattern =
                        /^(?:if|else|for|while|switch|try|catch|finally|do|synchronized)\b/;


                    const packagePattern =
                        /^(?:package|import)\b/;


                    if (
                        !declarationPattern.test(
                            trimmed
                        ) &&
                        !controlPattern.test(
                            trimmed
                        ) &&
                        !packagePattern.test(
                            trimmed
                        )
                    ) {

                        const index =
                            offset +
                            Math.max(
                                0,
                                maskedLine.search(
                                    /\S/
                                )
                            );


                        errors.push({

                            message:
                                `Möglicherweise fehlendes Semikolon am Ende der Anweisung "${trimmed}".`,

                            index

                        });

                    }

                }


                /*
                 * Offensichtliche ungültige
                 * Java-Schlüsselwörter erkennen.
                 */

                const invalidKeywordMatch =
                    trimmed.match(
                        /\b(?:fun|def|function|var)\s+[A-Za-z_$][\w$]*/
                    );


                if (
                    invalidKeywordMatch
                ) {

                    const index =
                        offset +
                        Math.max(
                            0,
                            maskedLine.indexOf(
                                invalidKeywordMatch[0]
                            )
                        );


                    errors.push({

                        message:
                            `"${invalidKeywordMatch[0].split(/\s+/)[0]}" ist kein gültiges Java-Schlüsselwort für diese Verwendung.`,

                        index

                    });

                }


                /*
                 * Typische Deklarationen ohne
                 * Variablennamen erkennen.
                 */

                const incompleteDeclaration =
                    maskedLine.match(
                        /\b(?:int|long|double|float|boolean|byte|short|char|String)\s*;/
                    );


                if (
                    incompleteDeclaration
                ) {

                    const index =
                        offset +
                        incompleteDeclaration.index;


                    errors.push({

                        message:
                            "Variablendeklaration enthält keinen Variablennamen.",

                        index

                    });

                }


                /*
                 * Mehrere Anweisungen ohne
                 * Trennung erkennen.
                 */

                if (
                    /;\s+\b(?:int|long|double|float|boolean|byte|short|char|String)\b/.test(
                        maskedLine
                    )
                ) {

                    const match =
                        maskedLine.match(
                            /;\s+\b(?:int|long|double|float|boolean|byte|short|char|String)\b/
                        );


                    const index =
                        offset +
                        match.index +
                        match[0].lastIndexOf(";") +
                        1;


                    errors.push({

                        message:
                            "Mehrere Java-Anweisungen stehen ohne korrekte Trennung in derselben Zeile.",

                        index

                    });

                }


                offset +=
                    line.length + 1;

            }
        );


        /*
         * package-Anweisung muss am Anfang
         * der Quelldatei stehen.
         */

        const packageMatches =
            [...java.matchAll(
                /(?:^|\n)\s*package\s+[^;]+;/g
            )];


        if (
            packageMatches.length > 0
        ) {

            const firstPackageIndex =
                packageMatches[0].index;


            const beforePackage =
                java.slice(
                    0,
                    firstPackageIndex
                );


            const meaningfulBeforePackage =
                beforePackage
                    .replace(
                        /\/\*[\s\S]*?\*\//g,
                        ""
                    )
                    .replace(
                        /\/\/.*$/gm,
                        ""
                    )
                    .trim();


            if (
                meaningfulBeforePackage
            ) {

                errors.push({

                    message:
                        "Die package-Deklaration muss vor anderen Java-Deklarationen stehen.",

                    index:
                        firstPackageIndex

                });

            }

        }


        /*
         * Offensichtliche fehlende
         * Klassendeklaration nicht als Fehler
         * behandeln, da auch einzelne
         * Methoden oder Codeausschnitte
         * geprüft werden können.
         */


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
                "Bitte zuerst Java-Code eingeben.",
                "warning"
            );

            return;

        }


        const errors =
            validateJava(
                value
            );


        if (
            errors.length === 0
        ) {

            output.value =
                [
                    "✓ Java-Syntax ist grundlegend gültig.",
                    "",
                    `Zeichen: ${value.length}`,
                    `Zeilen: ${value.split("\n").length}`,
                    "Keine grundlegenden Syntaxfehler gefunden."
                ].join("\n");


            showToolStatus(
                "Java-Code ist gültig.",
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
            `${errors.length} Java-Fehler gefunden.`,
            "error"
        );

    }


    function loadExample() {

        input.value =
`package com.example;

public class Main {

    public static void main(String[] args) {

        String message =
            "Hello World";

        int number =
            42;

        System.out.println(
            message + ": " + number
        );

    }

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
`public class Main {

    public static void main(String[] args) {

        String message =
            "Hello World;

        int number;

        if (number > 10 {
            System.out.println(message)
        }

    }
`;


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