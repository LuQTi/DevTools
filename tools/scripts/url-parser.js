/* ============================================
   URL PARSER
============================================ */

function initTool() {

    const container =
        document.getElementById("tool-container");


    container.innerHTML = `

        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        URL analysieren
                    </h2>

                    <p class="tool-panel-description">
                        Zerlegt eine URL in ihre einzelnen Bestandteile.
                    </p>

                </div>

            </div>


            <textarea
                id="parser-input"
                class="tool-textarea"
                placeholder="https://example.com/path?name=Max&age=24#section"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="parser-analyze"
                    class="tool-button primary"
                    type="button"
                >
                    Analysieren
                </button>

                <button
                    id="parser-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>

                <button
                    id="parser-clear"
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
                        Die einzelnen Bestandteile der URL.
                    </p>

                </div>

            </div>


            <textarea
                id="parser-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Analyse erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="parser-copy"
                    class="tool-button"
                    type="button"
                >
                    Kopieren
                </button>

            </div>

        </section>

    `;


    const input =
        document.getElementById("parser-input");

    const output =
        document.getElementById("parser-output");

    const analyzeButton =
        document.getElementById("parser-analyze");

    const exampleButton =
        document.getElementById("parser-example");

    const clearButton =
        document.getElementById("parser-clear");

    const copyButton =
        document.getElementById("parser-copy");


    function analyzeUrl() {

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


            const result = {

                href:
                    url.href,

                protocol:
                    url.protocol,

                username:
                    url.username,

                password:
                    url.password,

                hostname:
                    url.hostname,

                port:
                    url.port,

                host:
                    url.host,

                pathname:
                    url.pathname,

                search:
                    url.search,

                hash:
                    url.hash,

                origin:
                    url.origin,

                queryParameters:
                    Object.fromEntries(
                        url.searchParams.entries()
                    )

            };


            output.value =
                JSON.stringify(
                    result,
                    null,
                    2
                );


            showToolStatus(
                "URL erfolgreich analysiert.",
                "success"
            );

        } catch {

            output.value = "";

            showToolStatus(
                "Ungültige URL.",
                "error"
            );

        }

    }


    function loadExample() {

        input.value =
            "https://example.com:8080/users/profile?name=Max&age=24&active=true#details";


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


    analyzeButton.addEventListener(
        "click",
        analyzeUrl
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