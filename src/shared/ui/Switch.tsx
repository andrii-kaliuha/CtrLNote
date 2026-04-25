import React from "react";
import { Box, Switch as MuiSwitch, styled, Typography } from "@mui/material";
import { SwitchProps } from "../types/types";

export const Switch: React.FC<SwitchProps> = ({ text, name, checked, onChange }) => (
  <Box component="li" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }} aria-label={text}>
    <Typography variant="body2">{text}</Typography>
    <MySwitch name={name} checked={checked} onChange={onChange} />
  </Box>
);

const MySwitch = styled(MuiSwitch)(() => ({
  width: 64,
  height: 32,
  padding: 0,
  display: "flex",
  transition: "none !important",

  "& .MuiSwitch-thumb": {
    width: 20,
    height: 20,
    backgroundColor: "var(--color-interactive)",
    boxShadow: "none",
    transition: "none !important",
  },

  "& .MuiSwitch-switchBase": {
    padding: 6,
    margin: 0,

    "&:hover": { backgroundColor: "transparent" },
    "& .MuiTouchRipple-root": { display: "none" },

    "&.Mui-checked": {
      transform: "translateX(32px)",

      "&:hover": { backgroundColor: "transparent" },
      "& .MuiSwitch-thumb": { backgroundColor: "var(--color-primary)" },
      "& + .MuiSwitch-track": {
        backgroundColor: "var(--color-surface)",
        opacity: 1,
        border: "2px solid transparent",
      },
      "&:hover + .MuiSwitch-track": { borderColor: "var(--color-primary)" },
    },

    "&:hover + .MuiSwitch-track": { borderColor: "var(--color-interactive)" },
    "&.Mui-focusVisible + .MuiSwitch-track": {
      borderColor: "var(--color-primary)",
      borderWidth: "2px",
    },
  },

  "& .MuiSwitch-track": {
    borderRadius: 32 / 2,
    backgroundColor: "var(--color-surface)",
    opacity: 1,
    border: "2px solid transparent",
    transition: "none !important",
  },
}));
