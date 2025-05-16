import { Button as MuiButton } from "@mui/material";
import type { ButtonProps } from "../types/types";

export const Button: React.FC<ButtonProps> = ({ action, text }) => {
  return (
    <MuiButton variant="text" sx={{ color: "var(--color-primary)", borderRadius: "24px", lineHeight: 1, height: "32px" }} onClick={action}>
      {text}
    </MuiButton>
  );
};
