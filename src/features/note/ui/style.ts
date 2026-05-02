export const iconButtonSx = (isOpen: boolean) => ({
  borderRadius: "var(--radius-full)",
  transition: "all 0.2s ease",
  color: "var(--text-primary)",
  ...(isOpen && {
    backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 85%)",
    color: "var(--color-primary)",
  }),
  "&:hover": {
    backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 90%)",
    color: "var(--color-primary)",
  },
  "&:active": {
    backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 80%)",
    transform: "scale(0.92)",
  },
});

export const menuSx = {
  "& .MuiPaper-root": {
    width: "180px",
    backgroundColor: "var(--color-surface)",
    boxShadow: "none",
    borderRadius: "var(--radius-md)",
    border: "var(--border-width) solid var(--color-primary)",
  },
  "& .MuiList-root": { padding: 0 },
};

export const menuItemSx = {
  padding: "var(--space-sm) var(--space-lg)",
  color: "var(--text-primary)",
  fontSize: "var(--text-md)",
  minHeight: "var(--btn-md)",
  "&:hover": {
    backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 85%) !important",
    color: "var(--color-primary)",
  },
  "&:active": {
    backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 75%) !important",
  },
};
