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

    validators: {
        name: "Validator",
        icon: "✓",
        order: 2
    },

    encoders: {
        name: "Encoder",
        icon: "🔐",
        order: 3
    },

    parsers: {
        name: "Parser",
        icon: "🔎",
        order: 4
    },

    generators: {
        name: "Generator",
        icon: "⚡",
        order: 5
    },

    converters: {
        name: "Converter",
        icon: "⇄",
        order: 6
    },

    weiteres: {
        name: "Weiteres",
        icon: "🧰",
        order: 7
    }

};


/* ============================================
   TOOLS
============================================ */

const TOOLS = {


    /* ========================================
       FORMATTERS
    ======================================== */

    htmlFormatter: {
        name: "HTML Formatter",
        description:
            "HTML-Code automatisch formatieren und übersichtlich einrücken.",
        icon: "</>",
        category: "formatters",
        tags:
            "html formatter formatieren beautify pretty print code markup",
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
            "css formatter formatieren beautify pretty print code stylesheet",
        script:
            "formatters/css-formatter.js",
        comingSoon: false
    },

    javascriptFormatter: {
        name: "JavaScript Formatter",
        description:
            "JavaScript-Code automatisch formatieren und einrücken.",
        icon: "JS",
        category: "formatters",
        tags:
            "javascript js formatter formatieren beautify pretty print code",
        script:
            "formatters/javascript-formatter.js",
        comingSoon: false
    },

    jsonFormatter: {
        name: "JSON Formatter",
        description:
            "JSON formatieren, einrücken und minifizieren.",
        icon: "{ }",
        category: "formatters",
        tags:
            "json formatter formatieren beautify pretty print minify code",
        script:
            "formatters/json-formatter.js",
        comingSoon: false
    },

    javaFormatter: {
        name: "Java Formatter",
        description:
            "Java-Code automatisch formatieren und einrücken.",
        icon: "☕",
        category: "formatters",
        tags:
            "java formatter formatieren beautify pretty print code",
        script:
            "formatters/java-formatter.js",
        comingSoon: false
    },

    sqlFormatter: {
        name: "SQL Formatter",
        description:
            "SQL-Abfragen übersichtlich formatieren und einrücken.",
        icon: "SQL",
        category: "formatters",
        tags:
            "sql formatter formatieren beautify pretty print query datenbank",
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
            "php formatter formatieren beautify pretty print code",
        script:
            "formatters/php-formatter.js",
        comingSoon: false
    },

    xmlFormatter: {
        name: "XML Formatter",
        description:
            "XML-Code übersichtlich formatieren und einrücken.",
        icon: "XML",
        category: "formatters",
        tags:
            "xml formatter formatieren beautify pretty print code markup",
        script:
            "formatters/xml-formatter.js",
        comingSoon: false
    },


    /* ========================================
       VALIDATORS
    ======================================== */

    htmlValidator: {
        name: "HTML Validator",
        description:
            "HTML-Struktur prüfen und häufige Syntaxfehler anzeigen.",
        icon: "</>",
        category: "validators",
        tags:
            "html validator validieren prüfen syntax fehler struktur markup",
        script:
            "validators/html-validator.js",
        comingSoon: false
    },

    cssValidator: {
        name: "CSS Validator",
        description:
            "CSS auf Syntaxfehler und ungültige Regeln prüfen.",
        icon: "#",
        category: "validators",
        tags:
            "css validator validieren prüfen syntax fehler regeln stylesheet",
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
            "javascript js validator validieren prüfen syntax fehler code",
        script:
            "validators/javascript-validator.js",
        comingSoon: false
    },

    jsonValidator: {
        name: "JSON Validator",
        description:
            "JSON prüfen und Syntaxfehler verständlich anzeigen.",
        icon: "{ }",
        category: "validators",
        tags:
            "json validator validieren prüfen syntax fehler",
        script:
            "validators/json-validator.js",
        comingSoon: false
    },

    javaValidator: {
        name: "Java Validator",
        description:
            "Java-Code auf Syntaxfehler prüfen und Fehlerposition anzeigen.",
        icon: "☕",
        category: "validators",
        tags:
            "java validator validieren prüfen syntax fehler code",
        script:
            "validators/java-validator.js",
        comingSoon: false
    },

    sqlValidator: {
        name: "SQL Validator",
        description:
            "SQL-Abfragen auf grundlegende Syntaxfehler prüfen.",
        icon: "SQL",
        category: "validators",
        tags:
            "sql validator validieren prüfen syntax fehler query",
        script:
            "validators/sql-validator.js",
        comingSoon: false
    },

    phpValidator: {
        name: "PHP Validator",
        description:
            "PHP-Code auf Syntaxfehler prüfen und Fehlerposition anzeigen.",
        icon: "PHP",
        category: "validators",
        tags:
            "php validator validieren prüfen syntax fehler code",
        script:
            "validators/php-validator.js",
        comingSoon: false
    },

    xmlValidator: {
        name: "XML Validator",
        description:
            "XML auf Syntaxfehler und korrekte Verschachtelung prüfen.",
        icon: "XML",
        category: "validators",
        tags:
            "xml validator validieren prüfen syntax fehler struktur markup",
        script:
            "validators/xml-validator.js",
        comingSoon: false
    },


    /* ========================================
       ENCODERS
    ======================================== */

    base64: {
        name: "Base64 Encoder / Decoder",
        description:
            "Text und Daten zwischen Klartext und Base64 umwandeln.",
        icon: "64",
        category: "encoders",
        tags:
            "base64 encoder decoder encode decode text daten",
        script:
            "encoders/base64-encoder-decoder.js",
        comingSoon: false
    },

    htmlEntityEncoderDecoder: {
        name: "HTML Entity Encoder / Decoder",
        description:
            "HTML-Sonderzeichen in Entities umwandeln und Entities wieder decodieren.",
        icon: "&amp;",
        category: "encoders",
        tags:
            "html entity encoder decoder encode decode sonderzeichen",
        script:
            "encoders/html-entity-encoder-decoder.js",
        comingSoon: false
    },

    jwtEncoderDecoder: {
        name: "JWT Encoder / Decoder",
        description:
            "JWTs decodieren, analysieren und signierte Test-Tokens erzeugen.",
        icon: "JWT",
        category: "encoders",
        tags:
            "jwt json web token encoder decoder token header payload",
        script:
            "encoders/jwt-encoder-decoder.js",
        comingSoon: false
    },

    urlEncoder: {
        name: "URL Encoder / Decoder",
        description:
            "URL-Komponenten mit Percent-Encoding encodieren und decodieren.",
        icon: "URL",
        category: "encoders",
        tags:
            "url uri encoder decoder encode decode percent encoding",
        script:
            "encoders/url-encoder-decoder.js",
        comingSoon: false
    },

    unicodeEncoderDecoder: {
        name: "Unicode Encoder / Decoder",
        description:
            "Text in Unicode-Escape-Sequenzen umwandeln und wieder decodieren.",
        icon: "🔤",
        category: "encoders",
        tags:
            "unicode utf8 utf16 encoder decoder encode decode escape",
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
            "hex hexadecimal encoder decoder encode decode utf8 bytes",
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
            "ascii encoder decoder encode decode zeichen text character",
        script:
            "encoders/ascii-encoder-decoder.js",
        comingSoon: false
    },

    binaryEncoderDecoder: {
        name: "Binary Encoder / Decoder",
        description:
            "Text in binäre UTF-8-Bytes umwandeln und Binärdaten wieder decodieren.",
        icon: "0101",
        category: "encoders",
        tags:
            "binary binär encoder decoder encode decode bits bytes utf8",
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
        icon: "URL",
        category: "parsers",
        tags:
            "url uri parser parse analysieren protocol host port path query",
        script:
            "parsers/url-parser.js",
        comingSoon: false
    },

    cssParser: {
        name: "CSS Parser",
        description:
            "CSS-Code analysieren und Selektoren, Regeln und Deklarationen strukturiert darstellen.",
        icon: "#",
        category: "parsers",
        tags:
            "css parser parse analysieren selector selektor regeln deklarationen",
        script:
            "parsers/css-parser.js",
        comingSoon: false
    },

    jsonParser: {
        name: "JSON Parser",
        description:
            "JSON analysieren, parsen und strukturiert darstellen.",
        icon: "{ }",
        category: "parsers",
        tags:
            "json parser parse analysieren struktur object array daten",
        script:
            "parsers/json-parser.js",
        comingSoon: false
    },

    jwtParser: {
        name: "JWT Parser",
        description:
            "JWTs analysieren und Header, Payload und Claims anzeigen.",
        icon: "JWT",
        category: "parsers",
        tags:
            "jwt json web token parser parse analysieren header payload claims",
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
            "query string parser url parameter parse analysieren key value",
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
            "cookie cookies parser parse analysieren http browser attribute",
        script:
            "parsers/cookie-parser.js",
        comingSoon: false
    },

    httpHeaderParser: {
        name: "HTTP Header Parser",
        description:
            "HTTP-Header analysieren und in einzelne Name-Wert-Paare zerlegen.",
        icon: "HTTP",
        category: "parsers",
        tags:
            "http header parser parse analysieren request response",
        script:
            "parsers/http-header-parser.js",
        comingSoon: false
    },

    cronParser: {
        name: "Cron Parser",
        description:
            "Cron-Ausdrücke analysieren und Zeitpläne verständlich darstellen.",
        icon: "⏱️",
        category: "parsers",
        tags:
            "cron crontab parser parse analysieren schedule zeitplan linux",
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
            "hash generator sha1 sha256 sha384 sha512 checksum",
        script:
            "generators/hash-generator.js",
        comingSoon: false
    },

    uuidGenerator: {
        name: "UUID Generator",
        description:
            "UUIDs für Datenbanken, APIs und Anwendungen generieren.",
        icon: "UUID",
        category: "generators",
        tags:
            "uuid guid generator random identifier id v4 v7",
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
            "password passwort generator random zufällig sicher secure",
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
            "random string generator zeichenfolge zufällig token id",
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
            "timestamp unix epoch generator datum zeit uhrzeit",
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
            "json generator testdaten mock daten api object array",
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
            "html html5 boilerplate generator grundstruktur template doctype",
        script:
            "generators/html-boilerplate-generator.js",
        comingSoon: false
    },

    cssGradientGenerator: {
        name: "CSS Gradient Generator",
        description:
            "CSS-Gradienten erstellen und direkt als CSS-Code verwenden.",
        icon: "#",
        category: "generators",
        tags:
            "css gradient generator verlauf linear radial conic farbe",
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
            "color farbe converter hex rgb rgba hsl",
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
            "number zahl converter binary binär decimal dezimal hex hexadecimal octal",
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
            "timestamp unix epoch converter datum zeit uhrzeit",
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
            "json yaml converter umwandeln konvertieren config daten",
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
            "json xml converter umwandeln konvertieren daten",
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
            "csv json converter umwandeln konvertieren daten tabelle import export",
        script:
            "converters/csv-json-converter.js",
        comingSoon: false
    },

    htmlEntityConverter: {
        name: "HTML Entity Converter",
        description:
            "HTML-Zeichen in Entities umwandeln und HTML-Entities decodieren.",
        icon: "&amp;",
        category: "converters",
        tags:
            "html entity converter encode decode sonderzeichen entities",
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
            "bytes byte converter kb mb gb tb pb speichergröße",
        script:
            "converters/bytes-converter.js",
        comingSoon: false
    },


    /* ========================================
       WEITERES
    ======================================== */

    userAgentParser: {
        name: "User-Agent Parser",
        description:
            "User-Agent-Strings analysieren und Browser, Betriebssystem und Gerät erkennen.",
        icon: "🌐",
        category: "weiteres",
        tags:
            "user agent ua parser browser betriebssystem os gerät device",
        script:
            "weiteres/user-agent-parser.js",
        comingSoon: false
    },

    urlValidator: {
        name: "URL Validator",
        description:
            "URLs auf eine gültige Struktur prüfen und Bestandteile anzeigen.",
        icon: "URL",
        category: "weiteres",
        tags:
            "url uri validator validieren prüfen syntax http https domain host",
        script:
            "weiteres/url-validator.js",
        comingSoon: false
    },

    uuidValidator: {
        name: "UUID Validator",
        description:
            "UUIDs prüfen und Version sowie Variant erkennen.",
        icon: "UUID",
        category: "weiteres",
        tags:
            "uuid guid validator validieren prüfen version variant v1 v4 v7",
        script:
            "weiteres/uuid-validator.js",
        comingSoon: false
    },

    regexValidator: {
        name: "Regex Validator",
        description:
            "Reguläre Ausdrücke auf gültige Syntax prüfen und mit Testtexten testen.",
        icon: ".*",
        category: "weiteres",
        tags:
            "regex regexp regular expression validator validieren prüfen pattern syntax",
        script:
            "weiteres/regex-validator.js",
        comingSoon: false
    }

};