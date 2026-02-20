import { ReactNode, ElementType } from "react";

interface EmptyStateProps {
  icon?: ElementType;
  title: string;
  description?: string | ReactNode;
  className?: string;
}

export const EmptyState = ({ icon: Icon, title, description, className = "" }: EmptyStateProps) => {
  return (
    <Wrapper className={className}>
      {Icon && <Icon sx={{ fontSize: 128, color: "var(--text-secondary)", opacity: 0.5 }} />}
      <p className="text-lg mt-3 text-center font-medium">{title}</p>
      {description && <p className="text-sm text-[var(--text-secondary)] text-center mt-1">{description}</p>}
    </Wrapper>
  );
};

type WrapperProps = { children: ReactNode; className?: string };

export const Wrapper = ({ children, className = "" }: WrapperProps) => {
  return (
    <section
      className={`
        flex-1 min-h-full w-full 
        
        flex flex-col items-center justify-center 
        
        p-3 
        
        ${className}
      `}
    >
      {children}
    </section>
  );
};
