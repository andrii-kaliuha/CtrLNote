import React from "react";
import { Switch as MuiSwitch, styled } from "@mui/material";
import { SwitchProps } from "../types/types";

export const Switch: React.FC<SwitchProps> = ({ text, name, checked, onChange }) => (
  <li className="flex items-center justify-between w-full">
    <p>{text}</p>
    <MySwitch name={name} checked={checked} onChange={onChange} />
  </li>
);

export const MySwitch = styled(MuiSwitch)(({ theme }) => ({
  width: 50,
  height: 28,
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "& .MuiSwitch-thumb": {
    width: 16,
    height: 16,
    backgroundColor: "#fff",
    boxShadow: "none",
    transition: theme.transitions.create(["background-color"], {
      duration: 200,
    }),
  },

  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 6,
    transitionDuration: "300ms",

    "&.Mui-checked": {
      transform: "translateX(22px)",

      "& + .MuiSwitch-track": {
        backgroundColor: "var(--color-primary)",

        opacity: 0.5,
        border: 0,
      },

      "& .MuiSwitch-thumb": {
        backgroundColor: "var(--color-primary)",
      },
    },

    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },

  "& .MuiSwitch-track": {
    width: 32,
    height: 10,
    opacity: "0.6",
    backgroundColor: "#d0d5dd",
    transition: theme.transitions.create(["background-color"], {
      duration: 300,
    }),
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
}));
