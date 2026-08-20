/* ============================================
   HTML ENTITY ENCODER / DECODER
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
                        HTML Entity Encoder / Decoder
                    </h2>

                    <p class="tool-panel-description">
                        HTML-Sonderzeichen encodieren und HTML Entities wieder decodieren.
                    </p>

                </div>

            </div>


            <textarea
                id="html-entity-input"
                class="tool-textarea"
                placeholder='<div class="example">Hello & "World"</div>'
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
                        Encodierter oder decodierter Text.
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


            <div class="tool-actions">

                <button
                    id="html-entity-copy"
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


    const copyButton =
        document.getElementById(
            "html-entity-copy"
        );


    /* ========================================
       ENCODE
    ======================================== */

    function encodeHtmlEntities(
        value
    ) {

        return value.replace(
            /[&<>"']/g,
            character => {

                const entities = {

                    "&": "&amp;",

                    "<": "&lt;",

                    ">": "&gt;",

                    '"': "&quot;",

                    "'": "&#39;"

                };


                return entities[
                    character
                ];

            }
        );

    }


    /* ========================================
       DECODE
    ======================================== */

    function decodeHtmlEntities(
        value
    ) {

        const textarea =
            document.createElement(
                "textarea"
            );


        textarea.innerHTML =
            value;


        return textarea.value;

    }


    /* ========================================
       ENCODE
    ======================================== */

    function handleEncode() {

        const value =
            input.value;


        if (!value) {

            showToolStatus(
                "Bitte zuerst Text eingeben.",
                "warning"
            );

            return;

        }


        output.value =
            encodeHtmlEntities(
                value
            );


        showToolStatus(
            "HTML Entities erfolgreich encodiert.",
            "success"
        );

    }


    /* ========================================
       DECODE
    ======================================== */

    function handleDecode() {

        const value =
            input.value;


        if (!value) {

            showToolStatus(
                "Bitte zuerst HTML Entities eingeben.",
                "warning"
            );

            return;

        }


        output.value =
            decodeHtmlEntities(
                value
            );


        showToolStatus(
            "HTML Entities erfolgreich decodiert.",
            "success"
        );

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            `<div class="example">Hello & "World"</div>`;


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

    encodeButton.addEventListener(
        "click",
        handleEncode
    );


    decodeButton.addEventListener(
        "click",
        handleDecode
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