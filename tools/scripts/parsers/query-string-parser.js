/* ============================================
   QUERY STRING PARSER
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
                        Query String Parser
                    </h2>

                    <p class="tool-panel-description">
                        Query-Parameter analysieren und übersichtlich darstellen.
                    </p>

                </div>

            </div>


            <textarea
                id="query-parser-input"
                class="tool-textarea"
                placeholder="?name=Max&age=25&active=true"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="query-parser-parse"
                    class="tool-button primary"
                    type="button"
                >
                    Analysieren
                </button>


                <button
                    id="query-parser-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="query-parser-clear"
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
                        Parameter
                    </h2>

                    <p class="tool-panel-description">
                        Erkannte Schlüssel und Werte.
                    </p>

                </div>

            </div>


            <textarea
                id="query-parser-output"
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
            "query-parser-input"
        );


    const output =
        document.getElementById(
            "query-parser-output"
        );


    const parseButton =
        document.getElementById(
            "query-parser-parse"
        );


    const exampleButton =
        document.getElementById(
            "query-parser-example"
        );


    const clearButton =
        document.getElementById(
            "query-parser-clear"
        );


    /* ========================================
       PARSE
    ======================================== */

    function parseQueryString() {

        let value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst einen Query-String eingeben.",
                "warning"
            );

            return;

        }


        /*
         * Eine vollständige URL wird ebenfalls
         * akzeptiert.
         */

        try {

            if (
                value.includes("://")
            ) {

                const url =
                    new URL(value);


                value =
                    url.search;

            }

        } catch {

            /*
             * Wenn es keine vollständige URL ist,
             * versuchen wir den Wert als Query-String
             * zu behandeln.
             */

        }


        if (
            value.startsWith("?")
        ) {

            value =
                value.slice(1);

        }


        if (!value) {

            output.value =
                "Keine Query-Parameter gefunden.";


            showToolStatus(
                "Keine Query-Parameter gefunden.",
                "warning"
            );

            return;

        }


        const params =
            new URLSearchParams(
                value
            );


        const lines = [];


        for (
            const [
                key,
                parameterValue
            ] of params.entries()
        ) {

            lines.push(
                `${key} = ${parameterValue}`
            );

        }


        output.value =
            lines.length
                ? lines.join("\n")
                : "Keine Query-Parameter gefunden.";


        showToolStatus(
            `${lines.length} Query-Parameter gefunden.`,
            "success"
        );

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            "?name=Max&age=25&language=JavaScript&language=Java&active=true";


        parseQueryString();

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
        parseQueryString
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