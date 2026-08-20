/* ============================================
   URL PARSER
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
                        URL Parser
                    </h2>

                    <p class="tool-panel-description">
                        URLs analysieren und in ihre Bestandteile zerlegen.
                    </p>

                </div>

            </div>


            <textarea
                id="url-parser-input"
                class="tool-textarea"
                placeholder="https://example.com:8080/users?id=42#profile"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="url-parser-parse"
                    class="tool-button primary"
                    type="button"
                >
                    Analysieren
                </button>


                <button
                    id="url-parser-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="url-parser-clear"
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
                        URL Bestandteile
                    </h2>

                    <p class="tool-panel-description">
                        Die einzelnen Komponenten der URL.
                    </p>

                </div>

            </div>


            <div class="tool-actions">

                <button
                    class="tool-button"
                    type="button"
                    data-url-copy="protocol"
                >
                    Protocol:
                    <span id="url-protocol">
                        —
                    </span>
                </button>


                <button
                    class="tool-button"
                    type="button"
                    data-url-copy="hostname"
                >
                    Hostname:
                    <span id="url-hostname">
                        —
                    </span>
                </button>


                <button
                    class="tool-button"
                    type="button"
                    data-url-copy="port"
                >
                    Port:
                    <span id="url-port">
                        —
                    </span>
                </button>


                <button
                    class="tool-button"
                    type="button"
                    data-url-copy="path"
                >
                    Path:
                    <span id="url-path">
                        —
                    </span>
                </button>


                <button
                    class="tool-button"
                    type="button"
                    data-url-copy="query"
                >
                    Query:
                    <span id="url-query">
                        —
                    </span>
                </button>


                <button
                    class="tool-button"
                    type="button"
                    data-url-copy="hash"
                >
                    Hash:
                    <span id="url-hash">
                        —
                    </span>
                </button>


                <button
                    class="tool-button"
                    type="button"
                    data-url-copy="origin"
                >
                    Origin:
                    <span id="url-origin">
                        —
                    </span>
                </button>

            </div>

        </section>


        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        Query Parameter
                    </h2>

                    <p class="tool-panel-description">
                        Einzelne Parameter aus dem Query-String.
                    </p>

                </div>

            </div>


            <textarea
                id="url-query-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Keine Query-Parameter..."
            ></textarea>

        </section>

    `;


    /* ========================================
       ELEMENTS
    ======================================== */

    const input =
        document.getElementById(
            "url-parser-input"
        );


    const parseButton =
        document.getElementById(
            "url-parser-parse"
        );


    const exampleButton =
        document.getElementById(
            "url-parser-example"
        );


    const clearButton =
        document.getElementById(
            "url-parser-clear"
        );


    const queryOutput =
        document.getElementById(
            "url-query-output"
        );


    const results = {

        protocol:
            document.getElementById(
                "url-protocol"
            ),

        hostname:
            document.getElementById(
                "url-hostname"
            ),

        port:
            document.getElementById(
                "url-port"
            ),

        path:
            document.getElementById(
                "url-path"
            ),

        query:
            document.getElementById(
                "url-query"
            ),

        hash:
            document.getElementById(
                "url-hash"
            ),

        origin:
            document.getElementById(
                "url-origin"
            )

    };


    /* ========================================
       PARSE
    ======================================== */

    function parseUrl() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst eine URL eingeben.",
                "warning"
            );

            return;

        }


        try {

            const url =
                new URL(value);


            results.protocol.textContent =
                url.protocol || "—";


            results.hostname.textContent =
                url.hostname || "—";


            results.port.textContent =
                url.port || "—";


            results.path.textContent =
                url.pathname || "—";


            results.query.textContent =
                url.search || "—";


            results.hash.textContent =
                url.hash || "—";


            results.origin.textContent =
                url.origin || "—";


            renderQueryParameters(
                url.searchParams
            );


            showToolStatus(
                "URL erfolgreich analysiert.",
                "success"
            );

        } catch {

            clearResults();


            showToolStatus(
                "Ungültige URL. Bitte überprüfe die Eingabe.",
                "error"
            );

        }

    }


    /* ========================================
       QUERY PARAMETERS
    ======================================== */

    function renderQueryParameters(
        searchParams
    ) {

        const parameters = [];


        for (
            const [
                key,
                value
            ] of searchParams.entries()
        ) {

            parameters.push(
                `${key} = ${value}`
            );

        }


        queryOutput.value =
            parameters.length > 0
                ? parameters.join("\n")
                : "Keine Query-Parameter gefunden.";

    }


    /* ========================================
       CLEAR RESULTS
    ======================================== */

    function clearResults() {

        Object.values(
            results
        ).forEach(
            element => {

                element.textContent =
                    "—";

            }
        );


        queryOutput.value =
            "";

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            "https://example.com:8080/users/profile?id=42&lang=de#settings";


        parseUrl();

    }


    /* ========================================
       CLEAR
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
        parseUrl
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