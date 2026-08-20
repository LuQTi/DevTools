/* ============================================
   DEVTOOLS - UNIVERSAL TOOL LOADER
============================================ */


/* ============================================
   GET TOOL ID
============================================ */

const params =
    new URLSearchParams(
        window.location.search
    );


const toolId =
    params.get("id");


/* ============================================
   ELEMENTS
============================================ */

const toolContainer =
    document.getElementById(
        "tool-container"
    );


const toolTitle =
    document.getElementById(
        "tool-title"
    );


const toolDescription =
    document.getElementById(
        "tool-description"
    );


const toolIcon =
    document.getElementById(
        "tool-icon"
    );


/* ============================================
   CHECK TOOL
============================================ */

const tool =
    TOOLS[toolId];


if (!tool) {

    toolTitle.textContent =
        "Tool nicht gefunden";

    toolDescription.textContent =
        "Dieses Tool existiert nicht.";

    toolIcon.textContent =
        "❓";

} else {

    initializeTool();

}


/* ============================================
   INITIALIZE TOOL
============================================ */

function initializeTool() {

    toolTitle.textContent =
        tool.name;


    toolDescription.textContent =
        tool.description;


    toolIcon.textContent =
        tool.icon;


    loadToolScript();

}


/* ============================================
   LOAD TOOL SCRIPT
============================================ */

function loadToolScript() {

    const script =
        document.createElement(
            "script"
        );


    script.src =
        `../tools/scripts/${tool.script}`;


    script.onload =
        () => {

            if (
                typeof window.initTool ===
                "function"
            ) {

                window.initTool();

            } else {

                showToolLoadError(
                    "Das Tool besitzt keine initTool()-Funktion."
                );

            }

        };


    script.onerror =
        () => {

            showToolLoadError(
                `${tool.script} konnte nicht geladen werden.`
            );

        };


    document.body.appendChild(
        script
    );

}


/* ============================================
   ERROR
============================================ */

function showToolLoadError(message) {

    toolContainer.innerHTML = `

        <section class="tool-panel">

            <h2 class="tool-panel-title">
                Tool konnte nicht geladen werden
            </h2>

            <p class="tool-panel-description">
                ${message}
            </p>

        </section>

    `;

}