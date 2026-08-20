/* ============================================
   ASCII ENCODER / DECODER
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
                        ASCII Encoder / Decoder
                    </h2>

                    <p class="tool-panel-description">
                        ASCII-Zeichen in Zahlen umwandeln und ASCII-Werte wieder in Text decodieren.
                    </p>

                </div>

            </div>


            <textarea
                id="ascii-input"
                class="tool-textarea"
                placeholder="Hello World"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="ascii-encode"
                    class="tool-button primary"
                    type="button"
                >
                    Encodieren
                </button>


                <button
                    id="ascii-decode"
                    class="tool-button"
                    type="button"
                >
                    Decodieren
                </button>


                <button
                    id="ascii-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="ascii-clear"
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
                        ASCII-Werte oder decodierter Text.
                    </p>

                </div>

            </div>


            <textarea
                id="ascii-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Ergebnis erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="ascii-copy"
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
        document.getElementById(
            "ascii-input"
        );


    const output =
        document.getElementById(
            "ascii-output"
        );


    const encodeButton =
        document.getElementById(
            "ascii-encode"
        );


    const decodeButton =
        document.getElementById(
            "ascii-decode"
        );


    const exampleButton =
        document.getElementById(
            "ascii-example"
        );


    const clearButton =
        document.getElementById(
            "ascii-clear"
        );


    const copyButton =
        document.getElementById(
            "ascii-copy"
        );


    /* ========================================
       ENCODE
    ======================================== */

    function encodeAscii(
        value
    ) {

        const values = [];


        for (
            const character of value
        ) {

            const code =
                character.charCodeAt(0);


            if (
                code > 127
            ) {

                throw new Error(
                    `Das Zeichen "${character}" ist kein ASCII-Zeichen.`
                );

            }


            values.push(
                code
            );

        }


        return values.join(" ");

    }


    /* ========================================
       DECODE
    ======================================== */

    function decodeAscii(
        value
    ) {

        const cleaned =
            value.trim();


        if (!cleaned) {

            throw new Error(
                "Keine ASCII-Werte vorhanden."
            );

        }


        const parts =
            cleaned.split(
                /[\s,;]+/
            );


        const characters = [];


        for (
            const part of parts
        ) {

            if (!/^\d+$/.test(part)) {

                throw new Error(
                    `Ungültiger ASCII-Wert: ${part}`
                );

            }


            const code =
                Number(part);


            if (
                code < 0 ||
                code > 127
            ) {

                throw new Error(
                    `ASCII-Werte müssen zwischen 0 und 127 liegen: ${part}`
                );

            }


            characters.push(
                String.fromCharCode(
                    code
                )
            );

        }


        return characters.join("");

    }


    /* ========================================
       ENCODE
    ======================================== */

    function handleEncode() {

        const value =
            input.value;


        if (!value) {

            showToolStatus(
                "Bitte zuerst Text eingeben.",
                "warning"
            );

            return;

        }


        try {

            output.value =
                encodeAscii(
                    value
                );


            showToolStatus(
                "Text erfolgreich in ASCII umgewandelt.",
                "success"
            );

        } catch (error) {

            output.value =
                "";


            showToolStatus(
                error.message ||
                    "Text konnte nicht als ASCII encodiert werden.",
                "error"
            );

        }

    }


    /* ========================================
       DECODE
    ======================================== */

    function handleDecode() {

        const value =
            input.value;


        if (!value.trim()) {

            showToolStatus(
                "Bitte zuerst ASCII-Werte eingeben.",
                "warning"
            );

            return;

        }


        try {

            output.value =
                decodeAscii(
                    value
                );


            showToolStatus(
                "ASCII erfolgreich decodiert.",
                "success"
            );

        } catch (error) {

            output.value =
                "";


            showToolStatus(
                error.message ||
                    "ASCII-Werte konnten nicht decodiert werden.",
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            "Hello World";


        output.value =
            "";


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

        input.value =
            "";


        output.value =
            "";


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

    encodeButton.addEventListener(
        "click",
        handleEncode
    );


    decodeButton.addEventListener(
        "click",
        handleDecode
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