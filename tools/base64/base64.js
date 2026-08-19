/* ============================================
   BASE64 TOOL
============================================ */


/* ============================================
   ELEMENTS
============================================ */

const input =
    document.getElementById("input");

const output =
    document.getElementById("output");

const encodeButton =
    document.getElementById("encode");

const decodeButton =
    document.getElementById("decode");

const exampleButton =
    document.getElementById("example");

const clearButton =
    document.getElementById("clear");


/* ============================================
   UTF-8 ENCODE
============================================ */

function encodeBase64(text) {

    const bytes =
        new TextEncoder().encode(text);


    let binary = "";


    bytes.forEach(
        byte => {

            binary += String.fromCharCode(
                byte
            );

        }
    );


    return btoa(binary);
}


/* ============================================
   UTF-8 DECODE
============================================ */

function decodeBase64(base64) {

    const binary =
        atob(base64);


    const bytes =
        Uint8Array.from(
            binary,
            character =>
                character.charCodeAt(0)
        );


    return new TextDecoder(
        "utf-8",
        {
            fatal: true
        }
    ).decode(bytes);
}


/* ============================================
   ENCODE
============================================ */

function encode() {

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

        output.value =
            encodeBase64(value);


        showToolStatus(
            "Text erfolgreich encodiert.",
            "success"
        );

    } catch {

        showToolStatus(
            "Der Text konnte nicht encodiert werden.",
            "error"
        );

    }

}


/* ============================================
   DECODE
============================================ */

function decode() {

    const value =
        input.value.trim();


    if (!value) {

        showToolStatus(
            "Bitte zuerst Base64-Daten eingeben.",
            "warning"
        );

        return;
    }


    try {

        output.value =
            decodeBase64(value);


        showToolStatus(
            "Base64 erfolgreich decodiert.",
            "success"
        );

    } catch {

        output.value = "";


        showToolStatus(
            "Die Base64-Daten enthalten keinen gültigen UTF-8-Text.",
            "error"
        );

    }

}


/* ============================================
   EXAMPLE
============================================ */

function loadExample() {

    input.value =
        "Hallo Welt! ÄÖÜ äöü € 🚀";


    output.value = "";


    showToolStatus(
        "Beispiel eingefügt.",
        "success"
    );

}


/* ============================================
   CLEAR
============================================ */

function clearTool() {

    input.value = "";

    output.value = "";


    showToolStatus(
        "Eingabe und Ausgabe geleert.",
        "success"
    );


    input.focus();
}


/* ============================================
   EVENTS
============================================ */

encodeButton.addEventListener(
    "click",
    encode
);


decodeButton.addEventListener(
    "click",
    decode
);


exampleButton.addEventListener(
    "click",
    loadExample
);


clearButton.addEventListener(
    "click",
    clearTool
);