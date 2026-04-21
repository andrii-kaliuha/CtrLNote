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
          height: "48px",
          backgroundColor: "var(--color-surface)",
          color: "var(--text-primary)",
          borderRadius: "8px",

          "& fieldset": {
            border: "2px solid transparent",
          },

          "&:hover fieldset": {
            borderColor: "var(--color-interactive) !important",
          },

          "&.Mui-focused fieldset": {
            borderColor: "var(--color-primary) !important",
            borderWidth: "2px",
          },
        },

        "& .MuiOutlinedInput-input": {
          padding: "12px 14px 12px 0",
          "&::placeholder": {
            color: "var(--text-secondary)",
            opacity: 0.8,
          },
        },
      }}
    />
  );
};
