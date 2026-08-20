/* ============================================
   JWT PARSER
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
                        JWT Parser
                    </h2>

                    <p class="tool-panel-description">
                        JWTs analysieren und Header, Payload und Claims anzeigen.
                    </p>

                </div>

            </div>


            <textarea
                id="jwt-parser-input"
                class="tool-textarea"
                placeholder="eyJhbGciOiJIUzI1NiIs..."
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="jwt-parser-parse"
                    class="tool-button primary"
                    type="button"
                >
                    Analysieren
                </button>


                <button
                    id="jwt-parser-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="jwt-parser-clear"
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
                        Header
                    </h2>

                    <p class="tool-panel-description">
                        Algorithmus und weitere Header-Daten.
                    </p>

                </div>

            </div>


            <textarea
                id="jwt-parser-header"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Header erscheint hier..."
            ></textarea>

        </section>


        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        Payload
                    </h2>

                    <p class="tool-panel-description">
                        Claims und weitere Payload-Daten.
                    </p>

                </div>

            </div>


            <textarea
                id="jwt-parser-payload"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Payload erscheint hier..."
            ></textarea>

        </section>


        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        Signature
                    </h2>

                    <p class="tool-panel-description">
                        Der codierte Signatur-Teil des JWT.
                    </p>

                </div>

            </div>


            <textarea
                id="jwt-parser-signature"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Signature erscheint hier..."
            ></textarea>

        </section>

    `;


    /* ========================================
       ELEMENTS
    ======================================== */

    const input =
        document.getElementById(
            "jwt-parser-input"
        );


    const headerOutput =
        document.getElementById(
            "jwt-parser-header"
        );


    const payloadOutput =
        document.getElementById(
            "jwt-parser-payload"
        );


    const signatureOutput =
        document.getElementById(
            "jwt-parser-signature"
        );


    const parseButton =
        document.getElementById(
            "jwt-parser-parse"
        );


    const exampleButton =
        document.getElementById(
            "jwt-parser-example"
        );


    const clearButton =
        document.getElementById(
            "jwt-parser-clear"
        );


    /* ========================================
       BASE64URL DECODE
    ======================================== */

    function decodeBase64Url(
        value
    ) {

        const base64 =
            value
                .replace(/-/g, "+")
                .replace(/_/g, "/");


        const padding =
            "=".repeat(
                (4 - base64.length % 4) % 4
            );


        const binary =
            atob(
                base64 + padding
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
        ).decode(bytes);

    }


    /* ========================================
       PARSE JWT
    ======================================== */

    function parseJwt() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst ein JWT eingeben.",
                "warning"
            );

            return;

        }


        const parts =
            value.split(".");


        if (parts.length !== 3) {

            clearResults();


            showToolStatus(
                "Ungültiges JWT: Ein JWT muss aus drei Teilen bestehen.",
                "error"
            );

            return;

        }


        try {

            const header =
                JSON.parse(
                    decodeBase64Url(
                        parts[0]
                    )
                );


            const payload =
                JSON.parse(
                    decodeBase64Url(
                        parts[1]
                    )
                );


            headerOutput.value =
                JSON.stringify(
                    header,
                    null,
                    4
                );


            payloadOutput.value =
                JSON.stringify(
                    payload,
                    null,
                    4
                );


            signatureOutput.value =
                parts[2];


            showToolStatus(
                "JWT erfolgreich analysiert.",
                "success"
            );

        } catch {

            clearResults();


            showToolStatus(
                "JWT konnte nicht gelesen werden. Header oder Payload sind ungültig.",
                "error"
            );

        }

    }


    /* ========================================
       CLEAR
    ======================================== */

    function clearResults() {

        headerOutput.value =
            "";


        payloadOutput.value =
            "";


        signatureOutput.value =
            "";

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1heCIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";


        parseJwt();

    }


    /* ========================================
       CLEAR TOOL
    ======================================== */

    function clearTool() {

        input.value =
            "";


        clearResults();


        showToolStatus(
            "Eingabe und Ergebnisse geleert.",
            "success"
        );


        input.focus();

    }


    /* ========================================
       EVENTS
    ======================================== */

    parseButton.addEventListener(
        "click",
        parseJwt
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