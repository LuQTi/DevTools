/* ============================================
   JAVASCRIPT FORMATTER
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
                        JavaScript Formatter
                    </h2>

                    <p class="tool-panel-description">
                        JavaScript-Code automatisch formatieren und einrücken.
                    </p>

                </div>

            </div>


            <textarea
                id="js-input"
                class="tool-textarea"
                placeholder="const example={name:'Max',age:24};"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="js-format"
                    class="tool-button primary"
                    type="button"
                >
                    Formatieren
                </button>


                <button
                    id="js-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="js-clear"
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
                        Formatierter JavaScript-Code.
                    </p>

                </div>

            </div>


            <textarea
                id="js-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Formatierter Code erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="js-copy"
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
        document.getElementById("js-input");


    const output =
        document.getElementById("js-output");


    const formatButton =
        document.getElementById("js-format");


    const exampleButton =
        document.getElementById("js-example");


    const clearButton =
        document.getElementById("js-clear");


    const copyButton =
        document.getElementById("js-copy");


    /* ========================================
       FORMATTER
    ======================================== */

    function formatJavaScript(code) {

        let result = "";

        let indentLevel = 0;

        let inString = false;

        let stringChar = "";

        let inTemplate = false;

        let inLineComment = false;

        let inBlockComment = false;

        let escaped = false;

        let lineStart = true;


        const indent =
            () => "    ".repeat(
                Math.max(0, indentLevel)
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


        const previousNonWhitespace =
            () => {

                for (
                    let j = result.length - 1;
                    j >= 0;
                    j--
                ) {

                    if (
                        !/\s/.test(
                            result[j]
                        )
                    ) {

                        return result[j];

                    }

                }

                return "";

            };


        for (
            let i = 0;
            i < code.length;
            i++
        ) {

            const char =
                code[i];

            const next =
                code[i + 1];

            const previous =
                code[i - 1];


            /* =================================
               LINE COMMENT
            ================================= */

            if (inLineComment) {

                appendIndent();

                result += char;


                if (char === "\n") {

                    inLineComment =
                        false;

                    lineStart =
                        true;

                }


                continue;

            }


            /* =================================
               BLOCK COMMENT
            ================================= */

            if (inBlockComment) {

                appendIndent();

                result += char;


                if (
                    char === "*" &&
                    next === "/"
                ) {

                    result += "/";

                    i++;

                    inBlockComment =
                        false;

                }


                if (char === "\n") {

                    lineStart =
                        true;

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

                    escaped =
                        false;

                    continue;

                }


                if (char === "\\") {

                    escaped =
                        true;

                    continue;

                }


                if (
                    char === stringChar
                ) {

                    inString =
                        false;

                }


                continue;

            }


            /* =================================
               TEMPLATE STRING
            ================================= */

            if (inTemplate) {

                appendIndent();

                result += char;


                if (escaped) {

                    escaped =
                        false;

                    continue;

                }


                if (char === "\\") {

                    escaped =
                        true;

                    continue;

                }


                if (char === "`") {

                    inTemplate =
                        false;

                }


                continue;

            }


            /* =================================
               COMMENTS
            ================================= */

            if (
                char === "/" &&
                next === "/"
            ) {

                appendIndent();

                result += "//";

                i++;

                inLineComment =
                    true;

                continue;

            }


            if (
                char === "/" &&
                next === "*"
            ) {

                appendIndent();

                result += "/*";

                i++;

                inBlockComment =
                    true;

                continue;

            }


            /* =================================
               STRINGS
            ================================= */

            if (
                char === "'" ||
                char === '"'
            ) {

                appendIndent();

                result += char;

                inString =
                    true;

                stringChar =
                    char;

                continue;

            }


            if (char === "`") {

                appendIndent();

                result += char;

                inTemplate =
                    true;

                continue;

            }


            /* =================================
               WHITESPACE
            ================================= */

            if (
                char === " " ||
                char === "\t" ||
                char === "\r"
            ) {

                const previousChar =
                    previousNonWhitespace();


                if (
                    result.endsWith(" ") ||
                    result.endsWith("\n")
                ) {

                    continue;

                }


                /*
                 * Kein Leerzeichen vor diesen Zeichen.
                 */

                if (
                    char !== "\n" &&
                    (
                        next === ";" ||
                        next === "," ||
                        next === ")" ||
                        next === "]" ||
                        next === "}"
                    )
                ) {

                    continue;

                }


                result += " ";

                continue;

            }


            /* =================================
               NEW LINE
            ================================= */

            if (char === "\n") {

                newLine();

                continue;

            }


            /* =================================
               OPEN BRACE
            ================================= */

            if (char === "{") {

                appendIndent();


                /*
                 * Leerzeichen vor {
                 * bei normalen Blöcken.
                 */

                if (
                    result.length > 0 &&
                    !result.endsWith(" ") &&
                    !result.endsWith("\n") &&
                    !result.endsWith("(") &&
                    !result.endsWith("[")
                ) {

                    result += " ";

                }


                result += "{";

                indentLevel++;

                newLine();

                continue;

            }


            /* =================================
               CLOSE BRACE
            ================================= */

            if (char === "}") {

                /*
                 * Wenn die aktuelle Zeile leer ist,
                 * direkt einrücken.
                 */

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
                 * Nach } nicht immer sofort
                 * eine neue Zeile erzeugen.
                 */

                if (
                    next !== ";" &&
                    next !== "," &&
                    next !== ")" &&
                    next !== "]" &&
                    next !== "." &&
                    next !== "else" &&
                    next !== "catch" &&
                    next !== "finally"
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
                 * Bei Objekten/Arrays jede Position
                 * auf eine eigene Zeile.
                 */

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
               OPERATORS
            ================================= */

            if (
                char === "=" ||
                char === "+" ||
                char === "-" ||
                char === "*" ||
                char === "%" ||
                char === "<" ||
                char === ">"
            ) {

                appendIndent();


                const operator =
                    char + (
                        (
                            next === "=" ||
                            (
                                (
                                    char === "=" ||
                                    char === "!" ||
                                    char === "<" ||
                                    char === ">"
                                ) &&
                                next === "="
                            )
                        )
                            ? next
                            : ""
                    );


                if (
                    (
                        char === "=" ||
                        char === "+" ||
                        char === "-" ||
                        char === "*" ||
                        char === "%" ||
                        char === "<" ||
                        char === ">"
                    ) &&
                    next === "="
                ) {

                    i++;

                }


                result =
                    result.replace(
                        /[ \t]+$/,
                        ""
                    );


                result +=
                    ` ${operator} `;

                continue;

            }


            /* =================================
               DEFAULT
            ================================= */

            appendIndent();

            result += char;

        }


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
                "Bitte zuerst JavaScript-Code eingeben.",
                "warning"
            );

            return;

        }


        try {

            const formatted =
                formatJavaScript(
                    value
                );


            output.value =
                formatted;


            showToolStatus(
                "JavaScript erfolgreich formatiert.",
                "success"
            );

        } catch (error) {

            output.value = "";


            showToolStatus(
                "Code konnte nicht formatiert werden.",
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value = `const TOOLS={jsonFormatter:{name:"JSON Formatter",description:"JSON formatieren, minifizieren und validieren.",icon:"{ }",category:"code",tags:"json formatter",script:"json-formatter.js",comingSoon:false},base64:{name:"Base64",description:"Base64 codieren und decodieren.",icon:"🔐",category:"code",tags:"base64 encode decode",script:"base64.js",comingSoon:false}};`;


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