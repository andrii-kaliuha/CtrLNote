import { useTranslation } from "react-i18next";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import type { ConfirmDialogProps } from "../types/ui";

const DialogSx = {
  "& .MuiPaper-root": {
    backgroundColor: "var(--color-surface)",
    color: "var(--text-primary)",
    borderRadius: "12px",
    padding: "8px",
  },
};

const ButtonSx = {
  backgroundColor: "var(--color-surface)",
  color: "var(--text-primary)",
  borderRadius: "8px",
  height: "32px",
  px: 2,
  textTransform: "none",
  border: "2px solid transparent",

  "&:hover, &:focus": {
    backgroundColor: "var(--color-surface)",
    borderColor: "var(--color-interactive)",
  },

  "&:active": { borderColor: "var(--color-primary)" },
};

export const ConfirmDialog = ({ open, onClose, onConfirm, title, description }: ConfirmDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} disableRestoreFocus sx={DialogSx}>
      <DialogTitle sx={{ fontWeight: 600 }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "var(--text-secondary)" }}>{description}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: "16px" }}>
        <Button onClick={onClose} sx={ButtonSx} disableRipple>
          {t("actions.cancel")}
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          variant="contained"
          disableElevation
          disableRipple
          sx={{ ...ButtonSx, color: "var(--color-primary) !important" }}
        >
          {t("actions.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
