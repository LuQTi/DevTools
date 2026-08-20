/* ============================================
   COOKIE PARSER
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
                        Cookie Parser
                    </h2>

                    <p class="tool-panel-description">
                        Cookie-Strings analysieren und in einzelne Cookies zerlegen.
                    </p>

                </div>

            </div>


            <textarea
                id="cookie-parser-input"
                class="tool-textarea"
                placeholder="session=abc123; theme=dark; language=de"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="cookie-parser-parse"
                    class="tool-button primary"
                    type="button"
                >
                    Analysieren
                </button>


                <button
                    id="cookie-parser-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="cookie-parser-clear"
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
                        Cookies
                    </h2>

                    <p class="tool-panel-description">
                        Erkannte Cookie-Namen und Werte.
                    </p>

                </div>

            </div>


            <textarea
                id="cookie-parser-output"
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
            "cookie-parser-input"
        );


    const output =
        document.getElementById(
            "cookie-parser-output"
        );


    const parseButton =
        document.getElementById(
            "cookie-parser-parse"
        );


    const exampleButton =
        document.getElementById(
            "cookie-parser-example"
        );


    const clearButton =
        document.getElementById(
            "cookie-parser-clear"
        );


    /* ========================================
       PARSE COOKIE
    ======================================== */

    function parseCookies() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst einen Cookie-String eingeben.",
                "warning"
            );

            return;

        }


        const cookies =
            value
                .split(";")
                .map(
                    cookie =>
                        cookie.trim()
                )
                .filter(
                    cookie =>
                        cookie.length > 0
                );


        const results = [];


        cookies.forEach(
            cookie => {

                const separator =
                    cookie.indexOf("=");


                if (
                    separator === -1
                ) {

                    results.push(
                        `${cookie} =`
                    );

                    return;

                }


                const name =
                    cookie
                        .slice(
                            0,
                            separator
                        )
                        .trim();


                const cookieValue =
                    cookie
                        .slice(
                            separator + 1
                        )
                        .trim();


                if (!name) {
                    return;
                }


                results.push(
                    `${name} = ${cookieValue}`
                );

            }
        );


        output.value =
            results.length
                ? results.join("\n")
                : "Keine Cookies gefunden.";


        showToolStatus(
            `${results.length} Cookie(s) gefunden.`,
            "success"
        );

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            "session=abc123; theme=dark; language=de; loggedIn=true";


        parseCookies();

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
        parseCookies
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