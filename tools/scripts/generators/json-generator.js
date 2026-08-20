/* ============================================
   JSON GENERATOR
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
                        JSON Generator
                    </h2>

                    <p class="tool-panel-description">
                        JSON-Testdaten für APIs, Anwendungen und Entwicklung generieren.
                    </p>

                </div>

            </div>


            <div class="tool-form-group">

                <label
                    for="json-count"
                    class="tool-label"
                >
                    Anzahl Objekte
                </label>

                <input
                    id="json-count"
                    class="tool-input"
                    type="number"
                    min="1"
                    max="100"
                    value="5"
                >

            </div>


            <div class="tool-form-group">

                <label class="tool-checkbox">

                    <input
                        id="json-name"
                        type="checkbox"
                        checked
                    >

                    <span>
                        Name
                    </span>

                </label>


                <label class="tool-checkbox">

                    <input
                        id="json-email"
                        type="checkbox"
                        checked
                    >

                    <span>
                        E-Mail
                    </span>

                </label>


                <label class="tool-checkbox">

                    <input
                        id="json-age"
                        type="checkbox"
                        checked
                    >

                    <span>
                        Alter
                    </span>

                </label>


                <label class="tool-checkbox">

                    <input
                        id="json-active"
                        type="checkbox"
                        checked
                    >

                    <span>
                        Aktiv
                    </span>

                </label>


                <label class="tool-checkbox">

                    <input
                        id="json-id"
                        type="checkbox"
                    >

                    <span>
                        ID
                    </span>

                </label>

            </div>


            <div class="tool-actions">

                <button
                    id="json-generate"
                    class="tool-button primary"
                    type="button"
                >
                    Generieren
                </button>


                <button
                    id="json-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="json-clear"
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
                        Generierte JSON-Testdaten.
                    </p>

                </div>

            </div>


            <textarea
                id="json-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Generiertes JSON erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="json-copy"
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
        document.getElementById(
            "json-count"
        );


    const nameInput =
        document.getElementById(
            "json-name"
        );


    const emailInput =
        document.getElementById(
            "json-email"
        );


    const ageInput =
        document.getElementById(
            "json-age"
        );


    const activeInput =
        document.getElementById(
            "json-active"
        );


    const idInput =
        document.getElementById(
            "json-id"
        );


    const output =
        document.getElementById(
            "json-output"
        );


    const generateButton =
        document.getElementById(
            "json-generate"
        );


    const exampleButton =
        document.getElementById(
            "json-example"
        );


    const clearButton =
        document.getElementById(
            "json-clear"
        );


    const copyButton =
        document.getElementById(
            "json-copy"
        );


    /* ========================================
       DATA
    ======================================== */

    const firstNames = [

        "Max",
        "Anna",
        "Tom",
        "Lisa",
        "Paul",
        "Laura",
        "Jonas",
        "Emma",
        "Felix",
        "Sophie"

    ];


    const lastNames = [

        "Müller",
        "Schmidt",
        "Schneider",
        "Fischer",
        "Weber",
        "Wagner",
        "Becker",
        "Hoffmann",
        "Klein",
        "Wolf"

    ];


    /* ========================================
       RANDOM
    ======================================== */

    function randomIndex(max) {

        const randomValues =
            new Uint32Array(1);


        crypto.getRandomValues(
            randomValues
        );


        return (
            randomValues[0] % max
        );

    }


    function randomItem(
        array
    ) {

        return array[
            randomIndex(
                array.length
            )
        ];

    }


    function randomNumber(
        min,
        max
    ) {

        return (
            Math.floor(
                Math.random() *
                (
                    max - min + 1
                )
            ) + min
        );

    }


    /* ========================================
       UUID
    ======================================== */

    function generateId() {

        return crypto.randomUUID();

    }


    /* ========================================
       GENERATE PERSON
    ======================================== */

    function generatePerson() {

        const firstName =
            randomItem(
                firstNames
            );


        const lastName =
            randomItem(
                lastNames
            );


        const person = {};


        if (idInput.checked) {

            person.id =
                generateId();

        }


        if (nameInput.checked) {

            person.name =
                `${firstName} ${lastName}`;

        }


        if (emailInput.checked) {

            person.email =
                `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

        }


        if (ageInput.checked) {

            person.age =
                randomNumber(
                    18,
                    80
                );

        }


        if (activeInput.checked) {

            person.active =
                randomIndex(2) === 1;

        }


        return person;

    }


    /* ========================================
       GENERATOR
    ======================================== */

    function generateJson() {

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


        if (
            !nameInput.checked &&
            !emailInput.checked &&
            !ageInput.checked &&
            !activeInput.checked &&
            !idInput.checked
        ) {

            showToolStatus(
                "Bitte mindestens ein Feld auswählen.",
                "warning"
            );

            return;

        }


        try {

            const data = [];


            for (
                let i = 0;
                i < count;
                i++
            ) {

                data.push(
                    generatePerson()
                );

            }


            output.value =
                JSON.stringify(
                    data,
                    null,
                    4
                );


            showToolStatus(
                `${count} JSON-Objekt${count === 1 ? "" : "e"} erfolgreich generiert.`,
                "success"
            );

        } catch {

            output.value = "";


            showToolStatus(
                "JSON konnte nicht generiert werden.",
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        countInput.value = 3;

        idInput.checked = true;

        nameInput.checked = true;

        emailInput.checked = true;

        ageInput.checked = true;

        activeInput.checked = true;


        output.value =
            JSON.stringify(
                [
                    {
                        id: "550e8400-e29b-41d4-a716-446655440000",
                        name: "Max Müller",
                        email: "max.mueller@example.com",
                        age: 24,
                        active: true
                    },
                    {
                        id: "6ba7b810-9dad-41d1-80b4-00c04fd430c8",
                        name: "Anna Schmidt",
                        email: "anna.schmidt@example.com",
                        age: 31,
                        active: true
                    },
                    {
                        id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
                        name: "Tom Fischer",
                        email: "tom.fischer@example.com",
                        age: 42,
                        active: false
                    }
                ],
                null,
                4
            );


        showToolStatus(
            "Beispiel geladen.",
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
        generateJson
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