/* ============================================
   DEVTOOLS - TOOL REGISTRY
============================================ */


/* ============================================
   CATEGORIES
============================================ */

const CATEGORIES = {

    formatters: {

        name: "Formatter",

        icon: "✨",

        order: 1

    },


    encoders: {

        name: "Encoder",

        icon: "🔐",

        order: 2

    },


    parsers: {

        name: "Parser",

        icon: "🔎",

        order: 3

    },


    generators: {

        name: "Generator",

        icon: "⚡",

        order: 4

    },


    converters: {

        name: "Converter",

        icon: "⇄",

        order: 5

    },


    validators: {

        name: "Validator",

        icon: "✓",

        order: 6

    }

};


/* ============================================
   TOOLS
============================================ */

const TOOLS = {


    /* ========================================
       FORMATTERS
    ======================================== */

    jsonFormatter: {

        name: "JSON Formatter",

        description:
            "JSON formatieren, einrücken und minifizieren.",

        icon: "{ }",

        category: "formatters",

        tags:
            "json formatter pretty print beautify minify format",

        script:
            "formatters/json-formatter.js",

        comingSoon: false

    },


    javascriptFormatter: {

        name: "JavaScript Formatter",

        description:
            "JavaScript-Code automatisch formatieren und einrücken.",

        icon: "JS",

        category: "formatters",

        tags:
            "javascript js formatter beautify pretty print format code",

        script:
            "formatters/javascript-formatter.js",

        comingSoon: false

    },


    htmlFormatter: {

        name: "HTML Formatter",

        description:
            "HTML-Code automatisch formatieren und übersichtlich einrücken.",

        icon: "</>",

        category: "formatters",

        tags:
            "html formatter beautify pretty print format markup web code",

        script:
            "formatters/html-formatter.js",

        comingSoon: false

    },


    cssFormatter: {

        name: "CSS Formatter",

        description:
            "CSS-Code automatisch formatieren und übersichtlich einrücken.",

        icon: "#",

        category: "formatters",

        tags:
            "css formatter beautify pretty print format stylesheet web code",

        script:
            "formatters/css-formatter.js",

        comingSoon: false

    },


    xmlFormatter: {

        name: "XML Formatter",

        description:
            "XML-Code übersichtlich formatieren und einrücken.",

        icon: "XML",

        category: "formatters",

        tags:
            "xml formatter beautify pretty print format markup code",

        script:
            "formatters/xml-formatter.js",

        comingSoon: false

    },


    sqlFormatter: {

        name: "SQL Formatter",

        description:
            "SQL-Abfragen übersichtlich formatieren und einrücken.",

        icon: "SQL",

        category: "formatters",

        tags:
            "sql formatter beautify pretty print query database mysql postgresql",

        script:
            "formatters/sql-formatter.js",

        comingSoon: false

    },


    phpFormatter: {

        name: "PHP Formatter",

        description:
            "PHP-Code automatisch formatieren und einrücken.",

        icon: "PHP",

        category: "formatters",

        tags:
            "php formatter beautify pretty print format code",

        script:
            "formatters/php-formatter.js",

        comingSoon: false

    },


    javaFormatter: {

        name: "Java Formatter",

        description:
            "Java-Code automatisch formatieren und einrücken.",

        icon: "☕",

        category: "formatters",

        tags:
            "java formatter beautify pretty print format code",

        script:
            "formatters/java-formatter.js",

        comingSoon: false

    },


    /* ========================================
       ENCODERS
    ======================================== */

    base64: {

        name: "Base64 Encoder / Decoder",

        description:
            "Text und Daten zwischen Klartext und Base64 umwandeln.",

        icon: "🔐",

        category: "encoders",

        tags:
            "base64 encode decode encoder decoder text data binary",

        script:
            "encoders/base64-encoder-decoder.js",

        comingSoon: false

    },


    urlEncoder: {

        name: "URL Encoder / Decoder",

        description:
            "URL-Komponenten mit Percent-Encoding encodieren und decodieren.",

        icon: "🔗",

        category: "encoders",

        tags:
            "url uri percent encoding encode decode escape query parameter web",

        script:
            "encoders/url-encoder-decoder.js",

        comingSoon: false

    },


    htmlEntityEncoderDecoder: {

        name: "HTML Entity Encoder / Decoder",

        description:
            "HTML-Sonderzeichen in Entities umwandeln und Entities wieder decodieren.",

        icon: "&amp;",

        category: "encoders",

        tags:
            "html entity entities encode decode escape unescape special characters",

        script:
            "encoders/html-entity-encoder-decoder.js",

        comingSoon: false

    },


    unicodeEncoderDecoder: {

        name: "Unicode Encoder / Decoder",

        description:
            "Text in Unicode-Escape-Sequenzen umwandeln und wieder decodieren.",

        icon: "🔤",

        category: "encoders",

        tags:
            "unicode utf8 utf16 escape sequence encode decode characters codepoint",

        script:
            "encoders/unicode-encoder-decoder.js",

        comingSoon: false

    },


    hexEncoderDecoder: {

        name: "Hex Encoder / Decoder",

        description:
            "Text und UTF-8-Bytes zwischen Klartext und Hexadezimaldarstellung umwandeln.",

        icon: "0x",

        category: "encoders",

        tags:
            "hex hexadecimal encode decode utf8 bytes byte text binary",

        script:
            "encoders/hex-encoder-decoder.js",

        comingSoon: false

    },


    asciiEncoderDecoder: {

        name: "ASCII Encoder / Decoder",

        description:
            "ASCII-Zeichen in numerische Werte umwandeln und ASCII-Werte decodieren.",

        icon: "A",

        category: "encoders",

        tags:
            "ascii encode decode text characters character codes numeric values",

        script:
            "encoders/ascii-encoder-decoder.js",

        comingSoon: false

    },


    jwtEncoderDecoder: {

        name: "JWT Encoder / Decoder",

        description:
            "JWTs decodieren, analysieren und signierte Test-Tokens erzeugen.",

        icon: "JWT",

        category: "encoders",

        tags:
            "jwt json web token decode encode token header payload claims authentication auth hs256",

        script:
            "encoders/jwt-encoder-decoder.js",

        comingSoon: false

    },


    binaryEncoderDecoder: {

        name: "Binary Encoder / Decoder",

        description:
            "Text in binäre UTF-8-Bytes umwandeln und Binärdaten wieder decodieren.",

        icon: "0101",

        category: "encoders",

        tags:
            "binary bits bytes encode decode utf8 text bitstream base2",

        script:
            "encoders/binary-encoder-decoder.js",

        comingSoon: false

    },


    /* ========================================
       PARSERS
    ======================================== */

    urlParser: {

        name: "URL Parser",

        description:
            "URLs analysieren und in ihre einzelnen Bestandteile zerlegen.",

        icon: "🔎",

        category: "parsers",

        tags:
            "url uri parser parse analyze analyse protocol scheme host hostname port path query parameters fragment",

        script:
            "parsers/url-parser.js",

        comingSoon: false

    },


    jsonParser: {

        name: "JSON Parser",

        description:
            "JSON analysieren, parsen und strukturiert darstellen.",

        icon: "{ }",

        category: "parsers",

        tags:
            "json parser parse analyze analyse object array data structure api",

        script:
            "parsers/json-parser.js",

        comingSoon: false

    },


    jwtParser: {

        name: "JWT Parser",

        description:
            "JWTs analysieren und Header, Payload und Claims anzeigen.",

        icon: "🔑",

        category: "parsers",

        tags:
            "jwt json web token parser parse decode header payload claims authentication auth token",

        script:
            "parsers/jwt-parser.js",

        comingSoon: false

    },


    queryStringParser: {

        name: "Query String Parser",

        description:
            "Query-Strings analysieren und URL-Parameter übersichtlich darstellen.",

        icon: "?=",

        category: "parsers",

        tags:
            "query string parser url parameters search params parse decode key value web api",

        script:
            "parsers/query-string-parser.js",

        comingSoon: false

    },


    cookieParser: {

        name: "Cookie Parser",

        description:
            "Cookie-Strings analysieren und in einzelne Cookies und Attribute zerlegen.",

        icon: "🍪",

        category: "parsers",

        tags:
            "cookie cookies parser parse http header web browser session attributes",

        script:
            "parsers/cookie-parser.js",

        comingSoon: false

    },


    httpHeaderParser: {

        name: "HTTP Header Parser",

        description:
            "HTTP-Header analysieren und in einzelne Name-Wert-Paare zerlegen.",

        icon: "📨",

        category: "parsers",

        tags:
            "http header parser parse request response api web content type authorization cache cors",

        script:
            "parsers/http-header-parser.js",

        comingSoon: false

    },


    userAgentParser: {

        name: "User-Agent Parser",

        description:
            "User-Agent-Strings analysieren und Browser, Betriebssystem und Gerät erkennen.",

        icon: "🌐",

        category: "parsers",

        tags:
            "user agent ua parser parse browser browser engine operating system os device http web",

        script:
            "parsers/user-agent-parser.js",

        comingSoon: false

    },


    cronParser: {

        name: "Cron Parser",

        description:
            "Cron-Ausdrücke analysieren und Zeitpläne verständlich darstellen.",

        icon: "⏱️",

        category: "parsers",

        tags:
            "cron crontab parser parse schedule scheduler linux unix automation job timing",

        script:
            "parsers/cron-parser.js",

        comingSoon: false

    },


    /* ========================================
       GENERATORS
    ======================================== */

    hashGenerator: {

        name: "Hash Generator",

        description:
            "Hashwerte mit verschiedenen Algorithmen erzeugen.",

        icon: "#",

        category: "generators",

        tags:
            "hash generator sha1 sha256 sha384 sha512 digest checksum cryptographic",

        script:
            "generators/hash-generator.js",

        comingSoon: false

    },


    uuidGenerator: {

        name: "UUID Generator",

        description:
            "UUIDs für Datenbanken, APIs und Anwendungen generieren.",

        icon: "🆔",

        category: "generators",

        tags:
            "uuid guid generator random unique identifier id v4",

        script:
            "generators/uuid-generator.js",

        comingSoon: false

    },


    passwordGenerator: {

        name: "Password Generator",

        description:
            "Zufällige Passwörter für Tests und Entwicklungsumgebungen generieren.",

        icon: "🔑",

        category: "generators",

        tags:
            "password passphrase generator random secure credentials development testing",

        script:
            "generators/password-generator.js",

        comingSoon: false

    },


    randomStringGenerator: {

        name: "Random String Generator",

        description:
            "Zufällige Zeichenfolgen für Tokens, Testdaten und IDs generieren.",

        icon: "🔀",

        category: "generators",

        tags:
            "random string generator token id identifier test data random characters",

        script:
            "generators/random-string-generator.js",

        comingSoon: false

    },


    timestampGenerator: {

        name: "Timestamp Generator",

        description:
            "Unix-Timestamps für APIs, Datenbanken und Logs erzeugen.",

        icon: "🕐",

        category: "generators",

        tags:
            "timestamp unix epoch time generator date datetime api database logs",

        script:
            "generators/timestamp-generator.js",

        comingSoon: false

    },


    jsonGenerator: {

        name: "JSON Generator",

        description:
            "JSON-Testdaten für APIs, Anwendungen und Entwicklung generieren.",

        icon: "{ }",

        category: "generators",

        tags:
            "json generator test data mock data api object array development",

        script:
            "generators/json-generator.js",

        comingSoon: false

    },


    htmlBoilerplateGenerator: {

        name: "HTML Boilerplate Generator",

        description:
            "Eine vollständige HTML5-Grundstruktur für neue Webseiten erzeugen.",

        icon: "</>",

        category: "generators",

        tags:
            "html html5 boilerplate template starter page website doctype meta viewport",

        script:
            "generators/html-boilerplate-generator.js",

        comingSoon: false

    },


    cssGradientGenerator: {

        name: "CSS Gradient Generator",

        description:
            "CSS-Gradienten erstellen und direkt als CSS-Code verwenden.",

        icon: "🌈",

        category: "generators",

        tags:
            "css gradient generator linear radial conic background color web design",

        script:
            "generators/css-gradient-generator.js",

        comingSoon: false

    },


    /* ========================================
       CONVERTERS
    ======================================== */

    colorConverter: {

        name: "Color Converter",

        description:
            "Farben zwischen HEX, RGB, RGBA und HSL umwandeln.",

        icon: "🎨",

        category: "converters",

        tags:
            "color converter hex rgb rgba hsl hsla css color web",

        script:
            "converters/color-converter.js",

        comingSoon: false

    },


    numberBaseConverter: {

        name: "Number Base Converter",

        description:
            "Zahlen zwischen Binär, Dezimal, Hexadezimal und Oktal umwandeln.",

        icon: "🔢",

        category: "converters",

        tags:
            "number base converter binary decimal hexadecimal hex octal radix base2 base8 base10 base16",

        script:
            "converters/number-base-converter.js",

        comingSoon: false

    },


    timestampConverter: {

        name: "Timestamp Converter",

        description:
            "Unix-Timestamps in Datum und Uhrzeit umwandeln und umgekehrt.",

        icon: "🕐",

        category: "converters",

        tags:
            "timestamp unix epoch time converter date datetime iso8601 api database",

        script:
            "converters/timestamp-converter.js",

        comingSoon: false

    },


    jsonYamlConverter: {

        name: "JSON ↔ YAML Converter",

        description:
            "JSON und YAML ineinander umwandeln.",

        icon: "🔄",

        category: "converters",

        tags:
            "json yaml converter convert configuration config data api serialization",

        script:
            "converters/json-yaml-converter.js",

        comingSoon: false

    },


    jsonXmlConverter: {

        name: "JSON ↔ XML Converter",

        description:
            "JSON und XML ineinander umwandeln.",

        icon: "🔄",

        category: "converters",

        tags:
            "json xml converter convert data api markup serialization web",

        script:
            "converters/json-xml-converter.js",

        comingSoon: false

    },


    csvJsonConverter: {

        name: "CSV ↔ JSON Converter",

        description:
            "CSV-Daten in JSON umwandeln und JSON als CSV exportieren.",

        icon: "📊",

        category: "converters",

        tags:
            "csv json converter convert data table spreadsheet rows columns export import",

        script:
            "converters/csv-json-converter.js",

        comingSoon: false

    },


    htmlEntityConverter: {

        name: "HTML Entity Converter",

        description:
            "HTML-Zeichen in Entities umwandeln und HTML-Entities decodieren.",

        icon: "🔤",

        category: "converters",

        tags:
            "html entity entities converter encode decode escape unescape special characters web",

        script:
            "converters/html-entity-converter.js",

        comingSoon: false

    },


    bytesConverter: {

        name: "Bytes Converter",

        description:
            "Speichergrößen zwischen Byte, KB, MB, GB, TB und PB umwandeln.",

        icon: "💾",

        category: "converters",

        tags:
            "bytes byte converter kb mb gb tb pb kib mib gib storage size data",

        script:
            "converters/bytes-converter.js",

        comingSoon: false

    },


    /* ========================================
       VALIDATORS
    ======================================== */

    jsonValidator: {

        name: "JSON Validator",

        description:
            "JSON prüfen und Syntaxfehler verständlich anzeigen.",

        icon: "{}",

        category: "validators",

        tags:
            "json validator validate syntax error parse object array api data",

        script:
            "validators/json-validator.js",

        comingSoon: false

    },


    htmlValidator: {

        name: "HTML Validator",

        description:
            "HTML-Struktur prüfen und häufige Syntaxfehler anzeigen.",

        icon: "HTML",

        category: "validators",

        tags:
            "html validator validate syntax markup structure elements attributes web",

        script:
            "validators/html-validator.js",

        comingSoon: false

    },


    cssValidator: {

        name: "CSS Validator",

        description:
            "CSS auf Syntaxfehler und ungültige Regeln prüfen.",

        icon: "CSS",

        category: "validators",

        tags:
            "css validator validate syntax stylesheet rules properties selectors web",

        script:
            "validators/css-validator.js",

        comingSoon: false

    },


    javascriptValidator: {

        name: "JavaScript Validator",

        description:
            "JavaScript auf Syntaxfehler prüfen und Fehlerposition anzeigen.",

        icon: "JS",

        category: "validators",

        tags:
            "javascript js validator validate syntax error code parsing ecmascript",

        script:
            "validators/javascript-validator.js",

        comingSoon: false

    },


    xmlValidator: {

        name: "XML Validator",

        description:
            "XML auf Syntaxfehler und korrekte Verschachtelung prüfen.",

        icon: "XML",

        category: "validators",

        tags:
            "xml validator validate syntax markup structure elements attributes well formed",

        script:
            "validators/xml-validator.js",

        comingSoon: false

    },


    urlValidator: {

        name: "URL Validator",

        description:
            "URLs auf eine gültige Struktur prüfen und Bestandteile anzeigen.",

        icon: "URL",

        category: "validators",

        tags:
            "url uri validator validate syntax protocol scheme host hostname port path query fragment http https",

        script:
            "validators/url-validator.js",

        comingSoon: false

    },


    uuidValidator: {

        name: "UUID Validator",

        description:
            "UUIDs prüfen und Version sowie Variant erkennen.",

        icon: "UUID",

        category: "validators",

        tags:
            "uuid guid validator validate identifier format version variant v1 v4 v7",

        script:
            "validators/uuid-validator.js",

        comingSoon: false

    },


    regexValidator: {

        name: "Regex Validator",

        description:
            "Reguläre Ausdrücke auf gültige Syntax prüfen und mit Testtexten testen.",

        icon: ".*",

        category: "validators",

        tags:
            "regex regexp regular expression validator validate pattern syntax test match flags",

        script:
            "validators/regex-validator.js",

        comingSoon: false

    }

};