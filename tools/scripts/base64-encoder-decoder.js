/* ============================================
   BASE64 ENCODER / DECODER
============================================ */

function initTool() {

    const container =
        document.getElementById("tool-container");


    container.innerHTML = `

        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        Eingabe
                    </h2>

                    <p class="tool-panel-description">
                        Text oder Base64-Daten eingeben.
                    </p>

                </div>

            </div>


            <textarea
                id="base64-input"
                class="tool-textarea"
                placeholder="Text oder Base64 eingeben..."
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="base64-encode"
                    class="tool-button primary"
                    type="button"
                >
                    Encode
                </button>

                <button
                    id="base64-decode"
                    class="tool-button"
                    type="button"
                >
                    Decode
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
                        Ausgabe
                    </h2>

                    <p class="tool-panel-description">
                        Das Ergebnis erscheint hier.
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


    const input =
        document.getElementById("base64-input");

    const output =
        document.getElementById("base64-output");

    const encodeButton =
        document.getElementById("base64-encode");

    const decodeButton =
        document.getElementById("base64-decode");

    const exampleButton =
        document.getElementById("base64-example");

    const clearButton =
        document.getElementById("base64-clear");

    const copyButton =
        document.getElementById("base64-copy");


    function encodeBase64(text) {

        const bytes =
            new TextEncoder().encode(text);


        let binary = "";


        bytes.forEach(
            byte => {

                binary += String.fromCharCode(byte);

            }
        );


        return btoa(binary);

    }


    function decodeBase64(base64) {

        const binary =
            atob(base64);


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
        ).decode(bytes);

    }


    function encode() {

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
                encodeBase64(value);


            showToolStatus(
                "Text erfolgreich encodiert.",
                "success"
            );

        } catch {

            showToolStatus(
                "Der Text konnte nicht encodiert werden.",
                "error"
            );

        }

    }


    function decode() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst Base64-Daten eingeben.",
                "warning"
            );

            return;
        }


        try {

            output.value =
                decodeBase64(value);


            showToolStatus(
                "Base64 erfolgreich decodiert.",
                "success"
            );

        } catch {

            output.value = "";

            showToolStatus(
                "Die Base64-Daten sind ungültig.",
                "error"
            );

        }

    }


    function loadExample() {

        input.value =
            "Hallo Welt! ÄÖÜ äöü € 🚀";

        output.value = "";


        showToolStatus(
            "Beispiel eingefügt.",
            "success"
        );

    }


    function clearTool() {

        input.value = "";

        output.value = "";


        showToolStatus(
            "Eingabe und Ausgabe geleert.",
            "success"
        );


        input.focus();

    }


    encodeButton.addEventListener(
        "click",
        encode
    );

    decodeButton.addEventListener(
        "click",
        decode
    );

    exampleButton.addEventListener(
        "click",
        loadExample
    );

    clearButton.addEventListener(
        "click",
        clearTool
    );


    copyButton.addEventListener(
        "click",
        async () => {

            const success =
                await copyToClipboard(
                    output.value
                );


            if (success) {

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

        }
    );

}