import { useMemo, ElementType, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Modal, useMediaQuery, useTheme } from "@mui/material";
import { Add, Note } from "@mui/icons-material";
import { RootState } from "../store/store";
import { closeNoteEditor, openEmptyNoteEditor } from "../store/slices/noteEditorSlice";
import { NoteEditor } from "../components/NoteEditor";
import { Notes } from "../components/Notes";
import { SearchInput } from "../shared/ui/SearchInput";
import { useSearchNotes } from "../shared/hooks/useSearchNotes";
import { sortNotesArray } from "../shared/utils/sortNotesArray";
import { SortBy } from "../shared/types/types";
import { NotesSorter } from "../components/NotesSorter";
import { EmptyState } from "../shared/ui/EmptyState";

export const NotesPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { notes } = useSelector((state: RootState) => state.notes);

  const activeNotes = useMemo(() => {
    return notes.filter((note) => note.status === "active");
  }, [notes]);

  const { query, handleSearchChange, filteredNotes } = useSearchNotes(activeNotes);

  const [sortBy, setSortBy] = useState<SortBy>("dateDesc");

  const finalNotes = useMemo(() => {
    return sortNotesArray(filteredNotes, sortBy);
  }, [filteredNotes, sortBy]);

  const handleCreateNewNote = () => dispatch(openEmptyNoteEditor());

  const { isOpen } = useSelector((state: RootState) => state.noteEditor);

  const handleClose = () => dispatch(closeNoteEditor());

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <section className="h-full w-full flex gap-3">
      <div className="flex min-w-74 flex-1">
        <div className="flex flex-col w-full gap-3">
          <div className="flex gap-3">
            <SearchInput name="search-note" value={query} onChange={handleSearchChange} placeholder={t("search_placeholder")} />

            <MyButton action={handleCreateNewNote} icon={Add} text="Add note" />

            <NotesSorter sortBy={sortBy} changeSortBy={setSortBy} />
          </div>
          <div className="overflow-y-auto h-full">
            {finalNotes.length > 0 ?
              <Notes notes={finalNotes} />
            : <EmptyState icon={Note} title={t("notes_empty_message")} />}
          </div>
        </div>
      </div>

      {isOpen &&
        (isMobile ?
          <Modal open={isOpen} onClose={handleClose} sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
            <div style={{ outline: "none", height: "100%", width: "100%" }}>
              <NoteEditor />
            </div>
          </Modal>
        : <NoteEditor />)}
    </section>
  );
};

type NoteIconButtonProps = {
  action: () => void;
  icon: ElementType;
  ariaLabel?: string;
};

export const NoteIconButton = ({ action, icon: Icon, ariaLabel }: NoteIconButtonProps) => {
  return (
    <Button
      onClick={action}
      aria-label={ariaLabel}
      variant="contained"
      disableElevation
      sx={{
        minWidth: 48,
        width: 48,
        height: 48,
        padding: 0,
        borderRadius: "8px",
        backgroundColor: "var(--color-surface)",
        overflow: "hidden",

        "&:hover": {
          backgroundColor: "var(--color-hover)",
        },
      }}
    >
      <Icon sx={{ fontSize: 24, color: "var(--text-primary)" }} />
    </Button>
  );
};

const MyButton = ({ action, icon: Icon }: { action: () => void; icon: ElementType; text: string }) => {
  return (
    <Button
      onClick={action}
      disableRipple
      sx={{
        backgroundColor: "var(--color-surface)",
        color: "var(--text-primary)",
        borderRadius: "8px",
        padding: "6px",
        minWidth: 48,
        width: "48px",
        height: "48px",
        textTransform: "none",
        fontWeight: 500,

        border: "2px solid transparent",

        "&:hover": {
          borderColor: "var(--color-border)",
        },

        "&:active": {
          borderColor: "var(--color-primary)",
        },
      }}
    >
      <Icon sx={{ fontSize: 24, color: "var(--text-primary)" }} />
    </Button>
  );
};
