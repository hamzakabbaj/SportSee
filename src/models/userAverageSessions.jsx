const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];

class AverageSession {
  constructor(data) {
    this.day = data.day;
    this.label = WEEKDAYS[data.day - 1];
    this.sessionLength = this.formatSessionLength(data.sessionLength);
  }

  formatSessionLength(sessionLength) {
    return Number(sessionLength);
  }

  toJSON() {
    return {
      day: this.day,
      label: this.label,
      sessionLength: this.sessionLength,
    };
  }
}

export class UserAverageSessions {
  constructor(data) {
    this.userId = this.formatUserId(data.userId);
    this.sessions = data.sessions.map((session) => new AverageSession(session));
  }

  formatUserId(userId) {
    return Number(userId);
  }

  toJSON() {
    return {
      userId: this.userId,
      sessions: this.sessions.map((session) => session.toJSON()),
    };
  }
}

export default UserAverageSessions;
