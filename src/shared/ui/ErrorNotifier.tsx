import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setStorageError } from "../../app/store/uiSlice";
import { RootState } from "../../app/store/store";

export const ErrorNotifier = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.ui.storageError);

  const handleClose = () => dispatch(setStorageError(null));
  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
