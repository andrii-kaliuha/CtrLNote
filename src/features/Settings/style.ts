export const containerSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  listStyle: "none",
  paddingY: "var(--space-xs)",
};

export const menuProps = {
  PaperProps: {
    sx: {
      backgroundColor: "var(--color-surface)",
      color: "var(--text-primary)",
      marginTop: "var(--space-xs)",
      borderRadius: "var(--radius-md)",
      padding: 0,
      boxShadow: "none",
      border: "var(--border-width) solid var(--color-primary)",
      "& .MuiList-root": { padding: 0 },
    },
  },
};

export const selectSx = {
  minWidth: 128,
  height: "var(--btn-md)",
  minHeight: "var(--btn-md)",
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    paddingX: 2,
    height: "var(--btn-md)",
  },
  backgroundColor: "var(--color-surface)",
  color: "var(--text-primary)",
  borderRadius: "var(--radius-md)",
  fontSize: "var(--text-md)",
  "& fieldset": { border: "var(--border-width) solid transparent" },
  "&:hover fieldset": { borderColor: "var(--color-interactive) !important" },
  "&.Mui-focused fieldset": { borderColor: "var(--color-primary) !important" },
  "& .MuiSelect-icon": { color: "var(--color-interactive)" },
  "& .MuiSelect-iconOpen": { color: "var(--color-primary)" },
};

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
