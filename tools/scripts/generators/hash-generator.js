/* ============================================
   HASH GENERATOR
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
                        Hash Generator
                    </h2>

                    <p class="tool-panel-description">
                        Hashwerte mit verschiedenen Algorithmen erzeugen.
                    </p>

                </div>

            </div>


            <div class="tool-panel-header">

                <div>

                    <h3 class="tool-panel-title">
                        Algorithmus
                    </h3>

                    <p class="tool-panel-description">
                        Hash-Verfahren auswählen.
                    </p>

                </div>

            </div>


            <select
                id="hash-algorithm"
                class="tool-button"
                style="width: 100%; text-align: left;"
            >

                <option value="SHA-1">
                    SHA-1
                </option>

                <option value="SHA-256" selected>
                    SHA-256
                </option>

                <option value="SHA-384">
                    SHA-384
                </option>

                <option value="SHA-512">
                    SHA-512
                </option>

            </select>


            <div
                class="tool-actions"
                style="margin-top: 10px;"
            >

                <span
                    id="hash-info"
                    class="tool-panel-description"
                >
                    SHA-256 — 256 Bit / 64 Hex-Zeichen
                </span>

            </div>

        </section>


        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        Eingabe
                    </h2>

                    <p class="tool-panel-description">
                        Text eingeben, aus dem der Hash erzeugt werden soll.
                    </p>

                </div>

            </div>


            <textarea
                id="hash-input"
                class="tool-textarea"
                placeholder="Text eingeben..."
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="hash-generate"
                    class="tool-button primary"
                    type="button"
                >
                    Hash erzeugen
                </button>


                <button
                    id="hash-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="hash-clear"
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
                        Der berechnete Hashwert.
                    </p>

                </div>

            </div>


            <textarea
                id="hash-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Hash erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="hash-copy"
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
            "hash-input"
        );


    const output =
        document.getElementById(
            "hash-output"
        );


    const algorithm =
        document.getElementById(
            "hash-algorithm"
        );


    const info =
        document.getElementById(
            "hash-info"
        );


    const generateButton =
        document.getElementById(
            "hash-generate"
        );


    const exampleButton =
        document.getElementById(
            "hash-example"
        );


    const clearButton =
        document.getElementById(
            "hash-clear"
        );


    const copyButton =
        document.getElementById(
            "hash-copy"
        );


    /* ========================================
       ALGORITHM INFO
    ======================================== */

    const algorithmInfo = {

        "SHA-1": {

            bits: 160,

            description:
                "SHA-1 — 160 Bit / 40 Hex-Zeichen"

        },


        "SHA-256": {

            bits: 256,

            description:
                "SHA-256 — 256 Bit / 64 Hex-Zeichen"

        },


        "SHA-384": {

            bits: 384,

            description:
                "SHA-384 — 384 Bit / 96 Hex-Zeichen"

        },


        "SHA-512": {

            bits: 512,

            description:
                "SHA-512 — 512 Bit / 128 Hex-Zeichen"

        }

    };


    /* ========================================
       UPDATE INFO
    ======================================== */

    function updateAlgorithmInfo() {

        const selected =
            algorithm.value;


        const data =
            algorithmInfo[selected];


        if (!data) {

            return;

        }


        info.textContent =
            data.description;

    }


    algorithm.addEventListener(
        "change",
        () => {

            updateAlgorithmInfo();

            output.value = "";

        }
    );


    /* ========================================
       HASH
    ======================================== */

    async function generateHash() {

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

            const encoder =
                new TextEncoder();


            const data =
                encoder.encode(
                    value
                );


            const hashBuffer =
                await crypto.subtle.digest(
                    algorithm.value,
                    data
                );


            const hashArray =
                Array.from(
                    new Uint8Array(
                        hashBuffer
                    )
                );


            const hash =
                hashArray
                    .map(
                        byte =>
                            byte
                                .toString(16)
                                .padStart(
                                    2,
                                    "0"
                                )
                    )
                    .join("");


            output.value =
                hash;


            showToolStatus(
                `${algorithm.value} Hash erfolgreich erzeugt.`,
                "success"
            );

        } catch (error) {

            output.value = "";

            showToolStatus(
                "Hash konnte nicht erzeugt werden.",
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            "Hello World!";


        output.value = "";


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

        input.value = "";

        output.value = "";


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

            if (!output.value) {

                showToolStatus(
                    "Es gibt noch keinen Hash zum Kopieren.",
                    "warning"
                );

                return;

            }


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
        generateHash
    );


    exampleButton.addEventListener(
        "click",
        loadExample
    );


    clearButton.addEventListener(
        "click",
        clearTool
    );


    /* ========================================
       INIT
    ======================================== */

    updateAlgorithmInfo();

}