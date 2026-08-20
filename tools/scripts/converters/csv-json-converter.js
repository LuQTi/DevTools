/* ============================================
   CSV ↔ JSON CONVERTER
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
                        CSV ↔ JSON Converter
                    </h2>

                    <p class="tool-panel-description">
                        CSV-Daten in JSON umwandeln und JSON als CSV exportieren.
                    </p>

                </div>

            </div>


            <textarea
                id="csv-json-input"
                class="tool-textarea"
                placeholder='CSV:
name,age,city
Max,25,Berlin
Anna,30,Hamburg

oder JSON:
[
    {
        "name": "Max",
        "age": 25,
        "city": "Berlin"
    }
]'
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="csv-json-to-json"
                    class="tool-button primary"
                    type="button"
                >
                    CSV → JSON
                </button>


                <button
                    id="csv-json-to-csv"
                    class="tool-button"
                    type="button"
                >
                    JSON → CSV
                </button>


                <button
                    id="csv-json-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="csv-json-clear"
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
                        Konvertierte Daten.
                    </p>

                </div>

            </div>


            <textarea
                id="csv-json-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Ergebnis erscheint hier..."
            ></textarea>

        </section>

    `;


    /* ========================================
       ELEMENTS
    ======================================== */

    const input =
        document.getElementById(
            "csv-json-input"
        );


    const output =
        document.getElementById(
            "csv-json-output"
        );


    const csvToJsonButton =
        document.getElementById(
            "csv-json-to-json"
        );


    const jsonToCsvButton =
        document.getElementById(
            "csv-json-to-csv"
        );


    const exampleButton =
        document.getElementById(
            "csv-json-example"
        );


    const clearButton =
        document.getElementById(
            "csv-json-clear"
        );


    /* ========================================
       CSV PARSER
    ======================================== */

    function parseCsv(
        value
    ) {

        const rows = [];

        let row = [];

        let field = "";

        let insideQuotes = false;


        for (
            let i = 0;
            i < value.length;
            i++
        ) {

            const character =
                value[i];


            const nextCharacter =
                value[i + 1];


            if (
                character === '"'
            ) {

                if (
                    insideQuotes &&
                    nextCharacter === '"'
                ) {

                    field += '"';

                    i++;

                } else {

                    insideQuotes =
                        !insideQuotes;

                }

                continue;

            }


            if (
                character === "," &&
                !insideQuotes
            ) {

                row.push(field);

                field = "";

                continue;

            }


            if (
                (
                    character === "\n" ||
                    character === "\r"
                ) &&
                !insideQuotes
            ) {

                if (
                    character === "\r" &&
                    nextCharacter === "\n"
                ) {

                    i++;

                }


                row.push(field);

                field = "";


                if (
                    row.some(
                        value =>
                            value.trim() !== ""
                    )
                ) {

                    rows.push(row);

                }


                row = [];

                continue;

            }


            field += character;

        }


        if (
            insideQuotes
        ) {

            throw new Error(
                "CSV enthält ein nicht geschlossenes Anführungszeichen."
            );

        }


        if (
            field !== "" ||
            row.length > 0
        ) {

            row.push(field);


            if (
                row.some(
                    value =>
                        value.trim() !== ""
                )
            ) {

                rows.push(row);

            }

        }


        if (
            rows.length < 2
        ) {

            throw new Error(
                "CSV benötigt eine Kopfzeile und mindestens eine Datenzeile."
            );

        }


        const headers =
            rows[0].map(
                header =>
                    header.trim()
            );


        if (
            headers.some(
                header =>
                    !header
            )
        ) {

            throw new Error(
                "Jede CSV-Spalte benötigt einen Namen."
            );

        }


        if (
            new Set(headers).size !==
            headers.length
        ) {

            throw new Error(
                "CSV enthält doppelte Spaltennamen."
            );

        }


        return rows
            .slice(1)
            .map(
                values => {

                    if (
                        values.length !==
                        headers.length
                    ) {

                        throw new Error(
                            "Eine CSV-Zeile enthält eine andere Anzahl an Spalten als die Kopfzeile."
                        );

                    }


                    const object = {};


                    headers.forEach(
                        (
                            header,
                            index
                        ) => {

                            object[header] =
                                values[index];

                        }
                    );


                    return object;

                }
            );

    }


    /* ========================================
       CSV → JSON
    ======================================== */

    function convertCsvToJson() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst CSV eingeben.",
                "warning"
            );

            return;

        }


        try {

            const data =
                parseCsv(
                    value
                );


            output.value =
                JSON.stringify(
                    data,
                    null,
                    4
                );


            showToolStatus(
                `${data.length} CSV-Zeile(n) erfolgreich in JSON umgewandelt.`,
                "success"
            );

        } catch (error) {

            output.value =
                "";


            showToolStatus(
                `CSV konnte nicht konvertiert werden: ${error.message}`,
                "error"
            );

        }

    }


    /* ========================================
       CSV ESCAPE
    ======================================== */

    function escapeCsv(
        value
    ) {

        const string =
            value === null ||
            value === undefined
                ? ""
                : String(value);


        if (
            /[",\r\n]/.test(
                string
            )
        ) {

            return `"${string.replace(
                /"/g,
                '""'
            )}"`;

        }


        return string;

    }


    /* ========================================
       JSON → CSV
    ======================================== */

    function convertJsonToCsv() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst JSON eingeben.",
                "warning"
            );

            return;

        }


        try {

            const data =
                JSON.parse(
                    value
                );


            if (
                !Array.isArray(data)
            ) {

                throw new Error(
                    "JSON muss ein Array aus Objekten enthalten."
                );

            }


            if (
                data.length === 0
            ) {

                throw new Error(
                    "Das JSON-Array darf nicht leer sein."
                );

            }


            if (
                data.some(
                    item =>
                        item === null ||
                        typeof item !== "object" ||
                        Array.isArray(item)
                )
            ) {

                throw new Error(
                    "Jedes Element muss ein Objekt sein."
                );

            }


            const headers = [];


            data.forEach(
                item => {

                    Object.keys(
                        item
                    ).forEach(
                        key => {

                            if (
                                !headers.includes(
                                    key
                                )
                            ) {

                                headers.push(key);

                            }

                        }
                    );

                }
            );


            if (
                headers.length === 0
            ) {

                throw new Error(
                    "Die JSON-Objekte enthalten keine Eigenschaften."
                );

            }


            const rows = [
                headers.map(
                    escapeCsv
                )
            ];


            data.forEach(
                item => {

                    rows.push(
                        headers.map(
                            header => {

                                const value =
                                    item[header];


                                /*
                                 * Verschachtelte Objekte
                                 * und Arrays werden als JSON
                                 * innerhalb des CSV-Feldes gespeichert.
                                 */

                                if (
                                    value !== null &&
                                    typeof value === "object"
                                ) {

                                    return escapeCsv(
                                        JSON.stringify(
                                            value
                                        )
                                    );

                                }


                                return escapeCsv(
                                    value
                                );

                            }
                        )
                    );

                }
            );


            output.value =
                rows
                    .map(
                        row =>
                            row.join(",")
                    )
                    .join("\n");


            showToolStatus(
                `${data.length} JSON-Objekt(e) erfolgreich in CSV umgewandelt.`,
                "success"
            );

        } catch (error) {

            output.value =
                "";


            showToolStatus(
                `JSON konnte nicht konvertiert werden: ${error.message}`,
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
`name,age,city
Max,25,Berlin
Anna,30,Hamburg
Tom,22,München`;


        output.value =
            "";


        showToolStatus(
            "CSV-Beispiel geladen.",
            "success"
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

    csvToJsonButton.addEventListener(
        "click",
        convertCsvToJson
    );


    jsonToCsvButton.addEventListener(
        "click",
        convertJsonToCsv
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