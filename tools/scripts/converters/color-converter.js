/* ============================================
   COLOR CONVERTER
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
                        Color Converter
                    </h2>

                    <p class="tool-panel-description">
                        CSS-Farben zwischen HEX, RGB und HSL umwandeln.
                    </p>

                </div>

            </div>


            <div
                id="color-preview"
                style="
                    width: 100%;
                    height: 100px;
                    border-radius: 10px;
                    border: 1px solid var(--tool-border);
                    background: #ffffff;
                    margin-bottom: 14px;
                "
            ></div>


            <textarea
                id="color-input"
                class="tool-textarea"
                style="min-height: 100px;"
                placeholder="#6c8cff oder rgb(108, 140, 255)"
                spellcheck="false"
            ></textarea>


            <div class="tool-actions">

                <button
                    id="color-convert"
                    class="tool-button primary"
                    type="button"
                >
                    Konvertieren
                </button>


                <button
                    id="color-example"
                    class="tool-button"
                    type="button"
                >
                    Beispiel
                </button>


                <button
                    id="color-clear"
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
                        Ergebnisse
                    </h2>

                    <p class="tool-panel-description">
                        Die Farbe in verschiedenen CSS-Formaten.
                    </p>

                </div>

            </div>


            <textarea
                id="color-output"
                class="tool-textarea"
                readonly
                spellcheck="false"
                placeholder="Ergebnisse erscheinen hier..."
            ></textarea>


            <div class="tool-actions">

                <button
                    id="color-copy-hex"
                    class="tool-button"
                    type="button"
                >
                    HEX kopieren
                </button>


                <button
                    id="color-copy-rgb"
                    class="tool-button"
                    type="button"
                >
                    RGB kopieren
                </button>


                <button
                    id="color-copy-hsl"
                    class="tool-button"
                    type="button"
                >
                    HSL kopieren
                </button>

            </div>

        </section>

    `;


    /* ========================================
       ELEMENTS
    ======================================== */

    const input =
        document.getElementById("color-input");


    const output =
        document.getElementById("color-output");


    const preview =
        document.getElementById("color-preview");


    const convertButton =
        document.getElementById("color-convert");


    const exampleButton =
        document.getElementById("color-example");


    const clearButton =
        document.getElementById("color-clear");


    const copyHexButton =
        document.getElementById("color-copy-hex");


    const copyRgbButton =
        document.getElementById("color-copy-rgb");


    const copyHslButton =
        document.getElementById("color-copy-hsl");


    let currentColor = null;


    /* ========================================
       HELPERS
    ======================================== */

    function clamp(
        value,
        min,
        max
    ) {

        return Math.min(
            max,
            Math.max(
                min,
                value
            )
        );

    }


    function componentToHex(
        value
    ) {

        return Math.round(value)
            .toString(16)
            .padStart(2, "0");

    }


    function rgbToHex(
        r,
        g,
        b
    ) {

        return (
            "#" +
            componentToHex(r) +
            componentToHex(g) +
            componentToHex(b)
        );

    }


    /* ========================================
       HEX
    ======================================== */

    function parseHex(
        value
    ) {

        let hex =
            value
                .trim()
                .replace(
                    /^#/,
                    ""
                );


        /*
         * #RGB
         */

        if (
            /^[0-9a-fA-F]{3}$/.test(
                hex
            )
        ) {

            hex =
                hex
                    .split("")
                    .map(
                        char =>
                            char + char
                    )
                    .join("");

        }


        /*
         * #RGBA
         */

        if (
            /^[0-9a-fA-F]{4}$/.test(
                hex
            )
        ) {

            hex =
                hex
                    .split("")
                    .map(
                        char =>
                            char + char
                    )
                    .join("");

        }


        if (
            !/^[0-9a-fA-F]{6}$/.test(
                hex
            ) &&
            !/^[0-9a-fA-F]{8}$/.test(
                hex
            )
        ) {

            return null;

        }


        const r =
            parseInt(
                hex.substring(0, 2),
                16
            );


        const g =
            parseInt(
                hex.substring(2, 4),
                16
            );


        const b =
            parseInt(
                hex.substring(4, 6),
                16
            );


        let a = 1;


        if (
            hex.length === 8
        ) {

            a =
                parseInt(
                    hex.substring(6, 8),
                    16
                ) / 255;

        }


        return {
            r,
            g,
            b,
            a
        };

    }


    /* ========================================
       RGB
    ======================================== */

    function parseRgb(
        value
    ) {

        const match =
            value.match(
                /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i
            );


        if (!match) {

            return null;

        }


        const r =
            Number(match[1]);


        const g =
            Number(match[2]);


        const b =
            Number(match[3]);


        const a =
            match[4] !== undefined
                ? Number(match[4])
                : 1;


        if (
            !Number.isFinite(r) ||
            !Number.isFinite(g) ||
            !Number.isFinite(b) ||
            !Number.isFinite(a)
        ) {

            return null;

        }


        if (
            r > 255 ||
            g > 255 ||
            b > 255 ||
            a < 0 ||
            a > 1
        ) {

            return null;

        }


        return {
            r,
            g,
            b,
            a
        };

    }


    /* ========================================
       HSL → RGB
    ======================================== */

    function hslToRgb(
        h,
        s,
        l
    ) {

        h =
            ((h % 360) + 360) % 360 / 360;


        s =
            clamp(
                s,
                0,
                100
            ) / 100;


        l =
            clamp(
                l,
                0,
                100
            ) / 100;


        if (s === 0) {

            const value =
                Math.round(
                    l * 255
                );


            return {
                r: value,
                g: value,
                b: value
            };

        }


        const hueToRgb =
            (
                p,
                q,
                t
            ) => {

                if (t < 0) {
                    t += 1;
                }

                if (t > 1) {
                    t -= 1;
                }

                if (t < 1 / 6) {
                    return p +
                        (q - p) *
                        6 *
                        t;
                }

                if (t < 1 / 2) {
                    return q;
                }

                if (t < 2 / 3) {
                    return p +
                        (q - p) *
                        (
                            2 / 3 - t
                        ) *
                        6;
                }

                return p;

            };


        const q =
            l < 0.5
                ? l * (1 + s)
                : l + s - l * s;


        const p =
            2 * l - q;


        return {

            r:
                Math.round(
                    hueToRgb(
                        p,
                        q,
                        h + 1 / 3
                    ) * 255
                ),

            g:
                Math.round(
                    hueToRgb(
                        p,
                        q,
                        h
                    ) * 255
                ),

            b:
                Math.round(
                    hueToRgb(
                        p,
                        q,
                        h - 1 / 3
                    ) * 255
                )

        };

    }


    /* ========================================
       HSL
    ======================================== */

    function parseHsl(
        value
    ) {

        const match =
            value.match(
                /^hsla?\(\s*([\d.]+)(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/i
            );


        if (!match) {

            return null;

        }


        const h =
            Number(match[1]);


        const s =
            Number(match[2]);


        const l =
            Number(match[3]);


        const a =
            match[4] !== undefined
                ? Number(match[4])
                : 1;


        if (
            !Number.isFinite(h) ||
            !Number.isFinite(s) ||
            !Number.isFinite(l) ||
            !Number.isFinite(a)
        ) {

            return null;

        }


        if (
            s > 100 ||
            l > 100 ||
            a < 0 ||
            a > 1
        ) {

            return null;

        }


        const rgb =
            hslToRgb(
                h,
                s,
                l
            );


        return {
            ...rgb,
            a
        };

    }


    /* ========================================
       RGB → HSL
    ======================================== */

    function rgbToHsl(
        r,
        g,
        b
    ) {

        r /= 255;
        g /= 255;
        b /= 255;


        const max =
            Math.max(
                r,
                g,
                b
            );


        const min =
            Math.min(
                r,
                g,
                b
            );


        const difference =
            max - min;


        let h = 0;

        let s = 0;

        const l =
            (max + min) / 2;


        if (
            difference !== 0
        ) {

            s =
                l > 0.5
                    ? difference /
                        (
                            2 -
                            max -
                            min
                        )
                    : difference /
                        (
                            max +
                            min
                        );


            switch (max) {

                case r:

                    h =
                        (
                            g - b
                        ) /
                        difference +
                        (
                            g < b
                                ? 6
                                : 0
                        );

                    break;


                case g:

                    h =
                        (
                            b - r
                        ) /
                        difference +
                        2;

                    break;


                case b:

                    h =
                        (
                            r - g
                        ) /
                        difference +
                        4;

                    break;

            }


            h /= 6;

        }


        return {

            h:
                Math.round(
                    h * 360
                ),

            s:
                Math.round(
                    s * 100
                ),

            l:
                Math.round(
                    l * 100
                )

        };

    }


    /* ========================================
       PARSE COLOR
    ======================================== */

    function parseColor(
        value
    ) {

        const trimmed =
            value.trim();


        return (
            parseHex(trimmed) ||
            parseRgb(trimmed) ||
            parseHsl(trimmed)
        );

    }


    /* ========================================
       FORMAT OUTPUT
    ======================================== */

    function formatResults(
        color
    ) {

        const hex =
            rgbToHex(
                color.r,
                color.g,
                color.b
            );


        const rgb =
            `rgb(${color.r}, ${color.g}, ${color.b})`;


        const rgba =
            `rgba(${color.r}, ${color.g}, ${color.b}, ${Number(color.a.toFixed(3))})`;


        const hsl =
            rgbToHsl(
                color.r,
                color.g,
                color.b
            );


        const hslString =
            `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;


        const hslaString =
            `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${Number(color.a.toFixed(3))})`;


        output.value =
`HEX
${hex}

RGB
${rgb}

RGBA
${rgba}

HSL
${hslString}

HSLA
${hslaString}`;


        return {
            hex,
            rgb,
            hsl: hslString
        };

    }


    /* ========================================
       CONVERT
    ======================================== */

    function convertColor() {

        const value =
            input.value.trim();


        if (!value) {

            showToolStatus(
                "Bitte zuerst eine Farbe eingeben.",
                "warning"
            );

            return;

        }


        const color =
            parseColor(
                value
            );


        if (!color) {

            output.value = "";


            preview.style.background =
                "transparent";


            showToolStatus(
                "Ungültiges Farbformat. Verwende z. B. #6c8cff, rgb(108, 140, 255) oder hsl(226, 100%, 71%).",
                "error"
            );


            return;

        }


        currentColor =
            formatResults(
                color
            );


        preview.style.background =
            currentColor.hex;


        showToolStatus(
            "Farbe erfolgreich konvertiert.",
            "success"
        );

    }


    /* ========================================
       EXAMPLE
    ======================================== */

    function loadExample() {

        input.value =
            "#6c8cff";


        output.value = "";


        preview.style.background =
            "#ffffff";


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

        currentColor = null;


        preview.style.background =
            "transparent";


        showToolStatus(
            "Eingabe und Ausgabe geleert.",
            "success"
        );


        input.focus();

    }


    /* ========================================
       COPY HELPER
    ======================================== */

    async function copyColor(
        value,
        button
    ) {

        if (!value) {

            showToolStatus(
                "Bitte zuerst eine Farbe konvertieren.",
                "warning"
            );

            return;

        }


        const success =
            await copyToClipboard(
                value
            );


        if (!success) {

            return;

        }


        const originalText =
            button.textContent;


        button.textContent =
            "✓ Kopiert";


        setTimeout(
            () => {

                button.textContent =
                    originalText;

            },
            1500
        );

    }


    /* ========================================
       EVENTS
    ======================================== */

    convertButton.addEventListener(
        "click",
        convertColor
    );


    exampleButton.addEventListener(
        "click",
        loadExample
    );


    clearButton.addEventListener(
        "click",
        clearTool
    );


    copyHexButton.addEventListener(
        "click",
        () => {

            copyColor(
                currentColor?.hex,
                copyHexButton
            );

        }
    );


    copyRgbButton.addEventListener(
        "click",
        () => {

            copyColor(
                currentColor?.rgb,
                copyRgbButton
            );

        }
    );


    copyHslButton.addEventListener(
        "click",
        () => {

            copyColor(
                currentColor?.hsl,
                copyHslButton
            );

        }
    );

}