import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IconButton, Modal, useMediaQuery, useTheme } from "@mui/material";
import { RootState } from "../app/store/store";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import Add from "@mui/icons-material/Add";
import { closeNoteEditor, openEmptyNoteEditor } from "../features/editNote/noteEditorSlice";
import { NoteEditor } from "../features/editNote/NoteEditor";
import { SearchInput } from "../features/searchNotes/SearchInput";
import { useSearchNotes } from "../features/searchNotes/useSearchNotes";
import { sortNotesArray } from "../features/sortNotes/sortNotesArray";
import { NotesSorter } from "../features/sortNotes/NotesSorter";
import { EmptyState } from "../shared/ui/EmptyState";
import styles from "./NotesPage.module.css";
import { SortBy } from "../shared/types/types";
import { NoteList } from "../widgets/noteList/NoteList";

export const NotesPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { notes } = useSelector((state: RootState) => state.notes);
  const { isOpen } = useSelector((state: RootState) => state.noteEditor);
  const [sortBy, setSortBy] = useState<SortBy>("dateDesc");

  const activeNotes = useMemo(() => {
    return notes.filter((note) => note.status === "active");
  }, [notes]);

  const { query, handleSearchChange, filteredNotes } = useSearchNotes(activeNotes);

  const finalNotes = useMemo(() => {
    return sortNotesArray(filteredNotes, sortBy);
  }, [filteredNotes, sortBy]);

  const handleCreateNewNote = () => dispatch(openEmptyNoteEditor());
  const handleClose = () => dispatch(closeNoteEditor());

  return (
    <section className={styles.pageContainer}>
      <div className={styles.notesSection}>
        <div className={styles.contentWrapper}>
          <div className={styles.toolbar}>
            <SearchInput name="search-note" value={query} onChange={handleSearchChange} placeholder={t("notes.search_placeholder")} />
            <IconButton onClick={handleCreateNewNote} sx={ButtonSx} aria-label={t("notes.actions.add")}>
              <Add sx={{ fontSize: 24 }} />
            </IconButton>
            <NotesSorter sortBy={sortBy} changeSortBy={setSortBy} />
          </div>

          <div className={styles.scrollArea}>
            {finalNotes.length > 0 ?
              <NoteList notes={finalNotes} />
            : <EmptyState icon={StickyNote2Icon} title={t("notes.empty_message")} />}
          </div>
        </div>
      </div>

      {isOpen &&
        (isMobile ?
          <Modal open={isOpen} onClose={handleClose} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className={styles.modalContainer}>
              <NoteEditor />
            </div>
          </Modal>
        : <NoteEditor />)}
    </section>
  );
};

const ButtonSx = {
  width: 48,
  height: 48,
  borderRadius: "8px",
  backgroundColor: "var(--color-surface)",
  color: "var(--color-primary)",
  border: "2px solid transparent",
  flexShrink: 0,

  "&:hover, &:focus": {
    backgroundColor: "var(--color-surface)",
    borderColor: "var(--color-interactive)",
  },

  "&:active": { borderColor: "var(--color-primary)" },

  "& .MuiTouchRipple-root": {
    display: "none",
  },
};
