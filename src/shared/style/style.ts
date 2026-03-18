export const menuItemStyles = {
  padding: "10px 16px",
  fontSize: "14px",
  color: "var(--text-primary)",
  "&.Mui-selected, &.Mui-selected:hover, &.Mui-selected.Mui-focusVisible": {
    backgroundColor: "var(--color-primary)",
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
