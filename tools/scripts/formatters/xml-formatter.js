/* ============================================
   XML FORMATTER
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
                        XML Formatter
                    </h2>

                    <p class="tool-panel-description">
                        XML-Code automatisch formatieren und übersichtlich einrücken.
                    </p>

                </div>

            </div>


            <textarea
                id="xml-input"
                class="tool-textarea"
                placeholder='<root><user><name>Max</name><age>24</age></user></root>'
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="xml-format"
                    class="tool-button primary"
                    type="button"
                >
                    Formatieren
                </button>


                <button
                    id="xml-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="xml-clear"
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
                        Ergebnis
                    </h2>

                    <p class="tool-panel-description">
                        Formatierter XML-Code.
                    </p>

                </div>

            </div>


            <textarea
                id="xml-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Formatierter XML-Code erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="xml-copy"
                    class="tool-button"
                    type="button"
                >
                    Kopieren
                </button>

            </div>

        </section>

    `;


    /* ========================================
       ELEMENTS
    ======================================== */

    const input =
        document.getElementById("xml-input");


    const output =
        document.getElementById("xml-output");


    const formatButton =
        document.getElementById("xml-format");


    const exampleButton =
        document.getElementById("xml-example");


    const clearButton =
        document.getElementById("xml-clear");


    const copyButton =
        document.getElementById("xml-copy");


    /* ========================================
       FORMATTER
    ======================================== */

    function formatXml(xml) {

        const parser =
            new DOMParser();


        const documentXml =
            parser.parseFromString(
                xml,
                "application/xml"
            );


        const parserError =
            documentXml.querySelector(
                "parsererror"
            );


        if (parserError) {

            throw new Error(
                "Ungültiges XML."
            );

        }


        const serializer =
            new XMLSerializer();


        const serialized =
            serializer.serializeToString(
                documentXml
            );


        const tokens =
            serialized
                .replace(
                    />\s+</g,
                    "><"
                )
                .trim()
                .split(
                    /(<[^>]+>)/g
                )
                .filter(
                    token =>
                        token.trim() !== ""
                );


        const lines = [];

        let indentLevel = 0;


        const indent =
            () =>
                "    ".repeat(
                    Math.max(
                        0,
                        indentLevel
                    )
                );


        const addLine =
            (
                content,
                level = indentLevel
            ) => {

                lines.push(
                    "    ".repeat(
                        Math.max(
                            0,
                            level
                        )
                    ) +
                    content.trim()
                );

            };


        for (
            let i = 0;
            i < tokens.length;
            i++
        ) {

            const token =
                tokens[i].trim();


            if (!token) {
                continue;
            }


            /* =================================
               XML DECLARATION
            ================================= */

            if (
                /^<\?xml/i.test(token)
            ) {

                addLine(token, 0);

                continue;

            }


            /* =================================
               PROCESSING INSTRUCTION
            ================================= */

            if (
                /^<\?/.test(token)
            ) {

                addLine(token);

                continue;

            }


            /* =================================
               COMMENT
            ================================= */

            if (
                token.startsWith("<!--")
            ) {

                addLine(token);

                continue;

            }


            /* =================================
               CDATA
            ================================= */

            if (
                token.startsWith("<![CDATA[")
            ) {

                addLine(token);

                continue;

            }


            /* =================================
               DOCTYPE
            ================================= */

            if (
                /^<!DOCTYPE/i.test(token)
            ) {

                addLine(token);

                continue;

            }


            /* =================================
               CLOSING TAG
            ================================= */

            if (
                /^<\s*\//.test(token)
            ) {

                indentLevel =
                    Math.max(
                        0,
                        indentLevel - 1
                    );


                /*
                 * Wenn der vorherige Inhalt
                 * direkt vor dem Closing-Tag
                 * steht, bleibt er auf derselben
                 * Zeile.
                 */

                const previous =
                    lines[
                        lines.length - 1
                    ] || "";


                const previousToken =
                    tokens[i - 1] || "";


                if (
                    previousToken &&
                    !previousToken.startsWith("<")
                ) {

                    lines[
                        lines.length - 1
                    ] += token;

                } else {

                    addLine(token);

                }

                continue;

            }


            /* =================================
               OPENING / SELF CLOSING TAG
            ================================= */

            if (
                token.startsWith("<")
            ) {

                const isSelfClosing =
                    /\/\s*>$/.test(
                        token
                    );


                addLine(token);


                if (!isSelfClosing) {

                    indentLevel++;

                }

                continue;

            }


            /* =================================
               TEXT
            ================================= */

            const previous =
                tokens[i - 1] || "";


            const next =
                tokens[i + 1] || "";


            /*
             * Einfacher Text zwischen
             * öffnendem und schließendem Tag
             * bleibt in einer Zeile.
             */

            if (
                previous.startsWith("<") &&
                next.startsWith("</")
            ) {

                lines[
                    lines.length - 1
                ] += token;

                continue;

            }


            addLine(token);

        }


        return lines.join("\n");

    }


    /* ========================================
       FORMAT
    ======================================== */

    function handleFormat() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst XML-Code eingeben.",
                "warning"
            );

            return;

        }


        try {

            output.value =
                formatXml(
                    value
                );


            showToolStatus(
                "XML erfolgreich formatiert.",
                "success"
            );

        } catch (error) {

            output.value = "";


            showToolStatus(
                "Ungültiges XML: " +
                error.message,
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value = `<?xml version="1.0" encoding="UTF-8"?>
<users>
<user id="1">
<name>Max Mustermann</name>
<age>24</age>
<active>true</active>
<languages>
<language>JavaScript</language>
<language>HTML</language>
<language>CSS</language>
</languages>
</user>
<user id="2">
<name>Anna Musterfrau</name>
<age>28</age>
<active>true</active>
</user>
</users>`;


        output.value = "";


        showToolStatus(
            "Beispiel geladen.",
            "success"
        );


        input.focus();

    }


    /* ========================================
       CLEAR
    ======================================== */

    function clearTool() {

        input.value = "";

        output.value = "";


        showToolStatus(
            "Eingabe und Ausgabe geleert.",
            "success"
        );


        input.focus();

    }


    /* ========================================
       COPY
    ======================================== */

    copyButton.addEventListener(
        "click",
        async () => {

            const success =
                await copyToClipboard(
                    output.value
                );


            if (!success) {
                return;
            }


            copyButton.textContent =
                "✓ Kopiert";


            setTimeout(
                () => {

                    copyButton.textContent =
                        "Kopieren";

                },
                1500
            );

        }
    );


    /* ========================================
       EVENTS
    ======================================== */

    formatButton.addEventListener(
        "click",
        handleFormat
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