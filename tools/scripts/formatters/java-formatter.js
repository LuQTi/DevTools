/* ============================================
   JAVA FORMATTER
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
                        Java Formatter
                    </h2>

                    <p class="tool-panel-description">
                        Java-Code automatisch formatieren und übersichtlich einrücken.
                    </p>

                </div>

            </div>


            <textarea
                id="java-input"
                class="tool-textarea"
                placeholder='public class Main{public static void main(String[] args){System.out.println("Hello World");}}'
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="java-format"
                    class="tool-button primary"
                    type="button"
                >
                    Formatieren
                </button>


                <button
                    id="java-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="java-clear"
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
                        Formatierter Java-Code.
                    </p>

                </div>

            </div>


            <textarea
                id="java-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Formatierter Java-Code erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="java-copy"
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
        document.getElementById("java-input");


    const output =
        document.getElementById("java-output");


    const formatButton =
        document.getElementById("java-format");


    const exampleButton =
        document.getElementById("java-example");


    const clearButton =
        document.getElementById("java-clear");


    const copyButton =
        document.getElementById("java-copy");


    /* ========================================
       FORMATTER
    ======================================== */

    function formatJava(code) {

        let result = "";

        let indentLevel = 0;

        let inString = false;

        let stringChar = "";

        let escaped = false;

        let inLineComment = false;

        let inBlockComment = false;

        let inChar = false;

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
               CHAR
            ================================= */

            if (inChar) {

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
                    char === "'"
                ) {

                    inChar = false;

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
                char === '"'
            ) {

                appendIndent();

                result += char;

                inString = true;

                stringChar = char;

                continue;

            }


            /* =================================
               CHARACTER
            ================================= */

            if (
                char === "'"
            ) {

                appendIndent();

                result += char;

                inChar = true;

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


                /*
                 * else / catch / finally
                 * bleiben bei der schließenden
                 * Klammer.
                 */

                const rest =
                    code
                        .slice(
                            i + 1
                        )
                        .trimStart();


                if (
                    rest.startsWith("else") ||
                    rest.startsWith("catch") ||
                    rest.startsWith("finally")
                ) {

                    result += " ";

                } else if (
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
               OPERATORS
            ================================= */

            if (
                char === "=" ||
                char === "+" ||
                char === "-" ||
                char === "*" ||
                char === "%" ||
                char === "<" ||
                char === ">" ||
                char === "!"
            ) {

                appendIndent();


                let operator =
                    char;


                if (
                    next === "="
                ) {

                    operator += "=";

                    i++;

                }


                result =
                    result.replace(
                        /[ \t]+$/g,
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
                "Bitte zuerst Java-Code eingeben.",
                "warning"
            );

            return;

        }


        try {

            output.value =
                formatJava(
                    value
                );


            showToolStatus(
                "Java erfolgreich formatiert.",
                "success"
            );

        } catch (error) {

            output.value = "";


            showToolStatus(
                "Java konnte nicht formatiert werden.",
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value = `public class Main{
public static void main(String[] args){
User user=new User("Max",24);
if(user.getAge()>=18){
System.out.println("Hallo "+user.getName());
}else{
System.out.println("Noch nicht volljährig");
}
}
}

class User{
private String name;
private int age;

public User(String name,int age){
this.name=name;
this.age=age;
}

public String getName(){
return name;
}

public int getAge(){
return age;
}
}`;


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