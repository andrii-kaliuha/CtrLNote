import { MenuItem, Select, Typography, Box } from "@mui/material";
import type { SettingProps } from "../../shared/types/types";
import { menuItemStyles, menuProps } from "../../shared/style/style";

export const Setting = ({ idKey, title, value, options, function: handleChange }: SettingProps) => {
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
        name={idKey}
        size="small"
        sx={{
          minWidth: 128,
          height: "36px",
          minHeight: "36px",

          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            paddingX: 2,
            height: "36px",
          },

          backgroundColor: "var(--color-surface)",
          color: "var(--text-primary)",
          borderRadius: "8px",
          fontSize: "14px",

          "& fieldset": {
            border: "2px solid transparent",
          },
          "&:hover fieldset": {
            borderColor: "var(--color-interactive) !important",
          },
          "&.Mui-focused fieldset": {
            borderColor: "var(--color-primary) !important",
          },
          "& .MuiSelect-icon": {
            color: "var(--color-interactive) ",
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
