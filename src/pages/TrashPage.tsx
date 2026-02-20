import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { restoreNote, removeNote as removeNotePermanently } from "../store/slices/notesSlice";
import { Notes } from "../components/Notes";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "..//shared/ui/Button";
import { autoDeleteNotes } from "..//shared/utils/autoDeleteNotes";
import { NoteProps } from "../shared/types/types";
import { EmptyState } from "../shared/ui/EmptyState";
import { IconButton } from "@mui/material";
import { Replay } from "@mui/icons-material";

export const TrashPage = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const deletedNotes = notes.filter((note) => note.status === "deleted");
  const autoDeletePeriod = useSelector((state: RootState) => state.settings.autoDeletePeriod);
  const trashEnabled = useSelector((state: RootState) => state.settings.trashEnabled);
  const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
  const days = autoDeletePeriod / MILLISECONDS_IN_DAY;

  const dispatch = useDispatch();

  useEffect(() => {
    autoDeleteNotes(dispatch, deletedNotes, autoDeletePeriod);

    const interval = setInterval(() => {
      autoDeleteNotes(dispatch, deletedNotes, autoDeletePeriod);
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

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

  const restoreAll = () => notes.forEach((note) => dispatch(restoreNote(note.id)));
  const removeAll = () => notes.forEach((note) => dispatch(removeNotePermanently(note.id)));

  return (
    <div className="relative flex flex-col h-full w-full flex-1">
      <div className="sticky top-0 left-0 flex gap-3 justify-between items-center w-full pb-3 bg-[var(--color-background)]">
        <h2 className="hidden sm:block pl-3">Кошик</h2>

        <div className="flex gap-3 justify-end flex-1">
          {/* <Button action={restoreAll} text={t("trash_restore_all")} />
          <Button action={removeAll} text={t("trash_delete_all")} /> */}
          <TrashButton action={restoreAll} text={t("trash_restore_all")} />
          <TrashButton action={removeAll} text={t("trash_delete_all")} />
        </div>
      </div>

      <div className="overflow-y-auto pb-3">
        <Notes notes={notes} />
      </div>
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

// import { Button } from "@mui/material"; // або твій shared UI Button, якщо він прокидає пропси

import { Button as MuiButton } from "@mui/material";

// const TrashButton = ({ action }: { action: () => void }) => {
//   const { t } = useTranslation();

//   return (
//     <MuiButton
//       onClick={action}
//       startIcon={<Replay sx={{ width: 20, height: 20 }} />}
//       sx={{
//         backgroundColor: "var(--color-surface)",
//         color: "var(--text-primary)",
//         borderRadius: "8px",
//         padding: "6px 16px",
//         height: "36px",
//         textTransform: "none",
//         border: "1px solid var(--color-border)",
//         "&:hover": {
//           backgroundColor: "var(--color-hover)",
//         },
//       }}
//     >
//       {t("trash_delete_all")}
//     </MuiButton>
//   );
// };

const TrashButton = ({ action, text }: { action: () => void; text: string }) => {
  return (
    <MuiButton
      onClick={action}
      startIcon={<Replay sx={{ width: 20, height: 20 }} />}
      sx={{
        backgroundColor: "var(--color-surface)",
        color: "var(--text-primary)",
        borderRadius: "8px",
        padding: "6px 16px",
        height: "36px",
        textTransform: "none",
        border: "1px solid var(--color-border)",
        "&:hover": {
          backgroundColor: "var(--color-hover)",
        },
      }}
    >
      {text}
    </MuiButton>
  );
};
