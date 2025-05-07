import { Button as MuiButton } from "@mui/material";
import type { ButtonProps } from "../types";

export const Button: React.FC<ButtonProps> = ({ action, text }) => {
  return (
    <MuiButton variant="text" sx={{ color: "var(--color-primary)", borderRadius: "8px" }} onClick={action}>
      {text}
    </MuiButton>
  );
};
