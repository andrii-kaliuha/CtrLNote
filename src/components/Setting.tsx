// import { FormControl, MenuItem, Select, Typography } from "@mui/material";
// import type { SettingProps } from "../shared/types/types";
// import { menuItemStyles, menuProps, selectStyles } from "../shared/style/style";

// export const Setting = ({ title, value, options, function: handleChange }: SettingProps) => {
//   return (
//     <li>
//       <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
//         <Typography variant="body1">{title}</Typography>
//         <Select name={title} value={value} onChange={handleChange} sx={selectStyles} MenuProps={menuProps}>
//           {options.map((item) => (
//             <MenuItem sx={menuItemStyles} value={item.value} key={item.value}>
//               {item.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </li>
//   );
// };

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
        // py: 1.5, // Вертикальні відступи
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
          minWidth: 120, // Фіксована ширина, щоб назва не "штовхала" селект
          backgroundColor: "var(--color-surface)",
          color: "var(--text-primary)",
          borderRadius: "8px",
          fontSize: "0.875rem",

          // Прибираємо стандартний бордер і додаємо стиль
          "& fieldset": {
            border: "2px solid transparent",
            transition: "border-color 0.2s",
          },
          "&:hover fieldset": {
            borderColor: "var(--color-border) !important",
          },
          "&.Mui-focused fieldset": {
            borderColor: "var(--color-primary) !important",
            borderWidth: "2px",
          },

          // Стиль для самої іконки стрілочки
          "& .MuiSelect-icon": {
            color: "var(--text-secondary)",
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
