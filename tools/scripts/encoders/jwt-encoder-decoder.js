/* ============================================
   JWT ENCODER / DECODER
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
                        JWT Encoder / Decoder
                    </h2>

                    <p class="tool-panel-description">
                        JWTs analysieren, decodieren und zu Testzwecken erzeugen.
                    </p>

                </div>

            </div>


            <textarea
                id="jwt-input"
                class="tool-textarea"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="jwt-decode"
                    class="tool-button primary"
                    type="button"
                >
                    Decodieren
                </button>


                <button
                    id="jwt-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="jwt-clear"
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
                        JWT Generator
                    </h2>

                    <p class="tool-panel-description">
                        Header und Payload bearbeiten und einen signierten Test-JWT erzeugen.
                    </p>

                </div>

            </div>


            <label for="jwt-header">
                Header
            </label>

            <textarea
                id="jwt-header"
                class="tool-textarea"
                placeholder='{"alg":"HS256","typ":"JWT"}'
                spellcheck="false"
            ></textarea>


            <label for="jwt-payload">
                Payload
            </label>

            <textarea
                id="jwt-payload"
                class="tool-textarea"
                placeholder='{"sub":"123","name":"Max"}'
                spellcheck="false"
            ></textarea>


            <label for="jwt-secret">
                Secret
            </label>

            <input
                id="jwt-secret"
                class="tool-input"
                type="text"
                placeholder="Test-Secret"
                autocomplete="off"
            />


            <div class="tool-actions">

                <button
                    id="jwt-generate"
                    class="tool-button primary"
                    type="button"
                >
                    JWT generieren
                </button>

            </div>


            <textarea
                id="jwt-generated"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Generierter JWT erscheint hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="jwt-copy"
                    class="tool-button"
                    type="button"
                >
                    Kopieren
                </button>

            </div>

        </section>


        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        Decodiertes JWT
                    </h2>

                    <p class="tool-panel-description">
                        Header und Payload des eingegebenen Tokens.
                    </p>

                </div>

            </div>


            <label for="jwt-decoded-header">
                Header
            </label>

            <textarea
                id="jwt-decoded-header"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Header erscheint hier..."
            ></textarea>


            <label for="jwt-decoded-payload">
                Payload
            </label>

            <textarea
                id="jwt-decoded-payload"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Payload erscheint hier..."
            ></textarea>


            <label for="jwt-signature">
                Signature
            </label>

            <textarea
                id="jwt-signature"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Signature erscheint hier..."
            ></textarea>

        </section>

    `;


    /* ========================================
       ELEMENTS
    ======================================== */

    const input =
        document.getElementById(
            "jwt-input"
        );


    const headerInput =
        document.getElementById(
            "jwt-header"
        );


    const payloadInput =
        document.getElementById(
            "jwt-payload"
        );


    const secretInput =
        document.getElementById(
            "jwt-secret"
        );


    const decodeButton =
        document.getElementById(
            "jwt-decode"
        );


    const generateButton =
        document.getElementById(
            "jwt-generate"
        );


    const exampleButton =
        document.getElementById(
            "jwt-example"
        );


    const clearButton =
        document.getElementById(
            "jwt-clear"
        );


    const copyButton =
        document.getElementById(
            "jwt-copy"
        );


    const generatedOutput =
        document.getElementById(
            "jwt-generated"
        );


    const decodedHeader =
        document.getElementById(
            "jwt-decoded-header"
        );


    const decodedPayload =
        document.getElementById(
            "jwt-decoded-payload"
        );


    const signatureOutput =
        document.getElementById(
            "jwt-signature"
        );


    /* ========================================
       BASE64URL
    ======================================== */

    function base64UrlEncode(
        value
    ) {

        const bytes =
            new TextEncoder().encode(
                value
            );


        let binary = "";


        bytes.forEach(
            byte => {

                binary +=
                    String.fromCharCode(
                        byte
                    );

            }
        );


        return btoa(binary)
            .replace(
                /\+/g,
                "-"
            )
            .replace(
                /\//g,
                "_"
            )
            .replace(
                /=+$/,
                ""
            );

    }


    function base64UrlDecode(
        value
    ) {

        const normalized =
            value
                .replace(
                    /-/g,
                    "+"
                )
                .replace(
                    /_/g,
                    "/"
                );


        const padding =
            "=".repeat(
                (4 - normalized.length % 4) % 4
            );


        const binary =
            atob(
                normalized + padding
            );


        const bytes =
            Uint8Array.from(
                binary,
                character =>
                    character.charCodeAt(0)
            );


        return new TextDecoder().decode(
            bytes
        );

    }


    /* ========================================
       DECODE JWT
    ======================================== */

    function decodeJwt(
        token
    ) {

        const parts =
            token.trim().split(".");


        if (
            parts.length !== 3
        ) {

            throw new Error(
                "Ungültiger JWT. Ein JWT muss aus drei Teilen bestehen."
            );

        }


        let header;
        let payload;


        try {

            header =
                JSON.parse(
                    base64UrlDecode(
                        parts[0]
                    )
                );


            payload =
                JSON.parse(
                    base64UrlDecode(
                        parts[1]
                    )
                );

        } catch {

            throw new Error(
                "Header oder Payload konnte nicht decodiert werden."
            );

        }


        return {

            header,

            payload,

            signature:
                parts[2]

        };

    }


    /* ========================================
       DECODE HANDLER
    ======================================== */

    function handleDecode() {

        const token =
            input.value.trim();


        if (!token) {

            showToolStatus(
                "Bitte zuerst einen JWT eingeben.",
                "warning"
            );

            return;

        }


        try {

            const result =
                decodeJwt(
                    token
                );


            decodedHeader.value =
                JSON.stringify(
                    result.header,
                    null,
                    4
                );


            decodedPayload.value =
                JSON.stringify(
                    result.payload,
                    null,
                    4
                );


            signatureOutput.value =
                result.signature;


            showToolStatus(
                "JWT erfolgreich decodiert.",
                "success"
            );

        } catch (error) {

            decodedHeader.value =
                "";


            decodedPayload.value =
                "";


            signatureOutput.value =
                "";


            showToolStatus(
                error.message ||
                    "JWT konnte nicht decodiert werden.",
                "error"
            );

        }

    }


    /* ========================================
       HMAC SHA-256
    ======================================== */

    async function createSignature(
        data,
        secret
    ) {

        const encoder =
            new TextEncoder();


        const key =
            await crypto.subtle.importKey(
                "raw",
                encoder.encode(
                    secret
                ),
                {
                    name: "HMAC",
                    hash: "SHA-256"
                },
                false,
                [
                    "sign"
                ]
            );


        const signature =
            await crypto.subtle.sign(
                "HMAC",
                key,
                encoder.encode(
                    data
                )
            );


        const bytes =
            new Uint8Array(
                signature
            );


        let binary = "";


        bytes.forEach(
            byte => {

                binary +=
                    String.fromCharCode(
                        byte
                    );

            }
        );


        return btoa(binary)
            .replace(
                /\+/g,
                "-"
            )
            .replace(
                /\//g,
                "_"
            )
            .replace(
                /=+$/,
                ""
            );

    }


    /* ========================================
       GENERATE JWT
    ======================================== */

    async function handleGenerate() {

        const secret =
            secretInput.value;


        if (!secret) {

            showToolStatus(
                "Bitte ein Secret eingeben.",
                "warning"
            );

            return;

        }


        try {

            const header =
                JSON.parse(
                    headerInput.value
                );


            const payload =
                JSON.parse(
                    payloadInput.value
                );


            if (
                header.alg !==
                "HS256"
            ) {

                throw new Error(
                    "Der Generator unterstützt aktuell nur HS256."
                );

            }


            const encodedHeader =
                base64UrlEncode(
                    JSON.stringify(
                        header
                    )
                );


            const encodedPayload =
                base64UrlEncode(
                    JSON.stringify(
                        payload
                    )
                );


            const unsignedToken =
                encodedHeader +
                "." +
                encodedPayload;


            const signature =
                await createSignature(
                    unsignedToken,
                    secret
                );


            generatedOutput.value =
                unsignedToken +
                "." +
                signature;


            showToolStatus(
                "JWT erfolgreich generiert.",
                "success"
            );

        } catch (error) {

            generatedOutput.value =
                "";


            showToolStatus(
                error.message ||
                    "JWT konnte nicht generiert werden.",
                "error"
            );

        }

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
            "eyJzdWIiOiIxMjMiLCJuYW1lIjoiTWF4IiwiYWRtaW4iOnRydWV9." +
            "example-signature";


        headerInput.value =
            JSON.stringify(
                {
                    alg: "HS256",
                    typ: "JWT"
                },
                null,
                4
            );


        payloadInput.value =
            JSON.stringify(
                {
                    sub: "123",
                    name: "Max",
                    admin: true
                },
                null,
                4
            );


        secretInput.value =
            "test-secret";


        generatedOutput.value =
            "";


        decodedHeader.value =
            "";


        decodedPayload.value =
            "";


        signatureOutput.value =
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


        headerInput.value =
            "";


        payloadInput.value =
            "";


        secretInput.value =
            "";


        generatedOutput.value =
            "";


        decodedHeader.value =
            "";


        decodedPayload.value =
            "";


        signatureOutput.value =
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
                    generatedOutput.value
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

    decodeButton.addEventListener(
        "click",
        handleDecode
    );


    generateButton.addEventListener(
        "click",
        handleGenerate
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