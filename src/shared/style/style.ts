export const menuItemStyles = {
  padding: "10px 16px",
  fontSize: "14px",
  color: "var(--text-primary)",
  "&.Mui-selected, &.Mui-selected:hover, &.Mui-selected.Mui-focusVisible": {
    backgroundColor: "var(--color-primary)",
  },
};

export const selectStyles = {
  color: "var(--text-primary)",
  height: 40,
  width: 200,
  textAlign: "end",
  "& .MuiSelect-select": {
    padding: "0.5px 12px",
  },
  "& fieldset": {
    borderColor: "transparent !important",
  },
  "&:hover": {
    backgroundColor: "var(--color-hover) !important",
  },
  "&.Mui-focused": {
    backgroundColor: "var(--color-hover) !important",
  },
  "& .MuiSvgIcon-root": {
    color: "inherit",
  },
};

export const menuProps = {
  PaperProps: {
    sx: {
      backgroundColor: "var(--color-secondary)",
      color: "var(--text-primary)",
      "& .MuiList-root": {
        padding: 0,
      },
    },
  },
};
