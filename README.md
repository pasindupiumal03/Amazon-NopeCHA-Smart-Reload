# NopeCHA Smart Reload 🚀

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange?style=for-the-badge)

**NopeCHA Smart Reload** is a high-performance, automated Chrome extension designed to ensure seamless captcha solving. It monitors web pages for failed solver attempts and automatically reloads the page to restart the process, specifically optimized for **AWS WAF** and **Amazon** captchas.

---

## ✨ Key Features

- 🔍 **Deep Scan Architecture**: Recursively searches through **Shadow DOMs** to identify failure signals that standard extensions miss.
- ⚡ **Automated Recovery**: Instantly detects "NopeCHA failed", "Incorrect. Please try again", and other blocking signals.
- 🎨 **Premium UI/UX**: Sleek, modern React-based popup with a dark theme, built using Tailwind CSS for a professional feel.
- 🎯 **Smart Detection**: Pre-configured failure signals for AWS WAF, Amazon Captchas, and general solver errors.
- 💾 **State Persistence**: Remembers your settings across sessions using `chrome.storage.local`.
- 🛠️ **Configurable Monitoring**: Customize reload behavior directly from the interactive popup.

---

## 🛠️ Technical Stack

- **Framework**: React 18
- **Styling**: Tailwind CSS (Utility-first, responsive)
- **Bundler**: Webpack 5
- **Icons**: Custom premium-designed assets (PNG 16-128px)
- **API**: Chrome Manifest V3 (Service Workers, Storage API)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16.0.0+)
- **npm** or **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/nopetcha-reload.git
   cd nopetcha-reload
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Build the extension**:
   ```bash
   yarn build
   # or
   npm run build
   ```

### Loading into Chrome

1. Open `chrome://extensions/` in your browser.
2. Enable **Developer mode** (top right toggle).
3. Click **Load unpacked**.
4. Select the `dist/` folder from the project directory.

---

## 📂 Project Structure

```text
├── public/                # Static assets & Manifest V3
├── src/
│   ├── popup.jsx          # Interactive UI control panel
│   ├── content.jsx        # Core monitoring & Deep Scan logic
│   ├── background.jsx     # Service worker for extension lifecycle
│   ├── assets/            # Premium icons & custom fonts
│   ├── controllers/       # Business logic & storage handling
│   └── index.css          # Tailwind & custom design tokens
├── dist/                  # Compiled production-ready bundle
└── webpack.config.js      # Build configuration
```

---

## 🔧 Feature Workflow

1. **Monitoring**: The content script scans the active tab every 3 seconds for failure text.
2. **Detection**: If a "Failure" signal is detected in a `Shadow DOM` or standard element:
   - 📢 A warning is logged in the console.
   - ⏳ A 3-second countdown begins.
3. **Action**: The page is reloaded, allowing the solver (like NopeCHA) to try again on a fresh instance.

---

## 🛡️ License

This project is licensed under the **ISC License**. Designed for high-performance automation.

---

## 🤝 Support

If you encounter any issues or have suggestions, please open an issue in the repository or contact the development team. 

*Designed with ❤️ for the automation community.*