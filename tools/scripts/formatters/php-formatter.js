/* ============================================
   PHP FORMATTER
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
                        PHP Formatter
                    </h2>

                    <p class="tool-panel-description">
                        PHP-Code automatisch formatieren und übersichtlich einrücken.
                    </p>

                </div>

            </div>


            <textarea
                id="php-input"
                class="tool-textarea"
                placeholder='<?php function hello($name){if($name){echo "Hello ".$name;}else{echo "Hello World";}} ?>'
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="php-format"
                    class="tool-button primary"
                    type="button"
                >
                    Formatieren
                </button>


                <button
                    id="php-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="php-clear"
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
                        Formatierter PHP-Code.
                    </p>

                </div>

            </div>


            <textarea
                id="php-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Formatierter PHP-Code erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="php-copy"
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
        document.getElementById("php-input");


    const output =
        document.getElementById("php-output");


    const formatButton =
        document.getElementById("php-format");


    const exampleButton =
        document.getElementById("php-example");


    const clearButton =
        document.getElementById("php-clear");


    const copyButton =
        document.getElementById("php-copy");


    /* ========================================
       FORMATTER
    ======================================== */

    function formatPhp(code) {

        let result = "";

        let indentLevel = 0;

        let inString = false;

        let stringChar = "";

        let escaped = false;

        let inLineComment = false;

        let inBlockComment = false;

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
                        /[ \t]+$/g,
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
                    let i = result.length - 1;
                    i >= 0;
                    i--
                ) {

                    if (
                        !/\s/.test(
                            result[i]
                        )
                    ) {

                        return result[i];

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


            /* =================================
               LINE COMMENT
            ================================= */

            if (inLineComment) {

                appendIndent();

                result += char;


                if (
                    char === "\n"
                ) {

                    inLineComment =
                        false;

                    lineStart = true;

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


                if (
                    char === "\n"
                ) {

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


                if (
                    char === "\\"
                ) {

                    escaped = true;

                    continue;

                }


                if (
                    char === stringChar
                ) {

                    inString = false;

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

                inLineComment = true;

                continue;

            }


            if (
                char === "#"
            ) {

                appendIndent();

                result += char;

                inLineComment = true;

                continue;

            }


            if (
                char === "/" &&
                next === "*"
            ) {

                appendIndent();

                result += "/*";

                i++;

                inBlockComment = true;

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

                inString = true;

                stringChar = char;

                continue;

            }


            /* =================================
               NEW LINE
            ================================= */

            if (
                char === "\n" ||
                char === "\r"
            ) {

                newLine();

                continue;

            }


            /* =================================
               WHITESPACE
            ================================= */

            if (
                char === " " ||
                char === "\t"
            ) {

                if (
                    result.endsWith(" ") ||
                    result.endsWith("\n")
                ) {

                    continue;

                }


                result += " ";

                continue;

            }


            /* =================================
               OPEN BRACE
            ================================= */

            if (
                char === "{"
            ) {

                appendIndent();


                if (
                    !result.endsWith(" ") &&
                    !result.endsWith("\n")
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

            if (
                char === "}"
            ) {

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


                if (
                    next !== ";" &&
                    next !== "," &&
                    next !== ")" &&
                    next !== "]"
                ) {

                    newLine();

                }


                continue;

            }


            /* =================================
               SEMICOLON
            ================================= */

            if (
                char === ";"
            ) {

                appendIndent();

                result =
                    result.replace(
                        /[ \t]+$/g,
                        ""
                    );


                result += ";";

                newLine();

                continue;

            }


            /* =================================
               COMMA
            ================================= */

            if (
                char === ","
            ) {

                appendIndent();

                result =
                    result.replace(
                        /[ \t]+$/g,
                        ""
                    );


                result += ", ";

                continue;

            }


            /* =================================
               COLON
            ================================= */

            if (
                char === ":"
            ) {

                appendIndent();

                result =
                    result.replace(
                        /[ \t]+$/g,
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


                const nextIsEquals =
                    next === "=";


                result =
                    result.replace(
                        /[ \t]+$/g,
                        ""
                    );


                result +=
                    ` ${char}${nextIsEquals ? "=" : ""} `;


                if (
                    nextIsEquals
                ) {

                    i++;

                }


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
                "Bitte zuerst PHP-Code eingeben.",
                "warning"
            );

            return;

        }


        try {

            output.value =
                formatPhp(
                    value
                );


            showToolStatus(
                "PHP erfolgreich formatiert.",
                "success"
            );

        } catch (error) {

            output.value = "";


            showToolStatus(
                "PHP konnte nicht formatiert werden.",
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value = `<?php
function greet($name,$age){
if($age>=18){
echo "Hallo ".$name;
}else{
echo "Hallo ".$name.", du bist noch nicht volljährig.";
}
}

$users=[
["name"=>"Max","age"=>24],
["name"=>"Anna","age"=>17]
];

foreach($users as $user){
greet($user["name"],$user["age"]);
}
?>`;


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