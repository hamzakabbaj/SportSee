import styles from "./HorizontalNavigation.module.scss";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

function HorizontalNavigation() {
  return (
    <div className={styles.horizontalNavigation}>
      <div className={styles.horizontalNavigation__logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.horizontalNavigation__links}>
        <Link to="/">Accueil</Link>
        <Link to="/profil">Profil</Link>
        <Link to="/settings">Réglages</Link>
        <Link to="/community">Communauté</Link>
      </div>
    </div>
  );
}

export default HorizontalNavigation;
