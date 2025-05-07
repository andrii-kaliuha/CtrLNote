import { TextField as MuiTextField } from "@mui/material";
import { TextFieldProps } from "../types";

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
        "& label.Mui-focused": { color: "var(--color-primary)" },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--color-primary)" },
      }}
    />
  );
};
