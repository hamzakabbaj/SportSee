import HorizontalNavigation from "../../ui_sections/HorizontalNavigation/HorizontalNavigation";
import VerticalNavigation from "../../ui_sections/VerticalNavigation/VerticalNavigation";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";

function MainLayout() {
  return (
    <div className={styles.mainLayout}>
      <HorizontalNavigation />
      <VerticalNavigation />
      <Outlet />
    </div>
  );
}

export default MainLayout;
