import styles from "./DashboardLayout.module.scss";
import NutritionCard from "@/components/ui_molecules/NutritionCard/NutritionCard";
import {
  useUser,
  useUserActivity,
  useUserAverageSessions,
  useUserPerformance,
} from "@/hooks/useUser";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faAppleWhole,
  faDrumstickBite,
  faBurger,
} from "@fortawesome/free-solid-svg-icons";
import DailyActivityRechartChart from "@/components/ui_molecules/DailyActivityChart/DailyActivityChart";
import AverageSessionRechartChart from "@/components/ui_molecules/AverageSessionChart/AverageSessionChart";
import ScoreChart from "@/components/ui_molecules/ScoreChart/ScoreChart";
import PerformanceRadarChart from "@/components/ui_molecules/PerformanceRadarChart/PerformanceRadarChart";
function DashboardLayout() {
  const { id } = useParams();
  const { user, isLoading, error } = useUser(id);
  const {
    activity,
    isLoading: isLoadingActivity,
    error: errorActivity,
  } = useUserActivity(id);

  const {
    averageSessions,
    isLoading: isLoadingAverageSessions,
    error: errorAverageSessions,
  } = useUserAverageSessions(id);

  const {
    performance,
    isLoading: isLoadingPerformance,
    error: errorPerformance,
  } = useUserPerformance(id);

  if (
    isLoading ||
    isLoadingActivity ||
    isLoadingAverageSessions ||
    isLoadingPerformance
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboardLayout}>
      <div className={styles.dashboardLayout__header}>
        <h1>
          Bonjour
          <span className={styles.dashboardLayout__header__name}>
            {` ${user.userInfos.firstName}`}
          </span>
        </h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>

      <div className={styles.dashboardLayout__content}>
        <div className={styles.dashboardLayout__content__left}>
          <DailyActivityRechartChart data={activity.sessions} />
          <div className={styles.dashboardLayout__content__left__other}>
            <AverageSessionRechartChart data={averageSessions.sessions} />
            <PerformanceRadarChart data={performance.data} />
            <ScoreChart score={user.todayScore || user.score} />
          </div>
        </div>
        <div className={styles.dashboardLayout__content__right}>
          <NutritionCard
            icon={<FontAwesomeIcon icon={faFire} />}
            value={user.keyData.calorieCount.toLocaleString("en-US")}
            unit="kCal"
            label="Calories"
            color="#FF0000"
          />
          <NutritionCard
            icon={<FontAwesomeIcon icon={faAppleWhole} />}
            value={user.keyData.carbohydrateCount}
            unit="g"
            label="Glucides"
            color="#4AB8FF"
          />
          <NutritionCard
            icon={<FontAwesomeIcon icon={faDrumstickBite} />}
            value={user.keyData.proteinCount}
            unit="g"
            label="Proteines"
            color="#FDCC0C"
          />
          <NutritionCard
            icon={<FontAwesomeIcon icon={faBurger} />}
            value={user.keyData.lipidCount}
            unit="g"
            label="Lipides"
            color="#FD5181"
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
