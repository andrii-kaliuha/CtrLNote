export const iconButtonSx = (isOpen: boolean) => ({
  borderRadius: "50%",
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
    borderRadius: "8px",
    border: "2px solid var(--color-primary)",
  },
  "& .MuiList-root": { padding: 0 },
};

export const menuItemSx = {
  padding: "8px 16px",
  color: "var(--text-primary)",
  fontSize: "14px",
  minHeight: "36px",
  "&:hover": {
    backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 85%) !important",
    color: "var(--color-primary)",
  },
  "&:active": {
    backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 75%) !important",
  },
};
