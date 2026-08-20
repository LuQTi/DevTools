/* ============================================
   HEX ENCODER / DECODER
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
                        Hex Encoder / Decoder
                    </h2>

                    <p class="tool-panel-description">
                        Text und UTF-8-Bytes zwischen Klartext und Hexadezimaldarstellung umwandeln.
                    </p>

                </div>

            </div>


            <textarea
                id="hex-input"
                class="tool-textarea"
                placeholder="Hello World"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="hex-encode"
                    class="tool-button primary"
                    type="button"
                >
                    Encodieren
                </button>


                <button
                    id="hex-decode"
                    class="tool-button"
                    type="button"
                >
                    Decodieren
                </button>


                <button
                    id="hex-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="hex-clear"
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
                        Hexadezimalwerte oder decodierter UTF-8-Text.
                    </p>

                </div>

            </div>


            <textarea
                id="hex-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Ergebnis erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="hex-copy"
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
            "hex-input"
        );


    const output =
        document.getElementById(
            "hex-output"
        );


    const encodeButton =
        document.getElementById(
            "hex-encode"
        );


    const decodeButton =
        document.getElementById(
            "hex-decode"
        );


    const exampleButton =
        document.getElementById(
            "hex-example"
        );


    const clearButton =
        document.getElementById(
            "hex-clear"
        );


    const copyButton =
        document.getElementById(
            "hex-copy"
        );


    /* ========================================
       ENCODE
    ======================================== */

    function encodeHex(
        value
    ) {

        const encoder =
            new TextEncoder();


        const bytes =
            encoder.encode(
                value
            );


        return Array.from(
            bytes
        )
            .map(
                byte =>
                    byte
                        .toString(16)
                        .padStart(
                            2,
                            "0"
                        )
            )
            .join(" ");

    }


    /* ========================================
       DECODE
    ======================================== */

    function decodeHex(
        value
    ) {

        const cleaned =
            value
                .replace(
                    /0x/gi,
                    ""
                )
                .replace(
                    /[\s,;:-]+/g,
                    ""
                );


        if (!cleaned) {

            throw new Error(
                "Keine Hex-Daten vorhanden."
            );

        }


        if (
            !/^[0-9a-fA-F]+$/.test(
                cleaned
            )
        ) {

            throw new Error(
                "Ungültige Hex-Zeichen."
            );

        }


        if (
            cleaned.length % 2 !== 0
        ) {

            throw new Error(
                "Die Anzahl der Hex-Zeichen muss gerade sein."
            );

        }


        const bytes =
            new Uint8Array(
                cleaned.length / 2
            );


        for (
            let i = 0;
            i < cleaned.length;
            i += 2
        ) {

            bytes[i / 2] =
                parseInt(
                    cleaned.slice(
                        i,
                        i + 2
                    ),
                    16
                );

        }


        const decoder =
            new TextDecoder(
                "utf-8",
                {
                    fatal: true
                }
            );


        return decoder.decode(
            bytes
        );

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


        output.value =
            encodeHex(
                value
            );


        showToolStatus(
            "Text erfolgreich in Hex umgewandelt.",
            "success"
        );

    }


    /* ========================================
       DECODE
    ======================================== */

    function handleDecode() {

        const value =
            input.value;


        if (!value.trim()) {

            showToolStatus(
                "Bitte zuerst Hex-Daten eingeben.",
                "warning"
            );

            return;

        }


        try {

            output.value =
                decodeHex(
                    value
                );


            showToolStatus(
                "Hex erfolgreich decodiert.",
                "success"
            );

        } catch (error) {

            output.value =
                "";


            showToolStatus(
                error.message ||
                    "Hex-Daten konnten nicht decodiert werden.",
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            "Hello € 😀";


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