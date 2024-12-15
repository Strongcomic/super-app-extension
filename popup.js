const vpnKeywords = ["vpn", "proxy"];
const adblockKeywords = ["adblock", "ad block", "ad-block"];

const lang = {
    ru: {
        enable: "Включить",
        disable: "Отключить",
        title: "Расширения",
        noExtensions: "Нет расширений для данной категории",
        categoryAll: "Все",
        categoryVPN: "VPN",
        categoryAdblock: "Блокировщики рекламы",
        categoryCustom: "Мои фильтры",
        searchPlaceholder: "Поиск расширений...",
        addFilter: "Добавить фильтр",
        removeFilter: "Удалить",
        customFiltersTitle: "Мои фильтры"
    },
    en: {
        enable: "Enable",
        disable: "Disable",
        title: "Extensions",
        noExtensions: "No extensions found for this category",
        categoryAll: "All",
        categoryVPN: "VPN",
        categoryAdblock: "Adblock",
        categoryCustom: "My Filters",
        searchPlaceholder: "Search extensions...",
        addFilter: "Add Filter",
        removeFilter: "Remove",
        customFiltersTitle: "My Filters"
    }
};

let currentLang = 'ru';
let currentCategory = 'all';
let currentSearchTerm = '';
let customFilters = [];
let allExtensions = [];

const vpnListContainer = document.getElementById("vpnList");
const noExtensionsEl = document.getElementById("noExtensions");
const titleEl = document.getElementById("title");
const langRuBtn = document.getElementById("langRu");
const langEnBtn = document.getElementById("langEn");
const categorySelect = document.getElementById("categorySelect");
const searchInput = document.getElementById("searchInput");
const customFiltersSection = document.getElementById("customFiltersSection");
const customFiltersTitle = document.getElementById("customFiltersTitle");
const customFiltersContainer = document.getElementById("customFiltersContainer");
const addFilterBtn = document.getElementById("addFilterBtn");

function translateUI() {
    titleEl.textContent = lang[currentLang].title;
    noExtensionsEl.textContent = lang[currentLang].noExtensions;
    searchInput.placeholder = lang[currentLang].searchPlaceholder;

    categorySelect.querySelector('option[value="all"]').textContent = lang[currentLang].categoryAll;
    categorySelect.querySelector('option[value="vpn"]').textContent = lang[currentLang].categoryVPN;
    categorySelect.querySelector('option[value="adblock"]').textContent = lang[currentLang].categoryAdblock;
    categorySelect.querySelector('option[value="custom"]').textContent = lang[currentLang].categoryCustom;

    customFiltersTitle.textContent = lang[currentLang].customFiltersTitle;
    addFilterBtn.textContent = lang[currentLang].addFilter;

    document.querySelectorAll('.vpn-item button').forEach((btn) => {
        const enabled = btn.dataset.enabled === 'true';
        btn.textContent = enabled ? lang[currentLang].disable : lang[currentLang].enable;
    });

    document.querySelectorAll('.custom-filter-item button').forEach((btn) => {
        btn.textContent = lang[currentLang].removeFilter;
    });
}

function createExtensionToggle(extension) {
    const container = document.createElement('div');
    container.className = 'vpn-item';

    const label = document.createElement('span');
    label.textContent = extension.name;

    const toggle = document.createElement('button');
    toggle.dataset.enabled = extension.enabled;
    toggle.textContent = extension.enabled ? lang[currentLang].disable : lang[currentLang].enable;

    toggle.addEventListener('click', () => {
        chrome.management.setEnabled(extension.id, !extension.enabled, () => {
            extension.enabled = !extension.enabled;
            toggle.dataset.enabled = extension.enabled;
            toggle.textContent = extension.enabled ? lang[currentLang].disable : lang[currentLang].enable;
        });
    });

    container.appendChild(label);
    container.appendChild(toggle);
    return container;
}

function filterExtensions(extensions, category, searchTerm) {
    let filtered = extensions.slice();

    if (category !== 'all') {
        let keywords = [];
        if (category === 'vpn') {
            keywords = vpnKeywords;
        } else if (category === 'adblock') {
            keywords = adblockKeywords;
        } else if (category === 'custom') {
            keywords = customFilters;
        }

        if (keywords.length > 0) {
            filtered = filtered.filter(ext =>
                keywords.some(kw => (ext.name || "").toLowerCase().includes(kw))
            );
        } else {
            filtered = [];
        }
    }

    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(ext => (ext.name || "").toLowerCase().includes(term));
    }

    return filtered;
}

function renderExtensions() {
    vpnListContainer.innerHTML = '';
    const filtered = filterExtensions(allExtensions, currentCategory, currentSearchTerm);

    if (filtered.length === 0) {
        noExtensionsEl.style.display = 'block';
    } else {
        noExtensionsEl.style.display = 'none';
        filtered.forEach(ext => vpnListContainer.appendChild(createExtensionToggle(ext)));
    }

    if (currentCategory === 'custom') {
        customFiltersSection.style.display = 'block';
    } else {
        customFiltersSection.style.display = 'none';
    }

    translateUI();
}

function renderCustomFilters() {
    customFiltersContainer.innerHTML = '';
    customFilters.forEach((filter, index) => {
        const item = document.createElement('div');
        item.className = 'custom-filter-item';

        const label = document.createElement('span');
        label.textContent = filter;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = lang[currentLang].removeFilter;
        removeBtn.addEventListener('click', () => {
            customFilters.splice(index, 1);
            renderCustomFilters();
            if (currentCategory === 'custom') renderExtensions();
        });

        item.appendChild(label);
        item.appendChild(removeBtn);
        customFiltersContainer.appendChild(item);
    });
}

chrome.management.getAll((extensions) => {
    const currentId = chrome.runtime.id;
    allExtensions = extensions.filter(ext => ext.id !== currentId);
    renderExtensions();
});

langRuBtn.addEventListener('click', () => {
    currentLang = 'ru';
    translateUI();
});

langEnBtn.addEventListener('click', () => {
    currentLang = 'en';
    translateUI();
});

categorySelect.addEventListener('change', () => {
    currentCategory = categorySelect.value;
    renderExtensions();
});

searchInput.addEventListener('input', () => {
    currentSearchTerm = searchInput.value.trim();
    renderExtensions();
});

addFilterBtn.addEventListener('click', () => {
    const promptMessage = currentLang === 'ru' ? "Введите слово для фильтра:" : "Enter a keyword for the filter:";
    const newFilter = prompt(promptMessage);
    if (newFilter && newFilter.trim()) {
        customFilters.push(newFilter.trim().toLowerCase());
        renderCustomFilters();
        if (currentCategory === 'custom') renderExtensions();
    }
});
