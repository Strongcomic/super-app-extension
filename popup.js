const vpnKeywords = ["vpn", "proxy"];
const vpnListContainer = document.getElementById("vpnList");
const noExtensionsEl = document.getElementById("noExtensions");
const titleEl = document.getElementById("title");
const langRuBtn = document.getElementById("langRu");
const langEnBtn = document.getElementById("langEn");

const lang = {
    ru: {
        enable: "Включить",
        disable: "Отключить",
        title: "Твои VPN",
        noExtensions: "Нет VPN расширений"
    },
    en: {
        enable: "Enable",
        disable: "Disable",
        title: "Yours VPN",
        noExtensions: "No VPN extensions found"
    }
};

let currentLang = 'ru';

function translateUI() {
    titleEl.textContent = lang[currentLang].title;
    noExtensionsEl.textContent = lang[currentLang].noExtensions;
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

chrome.management.getAll((extensions) => {
    const vpnExtensions = extensions.filter(ext =>
        vpnKeywords.some(kw => (ext.name || "").toLowerCase().includes(kw))
    );

    if (vpnExtensions.length === 0) {
        noExtensionsEl.style.display = 'block';
    } else {
        noExtensionsEl.style.display = 'none';
        vpnExtensions.forEach(ext => {
            vpnListContainer.appendChild(createExtensionToggle(ext));
        });
    }
    translateUI();
});

langRuBtn.addEventListener('click', () => {
    currentLang = 'ru';
    translateUI();
});

langEnBtn.addEventListener('click', () => {
    currentLang = 'en';
    translateUI();
});
