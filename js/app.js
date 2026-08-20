/* ============================================
   DEVTOOLS - MAIN APPLICATION
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

const favoritesGrid =
    document.getElementById("favorites-grid");

const recentGrid =
    document.getElementById("recent-grid");

const favoritesCount =
    document.getElementById("favorites-count");

const toolsContainer =
    document.getElementById("tools-container");

const navItems =
    document.querySelectorAll(".nav-item");


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

        renderTools();

        initializeSearch();

        initializeNavigation();

        initializeKeyboardShortcuts();

        renderFavorites();

        renderRecent();

        updateFavoritesCount();

    }
);


/* ============================================
   RENDER ALL TOOLS
============================================ */

function renderTools() {

    toolsContainer.innerHTML = "";


    Object.entries(CATEGORIES)
        .sort(
            ([, a], [, b]) =>
                a.order - b.order
        )
        .forEach(
            ([categoryId, category]) => {

                const tools =
                    Object.entries(TOOLS)
                        .filter(
                            ([, tool]) =>
                                tool.category ===
                                categoryId
                        );


                if (tools.length === 0) {
                    return;
                }


                const section =
                    createCategorySection(
                        categoryId,
                        category,
                        tools
                    );


                toolsContainer.appendChild(
                    section
                );

            }
        );


    initializeToolCards();
}


/* ============================================
   CREATE CATEGORY SECTION
============================================ */

function createCategorySection(
    categoryId,
    category,
    tools
) {

    const section =
        document.createElement(
            "section"
        );


    section.className =
        "tool-section";


    section.dataset.category =
        categoryId;


    section.innerHTML = `

        <div class="section-header">

            <div>

                <span class="section-icon">
                    ${category.icon}
                </span>

                <h2>
                    ${category.name}
                </h2>

            </div>

            <span class="tool-count">
                ${tools.length}
            </span>

        </div>


        <div
            class="tools-grid"
            data-category-grid="${categoryId}"
        ></div>

    `;


    const grid =
        section.querySelector(
            ".tools-grid"
        );


    tools.forEach(
        ([toolId, tool]) => {

            const card =
                createToolCard(
                    toolId,
                    tool
                );


            grid.appendChild(
                card
            );

        }
    );


    return section;

}


/* ============================================
   CREATE TOOL CARD
============================================ */

function createToolCard(toolId, tool = TOOLS[toolId]) {

    if (!tool) {

        console.warn(
            `Tool "${toolId}" wurde nicht gefunden.`
        );

        return null;

    }


    const card =
        document.createElement("article");


    card.className =
        "tool-card";


    card.dataset.tool =
        toolId;


    card.dataset.name =
        tool.name || "";


    card.dataset.category =
        tool.category || "";


    card.dataset.tags =
        tool.tags || "";


    if (tool.comingSoon) {

        card.classList.add(
            "coming-soon"
        );

    }


    card.innerHTML = `

        <div class="tool-card-top">

            <div class="tool-icon">
                ${tool.icon || "🛠️"}
            </div>

            ${
                tool.comingSoon
                    ? `
                        <span class="coming-soon-label">
                            Soon
                        </span>
                    `
                    : ""
            }

        </div>


        <h3>
            ${tool.name || "Unbekanntes Tool"}
        </h3>


        <p>
            ${tool.description || ""}
        </p>

    `;


    return card;

}


/* ============================================
   THEME
============================================ */

function initializeTheme() {

    const savedTheme =
        localStorage.getItem(
            STORAGE_KEYS.THEME
        );


    if (savedTheme === "light") {

        document.documentElement
            .classList.add(
                "light-theme"
            );

    }


    if (savedTheme === "dark") {

        document.documentElement
            .classList.remove(
                "light-theme"
            );

    }


    updateThemeIcon();

}


function toggleTheme() {

    document.documentElement
        .classList.toggle(
            "light-theme"
        );


    const isLight =
        document.documentElement
            .classList.contains(
                "light-theme"
            );


    localStorage.setItem(
        STORAGE_KEYS.THEME,
        isLight
            ? "light"
            : "dark"
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

    if (!themeToggle) {

        return;

    }


    const isLight =
        document.documentElement
            .classList.contains(
                "light-theme"
            );


    themeToggle.textContent =
        isLight
            ? "🌙"
            : "☀️";

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        toggleTheme
    );

}


/* ============================================
   FAVORITES
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


function saveFavorites(
    favorites
) {

    localStorage.setItem(
        STORAGE_KEYS.FAVORITES,
        JSON.stringify(
            favorites
        )
    );

}


function toggleFavorite(
    toolId
) {

    let favorites =
        getFavorites();


    if (
        favorites.includes(
            toolId
        )
    ) {

        favorites =
            favorites.filter(
                id =>
                    id !== toolId
            );


        showToast(
            "Aus Favoriten entfernt",
            "✓"
        );

    } else {

        favorites.push(
            toolId
        );


        showToast(
            "Zu Favoriten hinzugefügt",
            "★"
        );

    }


    saveFavorites(
        favorites
    );


    updateFavoritesCount();

    renderFavorites();

    renderRecent();

}


/* ============================================
   FAVORITE BUTTON
============================================ */

function createFavoriteButton(
    toolId
) {

    const button =
        document.createElement(
            "button"
        );


    button.className =
        "favorite-button";


    button.type =
        "button";


    button.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            toggleFavorite(
                toolId
            );

        }
    );


    updateFavoriteButton(
        button,
        getFavorites()
            .includes(
                toolId
            )
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
        String(
            isFavorite
        )
    );

}


/* ============================================
   FAVORITES RENDER
============================================ */

function renderFavorites() {

    const favorites = getFavorites();

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
                    als Favorit.
                </small>

            </div>

        `;

        return;
    }


    favorites.forEach(toolId => {

        const card =
            createToolCard(toolId);


        if (!card) {
            return;
        }


        const top =
            card.querySelector(
                ".tool-card-top"
            );


        if (top) {

            top.appendChild(
                createFavoriteButton(toolId)
            );

        }


        favoritesGrid.appendChild(card);

    });


    initializeToolCards();

}


function addFavoriteButton(
    card,
    toolId
) {

    const top =
        card.querySelector(
            ".tool-card-top"
        );


    if (!top) {

        return;

    }


    top.appendChild(
        createFavoriteButton(
            toolId
        )
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
   RECENT
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


function saveRecent(
    recent
) {

    localStorage.setItem(
        STORAGE_KEYS.RECENT,
        JSON.stringify(
            recent
        )
    );

}


function addToRecent(
    toolId
) {

    let recent =
        getRecent();


    recent =
        recent.filter(
            id =>
                id !== toolId
        );


    recent.unshift(
        toolId
    );


    recent =
        recent.slice(
            0,
            5
        );


    saveRecent(
        recent
    );


    renderRecent();

}


/* ============================================
   RECENT
============================================ */

function renderRecent() {

    const recent = getRecent();

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


    recent.forEach(toolId => {

        const card =
            createToolCard(toolId);


        if (!card) {
            return;
        }


        const top =
            card.querySelector(
                ".tool-card-top"
            );


        if (top) {

            top.appendChild(
                createFavoriteButton(toolId)
            );

        }


        recentGrid.appendChild(card);

    });


    initializeToolCards();

}


/* ============================================
   OPEN TOOL
============================================ */

function openTool(toolId) {

    const tool = TOOLS[toolId];

    if (!tool) {

        showToast(
            "Tool nicht gefunden",
            "⚠️"
        );

        return;
    }


    if (tool.comingSoon) {

        showToast(
            "Dieses Tool kommt bald",
            "🚧"
        );

        return;
    }


    /* Zuletzt verwendet speichern */

    addToRecent(toolId);


    /* Universelle Tool-Seite öffnen */

    window.location.href =
        `tools/tool.html?id=${encodeURIComponent(toolId)}`;
}


/* ============================================
   INITIALIZE TOOL CARDS
============================================ */

function initializeToolCards() {

    document
        .querySelectorAll(".tool-card")
        .forEach(card => {

            if (
                card.dataset.initialized === "true"
            ) {

                return;

            }


            card.dataset.initialized =
                "true";


            card.addEventListener(
                "click",
                event => {

                    /*
                     * Favoriten-Button nicht
                     * als Karten-Klick behandeln.
                     */

                    if (
                        event.target.closest(
                            ".favorite-button"
                        )
                    ) {

                        return;

                    }


                    const toolId =
                        card.dataset.tool;


                    if (toolId) {

                        openTool(toolId);

                    }

                }
            );

        });

}


/* ============================================
   SEARCH
============================================ */

function initializeSearch() {

    if (!searchInput) {

        return;

    }


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


    document
        .querySelectorAll(
            "#tools-container .tool-card"
        )
        .forEach(
            card => {

                const name =
                    (
                        card.dataset.name ||
                        ""
                    ).toLowerCase();


                const category =
                    (
                        card.dataset.category ||
                        ""
                    ).toLowerCase();


                const tags =
                    (
                        card.dataset.tags ||
                        ""
                    ).toLowerCase();


                const matches =
                    name.includes(
                        searchTerm
                    ) ||
                    category.includes(
                        searchTerm
                    ) ||
                    tags.includes(
                        searchTerm
                    );


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
        .querySelectorAll(
            "#tools-container .tool-section"
        )
        .forEach(
            section => {

                const cards =
                    section.querySelectorAll(
                        ".tool-card"
                    );


                const visibleCards =
                    section.querySelectorAll(
                        ".tool-card:not(.search-hidden)"
                    );


                section.hidden =
                    Boolean(
                        searchTerm &&
                        cards.length &&
                        visibleCards.length === 0
                    );

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

            if (
                (
                    event.ctrlKey ||
                    event.metaKey
                ) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                searchInput.focus();

                searchInput.select();

            }


            if (
                event.key === "Escape" &&
                document.activeElement ===
                    searchInput
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

                    navItems.forEach(
                        nav =>
                            nav.classList.remove(
                                "active"
                            )
                    );


                    item.classList.add(
                        "active"
                    );


                    handleNavigation(
                        item.dataset.page
                    );

                }
            );

        }
    );

}


function handleNavigation(
    page
) {

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

    if (!toast) {

        return;

    }


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