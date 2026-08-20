/* ============================================
   HTML BOILERPLATE GENERATOR
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
                        HTML Boilerplate Generator
                    </h2>

                    <p class="tool-panel-description">
                        Erzeuge schnell eine saubere HTML5-Grundstruktur für neue Webseiten.
                    </p>

                </div>

            </div>


            <div class="tool-form-group">

                <label
                    for="html-title"
                    class="tool-label"
                >
                    Seitentitel
                </label>

                <input
                    id="html-title"
                    class="tool-input"
                    type="text"
                    value="Meine Webseite"
                    placeholder="Meine Webseite"
                >

            </div>


            <div class="tool-form-group">

                <label
                    for="html-lang"
                    class="tool-label"
                >
                    Sprache
                </label>

                <select
                    id="html-lang"
                    class="tool-input"
                >
                    <option value="de" selected>
                        Deutsch (de)
                    </option>

                    <option value="en">
                        Englisch (en)
                    </option>

                    <option value="fr">
                        Französisch (fr)
                    </option>

                    <option value="es">
                        Spanisch (es)
                    </option>
                </select>

            </div>


            <div class="tool-form-group">

                <label
                    for="html-css"
                    class="tool-label"
                >
                    CSS-Datei
                </label>

                <input
                    id="html-css"
                    class="tool-input"
                    type="text"
                    value="style.css"
                    placeholder="style.css"
                >

            </div>


            <div class="tool-form-group">

                <label
                    for="html-js"
                    class="tool-label"
                >
                    JavaScript-Datei
                </label>

                <input
                    id="html-js"
                    class="tool-input"
                    type="text"
                    value="script.js"
                    placeholder="script.js"
                >

            </div>


            <div class="tool-form-group">

                <label class="tool-checkbox">

                    <input
                        id="html-meta"
                        type="checkbox"
                        checked
                    >

                    <span>
                        Meta Description hinzufügen
                    </span>

                </label>


                <label class="tool-checkbox">

                    <input
                        id="html-responsive"
                        type="checkbox"
                        checked
                    >

                    <span>
                        Responsive Viewport hinzufügen
                    </span>

                </label>


                <label class="tool-checkbox">

                    <input
                        id="html-css-enabled"
                        type="checkbox"
                        checked
                    >

                    <span>
                        CSS-Datei einbinden
                    </span>

                </label>


                <label class="tool-checkbox">

                    <input
                        id="html-js-enabled"
                        type="checkbox"
                        checked
                    >

                    <span>
                        JavaScript-Datei einbinden
                    </span>

                </label>

            </div>


            <div class="tool-actions">

                <button
                    id="html-generate"
                    class="tool-button primary"
                    type="button"
                >
                    Generieren
                </button>


                <button
                    id="html-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="html-clear"
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
                        Fertige HTML5-Grundstruktur.
                    </p>

                </div>

            </div>


            <textarea
                id="html-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="HTML-Boilerplate erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="html-copy"
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

    const titleInput =
        document.getElementById(
            "html-title"
        );


    const langInput =
        document.getElementById(
            "html-lang"
        );


    const cssInput =
        document.getElementById(
            "html-css"
        );


    const jsInput =
        document.getElementById(
            "html-js"
        );


    const metaInput =
        document.getElementById(
            "html-meta"
        );


    const responsiveInput =
        document.getElementById(
            "html-responsive"
        );


    const cssEnabledInput =
        document.getElementById(
            "html-css-enabled"
        );


    const jsEnabledInput =
        document.getElementById(
            "html-js-enabled"
        );


    const output =
        document.getElementById(
            "html-output"
        );


    const generateButton =
        document.getElementById(
            "html-generate"
        );


    const exampleButton =
        document.getElementById(
            "html-example"
        );


    const clearButton =
        document.getElementById(
            "html-clear"
        );


    const copyButton =
        document.getElementById(
            "html-copy"
        );


    /* ========================================
       ESCAPE HTML
    ======================================== */

    function escapeHtml(
        value
    ) {

        return value
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* ========================================
       GENERATE
    ======================================== */

    function generateHtml() {

        const title =
            titleInput.value.trim() ||
            "Meine Webseite";


        const lang =
            langInput.value ||
            "de";


        const cssFile =
            cssInput.value.trim() ||
            "style.css";


        const jsFile =
            jsInput.value.trim() ||
            "script.js";


        const safeTitle =
            escapeHtml(
                title
            );


        const safeCss =
            escapeHtml(
                cssFile
            );


        const safeJs =
            escapeHtml(
                jsFile
            );


        const lines = [];


        lines.push(
            "<!DOCTYPE html>"
        );


        lines.push(
            `<html lang="${lang}">`
        );


        lines.push(
            "    <head>"
        );


        lines.push(
            '        <meta charset="UTF-8">'
        );


        if (
            responsiveInput.checked
        ) {

            lines.push(
                '        <meta name="viewport" content="width=device-width, initial-scale=1.0">'
            );

        }


        if (
            metaInput.checked
        ) {

            lines.push(
                '        <meta name="description" content="">'
            );

        }


        lines.push(
            `        <title>${safeTitle}</title>`
        );


        if (
            cssEnabledInput.checked
        ) {

            lines.push(
                `        <link rel="stylesheet" href="${safeCss}">`
            );

        }


        lines.push(
            "    </head>"
        );


        lines.push(
            ""
        );


        lines.push(
            "    <body>"
        );


        lines.push(
            ""
        );


        lines.push(
            "        <main>"
        );


        lines.push(
            ""
        );


        lines.push(
            "        </main>"
        );


        if (
            jsEnabledInput.checked
        ) {

            lines.push(
                ""
            );


            lines.push(
                `        <script src="${safeJs}"></script>`
            );

        }


        lines.push(
            ""
        );


        lines.push(
            "    </body>"
        );


        lines.push(
            "</html>"
        );


        output.value =
            lines.join(
                "\n"
            );


        showToolStatus(
            "HTML-Boilerplate erfolgreich generiert.",
            "success"
        );

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        titleInput.value =
            "DevTools";


        langInput.value =
            "de";


        cssInput.value =
            "css/style.css";


        jsInput.value =
            "js/app.js";


        metaInput.checked =
            true;


        responsiveInput.checked =
            true;


        cssEnabledInput.checked =
            true;


        jsEnabledInput.checked =
            true;


        generateHtml();


        showToolStatus(
            "Beispiel geladen.",
            "success"
        );

    }


    /* ========================================
       CLEAR
    ======================================== */

    function clearTool() {

        titleInput.value =
            "";


        langInput.value =
            "de";


        cssInput.value =
            "style.css";


        jsInput.value =
            "script.js";


        metaInput.checked =
            true;


        responsiveInput.checked =
            true;


        cssEnabledInput.checked =
            true;


        jsEnabledInput.checked =
            true;


        output.value =
            "";


        showToolStatus(
            "Eingabe und Ausgabe geleert.",
            "success"
        );


        titleInput.focus();

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

    generateButton.addEventListener(
        "click",
        generateHtml
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