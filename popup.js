const vpnKeywords = ["vpn", "proxy"];
const adblockKeywords = ["adblock", "ad block", "ad-block"];
const passwordKeywords = ["password", "manager"];

const lang = {
    ru: {
        enable: "Включить",
        disable: "Отключить",
        title: "Расширения",
        noExtensions: "Нет расширений для данной категории",
        categoryAll: "Все",
        categoryVPN: "VPN",
        categoryAdblock: "Блокировщики рекламы",
        categoryPassword: "Менеджеры паролей",
        searchPlaceholder: "Поиск расширений..."
    },
    en: {
        enable: "Enable",
        disable: "Disable",
        title: "Extensions",
        noExtensions: "No extensions found for this category",
        categoryAll: "All",
        categoryVPN: "VPN",
        categoryAdblock: "Adblock",
        categoryPassword: "Password Managers",
        searchPlaceholder: "Search extensions..."
    }
};

let currentLang = 'ru';
let allExtensions = [];

const vpnListContainer = document.getElementById("vpnList");
const noExtensionsEl = document.getElementById("noExtensions");
const titleEl = document.getElementById("title");
const langRuBtn = document.getElementById("langRu");
const langEnBtn = document.getElementById("langEn");
const categorySelect = document.getElementById("categorySelect");
const searchInput = document.getElementById("searchInput");

function translateUI() {
    titleEl.textContent = lang[currentLang].title;
    noExtensionsEl.textContent = lang[currentLang].noExtensions;
    searchInput.placeholder = lang[currentLang].searchPlaceholder;

    categorySelect.querySelector('option[value="all"]').textContent = lang[currentLang].categoryAll;
    categorySelect.querySelector('option[value="vpn"]').textContent = lang[currentLang].categoryVPN;
    categorySelect.querySelector('option[value="adblock"]').textContent = lang[currentLang].categoryAdblock;
    categorySelect.querySelector('option[value="password"]').textContent = lang[currentLang].categoryPassword;

    document.querySelectorAll('.vpn-item button').forEach((btn) => {
        const enabled = btn.dataset.enabled === 'true';
        btn.textContent = enabled ? lang[currentLang].disable : lang[currentLang].enable;
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
        } else if (category === 'password') {
            keywords = passwordKeywords;
        }

        filtered = filtered.filter(ext =>
            keywords.some(kw => (ext.name || "").toLowerCase().includes(kw))
        );
    }

    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(ext => (ext.name || "").toLowerCase().includes(term));
    }

    return filtered;
}

function renderExtensions() {
    vpnListContainer.innerHTML = '';
    const category = categorySelect.value;
    const searchTerm = searchInput.value.trim();
    const filtered = filterExtensions(allExtensions, category, searchTerm);

    if (filtered.length === 0) {
        noExtensionsEl.style.display = 'block';
    } else {
        noExtensionsEl.style.display = 'none';
        filtered.forEach(ext => vpnListContainer.appendChild(createExtensionToggle(ext)));
    }
    translateUI();
}

chrome.management.getAll((extensions) => {
    allExtensions = extensions;
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

categorySelect.addEventListener('change', renderExtensions);
searchInput.addEventListener('input', renderExtensions);
