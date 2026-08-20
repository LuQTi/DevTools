/* ============================================
   BINARY ENCODER / DECODER
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
                        Binary Encoder / Decoder
                    </h2>

                    <p class="tool-panel-description">
                        Text in binäre UTF-8-Bytes umwandeln und Binärdaten wieder decodieren.
                    </p>

                </div>

            </div>


            <textarea
                id="binary-input"
                class="tool-textarea"
                placeholder="Hello World"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="binary-encode"
                    class="tool-button primary"
                    type="button"
                >
                    Encodieren
                </button>


                <button
                    id="binary-decode"
                    class="tool-button"
                    type="button"
                >
                    Decodieren
                </button>


                <button
                    id="binary-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="binary-clear"
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
                        Binärdaten oder decodierter UTF-8-Text.
                    </p>

                </div>

            </div>


            <textarea
                id="binary-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Ergebnis erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="binary-copy"
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
            "binary-input"
        );


    const output =
        document.getElementById(
            "binary-output"
        );


    const encodeButton =
        document.getElementById(
            "binary-encode"
        );


    const decodeButton =
        document.getElementById(
            "binary-decode"
        );


    const exampleButton =
        document.getElementById(
            "binary-example"
        );


    const clearButton =
        document.getElementById(
            "binary-clear"
        );


    const copyButton =
        document.getElementById(
            "binary-copy"
        );


    /* ========================================
       ENCODE
    ======================================== */

    function encodeBinary(
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
                        .toString(2)
                        .padStart(
                            8,
                            "0"
                        )
            )
            .join(" ");

    }


    /* ========================================
       DECODE
    ======================================== */

    function decodeBinary(
        value
    ) {

        const cleaned =
            value
                .replace(
                    /0b/gi,
                    ""
                )
                .replace(
                    /[\s,;]+/g,
                    ""
                );


        if (!cleaned) {

            throw new Error(
                "Keine Binärdaten vorhanden."
            );

        }


        if (
            !/^[01]+$/.test(
                cleaned
            )
        ) {

            throw new Error(
                "Ungültige Binärdaten. Erlaubt sind nur 0 und 1."
            );

        }


        if (
            cleaned.length % 8 !== 0
        ) {

            throw new Error(
                "Die Anzahl der Bits muss durch 8 teilbar sein."
            );

        }


        const bytes =
            new Uint8Array(
                cleaned.length / 8
            );


        for (
            let i = 0;
            i < cleaned.length;
            i += 8
        ) {

            bytes[i / 8] =
                parseInt(
                    cleaned.slice(
                        i,
                        i + 8
                    ),
                    2
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
            encodeBinary(
                value
            );


        showToolStatus(
            "Text erfolgreich in Binärdaten umgewandelt.",
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
                "Bitte zuerst Binärdaten eingeben.",
                "warning"
            );

            return;

        }


        try {

            output.value =
                decodeBinary(
                    value
                );


            showToolStatus(
                "Binärdaten erfolgreich decodiert.",
                "success"
            );

        } catch (error) {

            output.value =
                "";


            showToolStatus(
                error.message ||
                    "Binärdaten konnten nicht decodiert werden.",
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