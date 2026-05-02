export const menuItemStyles = {
  height: "var(--btn-md)",
  minHeight: "var(--btn-md)",
  padding: "0 var(--space-md)",
  display: "flex",
  alignItems: "center",
  fontSize: "var(--text-md)",
  color: "var(--text-primary)",
  cursor: "pointer",
  transition: "background-color 0.2s ease, color 0.2s ease",

  "&.Mui-selected": {
    backgroundColor: "transparent !important",
    color: "var(--color-primary) !important",
    fontWeight: 500,
  },

  "&:hover, &.Mui-focusVisible": {
    backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 75%) !important",
    outline: "none",
  },

  "&.Mui-selected:hover": {
    backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 70%) !important",
  },
};

export const sortButtonSx = {
  width: "var(--btn-icon)",
  height: "var(--btn-icon)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "var(--color-surface)",
  color: "var(--color-primary)",
  borderRadius: "var(--radius-md)",
  cursor: "pointer",
  border: "var(--border-width) solid transparent",
  outline: "none",
  "&:hover, &:focus": {
    backgroundColor: "var(--color-surface)",
    borderColor: "var(--color-interactive)",
  },
  "&:active": { borderColor: "var(--color-primary)" },
  "& .MuiTouchRipple-root": { display: "none" },
};

export const paperSx = {
  backgroundColor: "var(--color-surface)",
  color: "var(--text-primary)",
  marginTop: "var(--space-xs)",
  borderRadius: "var(--radius-md)",
  boxShadow: "none",
  border: "var(--border-width) solid var(--color-primary)",
  "& .MuiList-root": { padding: 0 },
};
