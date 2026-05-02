import { useTranslation } from "react-i18next";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import type { ConfirmDialogProps } from "../types/ui";
import { ButtonSx } from "../style";

const DialogSx = {
  "& .MuiPaper-root": {
    backgroundColor: "var(--color-surface)",
    color: "var(--text-primary)",
    borderRadius: "12px",
    padding: "8px",
  },
};

export const ConfirmDialog = ({ open, onClose, onConfirm, title, description }: ConfirmDialogProps) => {
  const { t } = useTranslation();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} disableRestoreFocus sx={DialogSx}>
      <DialogTitle sx={{ fontWeight: 600 }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "var(--text-secondary)" }}>{description}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: "16px" }}>
        <Button onClick={onClose} disableRipple sx={ButtonSx}>
          {t("actions.cancel")}
        </Button>
        <Button onClick={handleConfirm} disableRipple sx={{ ...ButtonSx, color: "var(--color-primary) !important" }}>
          {t("actions.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
