/* ============================================
   UUID VALIDATOR
============================================ */

function initTool() {

    const container =
        document.getElementById("tool-container");


    container.innerHTML = `

        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        UUID Validator
                    </h2>

                    <p class="tool-panel-description">
                        UUIDs prüfen und Version sowie Variant erkennen.
                    </p>

                </div>

            </div>


            <textarea
                id="uuid-validator-input"
                class="tool-textarea"
                placeholder="550e8400-e29b-41d4-a716-446655440000"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="uuid-validator-validate"
                    class="tool-button primary"
                    type="button"
                >
                    UUID prüfen
                </button>


                <button
                    id="uuid-validator-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="uuid-validator-invalid"
                    class="tool-button"
                    type="button"
                >
                    Fehlerbeispiel
                </button>


                <button
                    id="uuid-validator-clear"
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
                        Validierung
                    </h2>

                    <p class="tool-panel-description">
                        Ergebnis der UUID-Prüfung.
                    </p>

                </div>

            </div>


            <textarea
                id="uuid-validator-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Noch keine Prüfung durchgeführt."
            ></textarea>

        </section>

    `;


    /* ========================================
       ELEMENTS
    ======================================== */

    const input =
        document.getElementById(
            "uuid-validator-input"
        );


    const output =
        document.getElementById(
            "uuid-validator-output"
        );


    const validateButton =
        document.getElementById(
            "uuid-validator-validate"
        );


    const exampleButton =
        document.getElementById(
            "uuid-validator-example"
        );


    const invalidButton =
        document.getElementById(
            "uuid-validator-invalid"
        );


    const clearButton =
        document.getElementById(
            "uuid-validator-clear"
        );


    /* ========================================
       UUID VALIDATION
    ======================================== */

    function validateUuid() {

        const value =
            input.value.trim();


        if (!value) {

            output.value =
                "Keine Eingabe vorhanden.";


            showToolStatus(
                "Bitte zuerst eine UUID eingeben.",
                "warning"
            );

            return;

        }


        const uuid =
            value.toLowerCase();


        /*
         * Standard UUID:
         *
         * 8-4-4-4-12
         */

        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;


        if (
            !uuidRegex.test(
                uuid
            )
        ) {

            const errors = [];


            if (
                value.length !== 36
            ) {

                errors.push(
                    `Falsche Länge: ${value.length} Zeichen. Eine Standard-UUID hat 36 Zeichen.`
                );

            }


            if (
                !uuid.includes("-")
            ) {

                errors.push(
                    "Die UUID benötigt Bindestriche im Format 8-4-4-4-12."
                );

            }


            if (
                /[^0-9a-f-]/i.test(
                    value
                )
            ) {

                errors.push(
                    "Die UUID enthält ungültige Zeichen. Erlaubt sind 0-9 und A-F."
                );

            }


            if (
                errors.length === 0
            ) {

                errors.push(
                    "Die UUID entspricht nicht dem Format 8-4-4-4-12."
                );

            }


            output.value =
                [
                    "✗ UUID ist ungültig.",
                    "",
                    ...errors.map(
                        (
                            error,
                            index
                        ) =>
                            `${index + 1}. ${error}`
                    )
                ].join("\n");


            showToolStatus(
                "UUID ist ungültig.",
                "error"
            );


            return;

        }


        /*
         * UUID Version:
         *
         * Das erste Zeichen des dritten
         * Blocks beschreibt die Version.
         */

        const version =
            uuid[14];


        /*
         * RFC 4122 / RFC 9562 Variant:
         *
         * Das erste Zeichen des vierten
         * Blocks beschreibt die Variant.
         */

        const variantCharacter =
            uuid[19];


        let variant =
            "Unbekannt";


        if (
            ["8", "9", "a", "b"]
                .includes(
                    variantCharacter
                )
        ) {

            variant =
                "RFC-konforme UUID";

        } else if (
            ["c", "d"]
                .includes(
                    variantCharacter
                )
        ) {

            variant =
                "Microsoft / reservierte Variant";

        } else if (
            ["e"]
                .includes(
                    variantCharacter
                )
        ) {

            variant =
                "Zukünftige / reservierte Variant";

        } else if (
            ["0", "1", "2", "3", "4", "5", "6", "7"]
                .includes(
                    variantCharacter
                )
        ) {

            variant =
                "NCS-kompatible Variant";

        }


        output.value =
            [
                "✓ UUID ist gültig.",
                "",
                `UUID: ${uuid}`,
                `Version: ${version}`,
                `Variant: ${variant}`,
                "",
                `Länge: ${value.length} Zeichen`,
                "Format: 8-4-4-4-12"
            ].join("\n");


        showToolStatus(
            "UUID ist gültig.",
            "success"
        );

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            "550e8400-e29b-41d4-a716-446655440000";


        output.value =
            "";


        showToolStatus(
            "Gültiges Beispiel geladen.",
            "success"
        );


        input.focus();

    }


    /* ========================================
       INVALID EXAMPLE
    ======================================== */

    function loadInvalidExample() {

        input.value =
            "550e8400-e29b-41d4-a716-44665544000Z";


        output.value =
            "";


        showToolStatus(
            "Fehlerbeispiel geladen.",
            "warning"
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

    validateButton.addEventListener(
        "click",
        validateUuid
    );


    exampleButton.addEventListener(
        "click",
        loadExample
    );


    invalidButton.addEventListener(
        "click",
        loadInvalidExample
    );


    clearButton.addEventListener(
        "click",
        clearTool
    );

}