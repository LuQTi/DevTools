/* ============================================
   URL ENCODER / DECODER
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
                        URL Encoder / Decoder
                    </h2>

                    <p class="tool-panel-description">
                        URL-Komponenten encodieren und wieder decodieren.
                    </p>

                </div>

            </div>


            <textarea
                id="url-input"
                class="tool-textarea"
                placeholder="https://example.com/search?q=Hallo Welt"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="url-encode"
                    class="tool-button primary"
                    type="button"
                >
                    Encodieren
                </button>


                <button
                    id="url-decode"
                    class="tool-button"
                    type="button"
                >
                    Decodieren
                </button>


                <button
                    id="url-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="url-clear"
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
                        Encodierte oder decodierte URL.
                    </p>

                </div>

            </div>


            <textarea
                id="url-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Ergebnis erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="url-copy"
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
            "url-input"
        );


    const output =
        document.getElementById(
            "url-output"
        );


    const encodeButton =
        document.getElementById(
            "url-encode"
        );


    const decodeButton =
        document.getElementById(
            "url-decode"
        );


    const exampleButton =
        document.getElementById(
            "url-example"
        );


    const clearButton =
        document.getElementById(
            "url-clear"
        );


    const copyButton =
        document.getElementById(
            "url-copy"
        );


    /* ========================================
       ENCODE
    ======================================== */

    function encodeUrl(
        value
    ) {

        return encodeURIComponent(
            value
        );

    }


    /* ========================================
       DECODE
    ======================================== */

    function decodeUrl(
        value
    ) {

        return decodeURIComponent(
            value
        );

    }


    /* ========================================
       ENCODE HANDLER
    ======================================== */

    function handleEncode() {

        const value =
            input.value;


        if (!value) {

            showToolStatus(
                "Bitte zuerst Text oder eine URL eingeben.",
                "warning"
            );

            return;

        }


        output.value =
            encodeUrl(
                value
            );


        showToolStatus(
            "URL erfolgreich encodiert.",
            "success"
        );

    }


    /* ========================================
       DECODE HANDLER
    ======================================== */

    function handleDecode() {

        const value =
            input.value;


        if (!value) {

            showToolStatus(
                "Bitte zuerst eine encodierte URL eingeben.",
                "warning"
            );

            return;

        }


        try {

            output.value =
                decodeUrl(
                    value
                );


            showToolStatus(
                "URL erfolgreich decodiert.",
                "success"
            );

        } catch {

            output.value =
                "";


            showToolStatus(
                "Ungültige URL-Encoding-Daten.",
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            "https://example.com/search?q=Hallo Welt&lang=de";


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