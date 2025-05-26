class ActivitySession {
  constructor(data, index) {
    this.day = data.day;
    this.kilogram = this.formatKilogram(data.kilogram);
    this.calories = this.formatCalories(data.calories);
    this.weekDay = index + 1;
  }

  formatKilogram(kilogram) {
    return Number(kilogram);
  }

  formatCalories(calories) {
    return Number(calories);
  }

  toJSON() {
    return {
      day: this.day,
      kilogram: this.kilogram,
      calories: this.calories,
      weekDay: this.weekDay,
    };
  }
}

export class UserActivity {
  constructor(data) {
    this.userId = this.formatUserId(data.userId);
    this.sessions = data.sessions.map(
      (session, index) => new ActivitySession(session, index)
    );
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

export default UserActivity;
