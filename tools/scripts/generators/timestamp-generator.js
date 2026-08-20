/* ============================================
   TIMESTAMP GENERATOR
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
                        Timestamp Generator
                    </h2>

                    <p class="tool-panel-description">
                        Unix-Timestamps für APIs, Datenbanken und Logs erzeugen und umwandeln.
                    </p>

                </div>

            </div>


            <div class="tool-form-group">

                <label
                    for="timestamp-date"
                    class="tool-label"
                >
                    Datum und Uhrzeit
                </label>

                <input
                    id="timestamp-date"
                    class="tool-input"
                    type="datetime-local"
                >

            </div>


            <div class="tool-actions">

                <button
                    id="timestamp-now"
                    class="tool-button primary"
                    type="button"
                >
                    Jetzt
                </button>


                <button
                    id="timestamp-generate"
                    class="tool-button"
                    type="button"
                >
                    Generieren
                </button>


                <button
                    id="timestamp-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="timestamp-clear"
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
                        Unix-Timestamp in Sekunden und Millisekunden.
                    </p>

                </div>

            </div>


            <textarea
                id="timestamp-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Timestamp erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="timestamp-copy"
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

    const dateInput =
        document.getElementById(
            "timestamp-date"
        );


    const output =
        document.getElementById(
            "timestamp-output"
        );


    const nowButton =
        document.getElementById(
            "timestamp-now"
        );


    const generateButton =
        document.getElementById(
            "timestamp-generate"
        );


    const exampleButton =
        document.getElementById(
            "timestamp-example"
        );


    const clearButton =
        document.getElementById(
            "timestamp-clear"
        );


    const copyButton =
        document.getElementById(
            "timestamp-copy"
        );


    /* ========================================
       FORMAT DATE INPUT
    ======================================== */

    function setDateInput(
        date
    ) {

        const year =
            date.getFullYear();


        const month =
            String(
                date.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const day =
            String(
                date.getDate()
            ).padStart(
                2,
                "0"
            );


        const hours =
            String(
                date.getHours()
            ).padStart(
                2,
                "0"
            );


        const minutes =
            String(
                date.getMinutes()
            ).padStart(
                2,
                "0"
            );


        dateInput.value =
            `${year}-${month}-${day}T${hours}:${minutes}`;

    }


    /* ========================================
       GENERATE
    ======================================== */

    function generateTimestamp() {

        if (!dateInput.value) {

            showToolStatus(
                "Bitte zuerst Datum und Uhrzeit auswählen.",
                "warning"
            );

            return;

        }


        const date =
            new Date(
                dateInput.value
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            output.value = "";


            showToolStatus(
                "Ungültiges Datum.",
                "error"
            );

            return;

        }


        const milliseconds =
            date.getTime();


        const seconds =
            Math.floor(
                milliseconds / 1000
            );


        output.value =
            `Sekunden: ${seconds}\n` +
            `Millisekunden: ${milliseconds}`;


        showToolStatus(
            "Timestamp erfolgreich generiert.",
            "success"
        );

    }


    /* ========================================
       NOW
    ======================================== */

    function generateNow() {

        const now =
            new Date();


        setDateInput(
            now
        );


        generateTimestamp();

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        const exampleDate =
            new Date(
                "2025-01-01T12:00:00"
            );


        setDateInput(
            exampleDate
        );


        output.value =
            "Sekunden: 1735732800\n" +
            "Millisekunden: 1735732800000";


        showToolStatus(
            "Beispiel geladen.",
            "success"
        );


        dateInput.focus();

    }


    /* ========================================
       CLEAR
    ======================================== */

    function clearTool() {

        dateInput.value = "";

        output.value = "";


        showToolStatus(
            "Eingabe und Ausgabe geleert.",
            "success"
        );


        dateInput.focus();

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

    nowButton.addEventListener(
        "click",
        generateNow
    );


    generateButton.addEventListener(
        "click",
        generateTimestamp
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