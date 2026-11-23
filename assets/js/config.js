/**
 * 60 Minutes of Love - Global Configuration
 * Dedicated: For my love Arwa Rao, from Saad ❤️
 */
const DEFAULT_CONFIG = {
  recipientName: "Arwa Rao",
  senderName: "Saad",
  countdownStartTime: "2026-12-01T23:00:00",
  birthdayTargetTime: "2026-12-02T00:00:00",
  totalMinutes: 60,
  previewMode: false,
  soundEnabled: true,
  projectTitle: "Arwa's Birthday • 60 Minutes of Love",
  projectSubtitle: "For my love Arwa Rao, from Saad"
};

function getAppConfig() {
  const saved = localStorage.getItem('love_countdown_config');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      parsed.previewMode = false;
      return { ...DEFAULT_CONFIG, ...parsed };
    } catch(e) {
      console.error("Error reading saved config:", e);
    }
  }
  return { ...DEFAULT_CONFIG };
}

function saveAppConfig(newConfig) {
  newConfig.previewMode = false;
  localStorage.setItem('love_countdown_config', JSON.stringify(newConfig));
}
