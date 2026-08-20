/* ============================================
   RANDOM STRING GENERATOR
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
                        Random String Generator
                    </h2>

                    <p class="tool-panel-description">
                        Zufällige Zeichenfolgen für Tokens, Testdaten und IDs generieren.
                    </p>

                </div>

            </div>


            <div class="tool-form-group">

                <label
                    for="random-string-length"
                    class="tool-label"
                >
                    Länge
                </label>

                <input
                    id="random-string-length"
                    class="tool-input"
                    type="number"
                    min="1"
                    max="512"
                    value="32"
                >

            </div>


            <div class="tool-form-group">

                <label class="tool-checkbox">

                    <input
                        id="random-string-uppercase"
                        type="checkbox"
                        checked
                    >

                    <span>
                        Großbuchstaben
                    </span>

                </label>


                <label class="tool-checkbox">

                    <input
                        id="random-string-lowercase"
                        type="checkbox"
                        checked
                    >

                    <span>
                        Kleinbuchstaben
                    </span>

                </label>


                <label class="tool-checkbox">

                    <input
                        id="random-string-numbers"
                        type="checkbox"
                        checked
                    >

                    <span>
                        Zahlen
                    </span>

                </label>


                <label class="tool-checkbox">

                    <input
                        id="random-string-symbols"
                        type="checkbox"
                    >

                    <span>
                        Sonderzeichen
                    </span>

                </label>

            </div>


            <div class="tool-actions">

                <button
                    id="random-string-generate"
                    class="tool-button primary"
                    type="button"
                >
                    Generieren
                </button>


                <button
                    id="random-string-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="random-string-clear"
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
                        Generierte Zeichenfolge.
                    </p>

                </div>

            </div>


            <textarea
                id="random-string-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Generierte Zeichenfolge erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="random-string-copy"
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

    const lengthInput =
        document.getElementById(
            "random-string-length"
        );


    const uppercaseInput =
        document.getElementById(
            "random-string-uppercase"
        );


    const lowercaseInput =
        document.getElementById(
            "random-string-lowercase"
        );


    const numbersInput =
        document.getElementById(
            "random-string-numbers"
        );


    const symbolsInput =
        document.getElementById(
            "random-string-symbols"
        );


    const output =
        document.getElementById(
            "random-string-output"
        );


    const generateButton =
        document.getElementById(
            "random-string-generate"
        );


    const exampleButton =
        document.getElementById(
            "random-string-example"
        );


    const clearButton =
        document.getElementById(
            "random-string-clear"
        );


    const copyButton =
        document.getElementById(
            "random-string-copy"
        );


    /* ========================================
       CHARACTER SETS
    ======================================== */

    const CHARACTERS = {

        uppercase:
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

        lowercase:
            "abcdefghijklmnopqrstuvwxyz",

        numbers:
            "0123456789",

        symbols:
            "!@#$%^&*()-_=+[]{}:,.?"

    };


    /* ========================================
       RANDOM
    ======================================== */

    function randomIndex(max) {

        const randomValues =
            new Uint32Array(1);


        crypto.getRandomValues(
            randomValues
        );


        return (
            randomValues[0] % max
        );

    }


    function randomCharacter(
        characters
    ) {

        return characters[
            randomIndex(
                characters.length
            )
        ];

    }


    /* ========================================
       GENERATOR
    ======================================== */

    function generateRandomString() {

        const length =
            Number.parseInt(
                lengthInput.value,
                10
            );


        if (
            !Number.isInteger(length) ||
            length < 1 ||
            length > 512
        ) {

            showToolStatus(
                "Bitte eine Länge zwischen 1 und 512 eingeben.",
                "warning"
            );

            return;

        }


        let characters = "";


        if (uppercaseInput.checked) {

            characters +=
                CHARACTERS.uppercase;

        }


        if (lowercaseInput.checked) {

            characters +=
                CHARACTERS.lowercase;

        }


        if (numbersInput.checked) {

            characters +=
                CHARACTERS.numbers;

        }


        if (symbolsInput.checked) {

            characters +=
                CHARACTERS.symbols;

        }


        if (!characters) {

            showToolStatus(
                "Bitte mindestens eine Zeichengruppe auswählen.",
                "warning"
            );

            return;

        }


        let result = "";


        for (
            let i = 0;
            i < length;
            i++
        ) {

            result +=
                randomCharacter(
                    characters
                );

        }


        output.value =
            result;


        showToolStatus(
            "Zufällige Zeichenfolge erfolgreich generiert.",
            "success"
        );

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        lengthInput.value = 32;

        uppercaseInput.checked = true;

        lowercaseInput.checked = true;

        numbersInput.checked = true;

        symbolsInput.checked = false;


        output.value =
            "a7Kp92LmX4qT8vNz31BcR6wYx0HdF5sQ";


        showToolStatus(
            "Beispiel geladen.",
            "success"
        );


        output.focus();

    }


    /* ========================================
       CLEAR
    ======================================== */

    function clearTool() {

        output.value = "";


        showToolStatus(
            "Ausgabe geleert.",
            "success"
        );


        lengthInput.focus();

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

    generateButton.addEventListener(
        "click",
        generateRandomString
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