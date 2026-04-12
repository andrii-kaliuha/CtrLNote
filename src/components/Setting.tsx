import { MenuItem, Select, Typography, Box } from "@mui/material";
import type { SettingProps } from "../shared/types/types";
import { menuItemStyles, menuProps } from "../shared/style/style";

export const Setting = ({ title, value, options, function: handleChange }: SettingProps) => {
  return (
    <Box
      component="li"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        listStyle: "none",
        paddingY: "2px", // не видаляти, щоб не було обрізання бордеру
      }}
    >
      <Typography variant="body2">{title}</Typography>

      <Select
        value={value}
        onChange={handleChange}
        MenuProps={menuProps}
        size="small"
        sx={{
          minWidth: 120,
          height: "36px",
          minHeight: "36px",

          padding: 0,

          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            paddingY: 0,
            height: "36px",
          },

          backgroundColor: "var(--color-surface)",
          color: "var(--text-primary)",
          borderRadius: "8px",
          fontSize: "0.875rem", // ?? 14px змінна

          "& fieldset": {
            border: "2px solid transparent",
          },
          "&:hover fieldset": {
            borderColor: "#BDBDBD !important",
          },
          "&.Mui-focused fieldset": {
            borderColor: "var(--color-primary) !important",
          },
          "& .MuiSelect-icon": {
            color: "#BDBDBD ",
          },
          "& .MuiSelect-iconOpen": {
            color: "var(--color-primary)",
          },
        }}
      >
        {options.map((item) => (
          <MenuItem sx={menuItemStyles} value={item.value} key={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
