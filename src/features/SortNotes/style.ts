export const menuItemStyles = {
  height: "36px",
  minHeight: "36px",
  padding: "0 12px",
  display: "flex",
  alignItems: "center",
  fontSize: "14px",
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

export const menuProps = {
  PaperProps: {
    sx: {
      backgroundColor: "var(--color-surface)",
      color: "var(--text-primary)",

      marginTop: "4px",
      borderRadius: "8px",
      padding: 0,

      boxShadow: "none",
      border: "2px solid var(--color-primary)",

      "& .MuiList-root": { padding: 0 },
    },
  },
};

export const sortButtonSx = {
  width: 48,
  height: 48,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "var(--color-surface)",
  color: "var(--color-primary)",
  borderRadius: "8px",
  cursor: "pointer",
  border: "2px solid transparent",
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
  marginTop: "4px",
  borderRadius: "8px",
  boxShadow: "none",
  border: "2px solid var(--color-primary)",
  "& .MuiList-root": { padding: 0 },
};
