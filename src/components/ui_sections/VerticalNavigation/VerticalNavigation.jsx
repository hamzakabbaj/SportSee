import styles from "./VerticalNavigation.module.scss";
import yoga from "@/assets/icons/yoga.svg";
import swim from "@/assets/icons/swim.svg";
import cycle from "@/assets/icons/cycle.svg";
import weight from "@/assets/icons/weight.svg";

function VerticalNavigation() {
  return (
    <div className={styles.verticalNavigation}>
      <div className={styles.verticalNavigation__sports}>
        <div className={styles.verticalNavigation__sports__icon}>
          <img src={yoga} alt="yoga" />
        </div>
        <div className={styles.verticalNavigation__sports__icon}>
          <img src={swim} alt="swim" />
        </div>
        <div className={styles.verticalNavigation__sports__icon}>
          <img src={cycle} alt="cycle" />
        </div>
        <div className={styles.verticalNavigation__sports__icon}>
          <img src={weight} alt="weight" />
        </div>
      </div>
      <div className={styles.verticalNavigation__copyright}>
        <p>Copyright, SportSee 2020</p>
      </div>
    </div>
  );
}

export default VerticalNavigation;
