/* ============================================
   URL ENCODER / DECODER
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
                        URL oder Text eingeben.
                    </p>

                </div>

            </div>


            <textarea
                id="url-input"
                class="tool-textarea"
                placeholder="URL oder Text eingeben..."
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="url-encode"
                    class="tool-button primary"
                    type="button"
                >
                    Encode
                </button>

                <button
                    id="url-decode"
                    class="tool-button"
                    type="button"
                >
                    Decode
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
                        Ausgabe
                    </h2>

                    <p class="tool-panel-description">
                        Die encodierte oder decodierte URL erscheint hier.
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


    const input =
        document.getElementById("url-input");

    const output =
        document.getElementById("url-output");

    const encodeButton =
        document.getElementById("url-encode");

    const decodeButton =
        document.getElementById("url-decode");

    const exampleButton =
        document.getElementById("url-example");

    const clearButton =
        document.getElementById("url-clear");

    const copyButton =
        document.getElementById("url-copy");


    const exampleUrl =
        "https://example.com/search?q=DevTools & page=1";


    function encodeUrl() {

        const value =
            input.value;


        if (!value.trim()) {

            showToolStatus(
                "Bitte zuerst eine Eingabe machen.",
                "warning"
            );

            return;
        }


        try {

            output.value =
                encodeURI(value);


            showToolStatus(
                "URL erfolgreich encodiert.",
                "success"
            );

        } catch {

            output.value = "";

            showToolStatus(
                "Die Eingabe konnte nicht encodiert werden.",
                "error"
            );

        }

    }


    function decodeUrl() {

        const value =
            input.value;


        if (!value.trim()) {

            showToolStatus(
                "Bitte zuerst eine Eingabe machen.",
                "warning"
            );

            return;
        }


        try {

            output.value =
                decodeURI(value);


            showToolStatus(
                "URL erfolgreich decodiert.",
                "success"
            );

        } catch {

            output.value = "";

            showToolStatus(
                "Ungültige URL-Codierung.",
                "error"
            );

        }

    }


    function loadExample() {

        input.value =
            exampleUrl;

        output.value = "";


        showToolStatus(
            "Beispiel geladen.",
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
        encodeUrl
    );

    decodeButton.addEventListener(
        "click",
        decodeUrl
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