import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import type { SettingProps } from "../types";

export const Setting = ({ title, value, options, function: handleChange }: SettingProps) => {
  return (
    <li>
      <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Typography variant="body1">{title}</Typography>
        <Select
          name={title}
          value={value}
          onChange={handleChange}
          sx={{
            color: "var(--text-primary)",
            height: 40,
            width: 200,
            borderColor: "var(--color-primary)",
            "& .MuiSelect-select": { padding: "0.5px 12px" },
            "& fieldset": { borderColor: "transparent !important" },
            "&:hover fieldset": { borderColor: "var(--color-primary) !important" },
            "&.Mui-focused fieldset": { borderColor: "var(--color-primary) !important" },
            "& .MuiSvgIcon-root": { color: "inherit" },
            "&.Mui-focused .MuiSvgIcon-root": { color: "var(--color-primary)" },
            "&:hover .MuiSvgIcon-root": { color: "var(--color-primary)" },
          }}
        >
          {options.map((item) => (
            // <MenuItem key={item.value} value={item.value}>
            //   {item.name}
            // </MenuItem>
            <MenuItem
              value={item.value}
              key={item.value}
              sx={{
                padding: "10px 16px",
                color: "var(--text-primary)",
                fontSize: "14px",
                "&:hover": { backgroundColor: "var(--color-hover)" },
              }}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </li>
  );
};
