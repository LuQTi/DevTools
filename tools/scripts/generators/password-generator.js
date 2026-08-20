/* ============================================
   PASSWORD GENERATOR
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
                        Password Generator
                    </h2>

                    <p class="tool-panel-description">
                        Sichere Passwörter für Tests und Entwicklungsumgebungen generieren.
                    </p>

                </div>

            </div>


            <div class="tool-form-group">

                <label
                    for="password-length"
                    class="tool-label"
                >
                    Länge
                </label>

                <input
                    id="password-length"
                    class="tool-input"
                    type="number"
                    min="4"
                    max="128"
                    value="16"
                >

            </div>


            <div class="tool-form-group">

                <label class="tool-checkbox">

                    <input
                        id="password-uppercase"
                        type="checkbox"
                        checked
                    >

                    <span>
                        Großbuchstaben
                    </span>

                </label>


                <label class="tool-checkbox">

                    <input
                        id="password-lowercase"
                        type="checkbox"
                        checked
                    >

                    <span>
                        Kleinbuchstaben
                    </span>

                </label>


                <label class="tool-checkbox">

                    <input
                        id="password-numbers"
                        type="checkbox"
                        checked
                    >

                    <span>
                        Zahlen
                    </span>

                </label>


                <label class="tool-checkbox">

                    <input
                        id="password-symbols"
                        type="checkbox"
                        checked
                    >

                    <span>
                        Sonderzeichen
                    </span>

                </label>

            </div>


            <div class="tool-actions">

                <button
                    id="password-generate"
                    class="tool-button primary"
                    type="button"
                >
                    Generieren
                </button>


                <button
                    id="password-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="password-clear"
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
                        Generiertes Passwort.
                    </p>

                </div>

            </div>


            <textarea
                id="password-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Generiertes Passwort erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="password-copy"
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
            "password-length"
        );


    const uppercaseInput =
        document.getElementById(
            "password-uppercase"
        );


    const lowercaseInput =
        document.getElementById(
            "password-lowercase"
        );


    const numbersInput =
        document.getElementById(
            "password-numbers"
        );


    const symbolsInput =
        document.getElementById(
            "password-symbols"
        );


    const output =
        document.getElementById(
            "password-output"
        );


    const generateButton =
        document.getElementById(
            "password-generate"
        );


    const exampleButton =
        document.getElementById(
            "password-example"
        );


    const clearButton =
        document.getElementById(
            "password-clear"
        );


    const copyButton =
        document.getElementById(
            "password-copy"
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
       SECURE RANDOM
    ======================================== */

    function randomIndex(max) {

        const randomValues =
            new Uint32Array(1);


        crypto.getRandomValues(
            randomValues
        );


        return (
            randomValues[0] %
            max
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

    function generatePassword() {

        const length =
            Number.parseInt(
                lengthInput.value,
                10
            );


        if (
            !Number.isInteger(length) ||
            length < 4 ||
            length > 128
        ) {

            showToolStatus(
                "Bitte eine Länge zwischen 4 und 128 eingeben.",
                "warning"
            );

            return;

        }


        const selectedSets = [];


        if (
            uppercaseInput.checked
        ) {

            selectedSets.push(
                CHARACTERS.uppercase
            );

        }


        if (
            lowercaseInput.checked
        ) {

            selectedSets.push(
                CHARACTERS.lowercase
            );

        }


        if (
            numbersInput.checked
        ) {

            selectedSets.push(
                CHARACTERS.numbers
            );

        }


        if (
            symbolsInput.checked
        ) {

            selectedSets.push(
                CHARACTERS.symbols
            );

        }


        if (
            selectedSets.length === 0
        ) {

            showToolStatus(
                "Bitte mindestens eine Zeichengruppe auswählen.",
                "warning"
            );

            return;

        }


        try {

            let password = "";


            /*
             * Mindestens ein Zeichen aus
             * jeder ausgewählten Gruppe.
             */

            selectedSets.forEach(
                characterSet => {

                    password +=
                        randomCharacter(
                            characterSet
                        );

                }
            );


            const allCharacters =
                selectedSets.join("");


            while (
                password.length < length
            ) {

                password +=
                    randomCharacter(
                        allCharacters
                    );

            }


            /*
             * Zeichen zufällig mischen,
             * damit die vorgeschriebenen
             * Zeichen nicht am Anfang stehen.
             */

            const characters =
                password.split("");


            for (
                let i =
                    characters.length - 1;
                i > 0;
                i--
            ) {

                const j =
                    randomIndex(
                        i + 1
                    );


                [
                    characters[i],
                    characters[j]
                ] = [
                    characters[j],
                    characters[i]
                ];

            }


            output.value =
                characters.join("");


            showToolStatus(
                "Passwort erfolgreich generiert.",
                "success"
            );

        } catch {

            output.value = "";


            showToolStatus(
                "Passwort konnte nicht generiert werden.",
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        lengthInput.value = 20;

        uppercaseInput.checked = true;

        lowercaseInput.checked = true;

        numbersInput.checked = true;

        symbolsInput.checked = true;


        output.value =
            "T7#mK9!vQ2@xL8$pR4";


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
        generatePassword
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