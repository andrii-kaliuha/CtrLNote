import { ElementType } from "react";

interface EmptyStateProps {
  icon?: ElementType;
  title: string;
  description?: string;
}

export const EmptyState = ({ icon: Icon, title, description }: EmptyStateProps) => {
  return (
    <section className="flex flex-col items-center justify-center gap-3 flex-1 h-full w-full">
      {Icon && <Icon sx={{ fontSize: 128, color: "var(--text-secondary)" }} />}
      <div>
        <p className="text-lg text-center font-medium">{title}</p>
        {description && <p className="text-sm text-center text-[var(--text-primary)]">{description}</p>}
      </div>
    </section>
  );
};
