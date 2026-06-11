/**
 * Singleton Hapana Script Loader
 * Ensures the Hapana widget script loads only once across the entire app
 */

let hapanaScriptPromise: Promise<void> | null = null;
let isHapanaScriptLoaded = false;

export function loadHapanaScript(): Promise<void> {
  // Return existing promise if already loading or loaded
  if (hapanaScriptPromise) {
    return hapanaScriptPromise;
  }

  // Return immediately if already loaded
  if (isHapanaScriptLoaded || document.getElementById('hapana-widget-script')) {
    isHapanaScriptLoaded = true;
    return Promise.resolve();
  }

  // Create new loading promise
  hapanaScriptPromise = new Promise((resolve, reject) => {
    const scriptUrl = process.env.NEXT_PUBLIC_HAPANA_SCRIPT_URL || 'https://widget.hapana.com/hapana_widget.js';

    const script = document.createElement('script');
    script.id = 'hapana-widget-script';
    script.src = scriptUrl;
    script.async = true;

    script.onload = () => {
      isHapanaScriptLoaded = true;
      resolve();
    };

    script.onerror = () => {
      const errorMsg = 'Failed to load Hapana booking script';
      console.error('❌', errorMsg, 'from:', scriptUrl);
      // Reset promise so it can be retried
      hapanaScriptPromise = null;
      reject(new Error(errorMsg));
    };

    document.body.appendChild(script);
  });

  return hapanaScriptPromise;
}

/**
 * Check if Hapana script is already loaded
 */
export function isHapanaLoaded(): boolean {
  return isHapanaScriptLoaded || !!document.getElementById('hapana-widget-script');
}
