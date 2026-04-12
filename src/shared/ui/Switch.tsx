import React from "react";
import { Switch as MuiSwitch, styled, Typography } from "@mui/material";
import { SwitchProps } from "../types/types";

export const Switch: React.FC<SwitchProps> = ({ text, name, checked, onChange }) => (
  <li className="flex items-center justify-between w-full">
    <Typography variant="body2">{text}</Typography>
    <MySwitch name={name} checked={checked} onChange={onChange} />
  </li>
);

export const MySwitch = styled(MuiSwitch)(({ theme }) => ({
  width: 64,
  height: 32,
  padding: 0,
  display: "flex",

  "& .MuiSwitch-thumb": {
    width: 20,
    height: 20,
    backgroundColor: "#BDBDBD", // Додати зміну кольору для вимкненого стану
    boxShadow: "none",
    transition: theme.transitions.create(["background-color", "transform"], {
      duration: 200,
    }),
  },

  "& .MuiSwitch-switchBase": {
    padding: 6,
    margin: 0,
    transitionDuration: "300ms",

    "&:hover": {
      backgroundColor: "transparent",
    },

    "& .MuiTouchRipple-root": {
      display: "none",
    },

    "&.Mui-checked": {
      transform: "translateX(32px)",

      "&:hover": {
        backgroundColor: "transparent",
      },

      "& .MuiSwitch-thumb": {
        backgroundColor: "var(--color-primary)",
      },

      "& + .MuiSwitch-track": {
        backgroundColor: "var(--color-surface)",
        opacity: 1,
        border: "2px solid transparent",
      },

      "&:hover + .MuiSwitch-track": {
        borderColor: "var(--color-primary)",
      },
    },

    "&:hover + .MuiSwitch-track": {
      borderColor: "#BDBDBD", // Додати зміну кольору для треку
    },

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
    transition: theme.transitions.create(["background-color", "border-color"], {
      duration: 200,
    }),
  },
}));
