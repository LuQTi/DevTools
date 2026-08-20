/* ============================================
   URL VALIDATOR
============================================ */

function initTool() {

    const container =
        document.getElementById("tool-container");


    container.innerHTML = `

        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        URL Validator
                    </h2>

                    <p class="tool-panel-description">
                        URLs auf eine gültige Struktur prüfen und Bestandteile anzeigen.
                    </p>

                </div>

            </div>


            <textarea
                id="url-validator-input"
                class="tool-textarea"
                placeholder="https://example.com/path?name=Max#section"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="url-validator-validate"
                    class="tool-button primary"
                    type="button"
                >
                    URL prüfen
                </button>


                <button
                    id="url-validator-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="url-validator-invalid"
                    class="tool-button"
                    type="button"
                >
                    Fehlerbeispiel
                </button>


                <button
                    id="url-validator-clear"
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
                        Validierung
                    </h2>

                    <p class="tool-panel-description">
                        Ergebnis und erkannte URL-Bestandteile.
                    </p>

                </div>

            </div>


            <textarea
                id="url-validator-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Noch keine Prüfung durchgeführt."
            ></textarea>

        </section>

    `;


    /* ========================================
       ELEMENTS
    ======================================== */

    const input =
        document.getElementById(
            "url-validator-input"
        );


    const output =
        document.getElementById(
            "url-validator-output"
        );


    const validateButton =
        document.getElementById(
            "url-validator-validate"
        );


    const exampleButton =
        document.getElementById(
            "url-validator-example"
        );


    const invalidButton =
        document.getElementById(
            "url-validator-invalid"
        );


    const clearButton =
        document.getElementById(
            "url-validator-clear"
        );


    /* ========================================
       VALIDATE
    ======================================== */

    function validateUrl() {

        const value =
            input.value.trim();


        if (!value) {

            output.value =
                "Keine Eingabe vorhanden.";


            showToolStatus(
                "Bitte zuerst eine URL eingeben.",
                "warning"
            );

            return;

        }


        try {

            const url =
                new URL(
                    value
                );


            /*
             * URL ohne Host, z. B. "https:"
             * oder relative URLs, werden hier
             * bewusst nicht als vollständige URL
             * akzeptiert.
             */

            if (
                !url.protocol ||
                !url.hostname
            ) {

                throw new Error(
                    "Die URL benötigt ein Protokoll und einen Hostnamen."
                );

            }


            const protocol =
                url.protocol
                    .replace(
                        ":",
                        ""
                    );


            const result = [

                "✓ URL ist gültig.",

                "",

                `Protokoll: ${protocol}`,

                `Hostname: ${url.hostname}`,

                `Port: ${url.port || "Standard"}`,

                `Pfad: ${url.pathname || "/"}`,

                `Query: ${url.search || "Keine"}`,

                `Fragment: ${url.hash || "Keines"}`,

                "",

                `Vollständige URL: ${url.href}`

            ];


            output.value =
                result.join(
                    "\n"
                );


            showToolStatus(
                "URL ist gültig.",
                "success"
            );

        } catch (error) {

            output.value =
                [
                    "✗ URL ist ungültig.",
                    "",
                    `Fehler: ${getUrlError(value, error)}`
                ].join(
                    "\n"
                );


            showToolStatus(
                "URL ist ungültig.",
                "error"
            );

        }

    }


    /* ========================================
       ERROR MESSAGE
    ======================================== */

    function getUrlError(
        value,
        error
    ) {

        if (
            !/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(
                value
            )
        ) {

            return "Kein gültiges URL-Protokoll gefunden. Beispiel: https://example.com";

        }


        if (
            /^https?:\/\//i.test(
                value
            )
        ) {

            const afterProtocol =
                value.replace(
                    /^https?:\/\//i,
                    ""
                );


            if (
                !afterProtocol ||
                afterProtocol.startsWith("/")
            ) {

                return "Es fehlt ein Hostname, z. B. example.com.";

            }

        }


        return (
            error.message ||
            "Die URL konnte nicht verarbeitet werden."
        );

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            "https://example.com/products?id=42&sort=price#details";


        output.value =
            "";


        showToolStatus(
            "Gültiges Beispiel geladen.",
            "success"
        );


        input.focus();

    }


    /* ========================================
       INVALID EXAMPLE
    ======================================== */

    function loadInvalidExample() {

        input.value =
            "https:///example.com/products";


        output.value =
            "";


        showToolStatus(
            "Fehlerbeispiel geladen.",
            "warning"
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
            "Eingabe und Ergebnis geleert.",
            "success"
        );


        input.focus();

    }


    /* ========================================
       EVENTS
    ======================================== */

    validateButton.addEventListener(
        "click",
        validateUrl
    );


    exampleButton.addEventListener(
        "click",
        loadExample
    );


    invalidButton.addEventListener(
        "click",
        loadInvalidExample
    );


    clearButton.addEventListener(
        "click",
        clearTool
    );

}