/**
 * 60 Minutes of Love - Strict Countdown & Unlocking System Engine
 * Every minute is strictly time-locked until its exact clock minute arrives.
 */

class UnlockEngine {
  constructor() {
    this.config = getAppConfig();
    this.now = new Date();
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

  // Returns { isStarted, elapsedMinutes, isBirthday, unlockedCount, msUntilStart, msUntilBirthday }
  getUnlockStatus() {
    this.refresh();
    const startTime = this.getStartTime();
    const birthdayTime = this.getBirthdayTime();
    const now = this.now;

    const diffStart = now.getTime() - startTime.getTime();
    const diffBirthday = birthdayTime.getTime() - now.getTime();

    if (diffStart < 0) {
      // Before 11:00 PM start time: ZERO minutes unlocked
      return {
        isStarted: false,
        elapsedMinutes: 0,
        isBirthday: false,
        unlockedCount: 0,
        msUntilStart: Math.abs(diffStart),
        msUntilBirthday: diffBirthday
      };
    }

    // Countdown active: 
    // Minute 1: 0 - 59s
    // Minute 2: 60 - 119s
    // ...
    // Minute 60: 59 mins onwards / birthday time
    const elapsedMinutes = Math.min(60, Math.floor(diffStart / 60000) + 1);
    const isBirthday = now >= birthdayTime || elapsedMinutes >= 60;

    return {
      isStarted: true,
      elapsedMinutes: elapsedMinutes,
      isBirthday: isBirthday,
      unlockedCount: elapsedMinutes,
      msUntilStart: 0,
      msUntilBirthday: Math.max(0, diffBirthday)
    };
  }

  // Checks whether a specific minute is unlocked right now
  isMinuteUnlocked(minuteNumber) {
    const status = this.getUnlockStatus();
    return minuteNumber <= status.unlockedCount;
  }

  // Returns Date object when this minute is scheduled to unlock
  getMinuteUnlockTime(minuteNumber) {
    const startTime = this.getStartTime();
    return new Date(startTime.getTime() + (minuteNumber - 1) * 60000);
  }

  // Returns milliseconds until this specific minute unlocks
  getMsUntilMinute(minuteNumber) {
    const unlockTime = this.getMinuteUnlockTime(minuteNumber);
    return Math.max(0, unlockTime.getTime() - this.now.getTime());
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
    if (ms <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00', totalSeconds: 0 };
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const days = Math.floor(totalSeconds / 86400);

    const pad = (n) => String(n).padStart(2, '0');
    return {
      days: pad(days),
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds),
      totalSeconds: totalSeconds
    };
  }

  formatShortCountdown(ms) {
    const cd = this.formatCountdown(ms);
    if (parseInt(cd.days) > 0) return `${parseInt(cd.days)}d ${cd.hours}h ${cd.minutes}m`;
    if (parseInt(cd.hours) > 0) return `${cd.hours}h ${cd.minutes}m ${cd.seconds}s`;
    return `${cd.minutes}m ${cd.seconds}s`;
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
