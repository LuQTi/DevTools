/* ============================================
   JSON ↔ XML CONVERTER
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
                        JSON ↔ XML Converter
                    </h2>

                    <p class="tool-panel-description">
                        JSON und XML ineinander umwandeln.
                    </p>

                </div>

            </div>


            <textarea
                id="json-xml-input"
                class="tool-textarea"
                placeholder='JSON:
{
    "name": "Max",
    "age": 25
}

oder XML:
<root>
    <name>Max</name>
    <age>25</age>
</root>'
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="json-xml-to-xml"
                    class="tool-button primary"
                    type="button"
                >
                    JSON → XML
                </button>


                <button
                    id="json-xml-to-json"
                    class="tool-button"
                    type="button"
                >
                    XML → JSON
                </button>


                <button
                    id="json-xml-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="json-xml-clear"
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
                id="json-xml-output"
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
            "json-xml-input"
        );


    const output =
        document.getElementById(
            "json-xml-output"
        );


    const jsonToXmlButton =
        document.getElementById(
            "json-xml-to-xml"
        );


    const xmlToJsonButton =
        document.getElementById(
            "json-xml-to-json"
        );


    const exampleButton =
        document.getElementById(
            "json-xml-example"
        );


    const clearButton =
        document.getElementById(
            "json-xml-clear"
        );


    /* ========================================
       XML ESCAPE
    ======================================== */

    function escapeXml(
        value
    ) {

        return String(value)
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
                "&apos;"
            );

    }


    /* ========================================
       XML → JSON VALUE
    ======================================== */

    function xmlNodeToValue(
        node
    ) {

        const elements =
            Array.from(
                node.children
            );


        const text =
            Array.from(
                node.childNodes
            )
                .filter(
                    child =>
                        child.nodeType ===
                        Node.TEXT_NODE
                )
                .map(
                    child =>
                        child.nodeValue
                )
                .join("")
                .trim();


        /*
         * Einfacher Textknoten
         */

        if (
            elements.length === 0
        ) {

            return text;

        }


        const result = {};


        elements.forEach(
            child => {

                const name =
                    child.tagName;


                const value =
                    xmlNodeToValue(
                        child
                    );


                if (
                    Object.prototype.hasOwnProperty.call(
                        result,
                        name
                    )
                ) {

                    if (
                        !Array.isArray(
                            result[name]
                        )
                    ) {

                        result[name] = [
                            result[name]
                        ];

                    }


                    result[name].push(
                        value
                    );

                } else {

                    result[name] =
                        value;

                }

            }
        );


        return result;

    }


    /* ========================================
       JSON → XML
    ======================================== */

    function valueToXml(
        value,
        tagName,
        indent = 0
    ) {

        const spacing =
            " ".repeat(
                indent
            );


        /*
         * Array
         */

        if (
            Array.isArray(value)
        ) {

            return value
                .map(
                    item =>
                        valueToXml(
                            item,
                            tagName,
                            indent
                        )
                )
                .join("\n");

        }


        /*
         * Object
         */

        if (
            value !== null &&
            typeof value === "object"
        ) {

            const children =
                Object.entries(
                    value
                )
                    .map(
                        (
                            [
                                key,
                                childValue
                            ]
                        ) =>
                            valueToXml(
                                childValue,
                                key,
                                indent + 4
                            )
                    )
                    .join("\n");


            return `${spacing}<${tagName}>\n${children}\n${spacing}</${tagName}>`;

        }


        /*
         * Primitive value
         */

        return `${spacing}<${tagName}>${escapeXml(value)}</${tagName}>`;

    }


    /* ========================================
       JSON → XML
    ======================================== */

    function convertJsonToXml() {

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


            if (
                data === null ||
                typeof data !== "object"
            ) {

                throw new Error(
                    "Das JSON muss ein Objekt oder Array enthalten."
                );

            }


            let xml;


            if (
                Array.isArray(data)
            ) {

                xml =
                    [
                        "<root>",
                        data
                            .map(
                                item =>
                                    valueToXml(
                                        item,
                                        "item",
                                        4
                                    )
                            )
                            .join("\n"),
                        "</root>"
                    ].join("\n");

            } else {

                xml =
                    valueToXml(
                        data,
                        "root"
                    );

            }


            output.value =
                xml;


            showToolStatus(
                "JSON erfolgreich in XML umgewandelt.",
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
       XML → JSON
    ======================================== */

    function convertXmlToJson() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst XML eingeben.",
                "warning"
            );

            return;

        }


        try {

            const parser =
                new DOMParser();


            const document =
                parser.parseFromString(
                    value,
                    "application/xml"
                );


            const parserError =
                document.querySelector(
                    "parsererror"
                );


            if (
                parserError
            ) {

                throw new Error(
                    parserError.textContent
                );

            }


            if (
                !document.documentElement
            ) {

                throw new Error(
                    "Kein gültiges XML-Dokument gefunden."
                );

            }


            const result =
                xmlNodeToValue(
                    document.documentElement
                );


            const json =
                {

                    [document.documentElement.tagName]:
                        result

                };


            output.value =
                JSON.stringify(
                    json,
                    null,
                    4
                );


            showToolStatus(
                "XML erfolgreich in JSON umgewandelt.",
                "success"
            );

        } catch (error) {

            output.value =
                "";


            showToolStatus(
                `XML konnte nicht konvertiert werden: ${error.message}`,
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

    jsonToXmlButton.addEventListener(
        "click",
        convertJsonToXml
    );


    xmlToJsonButton.addEventListener(
        "click",
        convertXmlToJson
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