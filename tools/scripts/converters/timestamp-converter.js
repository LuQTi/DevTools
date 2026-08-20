/* ============================================
   TIMESTAMP CONVERTER
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
                        Timestamp Converter
                    </h2>

                    <p class="tool-panel-description">
                        Unix-Timestamps in Datum und Uhrzeit umwandeln und umgekehrt.
                    </p>

                </div>

            </div>


            <textarea
                id="timestamp-converter-input"
                class="tool-textarea"
                placeholder="Beispiele:&#10;1710000000&#10;2026-08-20 12:00:00"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="timestamp-converter-convert"
                    class="tool-button primary"
                    type="button"
                >
                    Umwandeln
                </button>


                <button
                    id="timestamp-converter-now"
                    class="tool-button"
                    type="button"
                >
                    Jetzt
                </button>


                <button
                    id="timestamp-converter-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="timestamp-converter-clear"
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
                        Ergebnisse
                    </h2>

                    <p class="tool-panel-description">
                        Unix Timestamp in Sekunden und Millisekunden sowie UTC und lokale Zeit.
                    </p>

                </div>

            </div>


            <textarea
                id="timestamp-converter-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Unix (Sekunden): —
Unix (Millisekunden): —
UTC: —
Lokal: —"
            ></textarea>

        </section>

    `;


    /* ========================================
       ELEMENTS
    ======================================== */

    const input =
        document.getElementById(
            "timestamp-converter-input"
        );


    const output =
        document.getElementById(
            "timestamp-converter-output"
        );


    const convertButton =
        document.getElementById(
            "timestamp-converter-convert"
        );


    const nowButton =
        document.getElementById(
            "timestamp-converter-now"
        );


    const exampleButton =
        document.getElementById(
            "timestamp-converter-example"
        );


    const clearButton =
        document.getElementById(
            "timestamp-converter-clear"
        );


    /* ========================================
       FORMAT DATE
    ======================================== */

    function formatDate(
        date
    ) {

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            throw new Error(
                "Ungültiges Datum."
            );

        }


        return {

            utc:
                date.toISOString(),

            local:
                date.toLocaleString(
                    "de-DE",
                    {
                        dateStyle: "medium",
                        timeStyle: "medium"
                    }
                )

        };

    }


    /* ========================================
       PARSE TIMESTAMP
    ======================================== */

    function parseTimestamp(
        value
    ) {

        const number =
            Number(value);


        if (
            !Number.isFinite(
                number
            ) ||
            !Number.isInteger(
                number
            )
        ) {

            throw new Error(
                "Ein Unix-Timestamp muss eine ganze Zahl sein."
            );

        }


        /*
         * 10 Stellen bzw. typische Werte
         * werden als Sekunden behandelt.
         *
         * Größere Werte werden als
         * Millisekunden interpretiert.
         */

        const milliseconds =
            Math.abs(number) < 100000000000
                ? number * 1000
                : number;


        const date =
            new Date(
                milliseconds
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            throw new Error(
                "Ungültiger Unix-Timestamp."
            );

        }


        return date;

    }


    /* ========================================
       PARSE DATE
    ======================================== */

    function parseDate(
        value
    ) {

        /*
         * Date.parse versteht ISO-Formate
         * und viele übliche Datumsformate.
         */

        const milliseconds =
            Date.parse(
                value
            );


        if (
            Number.isNaN(
                milliseconds
            )
        ) {

            throw new Error(
                "Datum konnte nicht erkannt werden. Verwende z. B. 2026-08-20T12:00:00Z."
            );

        }


        return new Date(
            milliseconds
        );

    }


    /* ========================================
       CONVERT
    ======================================== */

    function convertTimestamp() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst einen Timestamp oder ein Datum eingeben.",
                "warning"
            );

            return;

        }


        try {

            let date;


            /*
             * Reine Ganzzahl = Unix Timestamp
             */

            if (
                /^-?\d+$/.test(
                    value
                )
            ) {

                date =
                    parseTimestamp(
                        value
                    );

            } else {

                date =
                    parseDate(
                        value
                    );

            }


            const formatted =
                formatDate(
                    date
                );


            const unixSeconds =
                Math.floor(
                    date.getTime() / 1000
                );


            const unixMilliseconds =
                date.getTime();


            output.value =
                [
                    `Unix (Sekunden):      ${unixSeconds}`,
                    `Unix (Millisekunden): ${unixMilliseconds}`,
                    `UTC:                  ${formatted.utc}`,
                    `Lokal:                ${formatted.local}`
                ].join("\n");


            showToolStatus(
                "Timestamp erfolgreich umgewandelt.",
                "success"
            );

        } catch (error) {

            output.value =
                "";


            showToolStatus(
                error.message,
                "error"
            );

        }

    }


    /* ========================================
       NOW
    ======================================== */

    function loadCurrentTime() {

        const now =
            Date.now();


        input.value =
            String(
                Math.floor(
                    now / 1000
                )
            );


        convertTimestamp();

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            "1710000000";


        convertTimestamp();

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

    convertButton.addEventListener(
        "click",
        convertTimestamp
    );


    nowButton.addEventListener(
        "click",
        loadCurrentTime
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