/* ============================================
   UNICODE ENCODER / DECODER
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
                        Unicode Encoder / Decoder
                    </h2>

                    <p class="tool-panel-description">
                        Text in Unicode-Escape-Sequenzen umwandeln und wieder zurück.
                    </p>

                </div>

            </div>


            <textarea
                id="unicode-input"
                class="tool-textarea"
                placeholder="Hallo ä ö ü 😀"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="unicode-encode"
                    class="tool-button primary"
                    type="button"
                >
                    Encodieren
                </button>


                <button
                    id="unicode-decode"
                    class="tool-button"
                    type="button"
                >
                    Decodieren
                </button>


                <button
                    id="unicode-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="unicode-clear"
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
                        Unicode-Escape-Sequenzen oder decodierter Text.
                    </p>

                </div>

            </div>


            <textarea
                id="unicode-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Ergebnis erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="unicode-copy"
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
            "unicode-input"
        );


    const output =
        document.getElementById(
            "unicode-output"
        );


    const encodeButton =
        document.getElementById(
            "unicode-encode"
        );


    const decodeButton =
        document.getElementById(
            "unicode-decode"
        );


    const exampleButton =
        document.getElementById(
            "unicode-example"
        );


    const clearButton =
        document.getElementById(
            "unicode-clear"
        );


    const copyButton =
        document.getElementById(
            "unicode-copy"
        );


    /* ========================================
       ENCODE
    ======================================== */

    function encodeUnicode(
        value
    ) {

        let result = "";


        for (
            const character of value
        ) {

            const codePoint =
                character.codePointAt(0);


            if (
                codePoint <= 0xFFFF
            ) {

                result +=
                    "\\u" +
                    codePoint
                        .toString(16)
                        .padStart(
                            4,
                            "0"
                        );

            } else {

                const adjusted =
                    codePoint - 0x10000;


                const high =
                    0xD800 +
                    (adjusted >> 10);


                const low =
                    0xDC00 +
                    (adjusted & 0x3FF);


                result +=
                    "\\u" +
                    high
                        .toString(16)
                        .padStart(
                            4,
                            "0"
                        );


                result +=
                    "\\u" +
                    low
                        .toString(16)
                        .padStart(
                            4,
                            "0"
                        );

            }

        }


        return result;

    }


    /* ========================================
       DECODE
    ======================================== */

    function decodeUnicode(
        value
    ) {

        let result =
            value.replace(
                /\\u([0-9a-fA-F]{4})/g,
                (
                    match,
                    hex
                ) =>
                    String.fromCharCode(
                        parseInt(
                            hex,
                            16
                        )
                    )
            );


        /*
         * Unicode-Codepoints wie \u{1F600}
         * ebenfalls unterstützen.
         */

        result =
            result.replace(
                /\\u\{([0-9a-fA-F]+)\}/g,
                (
                    match,
                    hex
                ) => {

                    const codePoint =
                        parseInt(
                            hex,
                            16
                        );


                    if (
                        codePoint >
                        0x10FFFF
                    ) {

                        return match;

                    }


                    return String.fromCodePoint(
                        codePoint
                    );

                }
            );


        return result;

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
            encodeUnicode(
                value
            );


        showToolStatus(
            "Text erfolgreich in Unicode umgewandelt.",
            "success"
        );

    }


    /* ========================================
       DECODE
    ======================================== */

    function handleDecode() {

        const value =
            input.value;


        if (!value) {

            showToolStatus(
                "Bitte zuerst Unicode-Escape-Sequenzen eingeben.",
                "warning"
            );

            return;

        }


        output.value =
            decodeUnicode(
                value
            );


        showToolStatus(
            "Unicode erfolgreich decodiert.",
            "success"
        );

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            "Hallo ä ö ü € 😀";


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