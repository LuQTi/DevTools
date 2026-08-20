/* ============================================
   JSON FORMATTER
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
                        JSON Formatter
                    </h2>

                    <p class="tool-panel-description">
                        JSON formatieren, minifizieren und validieren.
                    </p>

                </div>

            </div>


            <textarea
                id="json-input"
                class="tool-textarea"
                placeholder='{"name":"Max","age":24,"active":true}'
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="json-format"
                    class="tool-button primary"
                    type="button"
                >
                    Formatieren
                </button>


                <button
                    id="json-minify"
                    class="tool-button"
                    type="button"
                >
                    Minifizieren
                </button>


                <button
                    id="json-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="json-clear"
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
                        Das verarbeitete JSON.
                    </p>

                </div>

            </div>


            <textarea
                id="json-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Ergebnis erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="json-copy"
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
        document.getElementById("json-input");


    const output =
        document.getElementById("json-output");


    const formatButton =
        document.getElementById("json-format");


    const minifyButton =
        document.getElementById("json-minify");


    const exampleButton =
        document.getElementById("json-example");


    const clearButton =
        document.getElementById("json-clear");


    const copyButton =
        document.getElementById("json-copy");


    /* ========================================
       FORMAT
    ======================================== */

    function formatJson() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst JSON eingeben.",
                "warning"
            );

            return;

        }


        try {

            const parsed =
                JSON.parse(value);


            output.value =
                JSON.stringify(
                    parsed,
                    null,
                    4
                );


            showToolStatus(
                "JSON erfolgreich formatiert.",
                "success"
            );

        } catch (error) {

            output.value = "";


            showToolStatus(
                "Ungültiges JSON: " +
                error.message,
                "error"
            );

        }

    }


    /* ========================================
       MINIFY
    ======================================== */

    function minifyJson() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst JSON eingeben.",
                "warning"
            );

            return;

        }


        try {

            const parsed =
                JSON.parse(value);


            output.value =
                JSON.stringify(
                    parsed
                );


            showToolStatus(
                "JSON erfolgreich minifiziert.",
                "success"
            );

        } catch (error) {

            output.value = "";


            showToolStatus(
                "Ungültiges JSON: " +
                error.message,
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value = `{
    "name": "Max",
    "age": 24,
    "active": true,
    "languages": [
        "JavaScript",
        "HTML",
        "CSS"
    ],
    "address": {
        "city": "Cologne",
        "country": "Germany"
    }
}`;


        output.value = "";


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

        input.value = "";

        output.value = "";


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

    formatButton.addEventListener(
        "click",
        formatJson
    );


    minifyButton.addEventListener(
        "click",
        minifyJson
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