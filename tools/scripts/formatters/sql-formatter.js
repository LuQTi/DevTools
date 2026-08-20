/* ============================================
   SQL FORMATTER
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
                        SQL Formatter
                    </h2>

                    <p class="tool-panel-description">
                        SQL-Abfragen automatisch formatieren und übersichtlich einrücken.
                    </p>

                </div>

            </div>


            <textarea
                id="sql-input"
                class="tool-textarea"
                placeholder="SELECT id,name,email FROM users WHERE active=1 ORDER BY name;"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="sql-format"
                    class="tool-button primary"
                    type="button"
                >
                    Formatieren
                </button>


                <button
                    id="sql-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="sql-clear"
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
                        Formatierte SQL-Abfrage.
                    </p>

                </div>

            </div>


            <textarea
                id="sql-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Formatierte SQL-Abfrage erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="sql-copy"
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
        document.getElementById("sql-input");


    const output =
        document.getElementById("sql-output");


    const formatButton =
        document.getElementById("sql-format");


    const exampleButton =
        document.getElementById("sql-example");


    const clearButton =
        document.getElementById("sql-clear");


    const copyButton =
        document.getElementById("sql-copy");


    /* ========================================
       KEYWORDS
    ======================================== */

    const keywords = [

        "SELECT",
        "FROM",
        "WHERE",
        "AND",
        "OR",
        "NOT",
        "IN",
        "IS",
        "NULL",
        "LIKE",
        "BETWEEN",
        "JOIN",
        "INNER JOIN",
        "LEFT JOIN",
        "RIGHT JOIN",
        "FULL JOIN",
        "CROSS JOIN",
        "ON",
        "GROUP BY",
        "ORDER BY",
        "HAVING",
        "LIMIT",
        "OFFSET",
        "UNION",
        "UNION ALL",
        "INSERT INTO",
        "VALUES",
        "UPDATE",
        "SET",
        "DELETE FROM",
        "CREATE TABLE",
        "ALTER TABLE",
        "DROP TABLE",
        "DISTINCT",
        "AS",
        "ASC",
        "DESC"

    ];


    /* ========================================
       FORMATTER
    ======================================== */

    function formatSql(sql) {

        let result =
            sql
                .replace(
                    /\s+/g,
                    " "
                )
                .trim();


        /*
         * Leerzeichen rund um Operatoren
         */

        result =
            result.replace(
                /\s*(=|<>|!=|<=|>=|<|>)\s*/g,
                " $1 "
            );


        /*
         * Mehrfach-Leerzeichen entfernen
         */

        result =
            result.replace(
                /[ \t]+/g,
                " "
            );


        /*
         * Wichtige SQL-Konstrukte
         * zuerst erkennen.
         */

        const compoundKeywords = [
            "DELETE FROM",
            "INSERT INTO",
            "LEFT OUTER JOIN",
            "RIGHT OUTER JOIN",
            "FULL OUTER JOIN",
            "INNER JOIN",
            "LEFT JOIN",
            "RIGHT JOIN",
            "FULL JOIN",
            "CROSS JOIN",
            "GROUP BY",
            "ORDER BY",
            "UNION ALL",
            "CREATE TABLE",
            "ALTER TABLE",
            "DROP TABLE"
        ];


        compoundKeywords.forEach(
            keyword => {

                const regex =
                    new RegExp(
                        `\\b${keyword.replace(
                            / /g,
                            "\\s+"
                        )}\\b`,
                        "gi"
                    );


                result =
                    result.replace(
                        regex,
                        keyword
                    );

            }
        );


        /*
         * Einzelne Keywords normalisieren.
         */

        keywords
            .filter(
                keyword =>
                    !compoundKeywords.includes(
                        keyword
                    )
            )
            .forEach(
                keyword => {

                    const regex =
                        new RegExp(
                            `\\b${keyword}\\b`,
                            "gi"
                        );


                    result =
                        result.replace(
                            regex,
                            keyword
                        );

                }
            );


        /*
         * Hauptabschnitte auf neue Zeilen setzen.
         */

        const lineBreakKeywords = [

            "SELECT",
            "FROM",
            "WHERE",
            "GROUP BY",
            "HAVING",
            "ORDER BY",
            "LIMIT",
            "OFFSET",
            "UNION",
            "UNION ALL",
            "INSERT INTO",
            "VALUES",
            "UPDATE",
            "SET",
            "DELETE FROM",
            "CREATE TABLE",
            "ALTER TABLE",
            "DROP TABLE"

        ];


        lineBreakKeywords.forEach(
            keyword => {

                const regex =
                    new RegExp(
                        `\\s*\\b${keyword.replace(
                            / /g,
                            "\\s+"
                        )}\\b\\s*`,
                        "g"
                    );


                result =
                    result.replace(
                        regex,
                        `\n${keyword} `
                    );

            }
        );


        /*
         * JOIN und ON ebenfalls
         * auf eigene Zeilen.
         */

        const joinKeywords = [

            "INNER JOIN",
            "LEFT JOIN",
            "RIGHT JOIN",
            "FULL JOIN",
            "CROSS JOIN",
            "LEFT OUTER JOIN",
            "RIGHT OUTER JOIN",
            "FULL OUTER JOIN"

        ];


        joinKeywords.forEach(
            keyword => {

                const regex =
                    new RegExp(
                        `\\s*${keyword.replace(
                            / /g,
                            "\\s+"
                        )}\\s*`,
                        "g"
                    );


                result =
                    result.replace(
                        regex,
                        `\n${keyword} `
                    );

            }
        );


        result =
            result.replace(
                /\s+\bON\b\s+/g,
                "\nON "
            );


        /*
         * AND / OR übersichtlich
         * unter WHERE bzw. ON einrücken.
         */

        result =
            result.replace(
                /\s+\b(AND|OR)\b\s+/g,
                "\n    $1 "
            );


        /*
         * SELECT-Felder bei mehreren
         * Feldern untereinander darstellen.
         */

        result =
            result.replace(
                /^SELECT\s+(.+?)(?=\nFROM\b)/ms,
                match => {

                    const content =
                        match
                            .replace(
                                /^SELECT\s+/i,
                                ""
                            )
                            .trim();


                    if (
                        !content.includes(",")
                    ) {

                        return `SELECT ${content}`;

                    }


                    const fields =
                        splitSqlList(
                            content
                        );


                    return [
                        "SELECT",
                        ...fields.map(
                            field =>
                                `    ${field.trim()}`
                        )
                    ].join("\n");

                }
            );


        /*
         * Kommas in VALUES nicht
         * automatisch auf neue Zeilen
         * setzen.
         */

        result =
            result.replace(
                /\n{2,}/g,
                "\n"
            );


        /*
         * Semikolon ans Ende.
         */

        result =
            result
                .split("\n")
                .map(
                    line =>
                        line.trimEnd()
                )
                .join("\n")
                .trim();


        return result;

    }


    /* ========================================
       SQL LIST SPLITTER
    ======================================== */

    function splitSqlList(value) {

        const parts = [];

        let current = "";

        let parentheses = 0;

        let inString = false;

        let stringChar = "";

        let escaped = false;


        for (
            let i = 0;
            i < value.length;
            i++
        ) {

            const char =
                value[i];


            if (inString) {

                current += char;


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


            if (
                char === "'" ||
                char === '"'
            ) {

                inString = true;

                stringChar = char;

                current += char;

                continue;

            }


            if (char === "(") {

                parentheses++;

                current += char;

                continue;

            }


            if (char === ")") {

                parentheses =
                    Math.max(
                        0,
                        parentheses - 1
                    );

                current += char;

                continue;

            }


            if (
                char === "," &&
                parentheses === 0
            ) {

                parts.push(
                    current.trim()
                );

                current = "";

                continue;

            }


            current += char;

        }


        if (current.trim()) {

            parts.push(
                current.trim()
            );

        }


        return parts;

    }


    /* ========================================
       FORMAT
    ======================================== */

    function handleFormat() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst SQL-Code eingeben.",
                "warning"
            );

            return;

        }


        try {

            output.value =
                formatSql(
                    value
                );


            showToolStatus(
                "SQL erfolgreich formatiert.",
                "success"
            );

        } catch (error) {

            output.value = "";


            showToolStatus(
                "SQL konnte nicht formatiert werden.",
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
`SELECT u.id,u.name,u.email,COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON o.user_id=u.id
WHERE u.active=1 AND u.email IS NOT NULL
GROUP BY u.id,u.name,u.email
HAVING COUNT(o.id)>0
ORDER BY u.name ASC
LIMIT 20;`;


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