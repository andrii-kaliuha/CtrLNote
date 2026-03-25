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
      }}
    >
      <Typography variant="body1" sx={{ color: "var(--text-primary)", fontWeight: 500 }}>
        {title}
      </Typography>

      <Select
        value={value}
        onChange={handleChange}
        MenuProps={menuProps}
        size="small"
        sx={{
          minWidth: 120,
          backgroundColor: "var(--color-surface)",
          color: "var(--text-primary)",
          borderRadius: "8px",
          fontSize: "0.875rem",

          "& fieldset": {
            border: "2px solid transparent",
          },
          "&:hover fieldset": {
            borderColor: "#BDBDBD !important",
          },
          "&.Mui-focused fieldset": {
            borderColor: "var(--color-primary) !important",
            borderWidth: "2px",
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
