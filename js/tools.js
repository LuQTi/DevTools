/* ============================================
   DEVTOOLS - TOOLS
============================================ */


/* ============================================
   CATEGORIES
============================================ */

const CATEGORIES = {

    web: {
        name: "Web",
        icon: "🌐",
        order: 1
    },

    code: {
        name: "Code",
        icon: "💻",
        order: 2
    },

    data: {
        name: "Daten",
        icon: "📊",
        order: 3
    },

    linux: {
        name: "Linux",
        icon: "🐧",
        order: 4
    }

};


/* ============================================
   TOOLS
============================================ */

const TOOLS = {


    /* ========================================
       WEB
    ======================================== */

    "url-encoder-decoder": {

        name: "URL Encoder / Decoder",

        description:
            "URLs encodieren und decodieren.",

        icon: "🔗",

        category: "web",

        tags:
            "url encode decode encoder decoder uri",

        script:
            "scripts/url-encoder-decoder.js"

    },


    "url-parser": {

        name: "URL Parser",

        description:
            "Analysiert eine URL und zeigt ihre einzelnen Bestandteile.",

        icon: "🔍",

        category: "web",

        tags:
            "url parser analyse hostname protocol port path query parameter",

        script:
            "scripts/url-parser.js"

    },


    "html-formatter": {

        name: "HTML Formatter",

        description:
            "HTML-Code automatisch formatieren und übersichtlich einrücken.",

        icon: "🌐",

        category: "web",

        tags:
            "html formatter format beautify code",

        script:
            "scripts/html-formatter.js",

        comingSoon: true

    },


    "css-formatter": {

        name: "CSS Formatter",

        description:
            "CSS-Code automatisch formatieren und übersichtlich einrücken.",

        icon: "🎨",

        category: "web",

        tags:
            "css formatter format beautify code",

        script:
            "scripts/css-formatter.js",

        comingSoon: true

    },


    "html-entity-encoder-decoder": {

        name: "HTML Entity Encoder / Decoder",

        description:
            "HTML-Entities encodieren und decodieren.",

        icon: "🔤",

        category: "web",

        tags:
            "html entity encode decode entities",

        script:
            "scripts/html-entity-encoder-decoder.js",

        comingSoon: true

    },


    "color-converter": {

        name: "Color Converter",

        description:
            "Farben zwischen HEX, RGB und HSL umwandeln.",

        icon: "🎨",

        category: "web",

        tags:
            "color hex rgb hsl converter farbe",

        script:
            "scripts/color-converter.js",

        comingSoon: true

    },


    /* ========================================
       CODE
    ======================================== */

    "base64-encoder-decoder": {

        name: "Base64 Encoder / Decoder",

        description:
            "Text mit Base64 encodieren und decodieren.",

        icon: "🔐",

        category: "code",

        tags:
            "base64 encode decode encoder decoder text",

        script:
            "scripts/base64-encoder-decoder.js"

    },


    "regex-tester": {

        name: "Regex Tester",

        description:
            "Reguläre Ausdrücke testen und passende Treffer anzeigen.",

        icon: "🔎",

        category: "code",

        tags:
            "regex regexp regular expression tester test pattern",

        script:
            "scripts/regex-tester.js",

        comingSoon: true

    },


    "javascript-formatter": {

        name: "JavaScript Formatter",

        description:
            "JavaScript-Code automatisch formatieren und übersichtlich darstellen.",

        icon: "📜",

        category: "code",

        tags:
            "javascript js formatter beautify format code",

        script:
            "scripts/javascript-formatter.js",

        comingSoon: true

    },


    "jwt-decoder": {

        name: "JWT Decoder",

        description:
            "JSON Web Tokens analysieren und deren Header und Payload anzeigen.",

        icon: "🎫",

        category: "code",

        tags:
            "jwt json web token decoder token",

        script:
            "scripts/jwt-decoder.js",

        comingSoon: true

    },


    "uuid-generator": {

        name: "UUID Generator",

        description:
            "UUIDs schnell und einfach generieren.",

        icon: "🆔",

        category: "code",

        tags:
            "uuid guid generator random id",

        script:
            "scripts/uuid-generator.js",

        comingSoon: true

    },


    "hash-generator": {

        name: "Hash Generator",

        description:
            "Hashes für eingegebene Texte berechnen.",

        icon: "#️⃣",

        category: "code",

        tags:
            "hash md5 sha1 sha256 sha512 checksum",

        script:
            "scripts/hash-generator.js",

        comingSoon: true

    },


    /* ========================================
       DATA
    ======================================== */

javascriptFormatter: {
    name: "JavaScript Formatter",
    description: "JavaScript-Code automatisch formatieren und einrücken.",
    icon: "JS",
    category: "code",
    tags: "javascript js formatter format code beautify",
    script: "scripts/javascript-formatter.js",
    comingSoon: false
},

jsonFormatter: {
    name: "JSON Formatter",
    description: "JSON formatieren, minifizieren und validieren.",
    icon: "{ }",
    category: "code",
    tags: "json formatter minify validate format",
    script: "scripts/json-formatter.js",
    comingSoon: false
},


    "json-validator": {

        name: "JSON Validator",

        description:
            "JSON überprüfen und Syntaxfehler erkennen.",

        icon: "✅",

        category: "data",

        tags:
            "json validator validate prüfen syntax error",

        script:
            "scripts/json-validator.js",

        comingSoon: true

    },


    "timestamp-converter": {

        name: "Timestamp Converter",

        description:
            "Unix-Timestamps in lesbare Datumswerte umwandeln und umgekehrt.",

        icon: "🕐",

        category: "data",

        tags:
            "timestamp unix date time converter datum zeit",

        script:
            "scripts/timestamp-converter.js",

        comingSoon: true

    },


    /* ========================================
       LINUX
    ======================================== */

    "unix-permissions-calculator": {

        name: "Unix Permissions Calculator",

        description:
            "Linux- und Unix-Dateirechte berechnen und umwandeln.",

        icon: "🔐",

        category: "linux",

        tags:
            "linux unix chmod permissions permissions calculator rechte",

        script:
            "scripts/unix-permissions-calculator.js",

        comingSoon: true

    }

};