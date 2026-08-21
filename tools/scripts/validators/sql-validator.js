/* ============================================
   SQL Validator
============================================ */

function initTool() {

    const container =
        document.getElementById("tool-container");


    container.innerHTML = `

        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        SQL Validator
                    </h2>

                    <p class="tool-panel-description">
                        SQL-Abfragen auf grundlegende Syntaxfehler prüfen und Fehlerpositionen anzeigen.
                    </p>

                </div>

            </div>


            <textarea
                id="sql-validator-input"
                class="tool-textarea"
                placeholder="SELECT id, name
FROM users
WHERE active = 1
ORDER BY name;"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="sql-validator-validate"
                    class="tool-button primary"
                    type="button"
                >
                    SQL prüfen
                </button>


                <button
                    id="sql-validator-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="sql-validator-invalid"
                    class="tool-button"
                    type="button"
                >
                    Fehlerbeispiel
                </button>


                <button
                    id="sql-validator-clear"
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
                id="sql-validator-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Noch keine Prüfung durchgeführt."
            ></textarea>

        </section>

    `;


    const input =
        document.getElementById(
            "sql-validator-input"
        );


    const output =
        document.getElementById(
            "sql-validator-output"
        );


    const validateButton =
        document.getElementById(
            "sql-validator-validate"
        );


    const exampleButton =
        document.getElementById(
            "sql-validator-example"
        );


    const invalidButton =
        document.getElementById(
            "sql-validator-invalid"
        );


    const clearButton =
        document.getElementById(
            "sql-validator-clear"
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


    function addError(
        errors,
        message,
        index
    ) {

        errors.push({

            message,

            index:
                Math.max(
                    0,
                    index
                )

        });

    }


    function validateSql(
        sql
    ) {

        const errors = [];

        let quote = null;

        let comment = null;

        let parentheses = 0;

        let parenthesisIndex = -1;

        let stringStart = -1;

        let commentStart = -1;


        for (
            let i = 0;
            i < sql.length;
            i++
        ) {

            const char =
                sql[i];

            const next =
                sql[i + 1];


            if (
                comment === "line"
            ) {

                if (
                    char === "\n"
                ) {

                    comment = null;

                }

                continue;

            }


            if (
                comment === "block"
            ) {

                if (
                    char === "*" &&
                    next === "/"
                ) {

                    comment = null;

                    i++;

                }

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

                    stringStart = -1;

                }

                continue;

            }


            if (
                char === "'" ||
                char === "\"" ||
                char === "`"
            ) {

                quote = char;

                stringStart = i;

                continue;

            }


            if (
                char === "-" &&
                next === "-"
            ) {

                comment = "line";

                commentStart = i;

                i++;

                continue;

            }


            if (
                char === "/" &&
                next === "*"
            ) {

                comment = "block";

                commentStart = i;

                i++;

                continue;

            }


            if (
                char === "("
            ) {

                parentheses++;

                if (
                    parenthesisIndex === -1
                ) {

                    parenthesisIndex = i;

                }

            } else if (
                char === ")"
            ) {

                parentheses--;

                if (
                    parentheses < 0
                ) {

                    addError(
                        errors,
                        "Schließende runde Klammer ohne passende öffnende Klammer.",
                        i
                    );

                    parentheses = 0;

                    parenthesisIndex = -1;

                } else if (
                    parentheses === 0
                ) {

                    parenthesisIndex = -1;

                }

            }

        }


        if (
            quote
        ) {

            addError(
                errors,
                "SQL-String wurde nicht geschlossen.",
                stringStart
            );

        }


        if (
            comment === "block"
        ) {

            addError(
                errors,
                "SQL-Kommentar wurde nicht geschlossen.",
                commentStart
            );

        }


        if (
            parentheses > 0
        ) {

            addError(
                errors,
                "Nicht alle runden Klammern wurden geschlossen.",
                parenthesisIndex
            );

        }


        const normalized =
            sql
                .replace(
                    /--.*$/gm,
                    ""
                )
                .replace(
                    /\/\*[\s\S]*?\*\//g,
                    " "
                )
                .trim();


        if (
            !normalized
        ) {

            return errors;

        }


        const statements =
            normalized
                .split(";")
                .map(
                    statement =>
                        statement.trim()
                )
                .filter(
                    Boolean
                );


        const sqlKeywords =
            /^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TRUNCATE|WITH|MERGE|CALL|SET|USE|GRANT|REVOKE|BEGIN|COMMIT|ROLLBACK|EXPLAIN|SHOW|DESCRIBE|DESC)\b/i;


        if (
            statements.length > 0 &&
            !sqlKeywords.test(
                statements[0]
            )
        ) {

            const firstWord =
                statements[0]
                    .match(
                        /^\S+/
                    );


            const index =
                normalized.indexOf(
                    firstWord
                        ? firstWord[0]
                        : statements[0]
                );


            addError(
                errors,
                `Unbekanntes oder unerwartetes SQL-Schlüsselwort "${firstWord ? firstWord[0] : statements[0]}".`,
                Math.max(
                    0,
                    sql.indexOf(
                        firstWord
                            ? firstWord[0]
                            : statements[0]
                    )
                )
            );

        }


        const selectPattern =
            /\bSELECT\b([\s\S]*?)(?=\bFROM\b|\bINTO\b|$)/i;


        if (
            /\bSELECT\b/i.test(
                normalized
            )
        ) {

            const selectMatch =
                normalized.match(
                    selectPattern
                );


            if (
                selectMatch &&
                !selectMatch[1].trim()
            ) {

                addError(
                    errors,
                    "SELECT benötigt mindestens eine Spalte oder einen Ausdruck.",
                    Math.max(
                        0,
                        sql.search(
                            /\bSELECT\b/i
                        )
                    )
                );

            }

        }


        if (
            /\bINSERT\b/i.test(
                normalized
            ) &&
            !/\bINTO\b/i.test(
                normalized
            )
        ) {

            addError(
                errors,
                "INSERT-Anweisung benötigt das Schlüsselwort INTO.",
                Math.max(
                    0,
                    sql.search(
                        /\bINSERT\b/i
                    )
                )
            );

        }


        if (
            /\bUPDATE\b/i.test(
                normalized
            ) &&
            !/\bSET\b/i.test(
                normalized
            )
        ) {

            addError(
                errors,
                "UPDATE-Anweisung benötigt das Schlüsselwort SET.",
                Math.max(
                    0,
                    sql.search(
                        /\bUPDATE\b/i
                    )
                )
            );

        }


        if (
            /\bDELETE\b/i.test(
                normalized
            ) &&
            !/\bFROM\b/i.test(
                normalized
            )
        ) {

            addError(
                errors,
                "DELETE-Anweisung benötigt das Schlüsselwort FROM.",
                Math.max(
                    0,
                    sql.search(
                        /\bDELETE\b/i
                    )
                )
            );

        }


        const incompleteKeywords = [
            {
                pattern:
                    /\bFROM\s*$/i,
                message:
                    "FROM benötigt einen Tabellen- oder Unterabfragen-Ausdruck."
            },
            {
                pattern:
                    /\bWHERE\s*$/i,
                message:
                    "WHERE benötigt eine Bedingung."
            },
            {
                pattern:
                    /\bORDER\s+BY\s*$/i,
                message:
                    "ORDER BY benötigt mindestens eine Spalte oder einen Ausdruck."
            },
            {
                pattern:
                    /\bGROUP\s+BY\s*$/i,
                message:
                    "GROUP BY benötigt mindestens eine Spalte oder einen Ausdruck."
            },
            {
                pattern:
                    /\bSET\s*$/i,
                message:
                    "SET benötigt mindestens eine Zuweisung."
            },
            {
                pattern:
                    /\bVALUES\s*$/i,
                message:
                    "VALUES benötigt mindestens einen Werteausdruck."
            },
            {
                pattern:
                    /\bJOIN\s*$/i,
                message:
                    "JOIN benötigt eine Tabelle oder einen Join-Ausdruck."
            }
        ];


        incompleteKeywords.forEach(
            check => {

                const match =
                    normalized.match(
                        check.pattern
                    );


                if (
                    match
                ) {

                    const keywordIndex =
                        sql.search(
                            check.pattern
                        );


                    addError(
                        errors,
                        check.message,
                        keywordIndex >= 0
                            ? keywordIndex
                            : 0
                    );

                }

            }
        );


        const invalidOperators =
            [
                {
                    pattern:
                        /(^|[\s(])=(?=\s*=)/,
                    message:
                        "Doppeltes Gleichheitszeichen ist in SQL normalerweise kein Vergleichsoperator. Verwende '='."
                },
                {
                    pattern:
                        /<>\s*=/,
                    message:
                        "Ungültige Kombination von Vergleichsoperatoren."
                },
                {
                    pattern:
                        /!<\s*>/,
                    message:
                        "Ungültige Kombination von Vergleichsoperatoren."
                }
            ];


        invalidOperators.forEach(
            check => {

                const match =
                    sql.match(
                        check.pattern
                    );


                if (
                    match
                ) {

                    addError(
                        errors,
                        check.message,
                        match.index
                    );

                }

            }
        );


        const trailingOperators =
            /(?:=|<>|!=|<=|>=|<|>|\+|-|\*|\/|,)\s*$/;


        statements.forEach(
            statement => {

                if (
                    trailingOperators.test(
                        statement
                    )
                ) {

                    const index =
                        sql.lastIndexOf(
                            statement
                        );


                    addError(
                        errors,
                        "Die SQL-Anweisung endet mit einem unvollständigen Operator oder Ausdruck.",
                        index +
                        statement.length -
                        1
                    );

                }

            }
        );


        const uniqueErrors = [];

        const seen = new Set();


        errors.forEach(
            error => {

                const key =
                    `${error.message}:${error.index}`;


                if (
                    !seen.has(
                        key
                    )
                ) {

                    seen.add(
                        key
                    );

                    uniqueErrors.push(
                        error
                    );

                }

            }
        );


        return uniqueErrors;

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
                "Bitte zuerst SQL eingeben.",
                "warning"
            );

            return;

        }


        const errors =
            validateSql(
                value
            );


        if (
            errors.length === 0
        ) {

            output.value =
                [
                    "✓ SQL-Syntax ist grundlegend gültig.",
                    "",
                    `Zeichen: ${value.length}`,
                    `Zeilen: ${value.split("\n").length}`,
                    "Keine grundlegenden Syntaxfehler gefunden.",
                    "",
                    "Hinweis: Die Validierung ersetzt keinen vollständigen SQL-Parser und prüft keine Datenbank-spezifischen Regeln."
                ].join("\n");


            showToolStatus(
                "SQL ist grundlegend gültig.",
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
                        error.index
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
            `${errors.length} SQL-Fehler gefunden.`,
            "error"
        );

    }


    function loadExample() {

        input.value =
`SELECT
    id,
    name,
    email
FROM users
WHERE active = 1
ORDER BY name;`;


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
`SELECT
    id,
    name,
FROM users
WHERE active = ;`;


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