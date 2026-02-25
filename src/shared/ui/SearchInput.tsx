// import { SearchInputProps } from "../types/types";

// export const SearchInput: React.FC<SearchInputProps> = ({ name, value, onChange, placeholder }) => {
//   return (
//     <input
//       name={name}
//       type="text"
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="p-3 outline-none rounded-[8px] caret-[var(--color-primary)]
//       bg-[var(--color-surface)] focus:bg-transparent
//                  focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]
//                  hover:border-[var(--color-primary)] transition w-full h-12"
//     />
//   );
// };

import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchInputProps } from "../types/types";

export const SearchInput: React.FC<SearchInputProps> = ({ name, value, onChange, placeholder }) => {
  return (
    <TextField
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      // Додаємо іконку пошуку як у професійних інпутах (опціонально)
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "var(--text-secondary)", fontSize: 20 }} />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          width: "100%",
          height: "48px", // Трохи вищий за кнопку для зручності вводу
          backgroundColor: "var(--color-surface)",
          color: "var(--text-primary)",
          borderRadius: "8px",
          // borderWidth: "2px",
          transition: "all 0.2s ease-in-out",

          "&:hover": {
            backgroundColor: "var(--color-hover)",
          },

          // Прибираємо стандартний жирний бордер MUI
          "& fieldset": {
            border: "2px solid var(--color-border)",
          },
          "&:hover fieldset": {
            borderColor: "var(--color-border) !important",
          },
          "&.Mui-focused fieldset": {
            borderWidth: "2px",
            borderColor: "var(--color-border) !important",
          },
          // "&.Mui-focused": {
          //   backgroundColor: "transparent", // Як у вашому оригінальному коді
          // },
        },
        "& .MuiOutlinedInput-input": {
          padding: "12px 14px 12px 0", // Коригуємо паддінг через іконку
          "&::placeholder": {
            color: "var(--text-secondary)",
            opacity: 1,
          },
        },
      }}
    />
  );
};
