/* ============================================
   HTML ENTITY CONVERTER
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
                        HTML Entity Converter
                    </h2>

                    <p class="tool-panel-description">
                        HTML-Zeichen in Entities umwandeln und HTML-Entities decodieren.
                    </p>

                </div>

            </div>


            <textarea
                id="html-entity-input"
                class="tool-textarea"
                placeholder='Beispiele:
&lt;div&gt;Hello &amp; World&lt;/div&gt;

oder:
<div>Hello & World</div>'
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="html-entity-encode"
                    class="tool-button primary"
                    type="button"
                >
                    Encodieren
                </button>


                <button
                    id="html-entity-decode"
                    class="tool-button"
                    type="button"
                >
                    Decodieren
                </button>


                <button
                    id="html-entity-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="html-entity-clear"
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
                        Konvertierter Text.
                    </p>

                </div>

            </div>


            <textarea
                id="html-entity-output"
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
            "html-entity-input"
        );


    const output =
        document.getElementById(
            "html-entity-output"
        );


    const encodeButton =
        document.getElementById(
            "html-entity-encode"
        );


    const decodeButton =
        document.getElementById(
            "html-entity-decode"
        );


    const exampleButton =
        document.getElementById(
            "html-entity-example"
        );


    const clearButton =
        document.getElementById(
            "html-entity-clear"
        );


    /* ========================================
       HTML ENCODE
    ======================================== */

    function encodeHtml(
        value
    ) {

        const element =
            document.createElement(
                "div"
            );


        element.textContent =
            value;


        return element.innerHTML;

    }


    /* ========================================
       HTML DECODE
    ======================================== */

    function decodeHtml(
        value
    ) {

        const element =
            document.createElement(
                "textarea"
            );


        element.innerHTML =
            value;


        return element.value;

    }


    /* ========================================
       ENCODE
    ======================================== */

    function encode() {

        const value =
            input.value;


        if (!value) {

            showToolStatus(
                "Bitte zuerst Text eingeben.",
                "warning"
            );

            return;

        }


        try {

            output.value =
                encodeHtml(
                    value
                );


            showToolStatus(
                "HTML-Entities erfolgreich encodiert.",
                "success"
            );

        } catch (error) {

            output.value =
                "";


            showToolStatus(
                `Encodieren fehlgeschlagen: ${error.message}`,
                "error"
            );

        }

    }


    /* ========================================
       DECODE
    ======================================== */

    function decode() {

        const value =
            input.value;


        if (!value) {

            showToolStatus(
                "Bitte zuerst HTML-Entities eingeben.",
                "warning"
            );

            return;

        }


        try {

            output.value =
                decodeHtml(
                    value
                );


            showToolStatus(
                "HTML-Entities erfolgreich decodiert.",
                "success"
            );

        } catch (error) {

            output.value =
                "";


            showToolStatus(
                `Decodieren fehlgeschlagen: ${error.message}`,
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            `<div class="message">Hello & World</div>`;


        output.value =
            "";


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

    encodeButton.addEventListener(
        "click",
        encode
    );


    decodeButton.addEventListener(
        "click",
        decode
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