/* ============================================
   BYTES CONVERTER
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
                        Bytes Converter
                    </h2>

                    <p class="tool-panel-description">
                        Speichergrößen zwischen Byte, KB, MB, GB, TB und PB umwandeln.
                    </p>

                </div>

            </div>


            <textarea
                id="bytes-converter-input"
                class="tool-textarea"
                placeholder="Beispiele:
1024
1 KB
5 MB
2.5 GB
1 TB"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="bytes-converter-convert"
                    class="tool-button primary"
                    type="button"
                >
                    Umwandeln
                </button>


                <button
                    id="bytes-converter-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="bytes-converter-clear"
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
                        Die Größe in verschiedenen Einheiten.
                    </p>

                </div>

            </div>


            <textarea
                id="bytes-converter-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Bytes: —
KB: —
MB: —
GB: —
TB: —
PB: —"
            ></textarea>

        </section>

    `;


    /* ========================================
       ELEMENTS
    ======================================== */

    const input =
        document.getElementById(
            "bytes-converter-input"
        );


    const output =
        document.getElementById(
            "bytes-converter-output"
        );


    const convertButton =
        document.getElementById(
            "bytes-converter-convert"
        );


    const exampleButton =
        document.getElementById(
            "bytes-converter-example"
        );


    const clearButton =
        document.getElementById(
            "bytes-converter-clear"
        );


    /* ========================================
       UNITS
    ======================================== */

    const UNITS = {

        B: 1,

        KB: 1024,

        MB: 1024 ** 2,

        GB: 1024 ** 3,

        TB: 1024 ** 4,

        PB: 1024 ** 5

    };


    /* ========================================
       FORMAT NUMBER
    ======================================== */

    function formatNumber(
        value
    ) {

        if (
            !Number.isFinite(value)
        ) {

            return "—";

        }


        return new Intl.NumberFormat(
            "de-DE",
            {
                maximumFractionDigits: 6
            }
        ).format(value);

    }


    /* ========================================
       PARSE INPUT
    ======================================== */

    function parseInput(
        value
    ) {

        const normalized =
            value
                .trim()
                .replace(
                    ",",
                    "."
                )
                .toUpperCase();


        /*
         * Zahl + optionale Einheit
         */

        const match =
            normalized.match(
                /^([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*(B|BYTE|BYTES|KB|KIB|MB|MIB|GB|GIB|TB|TIB|PB|PIB)?$/i
            );


        if (!match) {

            throw new Error(
                "Ungültige Eingabe. Verwende z. B. 1024, 1 KB oder 2.5 GB."
            );

        }


        const number =
            Number(
                match[1]
            );


        if (
            !Number.isFinite(number) ||
            number < 0
        ) {

            throw new Error(
                "Die Größe muss eine positive Zahl sein."
            );

        }


        let unit =
            match[2] ||
            "B";


        /*
         * Binäre Einheiten.
         *
         * KiB = 1024 Bytes
         * MiB = 1024² Bytes usw.
         */

        const binaryUnits = {

            B: 1,

            BYTE: 1,

            BYTES: 1,

            KB: 1024,

            KIB: 1024,

            MB: 1024 ** 2,

            MIB: 1024 ** 2,

            GB: 1024 ** 3,

            GIB: 1024 ** 3,

            TB: 1024 ** 4,

            TIB: 1024 ** 4,

            PB: 1024 ** 5,

            PIB: 1024 ** 5

        };


        if (
            !Object.prototype.hasOwnProperty.call(
                binaryUnits,
                unit
            )
        ) {

            throw new Error(
                "Unbekannte Einheit."
            );

        }


        return (
            number *
            binaryUnits[unit]
        );

    }


    /* ========================================
       CONVERT
    ======================================== */

    function convertBytes() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst eine Größe eingeben.",
                "warning"
            );

            return;

        }


        try {

            const bytes =
                parseInput(
                    value
                );


            output.value =
                [
                    `Bytes: ${formatNumber(bytes)}`,
                    `KB:    ${formatNumber(bytes / UNITS.KB)}`,
                    `MB:    ${formatNumber(bytes / UNITS.MB)}`,
                    `GB:    ${formatNumber(bytes / UNITS.GB)}`,
                    `TB:    ${formatNumber(bytes / UNITS.TB)}`,
                    `PB:    ${formatNumber(bytes / UNITS.PB)}`
                ].join("\n");


            showToolStatus(
                "Speichergröße erfolgreich umgewandelt.",
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
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            "1 GB";


        convertBytes();

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
        convertBytes
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