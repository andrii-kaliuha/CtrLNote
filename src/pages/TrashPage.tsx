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

export const TrashPage = () => {
  const { notes, trashEnabled, days } = useSettings();
  const deletedNotes = notes.filter((note) => note.status === "deleted");

  if (trashEnabled === false) return <TrashDisabled />;

  return (
    <>
      {deletedNotes.length > 0 ?
        <Trash notes={deletedNotes} />
      : <EmptyTrash days={days} />}
    </>
  );
};

const Trash = ({ notes }: { notes: NoteProps[] }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isRestoreOpen, setRestoreOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1 gap-3 h-full w-full">
      <div className="flex justify-between items-center gap-3">
        <h2 className="hidden sm:block pl-3">{t("trash_title")}</h2>

        <div className="flex gap-3">
          <TrashButton action={() => setRestoreOpen(true)} text={t("trash_restore_all")} />
          <TrashButton action={() => setDeleteOpen(true)} text={t("trash_delete_all")} />
        </div>
      </div>

      <div className="overflow-y-auto">
        <Notes notes={notes} />
      </div>

      <ConfirmDialog
        open={isRestoreOpen}
        onClose={() => setRestoreOpen(false)}
        onConfirm={() => dispatch(restoreAllNotes())}
        title={t("confirm_restore_title")}
        description={t("confirm_restore_all_message")}
      />

      <ConfirmDialog
        open={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => dispatch(clearTrash())}
        title={t("confirm_delete_title")}
        description={t("confirm_delete_all_message")}
      />
    </div>
  );
};

const EmptyTrash = ({ days }: { days: number }) => {
  const { t } = useTranslation();

  return <EmptyState icon={DeleteIcon} title={t("trash_empty_message")} description={t("trash_auto_delete_message", { count: days })} />;
};

const TrashDisabled = () => {
  const { t } = useTranslation();

  return <EmptyState icon={DeleteIcon} title={t("trash_disabled_message")} description={t("trash_enable_instruction")} />;
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
        textTransform: "none",
        border: "2px solid transparent",

        "&:hover": {
          borderColor: "var(--color-border)",
        },
        "&:active": {
          borderColor: "var(--color-primary)",
        },
      }}
    >
      {text}
    </Button>
  );
};
