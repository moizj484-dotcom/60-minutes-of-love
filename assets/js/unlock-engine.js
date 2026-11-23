/**
 * 60 Minutes of Love - Countdown & Unlocking System Engine
 */

class UnlockEngine {
  constructor() {
    this.config = getAppConfig();
    this.now = new Date();
    this.timerInterval = null;
  }

  refresh() {
    this.config = getAppConfig();
    this.now = new Date();
  }

  getStartTime() {
    return new Date(this.config.countdownStartTime);
  }

  getBirthdayTime() {
    return new Date(this.config.birthdayTargetTime);
  }

  // Returns { isStarted, elapsedMinutes, isBirthday, unlockedCount, previewMode }
  getUnlockStatus() {
    this.refresh();
    const startTime = this.getStartTime();
    const birthdayTime = this.getBirthdayTime();
    const now = this.now;

    if (this.config.previewMode) {
      return {
        isStarted: true,
        elapsedMinutes: 60,
        isBirthday: true,
        unlockedCount: 60,
        previewMode: true,
        msUntilStart: 0,
        msUntilBirthday: 0
      };
    }

    const diffStart = now.getTime() - startTime.getTime();
    const diffBirthday = birthdayTime.getTime() - now.getTime();

    if (diffStart < 0) {
      // Countdown before 11:00 PM start
      return {
        isStarted: false,
        elapsedMinutes: 0,
        isBirthday: false,
        unlockedCount: 0,
        previewMode: false,
        msUntilStart: Math.abs(diffStart),
        msUntilBirthday: diffBirthday
      };
    }

    // Started! Each minute unlocks 1 page:
    // 0 to 59 seconds => Minute 1 unlocked
    // 60 to 119 seconds => Minute 2 unlocked
    const elapsedMinutes = Math.min(60, Math.floor(diffStart / 60000) + 1);
    const isBirthday = now >= birthdayTime || elapsedMinutes >= 60;

    return {
      isStarted: true,
      elapsedMinutes: elapsedMinutes,
      isBirthday: isBirthday,
      unlockedCount: elapsedMinutes,
      previewMode: false,
      msUntilStart: 0,
      msUntilBirthday: Math.max(0, diffBirthday)
    };
  }

  isMinuteUnlocked(minuteNumber) {
    const status = this.getUnlockStatus();
    if (status.previewMode) return true;
    return minuteNumber <= status.unlockedCount;
  }

  getMinuteUnlockTime(minuteNumber) {
    const startTime = this.getStartTime();
    // Minute 1 unlocks at start time (11:00 PM)
    // Minute X unlocks at start time + (X-1) minutes
    return new Date(startTime.getTime() + (minuteNumber - 1) * 60000);
  }

  formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }

  formatCountdown(ms) {
    if (ms <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' };
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    const pad = (n) => String(n).padStart(2, '0');
    return {
      days: pad(days),
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds)
    };
  }

  markVisited(minuteNumber) {
    const visited = JSON.parse(localStorage.getItem('love_visited_minutes') || '[]');
    if (!visited.includes(minuteNumber)) {
      visited.push(minuteNumber);
      localStorage.setItem('love_visited_minutes', JSON.stringify(visited));
    }
  }

  isVisited(minuteNumber) {
    const visited = JSON.parse(localStorage.getItem('love_visited_minutes') || '[]');
    return visited.includes(minuteNumber);
  }
}

window.unlockEngine = new UnlockEngine();
