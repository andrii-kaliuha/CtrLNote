import { Switch as MuiSwitch } from "@mui/material";
import { SwitchProps } from "../types";

export const Switch: React.FC<SwitchProps> = ({ text, name, checked, onChange }) => (
  <li className="flex items-center justify-between w-full">
    <p>{text}</p>
    <MuiSwitch
      sx={{
        "& .MuiSwitch-thumb": {
          backgroundColor: "var(--color-primary)",
        },
        "& .MuiSwitch-track": {
          backgroundColor: "var(--color-primary) !important",
          opacity: 0.38,
        },
        "&.Mui-checked + .MuiSwitch-track": {
          backgroundColor: "var(--color-primary)",
          opacity: 0.5,
        },
        "&.Mui-checked .MuiSwitch-thumb": {
          backgroundColor: "var(--color-primary)",
        },
      }}
      name={name}
      checked={checked}
      onChange={onChange}
    />
  </li>
);
