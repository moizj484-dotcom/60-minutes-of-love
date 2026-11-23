/**
 * 60 Minutes of Love - Global Configuration
 * All parameters can be configured here or interactively via the Settings modal on the dashboard!
 */
const DEFAULT_CONFIG = {
  recipientName: "My Love",
  // Birthday Date: 2 December
  // Birthday Time: 12:00 AM Midnight (00:00:00)
  // 60-Minute Countdown Start Time: 11:00 PM (23:00:00 on 1 December)
  countdownStartTime: "2026-12-01T23:00:00",
  birthdayTargetTime: "2026-12-02T00:00:00",
  totalMinutes: 60,
  
  // Instant Unlock / Preview Mode:
  // If true, all 60 minutes are unlocked immediately so you can test and explore every page!
  // If false, minutes unlock sequentially minute-by-minute starting at 11:00 PM!
  previewMode: false,
  
  // Sound enabled
  soundEnabled: true,
  
  // Custom titles
  projectTitle: "60 Minutes of Love",
  projectSubtitle: "A Romantic Birthday Countdown Journey"
};

// Load saved config overrides from localStorage if present
function getAppConfig() {
  const saved = localStorage.getItem('love_countdown_config');
  if (saved) {
    try {
      return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    } catch(e) {
      console.error("Error reading saved config:", e);
    }
  }
  return { ...DEFAULT_CONFIG };
}

function saveAppConfig(newConfig) {
  localStorage.setItem('love_countdown_config', JSON.stringify(newConfig));
}
