/* ============================================
   BASE64 ENCODER / DECODER
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
                        Base64 Encoder / Decoder
                    </h2>

                    <p class="tool-panel-description">
                        Text zwischen Klartext und Base64 umwandeln.
                    </p>

                </div>

            </div>


            <textarea
                id="base64-input"
                class="tool-textarea"
                placeholder="Hello World"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="base64-encode"
                    class="tool-button primary"
                    type="button"
                >
                    Encodieren
                </button>


                <button
                    id="base64-decode"
                    class="tool-button"
                    type="button"
                >
                    Decodieren
                </button>


                <button
                    id="base64-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="base64-clear"
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
                        Base64-Ausgabe oder decodierter Text.
                    </p>

                </div>

            </div>


            <textarea
                id="base64-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Ergebnis erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="base64-copy"
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
            "base64-input"
        );


    const output =
        document.getElementById(
            "base64-output"
        );


    const encodeButton =
        document.getElementById(
            "base64-encode"
        );


    const decodeButton =
        document.getElementById(
            "base64-decode"
        );


    const exampleButton =
        document.getElementById(
            "base64-example"
        );


    const clearButton =
        document.getElementById(
            "base64-clear"
        );


    const copyButton =
        document.getElementById(
            "base64-copy"
        );


    /* ========================================
       ENCODE
    ======================================== */

    function encodeBase64(
        value
    ) {

        const bytes =
            new TextEncoder().encode(
                value
            );


        let binary = "";


        bytes.forEach(
            byte => {

                binary +=
                    String.fromCharCode(
                        byte
                    );

            }
        );


        return btoa(
            binary
        );

    }


    /* ========================================
       DECODE
    ======================================== */

    function decodeBase64(
        value
    ) {

        const binary =
            atob(
                value.trim()
            );


        const bytes =
            Uint8Array.from(
                binary,
                character =>
                    character.charCodeAt(0)
            );


        return new TextDecoder(
            "utf-8",
            {
                fatal: true
            }
        ).decode(
            bytes
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
                "Bitte zuerst Text eingeben.",
                "warning"
            );

            return;

        }


        output.value =
            encodeBase64(
                value
            );


        showToolStatus(
            "Text erfolgreich in Base64 umgewandelt.",
            "success"
        );

    }


    /* ========================================
       DECODE HANDLER
    ======================================== */

    function handleDecode() {

        const value =
            input.value;


        if (!value.trim()) {

            showToolStatus(
                "Bitte zuerst Base64 eingeben.",
                "warning"
            );

            return;

        }


        try {

            output.value =
                decodeBase64(
                    value
                );


            showToolStatus(
                "Base64 erfolgreich decodiert.",
                "success"
            );

        } catch {

            output.value =
                "";


            showToolStatus(
                "Ungültige Base64-Daten.",
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            "Hello World 😀";


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