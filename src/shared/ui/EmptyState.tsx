import { ElementType } from "react";
import styles from "./EmptyState.module.css";

type EmptyStateProps = {
  icon?: ElementType;
  title: string;
  instruction?: string;
};

export const EmptyState = ({ icon: Icon, title, instruction }: EmptyStateProps) => {
  return (
    <section className={styles.container}>
      {Icon && <Icon sx={{ fontSize: 128, color: "var(--color-interactive)", opacity: 0.5 }} />}
      <div>
        <p className={styles.title}>{title}</p>
        {instruction && <p className={styles.instruction}>{instruction}</p>}
      </div>
    </section>
  );
};
