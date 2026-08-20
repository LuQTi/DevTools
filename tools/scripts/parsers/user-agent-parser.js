/* ============================================
   USER-AGENT PARSER
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
                        User-Agent Parser
                    </h2>

                    <p class="tool-panel-description">
                        User-Agent-Strings analysieren und Browser, Betriebssystem und Gerät erkennen.
                    </p>

                </div>

            </div>


            <textarea
                id="user-agent-parser-input"
                class="tool-textarea"
                placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/..."
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="user-agent-parser-parse"
                    class="tool-button primary"
                    type="button"
                >
                    Analysieren
                </button>


                <button
                    id="user-agent-parser-current"
                    class="tool-button"
                    type="button"
                >
                    Mein Browser
                </button>


                <button
                    id="user-agent-parser-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="user-agent-parser-clear"
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
                        Analyse
                    </h2>

                    <p class="tool-panel-description">
                        Erkannte Informationen aus dem User-Agent.
                    </p>

                </div>

            </div>


            <div class="tool-actions">

                <button
                    class="tool-button"
                    type="button"
                >
                    Browser:
                    <span id="user-agent-browser">
                        —
                    </span>
                </button>


                <button
                    class="tool-button"
                    type="button"
                >
                    Betriebssystem:
                    <span id="user-agent-os">
                        —
                    </span>
                </button>


                <button
                    class="tool-button"
                    type="button"
                >
                    Gerät:
                    <span id="user-agent-device">
                        —
                    </span>
                </button>


                <button
                    class="tool-button"
                    type="button"
                >
                    Engine:
                    <span id="user-agent-engine">
                        —
                    </span>
                </button>

            </div>

        </section>


        <section class="tool-panel">

            <div class="tool-panel-header">

                <div>

                    <h2 class="tool-panel-title">
                        User-Agent
                    </h2>

                    <p class="tool-panel-description">
                        Der vollständige analysierte String.
                    </p>

                </div>

            </div>


            <textarea
                id="user-agent-parser-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="User-Agent erscheint hier..."
            ></textarea>

        </section>

    `;


    /* ========================================
       ELEMENTS
    ======================================== */

    const input =
        document.getElementById(
            "user-agent-parser-input"
        );


    const output =
        document.getElementById(
            "user-agent-parser-output"
        );


    const parseButton =
        document.getElementById(
            "user-agent-parser-parse"
        );


    const currentButton =
        document.getElementById(
            "user-agent-parser-current"
        );


    const exampleButton =
        document.getElementById(
            "user-agent-parser-example"
        );


    const clearButton =
        document.getElementById(
            "user-agent-parser-clear"
        );


    const browserOutput =
        document.getElementById(
            "user-agent-browser"
        );


    const osOutput =
        document.getElementById(
            "user-agent-os"
        );


    const deviceOutput =
        document.getElementById(
            "user-agent-device"
        );


    const engineOutput =
        document.getElementById(
            "user-agent-engine"
        );


    /* ========================================
       DETECT BROWSER
    ======================================== */

    function detectBrowser(
        userAgent
    ) {

        if (
            /Edg\/([\d.]+)/i.test(
                userAgent
            )
        ) {

            return "Microsoft Edge";

        }


        if (
            /OPR\/([\d.]+)/i.test(
                userAgent
            )
        ) {

            return "Opera";

        }


        if (
            /Firefox\/([\d.]+)/i.test(
                userAgent
            )
        ) {

            return "Firefox";

        }


        if (
            /Chrome\/([\d.]+)/i.test(
                userAgent
            ) &&
            !/Chromium/i.test(
                userAgent
            )
        ) {

            return "Google Chrome";

        }


        if (
            /CriOS\/([\d.]+)/i.test(
                userAgent
            )
        ) {

            return "Chrome iOS";

        }


        if (
            /Safari\/([\d.]+)/i.test(
                userAgent
            ) &&
            /Version\/([\d.]+)/i.test(
                userAgent
            )
        ) {

            return "Safari";

        }


        if (
            /FxiOS\/([\d.]+)/i.test(
                userAgent
            )
        ) {

            return "Firefox iOS";

        }


        return "Unbekannt";

    }


    /* ========================================
       DETECT OS
    ======================================== */

    function detectOperatingSystem(
        userAgent
    ) {

        if (
            /Windows NT 10\.0/i.test(
                userAgent
            )
        ) {

            return "Windows 10 / 11";

        }


        if (
            /Windows NT 6\.3/i.test(
                userAgent
            )
        ) {

            return "Windows 8.1";

        }


        if (
            /Windows NT 6\.2/i.test(
                userAgent
            )
        ) {

            return "Windows 8";

        }


        if (
            /Windows NT 6\.1/i.test(
                userAgent
            )
        ) {

            return "Windows 7";

        }


        if (
            /Android/i.test(
                userAgent
            )
        ) {

            return "Android";

        }


        if (
            /iPhone|iPad|iPod/i.test(
                userAgent
            )
        ) {

            return "iOS";

        }


        if (
            /Mac OS X/i.test(
                userAgent
            )
        ) {

            return "macOS";

        }


        if (
            /Linux/i.test(
                userAgent
            )
        ) {

            return "Linux";

        }


        return "Unbekannt";

    }


    /* ========================================
       DETECT DEVICE
    ======================================== */

    function detectDevice(
        userAgent
    ) {

        if (
            /iPad/i.test(
                userAgent
            )
        ) {

            return "Tablet";

        }


        if (
            /iPhone|Android.*Mobile|Windows Phone/i.test(
                userAgent
            )
        ) {

            return "Smartphone";

        }


        if (
            /Android/i.test(
                userAgent
            )
        ) {

            return "Tablet / Mobile";

        }


        return "Desktop";

    }


    /* ========================================
       DETECT ENGINE
    ======================================== */

    function detectEngine(
        userAgent
    ) {

        if (
            /Gecko\//i.test(
                userAgent
            ) &&
            /Firefox\//i.test(
                userAgent
            )
        ) {

            return "Gecko";

        }


        if (
            /AppleWebKit\//i.test(
                userAgent
            )
        ) {

            return "WebKit / Blink";

        }


        if (
            /Trident\//i.test(
                userAgent
            )
        ) {

            return "Trident";

        }


        return "Unbekannt";

    }


    /* ========================================
       PARSE
    ======================================== */

    function parseUserAgent() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst einen User-Agent eingeben.",
                "warning"
            );

            return;

        }


        browserOutput.textContent =
            detectBrowser(
                value
            );


        osOutput.textContent =
            detectOperatingSystem(
                value
            );


        deviceOutput.textContent =
            detectDevice(
                value
            );


        engineOutput.textContent =
            detectEngine(
                value
            );


        output.value =
            value;


        showToolStatus(
            "User-Agent erfolgreich analysiert.",
            "success"
        );

    }


    /* ========================================
       CURRENT USER-AGENT
    ======================================== */

    function loadCurrentUserAgent() {

        input.value =
            navigator.userAgent;


        parseUserAgent();

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";


        parseUserAgent();

    }


    /* ========================================
       CLEAR
    ======================================== */

    function clearTool() {

        input.value =
            "";


        output.value =
            "";


        browserOutput.textContent =
            "—";


        osOutput.textContent =
            "—";


        deviceOutput.textContent =
            "—";


        engineOutput.textContent =
            "—";


        showToolStatus(
            "Eingabe und Ergebnis geleert.",
            "success"
        );


        input.focus();

    }


    /* ========================================
       EVENTS
    ======================================== */

    parseButton.addEventListener(
        "click",
        parseUserAgent
    );


    currentButton.addEventListener(
        "click",
        loadCurrentUserAgent
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