/* ============================================
   UUID GENERATOR
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
                        UUID Generator
                    </h2>

                    <p class="tool-panel-description">
                        UUID v4 für Datenbanken, APIs und Anwendungen generieren.
                    </p>

                </div>

            </div>


            <div class="tool-form-group">

                <label
                    for="uuid-count"
                    class="tool-label"
                >
                    Anzahl
                </label>

                <input
                    id="uuid-count"
                    class="tool-input"
                    type="number"
                    min="1"
                    max="100"
                    value="1"
                >

            </div>


            <div class="tool-actions">

                <button
                    id="uuid-generate"
                    class="tool-button primary"
                    type="button"
                >
                    Generieren
                </button>


                <button
                    id="uuid-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="uuid-clear"
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
                        Generierte UUIDs.
                    </p>

                </div>

            </div>


            <textarea
                id="uuid-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Generierte UUIDs erscheinen hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="uuid-copy"
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

    const countInput =
        document.getElementById("uuid-count");


    const output =
        document.getElementById("uuid-output");


    const generateButton =
        document.getElementById("uuid-generate");


    const exampleButton =
        document.getElementById("uuid-example");


    const clearButton =
        document.getElementById("uuid-clear");


    const copyButton =
        document.getElementById("uuid-copy");


    /* ========================================
       GENERATOR
    ======================================== */

    function generateUUIDs() {

        const count =
            Number.parseInt(
                countInput.value,
                10
            );


        if (
            !Number.isInteger(count) ||
            count < 1 ||
            count > 100
        ) {

            showToolStatus(
                "Bitte eine Anzahl zwischen 1 und 100 eingeben.",
                "warning"
            );

            return;

        }


        try {

            const uuids = [];


            for (
                let i = 0;
                i < count;
                i++
            ) {

                uuids.push(
                    crypto.randomUUID()
                );

            }


            output.value =
                uuids.join("\n");


            showToolStatus(
                count === 1
                    ? "UUID erfolgreich generiert."
                    : `${count} UUIDs erfolgreich generiert.`,
                "success"
            );

        } catch {

            output.value = "";


            showToolStatus(
                "UUID konnte nicht generiert werden.",
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        output.value =
            [
                "550e8400-e29b-41d4-a716-446655440000",
                "6ba7b810-9dad-41d1-80b4-00c04fd430c8",
                "7c9e6679-7425-40de-944b-e07fc1f90ae7"
            ].join("\n");


        showToolStatus(
            "Beispiel-UUIDs geladen.",
            "success"
        );


        output.focus();

    }


    /* ========================================
       CLEAR
    ======================================== */

    function clearTool() {

        output.value = "";


        showToolStatus(
            "Ausgabe geleert.",
            "success"
        );


        countInput.focus();

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
        generateUUIDs
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