/**
 * 60 Minutes of Love - Global Configuration
 * Strict Time-Based Unlocking System:
 * Each minute's photo & message reveals ONLY when its scheduled minute arrives.
 */
const DEFAULT_CONFIG = {
  recipientName: "My Love",
  // 60-Minute Countdown Starts: 1 December at 11:00 PM (23:00)
  countdownStartTime: "2026-12-01T23:00:00",
  // Birthday Midnight Moment: 2 December at 12:00 AM (00:00)
  birthdayTargetTime: "2026-12-02T00:00:00",
  totalMinutes: 60,
  
  // Strict Real-Time Mode: Photos reveal ONLY at their exact time
  previewMode: false,
  soundEnabled: true,
  projectTitle: "60 Minutes of Love",
  projectSubtitle: "A Romantic Birthday Countdown Journey"
};

function getAppConfig() {
  const saved = localStorage.getItem('love_countdown_config');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Ensure previewMode is NEVER accidentally true
      parsed.previewMode = false;
      return { ...DEFAULT_CONFIG, ...parsed };
    } catch(e) {
      console.error("Error reading saved config:", e);
    }
  }
  return { ...DEFAULT_CONFIG };
}

function saveAppConfig(newConfig) {
  // Always enforce previewMode = false
  newConfig.previewMode = false;
  localStorage.setItem('love_countdown_config', JSON.stringify(newConfig));
}
