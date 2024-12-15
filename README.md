# **SAE v1** – Super Application Extension (Manager)

![SAE Logo](icons/icon128.png)

**SAE v1** is a powerful extension manager for Chromium-based browsers (Google Chrome, Yandex Browser, etc.) that helps you seamlessly manage your installed extensions. Quickly enable or disable them, discover VPN extensions, add custom filters, and switch interface languages.

## ✨ Features

- **Categories:**
  - `All` – Display all extensions
  - `VPN` – Easily find and manage VPN extensions
  - `Adblock` – Filter out ad-blocking extensions
  - `My Filters` – Create your own custom keyword filters

- **Search:**
  Instantly filter your extensions by entering part of their name.

- **Enable/Disable Extensions:**
  Manage your installed extensions with a single click—no need to open `chrome://extensions`.

- **Custom Filters:**
  Add your own keywords to personalize extension filtering. These filters are stored via `localStorage` and will be available upon your next startup.

- **Language Switching:**
  Two interface languages are supported:
  - **RU (Russian)**
  - **EN (English)**

  Switch languages on the fly to suit your preference.

## ⚙️ Installation

#### Method 1: Easy (via Web Store)
1. Open the Chrome Web Store: [https://chrome.google.com/webstore/category/extensions](https://chrome.google.com/webstore/category/extensions)
2. Search for `SAE v1`.
3. Click "Add to Chrome" and you're done! The SAE icon will appear on your browser toolbar.

#### Method 2: Manual (Developer Mode)
1. Download or clone this repository.
2. Go to `chrome://extensions/` in your Chromium-based browser.
3. Enable Developer Mode (toggle in the top-right corner).
4. Click **"Load unpacked"** and select the folder containing this extension.
5. The SAE icon will now appear in your browser's toolbar.

## 🎨 Icons

The extension includes `icon16.png`, `icon32.png`, `icon48.png`, and `icon128.png` with the **SAE** logo. Feel free to replace them with your own—just update the paths in `manifest.json`.

## 🖥 Interface Overview

- **Header:** Displays the title and language toggle (RU/ENG).
- **Filter Panel:** Choose categories (All, VPN, Adblock, My Filters) and enter a search term.
- **My Filters Block:** Add or remove your own keyword filters.
- **Extensions List:** A clean, minimalistic interface with "Enable"/"Disable" buttons for each extension.

## 🚀 How to Use

1. **Choose a Category:**  
   For instance, select **VPN** to instantly see all your VPN-related extensions.

2. **Search:**  
   Type a part of an extension's name to quickly narrow down the results.

3. **My Filters:**  
   - Switch to the **My Filters** category.
   - Click **Add Filter**, then enter a keyword.
   - Newly added filters appear instantly and can be removed at any time.
   - Extensions are filtered according to your custom keywords.

4. **Language Switching:**  
   Click **РУС** or **ENG** in the top-right corner to switch the interface language instantly.

## 💡 Extra Tips

- **VPN Blocked?** Easily switch to another VPN extension without leaving the manager.
- **Too Many Extensions?** Use search and custom filters to keep things organized.
- **Need both VPN_1 and VPN_2 active?** Enable them both in just a few clicks.

## 🤝 Contributing

Have suggestions or found a bug? Feel free to open an Issue or submit a Pull Request.

---

Enjoy the convenience and speed of managing your extensions with **SAE v1**!
