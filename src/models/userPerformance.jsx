class PerformanceData {
  constructor(data, kinds_mapping) {
    this.value = this.formatValue(data.value);
    this.kind = this.formatKind(data.kind, kinds_mapping);
  }

  formatValue(value) {
    return Number(value);
  }

  formatKind(kind, kinds_mapping) {
    return kinds_mapping[kind];
  }

  toJSON() {
    return {
      value: this.value,
      kind: this.kind,
    };
  }
}

export class UserPerformance {
  constructor(data) {
    this.userId = this.formatUserId(data.userId);
    this.kinds_mapping = data.kind;
    this.data = data.data.map(
      (item) => new PerformanceData(item, this.kinds_mapping)
    );
  }

  formatUserId(userId) {
    return Number(userId);
  }

  toJSON() {
    return {
      userId: this.userId,
      data: this.data.map((item) => item.toJSON()),
    };
  }
}

export default UserPerformance;
