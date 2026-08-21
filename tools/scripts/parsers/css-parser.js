function initTool() {

    const container =
        document.getElementById("tool-container");


    container.innerHTML = `

        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        CSS Parser
                    </h2>

                    <p class="tool-panel-description">
                        CSS analysieren und Selektoren, Eigenschaften,
                        Werte und At-Rules strukturiert anzeigen.
                    </p>

                </div>

            </div>


            <textarea
                id="css-parser-input"
                class="tool-textarea"
                placeholder=".container {
    display: flex;
    width: 100%;
    padding: 20px;
}

@media (max-width: 600px) {
    .container {
        padding: 10px;
    }
}"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="css-parser-parse"
                    class="tool-button primary"
                    type="button"
                >
                    CSS analysieren
                </button>


                <button
                    id="css-parser-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="css-parser-clear"
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
                        Analyse
                    </h2>

                    <p class="tool-panel-description">
                        Struktur des CSS-Codes.
                    </p>

                </div>

            </div>


            <textarea
                id="css-parser-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Noch keine Analyse durchgeführt."
            ></textarea>

        </section>

    `;


    const input =
        document.getElementById(
            "css-parser-input"
        );


    const output =
        document.getElementById(
            "css-parser-output"
        );


    const parseButton =
        document.getElementById(
            "css-parser-parse"
        );


    const exampleButton =
        document.getElementById(
            "css-parser-example"
        );


    const clearButton =
        document.getElementById(
            "css-parser-clear"
        );


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


    function stripComments(
        css
    ) {

        return css.replace(
            /\/\*[\s\S]*?\*\//g,
            ""
        );

    }


    function findMatchingBrace(
        css,
        start
    ) {

        let depth = 0;

        let quote = null;

        let comment = false;


        for (
            let i = start;
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

                depth++;

            }


            if (
                char === "}"
            ) {

                depth--;

                if (
                    depth === 0
                ) {

                    return i;

                }

            }

        }


        return -1;

    }


    function splitDeclarations(
        content,
        baseIndex
    ) {

        const declarations = [];

        let current = "";

        let startIndex =
            baseIndex;

        let quote = null;

        let parentheses = 0;


        for (
            let i = 0;
            i < content.length;
            i++
        ) {

            const char =
                content[i];


            if (
                quote
            ) {

                current += char;


                if (
                    char === "\\" &&
                    i + 1 < content.length
                ) {

                    current +=
                        content[++i];

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

                current += char;

                continue;

            }


            if (
                char === "("
            ) {

                parentheses++;

            }


            if (
                char === ")"
            ) {

                parentheses--;

            }


            if (
                char === ";" &&
                parentheses === 0
            ) {

                if (
                    current.trim()
                ) {

                    declarations.push({

                        text:
                            current.trim(),

                        index:
                            startIndex

                    });

                }


                current = "";

                startIndex =
                    baseIndex +
                    i +
                    1;

                continue;

            }


            current += char;

        }


        if (
            current.trim()
        ) {

            declarations.push({

                text:
                    current.trim(),

                index:
                    startIndex

            });

        }


        return declarations;

    }


    function parseDeclarations(
        content,
        baseIndex
    ) {

        const declarations =
            splitDeclarations(
                content,
                baseIndex
            );


        const result = [];

        const errors = [];


        declarations.forEach(
            declaration => {

                const text =
                    declaration.text;


                /*
                 * Verschachtelte CSS-Regeln
                 * nicht als normale Deklaration
                 * behandeln.
                 */

                if (
                    text.includes("{") ||
                    text.startsWith("@")
                ) {

                    return;

                }


                const colon =
                    text.indexOf(":");


                if (
                    colon === -1
                ) {

                    errors.push({

                        message:
                            `Ungültige Deklaration "${text}".`,

                        index:
                            declaration.index

                    });

                    return;

                }


                const property =
                    text
                        .slice(
                            0,
                            colon
                        )
                        .trim();


                const value =
                    text
                        .slice(
                            colon + 1
                        )
                        .trim();


                if (
                    !property
                ) {

                    errors.push({

                        message:
                            "CSS-Eigenschaft fehlt.",

                        index:
                            declaration.index

                    });

                    return;

                }


                if (
                    !value
                ) {

                    errors.push({

                        message:
                            `Kein Wert für "${property}" angegeben.`,

                        index:
                            declaration.index +
                            colon +
                            1

                    });

                    return;

                }


                result.push({

                    property,

                    value,

                    index:
                        declaration.index

                });

            }
        );


        return {

            declarations:
                result,

            errors

        };

    }


    function parseCss(
        css
    ) {

        const cleanCss =
            stripComments(
                css
            );


        const rules = [];

        const errors = [];

        let position = 0;


        while (
            position < cleanCss.length
        ) {

            while (
                position < cleanCss.length &&
                /\s/.test(
                    cleanCss[position]
                )
            ) {

                position++;

            }


            if (
                position >= cleanCss.length
            ) {

                break;

            }


            const openBrace =
                cleanCss.indexOf(
                    "{",
                    position
                );


            if (
                openBrace === -1
            ) {

                const remaining =
                    cleanCss
                        .slice(position)
                        .trim();


                if (
                    remaining
                ) {

                    errors.push({

                        message:
                            `Regel "${remaining}" besitzt keine öffnende geschweifte Klammer.`,

                        index:
                            position

                    });

                }

                break;

            }


            const selector =
                cleanCss
                    .slice(
                        position,
                        openBrace
                    )
                    .trim();


            if (
                !selector
            ) {

                errors.push({

                    message:
                        "Leerer CSS-Selektor.",

                    index:
                        openBrace

                });


                position =
                    openBrace + 1;

                continue;

            }


            const closeBrace =
                findMatchingBrace(
                    cleanCss,
                    openBrace
                );


            if (
                closeBrace === -1
            ) {

                errors.push({

                    message:
                        `Regel "${selector}" wurde nicht geschlossen.`,

                    index:
                        openBrace

                });

                break;

            }


            const content =
                cleanCss.slice(
                    openBrace + 1,
                    closeBrace
                );


            const rule = {

                selector,

                index:
                    position,

                declarations: [],

                nestedRules: []

            };


            /*
             * At-Rules können weitere
             * Regeln enthalten.
             */

            if (
                selector.startsWith("@")
            ) {

                const nested =
                    parseCss(
                        content
                    );


                rule.nestedRules =
                    nested.rules;


                rule.declarations =
                    nested.rules.length === 0
                        ? parseDeclarations(
                            content,
                            openBrace + 1
                        ).declarations
                        : [];


                errors.push(
                    ...nested.errors.map(
                        error => ({

                            ...error,

                            index:
                                error.index +
                                openBrace +
                                1

                        })
                    )
                );

            } else {

                const declarationResult =
                    parseDeclarations(
                        content,
                        openBrace + 1
                    );


                rule.declarations =
                    declarationResult.declarations;


                errors.push(
                    ...declarationResult.errors
                );

            }


            rules.push(
                rule
            );


            position =
                closeBrace + 1;

        }


        return {

            rules,

            errors

        };

    }


    function countRules(
        rules
    ) {

        let count =
            rules.length;


        rules.forEach(
            rule => {

                count +=
                    countRules(
                        rule.nestedRules
                    );

            }
        );


        return count;

    }


    function countDeclarations(
        rules
    ) {

        let count = 0;


        rules.forEach(
            rule => {

                count +=
                    rule.declarations.length;


                count +=
                    countDeclarations(
                        rule.nestedRules
                    );

            }
        );


        return count;

    }


    function formatRule(
        rule,
        depth = 0
    ) {

        const indent =
            "  ".repeat(
                depth
            );


        const lines = [];


        lines.push(
            `${indent}${rule.selector}`
        );


        if (
            rule.declarations.length
        ) {

            rule.declarations.forEach(
                declaration => {

                    lines.push(
                        `${indent}  ${declaration.property}: ${declaration.value}`
                    );

                }
            );

        }


        if (
            rule.nestedRules.length
        ) {

            rule.nestedRules.forEach(
                nestedRule => {

                    lines.push(
                        ""
                    );


                    lines.push(
                        formatRule(
                            nestedRule,
                            depth + 1
                        )
                    );

                }
            );

        }


        return lines.join(
            "\n"
        );

    }


    function validateAndParse() {

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


        const result =
            parseCss(
                value
            );


        const ruleCount =
            countRules(
                result.rules
            );


        const declarationCount =
            countDeclarations(
                result.rules
            );


        const lines = [

            "CSS-ANALYSE",

            "==============================",

            `Zeichen: ${value.length}`,

            `Regeln: ${ruleCount}`,

            `Deklarationen: ${declarationCount}`,

            `Fehler: ${result.errors.length}`,

            ""

        ];


        if (
            result.rules.length
        ) {

            lines.push(
                "STRUKTUR",
                "==============================",
                ""
            );


            result.rules.forEach(
                rule => {

                    lines.push(
                        formatRule(
                            rule
                        ),
                        ""
                    );

                }
            );

        }


        if (
            result.errors.length
        ) {

            lines.push(
                "FEHLER",
                "==============================",
                ""
            );


            result.errors.forEach(
                (
                    error,
                    index
                ) => {

                    const position =
                        getPosition(
                            value,
                            error.index
                        );


                    lines.push(

                        `${index + 1}. ${error.message}`,

                        `   Zeile: ${position.line}, Spalte: ${position.column}`,

                        ""

                    );

                }
            );


            showToolStatus(
                `${result.errors.length} CSS-Fehler gefunden.`,
                "error"
            );

        } else {

            lines.push(
                "✓ Keine grundlegenden CSS-Syntaxfehler gefunden."
            );


            showToolStatus(
                "CSS erfolgreich analysiert.",
                "success"
            );

        }


        output.value =
            lines.join(
                "\n"
            );

    }


    function loadExample() {

        input.value =
`body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f5f5f5;
    color: #333;
}

.container {
    display: flex;
    width: 100%;
    padding: 20px;
}

@media (max-width: 600px) {
    .container {
        padding: 10px;
    }
}`;


        output.value =
            "";


        showToolStatus(
            "CSS-Beispiel geladen.",
            "success"
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


    parseButton.addEventListener(
        "click",
        validateAndParse
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