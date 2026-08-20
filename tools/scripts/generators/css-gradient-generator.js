/* ============================================
   CSS GRADIENT GENERATOR
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
                        CSS Gradient Generator
                    </h2>

                    <p class="tool-panel-description">
                        CSS-Verläufe erstellen und direkt als CSS-Code kopieren.
                    </p>

                </div>

            </div>


            <div class="tool-form-group">

                <label
                    for="gradient-type"
                    class="tool-label"
                >
                    Gradient-Typ
                </label>

                <select
                    id="gradient-type"
                    class="tool-input"
                >

                    <option value="linear">
                        Linear
                    </option>

                    <option value="radial">
                        Radial
                    </option>

                </select>

            </div>


            <div class="tool-form-group">

                <label
                    for="gradient-angle"
                    class="tool-label"
                >
                    Winkel: <span id="gradient-angle-value">90</span>°
                </label>

                <input
                    id="gradient-angle"
                    class="tool-input"
                    type="range"
                    min="0"
                    max="360"
                    value="90"
                >

            </div>


            <div class="tool-form-group">

                <label
                    for="gradient-color-1"
                    class="tool-label"
                >
                    Farbe 1
                </label>

                <input
                    id="gradient-color-1"
                    class="tool-input"
                    type="color"
                    value="#667eea"
                >

            </div>


            <div class="tool-form-group">

                <label
                    for="gradient-color-2"
                    class="tool-label"
                >
                    Farbe 2
                </label>

                <input
                    id="gradient-color-2"
                    class="tool-input"
                    type="color"
                    value="#764ba2"
                >

            </div>


            <div class="tool-actions">

                <button
                    id="gradient-generate"
                    class="tool-button primary"
                    type="button"
                >
                    Generieren
                </button>


                <button
                    id="gradient-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="gradient-random"
                    class="tool-button"
                    type="button"
                >
                    Zufällig
                </button>


                <button
                    id="gradient-clear"
                    class="tool-button"
                    type="button"
                >
                    Leeren
                </button>

            </div>


            <div
                id="gradient-preview"
                style="
                    width: 100%;
                    min-height: 180px;
                    border-radius: 12px;
                    margin-top: 20px;
                    border: 1px solid rgba(128,128,128,.25);
                "
            ></div>


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
                        CSS
                    </h2>

                    <p class="tool-panel-description">
                        Fertiger CSS-Code für den Gradient.
                    </p>

                </div>

            </div>


            <textarea
                id="gradient-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="CSS-Code erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="gradient-copy"
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

    const typeInput =
        document.getElementById(
            "gradient-type"
        );


    const angleInput =
        document.getElementById(
            "gradient-angle"
        );


    const angleValue =
        document.getElementById(
            "gradient-angle-value"
        );


    const color1Input =
        document.getElementById(
            "gradient-color-1"
        );


    const color2Input =
        document.getElementById(
            "gradient-color-2"
        );


    const preview =
        document.getElementById(
            "gradient-preview"
        );


    const output =
        document.getElementById(
            "gradient-output"
        );


    const generateButton =
        document.getElementById(
            "gradient-generate"
        );


    const exampleButton =
        document.getElementById(
            "gradient-example"
        );


    const randomButton =
        document.getElementById(
            "gradient-random"
        );


    const clearButton =
        document.getElementById(
            "gradient-clear"
        );


    const copyButton =
        document.getElementById(
            "gradient-copy"
        );


    /* ========================================
       BUILD GRADIENT
    ======================================== */

    function buildGradient() {

        const type =
            typeInput.value;


        const angle =
            angleInput.value;


        const color1 =
            color1Input.value;


        const color2 =
            color2Input.value;


        if (type === "radial") {

            return (
                `radial-gradient(circle, ${color1} 0%, ${color2} 100%)`
            );

        }


        return (
            `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`
        );

    }


    /* ========================================
       GENERATE
    ======================================== */

    function generateGradient(
        showStatus = true
    ) {

        const gradient =
            buildGradient();


        preview.style.background =
            gradient;


        output.value =
            `background: ${gradient};`;


        if (showStatus) {

            showToolStatus(
                "CSS-Gradient erfolgreich generiert.",
                "success"
            );

        }

    }


    /* ========================================
       RANDOM COLOR
    ======================================== */

    function randomColor() {

        const values =
            new Uint8Array(3);


        crypto.getRandomValues(
            values
        );


        return (
            "#" +
            Array.from(
                values
            )
                .map(
                    value =>
                        value
                            .toString(16)
                            .padStart(2, "0")
                )
                .join("")
        );

    }


    /* ========================================
       RANDOM GRADIENT
    ======================================== */

    function randomGradient() {

        color1Input.value =
            randomColor();


        color2Input.value =
            randomColor();


        angleInput.value =
            Math.floor(
                Math.random() * 361
            );


        angleValue.textContent =
            angleInput.value;


        typeInput.value =
            Math.random() > 0.5
                ? "linear"
                : "radial";


        generateGradient();

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        typeInput.value =
            "linear";


        angleInput.value =
            135;


        angleValue.textContent =
            "135";


        color1Input.value =
            "#667eea";


        color2Input.value =
            "#764ba2";


        generateGradient();


        showToolStatus(
            "Beispiel geladen.",
            "success"
        );

    }


    /* ========================================
       CLEAR
    ======================================== */

    function clearTool() {

        typeInput.value =
            "linear";


        angleInput.value =
            90;


        angleValue.textContent =
            "90";


        color1Input.value =
            "#000000";


        color2Input.value =
            "#ffffff";


        preview.style.background =
            "";


        output.value =
            "";


        showToolStatus(
            "Eingabe und Ausgabe geleert.",
            "success"
        );

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
       LIVE UPDATE
    ======================================== */

    angleInput.addEventListener(
        "input",
        () => {

            angleValue.textContent =
                angleInput.value;


            generateGradient(
                false
            );

        }
    );


    color1Input.addEventListener(
        "input",
        () => {

            generateGradient(
                false
            );

        }
    );


    color2Input.addEventListener(
        "input",
        () => {

            generateGradient(
                false
            );

        }
    );


    typeInput.addEventListener(
        "change",
        () => {

            generateGradient(
                false
            );

        }
    );


    /* ========================================
       EVENTS
    ======================================== */

    generateButton.addEventListener(
        "click",
        generateGradient
    );


    exampleButton.addEventListener(
        "click",
        loadExample
    );


    randomButton.addEventListener(
        "click",
        randomGradient
    );


    clearButton.addEventListener(
        "click",
        clearTool
    );


    /* ========================================
       INITIAL
    ======================================== */

    generateGradient(
        false
    );

}