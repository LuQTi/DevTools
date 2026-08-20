/* ============================================
   NUMBER BASE CONVERTER
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
                        Number Base Converter
                    </h2>

                    <p class="tool-panel-description">
                        Zahlen zwischen Binär, Dezimal, Hexadezimal und Oktal umwandeln.
                    </p>

                </div>

            </div>


            <textarea
                id="number-base-converter-input"
                class="tool-textarea"
                placeholder="Beispiele:&#10;255&#10;0xFF&#10;11111111&#10;0o377"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="number-base-converter-convert"
                    class="tool-button primary"
                    type="button"
                >
                    Umwandeln
                </button>


                <button
                    id="number-base-converter-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="number-base-converter-clear"
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
                        Die Zahl in den verschiedenen Zahlensystemen.
                    </p>

                </div>

            </div>


            <textarea
                id="number-base-converter-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Binary: —
Decimal: —
Hexadecimal: —
Octal: —"
            ></textarea>

        </section>

    `;


    /* ========================================
       ELEMENTS
    ======================================== */

    const input =
        document.getElementById(
            "number-base-converter-input"
        );


    const output =
        document.getElementById(
            "number-base-converter-output"
        );


    const convertButton =
        document.getElementById(
            "number-base-converter-convert"
        );


    const exampleButton =
        document.getElementById(
            "number-base-converter-example"
        );


    const clearButton =
        document.getElementById(
            "number-base-converter-clear"
        );


    /* ========================================
       PARSE INPUT
    ======================================== */

    function parseNumber(
        value
    ) {

        let numberString =
            value.trim();


        if (!numberString) {

            throw new Error(
                "Bitte eine Zahl eingeben."
            );

        }


        /*
         * Vorzeichen erlauben.
         */

        let sign = 1;


        if (
            numberString.startsWith("-")
        ) {

            sign = -1;

            numberString =
                numberString.slice(1);

        } else if (
            numberString.startsWith("+")
        ) {

            numberString =
                numberString.slice(1);

        }


        let base;


        /*
         * Präfixe erkennen.
         */

        if (
            /^0b[01]+$/i.test(
                numberString
            )
        ) {

            base = 2;

            numberString =
                numberString.slice(2);

        } else if (
            /^0x[0-9a-f]+$/i.test(
                numberString
            )
        ) {

            base = 16;

            numberString =
                numberString.slice(2);

        } else if (
            /^0o[0-7]+$/i.test(
                numberString
            )
        ) {

            base = 8;

            numberString =
                numberString.slice(2);

        } else if (
            /^[01]+$/.test(
                numberString
            )
        ) {

            /*
             * Reine 0/1-Zahlen werden als
             * Binärzahl erkannt.
             *
             * Eine einzelne 0/1 ist natürlich
             * ebenfalls gültig.
             */

            base = 2;

        } else if (
            /^[0-9]+$/.test(
                numberString
            )
        ) {

            base = 10;

        } else if (
            /^[0-9a-f]+$/i.test(
                numberString
            ) &&
            /[a-f]/i.test(
                numberString
            )
        ) {

            /*
             * Enthält die Eingabe A-F,
             * wird sie als Hexzahl interpretiert.
             */

            base = 16;

        } else {

            throw new Error(
                "Zahl konnte nicht erkannt werden. Verwende Binary, Decimal, Hex oder Octal."
            );

        }


        const number =
            parseInt(
                numberString,
                base
            ) * sign;


        if (
            !Number.isSafeInteger(
                number
            )
        ) {

            throw new Error(
                "Die Zahl ist zu groß. Es werden sichere JavaScript-Ganzzahlen unterstützt."
            );

        }


        return number;

    }


    /* ========================================
       CONVERT
    ======================================== */

    function convertNumber() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst eine Zahl eingeben.",
                "warning"
            );

            return;

        }


        try {

            const number =
                parseNumber(
                    value
                );


            const binary =
                number.toString(2);


            const decimal =
                number.toString(10);


            const hexadecimal =
                number
                    .toString(16)
                    .toUpperCase();


            const octal =
                number.toString(8);


            output.value =
                [
                    `Binary:      ${binary}`,
                    `Decimal:     ${decimal}`,
                    `Hexadecimal: ${hexadecimal}`,
                    `Octal:       ${octal}`
                ].join("\n");


            showToolStatus(
                "Zahl erfolgreich umgewandelt.",
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
            "255";


        convertNumber();

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
        convertNumber
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