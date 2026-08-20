/* ============================================
   HTTP HEADER PARSER
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
                        HTTP Header Parser
                    </h2>

                    <p class="tool-panel-description">
                        HTTP-Header analysieren und in einzelne Name-Wert-Paare zerlegen.
                    </p>

                </div>

            </div>


            <textarea
                id="http-header-parser-input"
                class="tool-textarea"
                placeholder="Content-Type: application/json&#10;Authorization: Bearer token&#10;Cache-Control: no-cache"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="http-header-parser-parse"
                    class="tool-button primary"
                    type="button"
                >
                    Analysieren
                </button>


                <button
                    id="http-header-parser-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="http-header-parser-clear"
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
                        Erkannte HTTP-Header und ihre Werte.
                    </p>

                </div>

            </div>


            <textarea
                id="http-header-parser-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Ergebnis erscheint hier..."
            ></textarea>

        </section>

    `;


    /* ========================================
       ELEMENTS
    ======================================== */

    const input =
        document.getElementById(
            "http-header-parser-input"
        );


    const output =
        document.getElementById(
            "http-header-parser-output"
        );


    const parseButton =
        document.getElementById(
            "http-header-parser-parse"
        );


    const exampleButton =
        document.getElementById(
            "http-header-parser-example"
        );


    const clearButton =
        document.getElementById(
            "http-header-parser-clear"
        );


    /* ========================================
       PARSE HEADERS
    ======================================== */

    function parseHeaders() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst HTTP-Header eingeben.",
                "warning"
            );

            return;

        }


        const lines =
            value.split(/\r?\n/);


        const headers = [];


        for (
            const line of lines
        ) {

            const trimmed =
                line.trim();


            if (!trimmed) {
                continue;
            }


            const separator =
                trimmed.indexOf(":");


            if (
                separator === -1
            ) {

                showToolStatus(
                    `Ungültige Header-Zeile: "${trimmed}"`,
                    "error"
                );

                output.value =
                    "";

                return;

            }


            const name =
                trimmed
                    .slice(
                        0,
                        separator
                    )
                    .trim();


            const headerValue =
                trimmed
                    .slice(
                        separator + 1
                    )
                    .trim();


            if (!name) {

                showToolStatus(
                    "Ein HTTP-Header benötigt einen Namen.",
                    "error"
                );

                output.value =
                    "";

                return;

            }


            headers.push(
                `${name} = ${headerValue}`
            );

        }


        if (!headers.length) {

            output.value =
                "Keine Header gefunden.";


            showToolStatus(
                "Keine HTTP-Header gefunden.",
                "warning"
            );

            return;

        }


        output.value =
            headers.join("\n");


        showToolStatus(
            `${headers.length} HTTP-Header gefunden.`,
            "success"
        );

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            [
                "Content-Type: application/json",
                "Authorization: Bearer example-token",
                "Accept: application/json",
                "Cache-Control: no-cache",
                "User-Agent: Mozilla/5.0"
            ].join("\n");


        parseHeaders();

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

    parseButton.addEventListener(
        "click",
        parseHeaders
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