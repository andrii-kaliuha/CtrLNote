export const ButtonSx = {
  color: "var(--text-secondary)",
  borderRadius: "8px",
  height: "32px",
  px: 2,
  textTransform: "none",
  border: "2px solid transparent",

  "&:hover, &:focus": {
    backgroundColor: "var(--color-surface)",
    borderColor: "var(--color-interactive)",
  },

  "&:active": { borderColor: "var(--color-primary)" },
};
