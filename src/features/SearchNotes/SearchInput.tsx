import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchInputProps } from "../../shared/types/types";
import { searchInputSx } from "./style";

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
      sx={searchInputSx}
    />
  );
};
