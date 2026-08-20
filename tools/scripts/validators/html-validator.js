/* ============================================
   HTML VALIDATOR
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
                        HTML Validator
                    </h2>

                    <p class="tool-panel-description">
                        HTML-Struktur prüfen und häufige Fehler anzeigen.
                    </p>

                </div>

            </div>


            <textarea
                id="html-validator-input"
                class="tool-textarea"
                placeholder='<!DOCTYPE html>
<html>
<head>
    <title>Meine Seite</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>'
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="html-validator-validate"
                    class="tool-button primary"
                    type="button"
                >
                    HTML prüfen
                </button>


                <button
                    id="html-validator-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="html-validator-invalid"
                    class="tool-button"
                    type="button"
                >
                    Fehlerbeispiel
                </button>


                <button
                    id="html-validator-clear"
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
                id="html-validator-output"
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
            "html-validator-input"
        );


    const output =
        document.getElementById(
            "html-validator-output"
        );


    const validateButton =
        document.getElementById(
            "html-validator-validate"
        );


    const exampleButton =
        document.getElementById(
            "html-validator-example"
        );


    const invalidButton =
        document.getElementById(
            "html-validator-invalid"
        );


    const clearButton =
        document.getElementById(
            "html-validator-clear"
        );


    /* ========================================
       VOID ELEMENTS
    ======================================== */

    const voidElements = new Set([

        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr"

    ]);


    /* ========================================
       LINE / COLUMN
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
                lines[lines.length - 1].length + 1

        };

    }


    /* ========================================
       ERROR
    ======================================== */

    function createError(
        errors,
        message,
        index
    ) {

        const position =
            getPosition(
                input.value,
                index
            );


        errors.push(
            {
                message,
                line:
                    position.line,
                column:
                    position.column
            }
        );

    }


    /* ========================================
       CHECK TAGS
    ======================================== */

    function validateTags(
        html
    ) {

        const errors = [];

        const stack = [];


        /*
         * Kommentare entfernen.
         */

        const withoutComments =
            html.replace(
                /<!--[\s\S]*?-->/g,
                match =>
                    " ".repeat(
                        match.length
                    )
            );


        /*
         * DOCTYPE entfernen.
         */

        const source =
            withoutComments.replace(
                /<!DOCTYPE[\s\S]*?>/gi,
                match =>
                    " ".repeat(
                        match.length
                    )
            );


        const tagRegex =
            /<\/?([a-zA-Z][a-zA-Z0-9:-]*)(?:\s[^<>]*?)?\/?>/g;


        let match;


        while (
            (match =
                tagRegex.exec(
                    source
                )) !== null
        ) {

            const fullTag =
                match[0];


            const tagName =
                match[1].toLowerCase();


            const isClosing =
                /^<\//.test(
                    fullTag
                );


            const isSelfClosing =
                /\/>$/.test(
                    fullTag
                );


            /*
             * Selbstschließende bzw.
             * Void-Elemente benötigen
             * keinen Eintrag im Stack.
             */

            if (
                voidElements.has(
                    tagName
                ) ||
                isSelfClosing
            ) {

                continue;

            }


            if (
                isClosing
            ) {

                if (
                    stack.length === 0
                ) {

                    createError(
                        errors,
                        `Schließendes Tag </${tagName}> ohne passendes öffnendes Tag.`,
                        match.index
                    );

                    continue;

                }


                const last =
                    stack[
                        stack.length - 1
                    ];


                if (
                    last.name !==
                    tagName
                ) {

                    createError(
                        errors,
                        `Falsche Verschachtelung: </${tagName}> erwartet </${last.name}>.`,
                        match.index
                    );


                    /*
                     * Versuchen, nach einem passenden
                     * Tag weiterzumachen.
                     */

                    const matchingIndex =
                        stack
                            .map(
                                item =>
                                    item.name
                            )
                            .lastIndexOf(
                                tagName
                            );


                    if (
                        matchingIndex !== -1
                    ) {

                        stack.splice(
                            matchingIndex
                        );

                    }

                    continue;

                }


                stack.pop();

            } else {

                stack.push(
                    {
                        name:
                            tagName,
                        index:
                            match.index
                    }
                );

            }

        }


        /*
         * Nicht geschlossene Tags.
         */

        while (
            stack.length > 0
        ) {

            const tag =
                stack.pop();


            createError(
                errors,
                `Öffnendes Tag <${tag.name}> wurde nicht geschlossen.`,
                tag.index
            );

        }


        return errors;

    }


    /* ========================================
       CHECK ATTRIBUTES
    ======================================== */

    function validateAttributes(
        html
    ) {

        const errors = [];


        const tagRegex =
            /<([a-zA-Z][a-zA-Z0-9:-]*)([^<>]*)>/g;


        let match;


        while (
            (match =
                tagRegex.exec(
                    html
                )) !== null
        ) {

            const fullTag =
                match[0];


            if (
                /^<\//.test(
                    fullTag
                ) ||
                /^<!/.test(
                    fullTag
                ) ||
                /^<\?/.test(
                    fullTag
                )
            ) {

                continue;

            }


            const attributes =
                match[2];


            /*
             * Einfache Prüfung auf
             * doppelte Attribute.
             */

            const attributeNames =
                [];


            const attributeRegex =
                /([^\s=/>]+)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/g;


            let attributeMatch;


            while (
                (
                    attributeMatch =
                        attributeRegex.exec(
                            attributes
                        )
                ) !== null
            ) {

                const name =
                    attributeMatch[1]
                        .toLowerCase();


                if (
                    name ===
                    "/"
                ) {

                    continue;

                }


                if (
                    attributeNames.includes(
                        name
                    )
                ) {

                    createError(
                        errors,
                        `Attribut "${name}" ist doppelt vorhanden.`,
                        match.index
                    );

                }


                attributeNames.push(
                    name
                );

            }

        }


        return errors;

    }


    /* ========================================
       CHECK SPECIAL STRUCTURE
    ======================================== */

    function validateStructure(
        html
    ) {

        const errors = [];


        /*
         * Mehrere DOCTYPEs
         */

        const doctypes =
            html.match(
                /<!DOCTYPE[^>]*>/gi
            ) || [];


        if (
            doctypes.length > 1
        ) {

            const secondDoctype =
                html.search(
                    /<!DOCTYPE[^>]*>/gi
                );


            createError(
                errors,
                "Mehr als ein DOCTYPE wurde gefunden.",
                secondDoctype
            );

        }


        /*
         * DOCTYPE sollte am Anfang stehen.
         */

        const doctypeMatch =
            html.match(
                /<!DOCTYPE[^>]*>/i
            );


        if (
            doctypeMatch
        ) {

            const before =
                html
                    .slice(
                        0,
                        doctypeMatch.index
                    )
                    .trim();


            if (
                before.length > 0
            ) {

                createError(
                    errors,
                    "Vor dem DOCTYPE wurde Inhalt gefunden.",
                    doctypeMatch.index
                );

            }

        }


        /*
         * <html>
         */

        const htmlOpen =
            /<html\b/i.test(
                html
            );


        const htmlClose =
            /<\/html>/i.test(
                html
            );


        if (
            htmlOpen &&
            !htmlClose
        ) {

            createError(
                errors,
                "Das <html>-Element wurde nicht geschlossen.",
                html.search(
                    /<html\b/i
                )
            );

        }


        /*
         * <title>
         */

        const hasHead =
            /<head\b/i.test(
                html
            );


        const hasTitle =
            /<title\b/i.test(
                html
            );


        if (
            hasHead &&
            !hasTitle
        ) {

            const headIndex =
                html.search(
                    /<head\b/i
                );


            createError(
                errors,
                "Im <head>-Bereich wurde kein <title>-Element gefunden.",
                headIndex
            );

        }


        return errors;

    }


    /* ========================================
       VALIDATE
    ======================================== */

    function validateHtml() {

        const value =
            input.value;


        if (
            !value.trim()
        ) {

            output.value =
                "Keine Eingabe vorhanden.";


            showToolStatus(
                "Bitte zuerst HTML eingeben.",
                "warning"
            );

            return;

        }


        const errors = [
            ...validateTags(
                value
            ),
            ...validateAttributes(
                value
            ),
            ...validateStructure(
                value
            )
        ];


        /*
         * Nach Position sortieren.
         */

        errors.sort(
            (
                a,
                b
            ) =>
                (
                    a.line - b.line
                ) ||
                (
                    a.column - b.column
                )
        );


        if (
            errors.length === 0
        ) {

            output.value =
                [
                    "✓ HTML-Struktur ist gültig.",
                    "",
                    `Zeichen: ${value.length}`,
                    "Keine strukturellen Fehler gefunden."
                ].join("\n");


            showToolStatus(
                "HTML ist gültig.",
                "success"
            );


            return;

        }


        const result = [
            `✗ ${errors.length} Fehler gefunden.`,
            ""
        ];


        errors.forEach(
            (
                error,
                index
            ) => {

                result.push(
                    `${index + 1}. ${error.message}`,
                    `   Zeile: ${error.line}, Spalte: ${error.column}`,
                    ""
                );

            }
        );


        output.value =
            result.join(
                "\n"
            );


        showToolStatus(
            `${errors.length} HTML-Fehler gefunden.`,
            "error"
        );

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
`<!DOCTYPE html>
<html>
<head>
    <title>Meine Seite</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>Eine kleine HTML-Seite.</p>
</body>
</html>`;


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
`<!DOCTYPE html>
<html>
<head>
    <title>Fehler</title>
</head>
<body>
    <div>
        <p>Hello World</div>
    </p>
</body>`;


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
        validateHtml
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