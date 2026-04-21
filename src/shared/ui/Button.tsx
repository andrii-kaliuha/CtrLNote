import { Button as MuiButton } from "@mui/material";
import type { ButtonProps } from "../types/types";

export const Button: React.FC<ButtonProps> = ({ action, text }) => {
  return (
    <MuiButton
      sx={{
        color: "var(--color-primary)",
        border: "2px solid transparent",
        backgroundColor: "var(--color-surface)",
        borderRadius: "8px",
        lineHeight: 1,
        height: "32px",
      }}
      onClick={action}
    >
      {text}
    </MuiButton>
  );
};
