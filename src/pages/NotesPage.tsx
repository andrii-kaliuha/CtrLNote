// import { useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
// import { IconButton, Modal, useMediaQuery, useTheme } from "@mui/material";
// import { Add, Note } from "@mui/icons-material";
// import { RootState } from "../store/store";
// import { closeNoteEditor, openEmptyNoteEditor } from "../store/slices/noteEditorSlice";
// import { NoteEditor } from "../components/NoteEditor";
// import { Notes } from "../components/Notes";
// import { SearchInput } from "../shared/ui/SearchInput";
// import { useSearchNotes } from "../shared/hooks/useSearchNotes";
// import { sortNotesArray } from "../shared/utils/sortNotesArray";
// import { SortBy } from "../shared/types/types";
// import { NotesSorter } from "../components/NotesSorter";
// import { EmptyState } from "../shared/ui/EmptyState";

// export const NotesPage = () => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();

//   const { notes } = useSelector((state: RootState) => state.notes);

//   const activeNotes = useMemo(() => {
//     return notes.filter((note) => note.status === "active");
//   }, [notes]);

//   const { query, handleSearchChange, filteredNotes } = useSearchNotes(activeNotes);

//   const [sortBy, setSortBy] = useState<SortBy>("dateDesc");

//   const finalNotes = useMemo(() => {
//     return sortNotesArray(filteredNotes, sortBy);
//   }, [filteredNotes, sortBy]);

//   const handleCreateNewNote = () => dispatch(openEmptyNoteEditor());

//   const { isOpen } = useSelector((state: RootState) => state.noteEditor);

//   const handleClose = () => dispatch(closeNoteEditor());

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   return (
//     <section className="h-full w-full flex gap-3">
//       <div className="flex min-w-74 flex-1">
//         <div className="flex flex-col w-full gap-3">
//           <div className="flex gap-3">
//             <SearchInput name="search-note" value={query} onChange={handleSearchChange} placeholder={t("search_placeholder")} />

//             <AddButton action={handleCreateNewNote} />
//             <NotesSorter sortBy={sortBy} changeSortBy={setSortBy} />
//           </div>
//           <div className="overflow-y-auto h-full">
//             {finalNotes.length > 0 ?
//               <Notes notes={finalNotes} />
//             : <EmptyState icon={Note} title={t("notes_empty_message")} />}
//           </div>
//         </div>
//       </div>

//       {isOpen &&
//         (isMobile ?
//           <Modal open={isOpen} onClose={handleClose} sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
//             <div style={{ outline: "none", height: "100%", width: "100%" }}>
//               <NoteEditor />
//             </div>
//           </Modal>
//         : <NoteEditor />)}
//     </section>
//   );
// };

// const AddButton = ({ action }: { action: () => void }) => {
//   return (
//     <IconButton
//       onClick={action}
//       sx={{
//         width: 48,
//         height: 48,
//         borderRadius: "8px",
//         backgroundColor: "var(--color-surface)",
//         color: "var(--color-primary)",
//         border: "2px solid transparent",

//         "&:hover": {
//           backgroundColor: "var(--color-surface)",
//           borderColor: "var(--color-interactive)",
//         },

//         "&:focus": {
//           backgroundColor: "var(--color-surface)",
//           borderColor: "var(--color-interactive)",
//         },

//         "&:active": {
//           borderColor: "var(--color-primary)",
//         },

//         "& .MuiTouchRipple-root": {
//           display: "none",
//         },
//       }}
//     >
//       <Add sx={{ fontSize: 24 }} />
//     </IconButton>
//   );
// };

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IconButton, Modal, useMediaQuery, useTheme } from "@mui/material";
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
import styles from "./NotesPage.module.css";

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
            <SearchInput name="search-note" value={query} onChange={handleSearchChange} placeholder={t("search.placeholder")} />
            <AddButton action={handleCreateNewNote} />
            <NotesSorter sortBy={sortBy} changeSortBy={setSortBy} />
          </div>

          <div className={styles.scrollArea}>
            {finalNotes.length > 0 ?
              <Notes notes={finalNotes} />
            : <EmptyState icon={Note} title={t("notes.empty_message")} />}
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

const AddButton = ({ action }: { action: () => void }) => {
  return (
    <IconButton
      onClick={action}
      sx={{
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
      }}
    >
      <Add sx={{ fontSize: 24 }} />
    </IconButton>
  );
};
