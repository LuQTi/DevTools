/* ============================================
   JSON ↔ YAML CONVERTER
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
                        JSON ↔ YAML Converter
                    </h2>

                    <p class="tool-panel-description">
                        JSON und YAML ineinander umwandeln.
                    </p>

                </div>

            </div>


            <textarea
                id="json-yaml-input"
                class="tool-textarea"
                placeholder='JSON:
{
    "name": "Max",
    "age": 25
}

oder YAML:
name: Max
age: 25'
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="json-yaml-to-yaml"
                    class="tool-button primary"
                    type="button"
                >
                    JSON → YAML
                </button>


                <button
                    id="json-yaml-to-json"
                    class="tool-button"
                    type="button"
                >
                    YAML → JSON
                </button>


                <button
                    id="json-yaml-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="json-yaml-clear"
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
                        Konvertierte Daten.
                    </p>

                </div>

            </div>


            <textarea
                id="json-yaml-output"
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
            "json-yaml-input"
        );


    const output =
        document.getElementById(
            "json-yaml-output"
        );


    const jsonToYamlButton =
        document.getElementById(
            "json-yaml-to-yaml"
        );


    const yamlToJsonButton =
        document.getElementById(
            "json-yaml-to-json"
        );


    const exampleButton =
        document.getElementById(
            "json-yaml-example"
        );


    const clearButton =
        document.getElementById(
            "json-yaml-clear"
        );


    /* ========================================
       CHECK LIBRARY
    ======================================== */

    function getYamlLibrary() {

        if (
            typeof jsyaml !== "undefined"
        ) {

            return jsyaml;

        }


        if (
            typeof YAML !== "undefined"
        ) {

            return {

                load:
                    source =>
                        YAML.parse(
                            source
                        ),

                dump:
                    value =>
                        YAML.stringify(
                            value
                        )

            };

        }


        throw new Error(
            "Keine YAML-Bibliothek gefunden. Bitte js-yaml bzw. YAML in das Projekt einbinden."
        );

    }


    /* ========================================
       JSON → YAML
    ======================================== */

    function convertJsonToYaml() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst JSON eingeben.",
                "warning"
            );

            return;

        }


        try {

            const data =
                JSON.parse(
                    value
                );


            const yaml =
                getYamlLibrary()
                    .dump(
                        data
                    );


            output.value =
                yaml;


            showToolStatus(
                "JSON erfolgreich in YAML umgewandelt.",
                "success"
            );

        } catch (error) {

            output.value =
                "";


            showToolStatus(
                `JSON konnte nicht konvertiert werden: ${error.message}`,
                "error"
            );

        }

    }


    /* ========================================
       YAML → JSON
    ======================================== */

    function convertYamlToJson() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst YAML eingeben.",
                "warning"
            );

            return;

        }


        try {

            const data =
                getYamlLibrary()
                    .load(
                        value
                    );


            output.value =
                JSON.stringify(
                    data,
                    null,
                    4
                );


            showToolStatus(
                "YAML erfolgreich in JSON umgewandelt.",
                "success"
            );

        } catch (error) {

            output.value =
                "";


            showToolStatus(
                `YAML konnte nicht konvertiert werden: ${error.message}`,
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
`{
    "name": "Max",
    "age": 25,
    "languages": [
        "JavaScript",
        "HTML",
        "CSS"
    ],
    "developer": true
}`;


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

    jsonToYamlButton.addEventListener(
        "click",
        convertJsonToYaml
    );


    yamlToJsonButton.addEventListener(
        "click",
        convertYamlToJson
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