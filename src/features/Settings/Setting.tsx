import { MenuItem, Select, Typography, Box } from "@mui/material";
import type { SettingProps } from "../../shared/types/types";
import { menuItemStyles, menuProps, selectSx, containerSx } from "./style";

export const Setting = ({ idKey, title, value, options, function: handleChange }: SettingProps) => (
  <Box component="li" sx={containerSx} aria-label={title}>
    <Typography variant="body2">{title}</Typography>
    <Select value={value} onChange={handleChange} MenuProps={menuProps} name={idKey} size="small" sx={selectSx}>
      {options.map((item) => (
        <MenuItem sx={menuItemStyles} value={item.value} key={item.value}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  </Box>
);
