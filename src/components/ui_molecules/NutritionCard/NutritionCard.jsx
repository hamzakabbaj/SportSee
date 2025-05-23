import styles from "./NutritionCard.module.scss";

function NutritionCard({ icon, value, unit, label, color }) {
  return (
    <div className={styles.nutritionCard}>
      <div
        className={styles.nutritionCard__icon}
        style={{
          backgroundColor: color ? `${color}4D` : undefined,
          color: color || undefined,
        }}
      >
        {icon}
      </div>
      <div className={styles.nutritionCard__info}>
        <p>
          {value}
          {unit}
        </p>
        <span>{label}</span>
      </div>
    </div>
  );
}

export default NutritionCard;
