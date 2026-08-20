/* ============================================
   CSS FORMATTER
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
                        CSS Formatter
                    </h2>

                    <p class="tool-panel-description">
                        CSS-Code automatisch formatieren und übersichtlich einrücken.
                    </p>

                </div>

            </div>


            <textarea
                id="css-input"
                class="tool-textarea"
                placeholder="body{margin:0;padding:20px;color:#fff}.button{background:#6c8cff;color:white}"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="css-format"
                    class="tool-button primary"
                    type="button"
                >
                    Formatieren
                </button>


                <button
                    id="css-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="css-clear"
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
                        Formatierter CSS-Code.
                    </p>

                </div>

            </div>


            <textarea
                id="css-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Formatierter CSS-Code erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="css-copy"
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
        document.getElementById("css-input");


    const output =
        document.getElementById("css-output");


    const formatButton =
        document.getElementById("css-format");


    const exampleButton =
        document.getElementById("css-example");


    const clearButton =
        document.getElementById("css-clear");


    const copyButton =
        document.getElementById("css-copy");


    /* ========================================
       FORMATTER
    ======================================== */

    function formatCss(css) {

        let result = "";

        let indentLevel = 0;

        let inString = false;

        let stringChar = "";

        let inComment = false;

        let escaped = false;

        let lineStart = true;


        const indent =
            () =>
                "    ".repeat(
                    Math.max(
                        0,
                        indentLevel
                    )
                );


        const appendIndent =
            () => {

                if (lineStart) {

                    result += indent();

                    lineStart = false;

                }

            };


        const newLine =
            () => {

                result =
                    result.replace(
                        /[ \t]+$/,
                        ""
                    );


                if (
                    !result.endsWith("\n")
                ) {

                    result += "\n";

                }


                lineStart = true;

            };


        const addSpace =
            () => {

                if (
                    !result.endsWith(" ") &&
                    !result.endsWith("\n")
                ) {

                    result += " ";

                }

            };


        for (
            let i = 0;
            i < css.length;
            i++
        ) {

            const char =
                css[i];

            const next =
                css[i + 1];


            /* =================================
               COMMENT
            ================================= */

            if (inComment) {

                appendIndent();

                result += char;


                if (
                    char === "*" &&
                    next === "/"
                ) {

                    result += "/";

                    i++;

                    inComment = false;

                }


                if (char === "\n") {

                    lineStart = true;

                }


                continue;

            }


            /* =================================
               STRING
            ================================= */

            if (inString) {

                appendIndent();

                result += char;


                if (escaped) {

                    escaped = false;

                    continue;

                }


                if (char === "\\") {

                    escaped = true;

                    continue;

                }


                if (char === stringChar) {

                    inString = false;

                }


                continue;

            }


            /* =================================
               COMMENT START
            ================================= */

            if (
                char === "/" &&
                next === "*"
            ) {

                appendIndent();

                result += "/*";

                i++;

                inComment = true;

                continue;

            }


            /* =================================
               STRING START
            ================================= */

            if (
                char === "'" ||
                char === '"'
            ) {

                appendIndent();

                result += char;

                inString = true;

                stringChar = char;

                continue;

            }


            /* =================================
               WHITESPACE
            ================================= */

            if (
                char === " " ||
                char === "\t" ||
                char === "\r" ||
                char === "\n"
            ) {

                if (
                    !lineStart &&
                    !result.endsWith(" ") &&
                    !result.endsWith("\n")
                ) {

                    result += " ";

                }

                continue;

            }


            /* =================================
               OPEN BRACE
            ================================= */

            if (char === "{") {

                appendIndent();

                result =
                    result.replace(
                        /[ \t]+$/,
                        ""
                    );


                addSpace();

                result += "{";

                indentLevel++;

                newLine();

                continue;

            }


            /* =================================
               CLOSE BRACE
            ================================= */

            if (char === "}") {

                if (!lineStart) {

                    newLine();

                }


                indentLevel =
                    Math.max(
                        0,
                        indentLevel - 1
                    );


                appendIndent();

                result += "}";


                /*
                 * Nach einem Block beginnt
                 * normalerweise eine neue Zeile.
                 */

                if (
                    next !== ";" &&
                    next !== ","
                ) {

                    newLine();

                }

                continue;

            }


            /* =================================
               SEMICOLON
            ================================= */

            if (char === ";") {

                appendIndent();

                result =
                    result.replace(
                        /[ \t]+$/,
                        ""
                    );


                result += ";";

                newLine();

                continue;

            }


            /* =================================
               COLON
            ================================= */

            if (char === ":") {

                appendIndent();

                result =
                    result.replace(
                        /[ \t]+$/,
                        ""
                    );


                result += ": ";

                continue;

            }


            /* =================================
               COMMA
            ================================= */

            if (char === ",") {

                appendIndent();

                result =
                    result.replace(
                        /[ \t]+$/,
                        ""
                    );


                result += ",";


                /*
                 * Selektoren mit Komma bleiben
                 * auf einer Zeile.
                 */

                result += " ";

                continue;

            }


            /* =================================
               PARENTHESES
            ================================= */

            if (char === "(") {

                appendIndent();

                result =
                    result.replace(
                        /[ \t]+$/,
                        ""
                    );


                result += "(";

                continue;

            }


            if (char === ")") {

                appendIndent();

                result =
                    result.replace(
                        /[ \t]+$/,
                        ""
                    );


                result += ")";

                continue;

            }


            /* =================================
               DEFAULT
            ================================= */

            appendIndent();

            result += char;

        }


        /* =====================================
           CLEANUP
        ===================================== */

        result =
            result
                .replace(
                    /[ \t]+\n/g,
                    "\n"
                )
                .replace(
                    /\n{3,}/g,
                    "\n\n"
                )
                .trim();


        return result;

    }


    /* ========================================
       FORMAT
    ======================================== */

    function handleFormat() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst CSS-Code eingeben.",
                "warning"
            );

            return;

        }


        try {

            output.value =
                formatCss(
                    value
                );


            showToolStatus(
                "CSS erfolgreich formatiert.",
                "success"
            );

        } catch (error) {

            output.value = "";

            showToolStatus(
                "CSS konnte nicht formatiert werden.",
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value = `body{margin:0;padding:20px;background:#0f1117;color:#f1f3f5;font-family:Inter,system-ui,sans-serif}.container{max-width:1000px;margin:0 auto;padding:20px}.button{display:inline-block;padding:10px 16px;border:1px solid #292e3a;border-radius:10px;background:#6c8cff;color:#fff;cursor:pointer}.button:hover{background:#809cff}`;

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