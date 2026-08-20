/**
 * Detect iOS Safari Low Power Mode
 * Low Power Mode disables autoplay and some animations
 */

export function detectLowPowerMode(): Promise<boolean> {
  return new Promise((resolve) => {
    // Only run in browser
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    // Check if iOS
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    if (!isIOS) {
      resolve(false);
      return;
    }

    // Low Power Mode detection technique:
    // Create a tiny video and try to play it
    // If it fails, likely in Low Power Mode
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');

    // Use a data URL for a minimal video
    video.src = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAOJtZGF0AAACrQYF//+r3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE2MyByMzA2MCA1ZGI2YWE2IC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAyMSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAA';

    // Try to play
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Autoplay works - NOT in Low Power Mode
          video.pause();
          video.remove();
          resolve(false);
        })
        .catch(() => {
          // Autoplay blocked - likely Low Power Mode
          video.remove();
          resolve(true);
        });
    } else {
      // Old browser, assume not Low Power Mode
      video.remove();
      resolve(false);
    }

    // Timeout fallback
    setTimeout(() => {
      video.remove();
      resolve(false);
    }, 1000);
  });
}

/**
 * Detect if device is likely on battery (mobile)
 */
export async function isOnBattery(): Promise<boolean> {
  if (typeof navigator === 'undefined' || !('getBattery' in navigator)) {
    // Fallback: assume mobile devices are on battery
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  try {
    // @ts-expect-error - Battery API not in all TypeScript definitions
    const battery = await navigator.getBattery();
    return !battery.charging;
  } catch {
    return false;
  }
}
