export const menuItemStyles = {
  height: "36px",
  minHeight: "36px",
  padding: "0 12px",
  display: "flex",
  alignItems: "center",

  fontSize: "14px",
  color: "var(--text-primary)",
  cursor: "pointer",
  transition: "all 0.2s ease",

  "&.Mui-selected": {
    backgroundColor: "var(--color-primary) !important",
    color: "#FFFFFF", // змінні
  },

  "&:hover, &.Mui-focusVisible": {
    backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 85%) !important",
    color: "var(--text-primary)",
    outline: "none",
  },

  "&.Mui-selected:hover": {
    backgroundColor: "var(--color-primary) !important",
    opacity: 0.9,
  },
};

export const menuProps = {
  PaperProps: {
    sx: {
      backgroundColor: "var(--color-secondary)",
      color: "var(--text-primary)",

      marginTop: "4px",
      borderRadius: "8px",
      boxShadow: "none",
      border: "2px solid var(--color-primary)",

      "& .MuiList-root": { padding: 0 },
    },
  },
};
