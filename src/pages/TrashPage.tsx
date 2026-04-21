import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { clearTrash, restoreAllNotes } from "../store/slices/notesSlice";
import { NoteProps } from "../shared/types/types";
import { Notes } from "../components/Notes";
import { EmptyState } from "../shared/ui/EmptyState";
import { useSettings } from "../shared/hooks/useSettings";
import { useState } from "react";
import { ConfirmDialog } from "../shared/ui/ConfirmDialog";
import styles from "./TrashPage.module.css";

export const TrashPage = () => {
  const { notes, trashEnabled, days } = useSettings();
  const deletedNotes = notes.filter((note) => note.status === "deleted");

  if (trashEnabled === false) return <TrashDisabled />;

  return (
    <div className={styles.container}>
      {deletedNotes.length > 0 ?
        <Trash notes={deletedNotes} />
      : <EmptyTrash days={days} />}
    </div>
  );
};

const Trash = ({ notes }: { notes: NoteProps[] }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isRestoreOpen, setRestoreOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>{t("trash.title")}</h2>

        <div className={styles.controls}>
          <TrashButton action={() => setRestoreOpen(true)} text={t("trash.restore.all")} />
          <TrashButton action={() => setDeleteOpen(true)} text={t("trash.delete.all")} />
        </div>
      </div>

      <div className={styles.scrollArea}>
        <Notes notes={notes} />
      </div>

      <ConfirmDialog
        open={isRestoreOpen}
        onClose={() => setRestoreOpen(false)}
        onConfirm={() => dispatch(restoreAllNotes())}
        title={t("trash.restore.title")}
        description={t("trash.restore.message_all")}
      />

      <ConfirmDialog
        open={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => dispatch(clearTrash())}
        title={t("trash.delete.title")}
        description={t("trash.delete.message_all")}
      />
    </>
  );
};

const EmptyTrash = ({ days }: { days: number }) => {
  const { t } = useTranslation();

  return <EmptyState icon={DeleteIcon} title={t("trash.empty_message")} description={t("trash.auto_delete_message", { count: days })} />;
};

const TrashDisabled = () => {
  const { t } = useTranslation();

  return <EmptyState icon={DeleteIcon} title={t("trash.disabled_message")} description={t("trash.enable-instruction")} />;
};

const TrashButton = ({ action, text }: { action: () => void; text: string }) => {
  return (
    <Button
      onClick={action}
      disableRipple
      sx={{
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
      }}
    >
      {text}
    </Button>
  );
};
