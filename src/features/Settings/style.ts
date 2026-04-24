export const containerSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  listStyle: "none",
  paddingY: "2px",
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

export const selectSx = {
  minWidth: 128,
  height: "36px",
  minHeight: "36px",
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    paddingX: 2,
    height: "36px",
  },
  backgroundColor: "var(--color-surface)",
  color: "var(--text-primary)",
  borderRadius: "8px",
  fontSize: "14px",
  "& fieldset": { border: "2px solid transparent" },
  "&:hover fieldset": { borderColor: "var(--color-interactive) !important" },
  "&.Mui-focused fieldset": { borderColor: "var(--color-primary) !important" },
  "& .MuiSelect-icon": { color: "var(--color-interactive)" },
  "& .MuiSelect-iconOpen": { color: "var(--color-primary)" },
};

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
