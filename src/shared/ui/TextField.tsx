import { TextField as MuiTextField } from "@mui/material";
import { TextFieldProps } from "../types/types";

export const TextField: React.FC<TextFieldProps> = ({ label, text, action, rows }) => {
  return (
    <MuiTextField
      label={label}
      variant="outlined"
      fullWidth
      multiline
      rows={rows}
      value={text}
      onChange={action}
      margin="normal"
      sx={{
        "& .MuiInputBase-input": { color: "var(--text-primary)", caretColor: "var(--color-primary)" },
        "& label": { color: "var(--text-primary)" },
        "& label.Mui-focused": { color: "var(--color-primary)" },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": { borderColor: "var(--text-primary)", borderWidth: "2px" },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { borderColor: "var(--color-border-hover)", borderWidth: "2px" },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--color-primary)", borderWidth: "2px" },
      }}
    />
  );
};
