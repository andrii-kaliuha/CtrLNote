export const searchInputSx = {
  "& .MuiOutlinedInput-root": {
    height: "var(--btn-icon)",
    backgroundColor: "var(--color-surface)",
    color: "var(--text-primary)",
    borderRadius: "var(--radius-md)",
    "& fieldset": { border: "var(--border-width) solid transparent" },
    "&:hover fieldset": { borderColor: "var(--color-interactive) !important" },
    "&.Mui-focused fieldset": {
      borderColor: "var(--color-primary) !important",
      borderWidth: "var(--border-width)",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "var(--space-md) var(--space-md) var(--space-md) 0",
    "&::placeholder": {
      color: "var(--text-secondary)",
      opacity: 0.8,
    },
  },
};
