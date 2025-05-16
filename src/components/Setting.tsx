import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import type { SettingProps } from "../shared/types/types";
import { menuItemStyles, menuProps, selectStyles } from "../shared/style/style";

export const Setting = ({ title, value, options, function: handleChange }: SettingProps) => {
  return (
    <li>
      <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Typography variant="body1">{title}</Typography>
        <Select name={title} value={value} onChange={handleChange} sx={selectStyles} MenuProps={menuProps}>
          {options.map((item) => (
            <MenuItem sx={menuItemStyles} value={item.value} key={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </li>
  );
};
