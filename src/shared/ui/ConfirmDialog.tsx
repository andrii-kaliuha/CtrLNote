import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
};

export const ConfirmDialog = ({ open, onClose, onConfirm, title, description }: ConfirmDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableRestoreFocus
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "var(--color-surface)",
          color: "var(--text-primary)",
          borderRadius: "12px",
          padding: "8px",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "var(--text-secondary)" }}>{description}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: "16px" }}>
        <Button
          onClick={onClose}
          sx={{
            color: "var(--color-interactive)",
            border: "2px solid var(--color-interactive)",
            borderRadius: "8px",
            height: "36px",
            textTransform: "none",
          }}
        >
          {t("actions.cancel")}
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          variant="contained"
          disableElevation
          sx={{
            backgroundColor: "var(--color-primary)",
            textTransform: "none",
            borderRadius: "8px",
            height: "36px",
          }}
        >
          {t("actions.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
