/* ============================================
   HTML FORMATTER
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
                        HTML Formatter
                    </h2>

                    <p class="tool-panel-description">
                        HTML-Code automatisch formatieren und übersichtlich einrücken.
                    </p>

                </div>

            </div>


            <textarea
                id="html-input"
                class="tool-textarea"
                placeholder="<div><h1>Hello World</h1><p>Text</p></div>"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="html-format"
                    class="tool-button primary"
                    type="button"
                >
                    Formatieren
                </button>


                <button
                    id="html-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="html-clear"
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
                        Formatierter HTML-Code.
                    </p>

                </div>

            </div>


            <textarea
                id="html-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Formatierter HTML-Code erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="html-copy"
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
        document.getElementById("html-input");


    const output =
        document.getElementById("html-output");


    const formatButton =
        document.getElementById("html-format");


    const exampleButton =
        document.getElementById("html-example");


    const clearButton =
        document.getElementById("html-clear");


    const copyButton =
        document.getElementById("html-copy");


    /* ========================================
       FORMATTER
    ======================================== */

    function formatHtml(html) {

        const tokens =
            html
                .replace(
                    />\s+</g,
                    "><"
                )
                .replace(
                    /\s+/g,
                    " "
                )
                .trim()
                .split(/(<[^>]+>)/g)
                .filter(
                    token =>
                        token.trim() !== ""
                );


        const voidElements =
            new Set([
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


        const inlineElements =
            new Set([
                "a",
                "abbr",
                "b",
                "bdi",
                "bdo",
                "br",
                "button",
                "cite",
                "code",
                "data",
                "em",
                "i",
                "kbd",
                "label",
                "mark",
                "q",
                "s",
                "small",
                "span",
                "strong",
                "sub",
                "sup",
                "time",
                "u"
            ]);


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
               COMMENTS
            ================================= */

            if (
                token.startsWith("<!--")
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


                addLine(token);

                continue;

            }


            /* =================================
               OPENING / SELF CLOSING TAG
            ================================= */

            if (
                token.startsWith("<")
            ) {

                const tagMatch =
                    token.match(
                        /^<\s*([a-zA-Z0-9:-]+)/
                    );


                const tagName =
                    tagMatch
                        ? tagMatch[1].toLowerCase()
                        : "";


                const isClosing =
                    /\/\s*>$/.test(token);


                const isDoctype =
                    /^<!doctype/i.test(
                        token
                    );


                const isDeclaration =
                    /^<!/.test(token);


                const isVoid =
                    voidElements.has(
                        tagName
                    );


                addLine(token);


                if (
                    !isClosing &&
                    !isVoid &&
                    !isDoctype &&
                    !isDeclaration
                ) {

                    /*
                     * Inline-Elemente bleiben
                     * möglichst auf derselben Ebene.
                     */

                    if (
                        inlineElements.has(
                            tagName
                        )
                    ) {

                        continue;

                    }


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
             * Text zwischen Inline-Tags bzw.
             * einfachem Inhalt nicht unnötig
             * auf mehrere Zeilen verteilen.
             */

            if (
                previous.startsWith("<") &&
                next.startsWith("</")
            ) {

                if (
                    lines.length > 0
                ) {

                    lines[
                        lines.length - 1
                    ] +=
                        token;

                    continue;

                }

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
                "Bitte zuerst HTML-Code eingeben.",
                "warning"
            );

            return;

        }


        try {

            output.value =
                formatHtml(
                    value
                );


            showToolStatus(
                "HTML erfolgreich formatiert.",
                "success"
            );

        } catch (error) {

            output.value = "";


            showToolStatus(
                "HTML konnte nicht formatiert werden.",
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value = `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><title>DevTools</title></head>
<body><main><h1>Willkommen</h1><p>Dies ist ein Beispiel für den HTML Formatter.</p><button type="button">Klick mich</button></main></body>
</html>`;


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