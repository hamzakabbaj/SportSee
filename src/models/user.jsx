class UserInfos {
  constructor(data) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.age = this.formatAge(data.age);
  }

  formatAge(age) {
    return Number(age);
  }

  toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
    };
  }
}

class KeyData {
  constructor(data) {
    this.calorieCount = this.formatCalorieCount(data.calorieCount);
    this.proteinCount = this.formatProteinCount(data.proteinCount);
    this.carbohydrateCount = this.formatCarbohydrateCount(
      data.carbohydrateCount
    );
    this.lipidCount = this.formatLipidCount(data.lipidCount);
  }

  formatCalorieCount(calorieCount) {
    return Number(calorieCount);
  }

  formatProteinCount(proteinCount) {
    return Number(proteinCount);
  }

  formatCarbohydrateCount(carbohydrateCount) {
    return Number(carbohydrateCount);
  }

  formatLipidCount(lipidCount) {
    return Number(lipidCount);
  }

  toJSON() {
    return {
      calorieCount: this.calorieCount,
      proteinCount: this.proteinCount,
      carbohydrateCount: this.carbohydrateCount,
      lipidCount: this.lipidCount,
    };
  }
}

export class User {
  constructor(data) {
    this.id = data.id;
    this.userInfos = new UserInfos(data.userInfos);
    this.keyData = new KeyData(data.keyData);
    this.score = this.formatScore(data);
  }

  formatScore(data) {
    if (data.todayScore) {
      return Math.round(data.todayScore * 100);
    } else {
      return Math.round(data.score * 100);
    }
  }

  toJSON() {
    return {
      id: this.id,
      userInfos: this.userInfos.toJSON(),
      keyData: this.keyData.toJSON(),
      score: this.score,
    };
  }
}

export default User;
