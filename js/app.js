/* ============================================
   DEVTOOLS
============================================ */


/* ============================================
   DOM
============================================ */

const themeToggle =
    document.getElementById("theme-toggle");

const searchInput =
    document.getElementById("tool-search");

const noResults =
    document.getElementById("no-results");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toast-message");

const toastIcon =
    document.getElementById("toast-icon");

const toolCards =
    document.querySelectorAll(".tool-card");

const navItems =
    document.querySelectorAll(".nav-item");

const favoritesGrid =
    document.getElementById("favorites-grid");

const recentGrid =
    document.getElementById("recent-grid");

const favoritesCount =
    document.getElementById("favorites-count");


/* ============================================
   STORAGE
============================================ */

const STORAGE_KEYS = {

    THEME: "devtools-theme",

    FAVORITES: "devtools-favorites",

    RECENT: "devtools-recent"

};


/* ============================================
   INIT
============================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeTheme();

        initializeSearch();

        initializeNavigation();

        initializeKeyboardShortcuts();

        initializeToolCards();

        renderFavorites();

        renderRecent();

        updateFavoritesCount();

    }
);


/* ============================================
   THEME
============================================ */

function initializeTheme() {

    const savedTheme =
        localStorage.getItem(
            STORAGE_KEYS.THEME
        );


    if (savedTheme === "light") {

        document.documentElement.classList.add(
            "light-theme"
        );

    }


    if (savedTheme === "dark") {

        document.documentElement.classList.remove(
            "light-theme"
        );

    }


    updateThemeIcon();
}


function toggleTheme() {

    document.documentElement.classList.toggle(
        "light-theme"
    );


    const isLight =
        document.documentElement.classList.contains(
            "light-theme"
        );


    localStorage.setItem(
        STORAGE_KEYS.THEME,
        isLight ? "light" : "dark"
    );


    updateThemeIcon();


    showToast(
        isLight
            ? "Light Mode aktiviert"
            : "Dark Mode aktiviert",

        isLight
            ? "☀️"
            : "🌙"
    );
}


function updateThemeIcon() {

    const isLight =
        document.documentElement.classList.contains(
            "light-theme"
        );


    themeToggle.textContent =
        isLight
            ? "🌙"
            : "☀️";
}


themeToggle.addEventListener(
    "click",
    toggleTheme
);


/* ============================================
   FAVORITES STORAGE
============================================ */

function getFavorites() {

    const saved =
        localStorage.getItem(
            STORAGE_KEYS.FAVORITES
        );


    if (!saved) {
        return [];
    }


    try {

        const favorites =
            JSON.parse(saved);


        return Array.isArray(favorites)
            ? favorites
            : [];

    } catch {

        return [];

    }
}


function saveFavorites(favorites) {

    localStorage.setItem(
        STORAGE_KEYS.FAVORITES,
        JSON.stringify(favorites)
    );
}


/* ============================================
   TOGGLE FAVORITE
============================================ */

function toggleFavorite(toolId) {

    let favorites =
        getFavorites();


    const isFavorite =
        favorites.includes(toolId);


    if (isFavorite) {

        favorites =
            favorites.filter(
                id => id !== toolId
            );


        showToast(
            "Aus Favoriten entfernt",
            "✓"
        );

    } else {

        favorites.push(toolId);


        showToast(
            "Zu Favoriten hinzugefügt",
            "★"
        );

    }


    saveFavorites(favorites);


    updateFavoritesCount();

    renderFavorites();

    renderRecent();
}


/* ============================================
   FAVORITE BUTTON
============================================ */

function createFavoriteButton(toolId) {

    const button =
        document.createElement("button");


    button.className =
        "favorite-button";


    button.type =
        "button";


    button.dataset.favorite =
        toolId;


    button.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            toggleFavorite(toolId);

        }
    );


    updateFavoriteButton(
        button,
        getFavorites().includes(toolId)
    );


    return button;
}


function updateFavoriteButton(
    button,
    isFavorite
) {

    button.classList.toggle(
        "is-favorite",
        isFavorite
    );


    button.textContent =
        isFavorite
            ? "★"
            : "☆";


    button.setAttribute(
        "aria-label",
        isFavorite
            ? "Aus Favoriten entfernen"
            : "Zu Favoriten hinzufügen"
    );


    button.setAttribute(
        "aria-pressed",
        String(isFavorite)
    );
}


/* ============================================
   FAVORITES
============================================ */

function renderFavorites() {

    const favorites =
        getFavorites();


    favoritesGrid.innerHTML = "";


    if (favorites.length === 0) {

        favoritesGrid.innerHTML = `

            <div class="empty-state">

                <span>☆</span>

                <p>
                    Noch keine Favoriten
                </p>

                <small>
                    Öffne ein Tool und markiere es
                    unter „Zuletzt verwendet“.
                </small>

            </div>

        `;

        return;
    }


    favorites.forEach(
        toolId => {

            const originalCard =
                document.querySelector(
                    `.tool-card[data-tool="${toolId}"]`
                );


            if (!originalCard) {
                return;
            }


            const card =
                createToolCardClone(
                    originalCard,
                    toolId
                );


            favoritesGrid.appendChild(card);

        }
    );
}


/* ============================================
   FAVORITES COUNT
============================================ */

function updateFavoritesCount() {

    favoritesCount.textContent =
        getFavorites().length;
}


/* ============================================
   RECENT STORAGE
============================================ */

function getRecent() {

    const saved =
        localStorage.getItem(
            STORAGE_KEYS.RECENT
        );


    if (!saved) {
        return [];
    }


    try {

        const recent =
            JSON.parse(saved);


        return Array.isArray(recent)
            ? recent
            : [];

    } catch {

        return [];

    }
}


function saveRecent(recent) {

    localStorage.setItem(
        STORAGE_KEYS.RECENT,
        JSON.stringify(recent)
    );
}


/* ============================================
   ADD TO RECENT
============================================ */

function addToRecent(toolId) {

    let recent =
        getRecent();


    recent =
        recent.filter(
            id => id !== toolId
        );


    recent.unshift(toolId);


    recent =
        recent.slice(0, 5);


    saveRecent(recent);


    renderRecent();
}


/* ============================================
   RECENT RENDER
============================================ */

function renderRecent() {

    const recent =
        getRecent();


    recentGrid.innerHTML = "";


    if (recent.length === 0) {

        recentGrid.innerHTML = `

            <div class="empty-state">

                <span>🕘</span>

                <p>
                    Noch nichts verwendet
                </p>

                <small>
                    Deine zuletzt geöffneten
                    Tools erscheinen hier.
                </small>

            </div>

        `;

        return;
    }


    recent.forEach(
        toolId => {

            const originalCard =
                document.querySelector(
                    `.tool-card[data-tool="${toolId}"]`
                );


            if (!originalCard) {
                return;
            }


            /*
             * Nur zuletzt verwendete Tools
             * bekommen hier einen Favoriten-Stern.
             */

            const card =
                createToolCardClone(
                    originalCard,
                    toolId
                );


            recentGrid.appendChild(card);

        }
    );
}


/* ============================================
   CARD CLONE
============================================ */

function createToolCardClone(
    originalCard,
    toolId
) {

    const card =
        originalCard.cloneNode(true);


    const top =
        card.querySelector(
            ".tool-card-top"
        );


    /*
     * Favoriten-Stern hinzufügen.
     */

    if (top) {

        const favoriteButton =
            createFavoriteButton(toolId);


        top.appendChild(
            favoriteButton
        );

    }


    /*
     * Klick auf die Karte.
     */

    card.addEventListener(
        "click",
        () => {

            openTool(toolId);

        }
    );


    return card;
}


/* ============================================
   OPEN TOOL
============================================ */

function openTool(toolId) {

    const originalCard =
        document.querySelector(
            `.tool-card[data-tool="${toolId}"]`
        );


    if (
        originalCard?.classList.contains(
            "coming-soon"
        )
    ) {

        showToast(
            "Dieses Tool kommt bald",
            "🚧"
        );

        return;
    }


    /*
     * Tool in "Zuletzt verwendet"
     * speichern.
     */

    addToRecent(toolId);


    /*
     * JSON
     */

    if (toolId === "json") {

        window.location.href =
            "tools/json/json.html";

        return;
    }


    /*
     * BASE64
     */

    if (toolId === "base64") {

        window.location.href =
            "tools/base64/base64.html";

        return;
    }


    /*
     * Noch nicht implementierte Tools
     */

    showToast(
        `${getToolName(toolId)} kommt als Nächstes`,
        "🛠"
    );
}


function getToolName(toolId) {

    const card =
        document.querySelector(
            `.tool-card[data-tool="${toolId}"]`
        );


    return card?.dataset.name ||
        "Tool";
}


/* ============================================
   NORMAL TOOL CARDS
============================================ */

function initializeToolCards() {

    toolCards.forEach(
        card => {

            card.addEventListener(
                "click",
                () => {

                    const toolId =
                        card.dataset.tool;


                    openTool(toolId);

                }
            );

        }
    );
}


/* ============================================
   SEARCH
============================================ */

function initializeSearch() {

    searchInput.addEventListener(
        "input",
        handleSearch
    );
}


function handleSearch() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    let visibleTools = 0;


    toolCards.forEach(
        card => {

            const name =
                card.dataset.name
                    ?.toLowerCase() || "";


            const category =
                card.dataset.category
                    ?.toLowerCase() || "";


            const tags =
                card.dataset.tags
                    ?.toLowerCase() || "";


            const matches =
                name.includes(searchTerm) ||
                category.includes(searchTerm) ||
                tags.includes(searchTerm);


            card.classList.toggle(
                "search-hidden",
                !matches
            );


            if (matches) {
                visibleTools++;
            }

        }
    );


    document
        .querySelectorAll(".tool-section")
        .forEach(
            section => {

                if (
                    section.id ===
                    "favorites-section" ||
                    section.id ===
                    "recent-section"
                ) {

                    return;
                }


                const cards =
                    section.querySelectorAll(
                        ".tool-card"
                    );


                const visibleCards =
                    section.querySelectorAll(
                        ".tool-card:not(.search-hidden)"
                    );


                if (
                    searchTerm &&
                    cards.length > 0 &&
                    visibleCards.length === 0
                ) {

                    section.hidden = true;

                } else {

                    section.hidden = false;

                }

            }
        );


    noResults.hidden =
        !searchTerm ||
        visibleTools > 0;
}


/* ============================================
   KEYBOARD SHORTCUTS
============================================ */

function initializeKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        event => {

            /*
             * Ctrl + K
             */

            if (
                (event.ctrlKey ||
                    event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();


                searchInput.focus();

                searchInput.select();

            }


            /*
             * Escape
             */

            if (
                event.key === "Escape" &&
                document.activeElement === searchInput
            ) {

                searchInput.value = "";

                handleSearch();

                searchInput.blur();

            }

        }
    );
}


/* ============================================
   NAVIGATION
============================================ */

function initializeNavigation() {

    navItems.forEach(
        item => {

            item.addEventListener(
                "click",
                () => {

                    const page =
                        item.dataset.page;


                    navItems.forEach(
                        nav => {

                            nav.classList.remove(
                                "active"
                            );

                        }
                    );


                    item.classList.add(
                        "active"
                    );


                    handleNavigation(page);

                }
            );

        }
    );
}


function handleNavigation(page) {

    switch (page) {

        case "home":

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            break;


        case "favorites":

            document
                .getElementById(
                    "favorites-section"
                )
                .scrollIntoView({
                    behavior: "smooth"
                });

            break;


        case "recent":

            document
                .getElementById(
                    "recent-section"
                )
                .scrollIntoView({
                    behavior: "smooth"
                });

            break;


        case "settings":

            showToast(
                "Einstellungen kommen später",
                "⚙"
            );

            break;

    }
}


/* ============================================
   TOAST
============================================ */

let toastTimeout;


function showToast(
    message,
    icon = "✓"
) {

    toastMessage.textContent =
        message;


    toastIcon.textContent =
        icon;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );
}