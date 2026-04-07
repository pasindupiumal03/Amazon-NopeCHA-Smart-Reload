import { saveToStorage, getFromStorage } from "./controllers/storageController.js";

/**
 * NOPECHA SMART RELOAD - ROBUST VERSION
 * Balances performance and reliability with specific AWS WAF / Amazon targeting.
 */

console.log("[NopeCHA-Reload] Robust Monitoring Active.");

let reloadInProgress = false;

const failureSignals = [
    "incorrect. please try again.",
    "time limit exceeded. please try again.",
    "failed to solve",
    "nopecha failed",
    "solve error",
    "challenge failed"
];

/**
 * Checks if an element is actually visible on the screen.
 */
function isElementVisible(el) {
    if (!el) return false;
    const style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}

/**
 * Performs a targeted search inside the AWS WAF / Amazon Captcha Shadow Root.
 */
function scanShadowRoots() {
    if (reloadInProgress) return;

    // 1. Find the main AWS WAF element
    const wafCaptcha = document.querySelector('awswaf-captcha');
    if (wafCaptcha && wafCaptcha.shadowRoot) {
        const shadow = wafCaptcha.shadowRoot;
        
        // Find all alerts or paragraphs inside the shadow root
        const potentialErrors = shadow.querySelectorAll('div[role="alert"], p, span');
        for (const el of potentialErrors) {
            const text = el.textContent.toLowerCase();
            if (failureSignals.some(sig => text.includes(sig))) {
                // IMPORTANT: Check if the error is actually VISIBLE
                if (isElementVisible(el) || isElementVisible(el.parentElement)) {
                    handleReload(`Visible failure detected in WAF Shadow Root: "${text.substring(0, 30)}"`);
                    return;
                }
            }
        }
    }

    // 2. Fallback: Search the main document for any visible alert roles
    const alerts = document.querySelectorAll('div[role="alert"], p, span');
    for (const el of alerts) {
        if (isElementVisible(el)) {
            const text = el.textContent.toLowerCase();
            if (failureSignals.some(sig => text.includes(sig))) {
                handleReload(`Visible failure detected in Main Doc: "${text.substring(0, 30)}"`);
                return;
            }
        }
    }
}

function handleReload(reason) {
    if (reloadInProgress) return;
    reloadInProgress = true;
    console.warn(`[NopeCHA-Reload] ${reason} -> Tab will refresh in 3 seconds.`);
    
    setTimeout(() => {
        window.location.reload();
    }, 3000);
}

// 1. High-speed Mutation Observer for instant detection
const observer = new MutationObserver(() => {
    // We scan whenever something changes, but we limit performance impact
    scanShadowRoots();
});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true, // We watch attributes because 'display: none' changes are attributes
    attributeFilter: ['style', 'class']
});

// 2. Periodic Safety Sync (Low frequency backup)
setInterval(scanShadowRoots, 4000);

// 3. Initial Scan
setTimeout(scanShadowRoots, 5000);