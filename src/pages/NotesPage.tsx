// import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { openEmptyNoteEditor } from "../store/slices/noteEditorSlice";
import { useTranslation } from "react-i18next";
import { NoteEditor } from "../components/NoteEditor";
import { Notes } from "../components/Notes";
// import type { SortBy } from "../shared/types/types";
// import { NotesSorter } from "../components/NotesSorter";
// import { sortNotesArray } from "../shared/utils/sortNotesArray";
import { SearchInput } from "../shared/ui/SearchInput";
// import { setSearchQuery } from "../store/slices/searchSlice";
// import { IconButton } from "@mui/material";
import { Add, MoreVert } from "@mui/icons-material";
import { useSearchNotes } from "../shared/hooks/useSearchNotes";
// import { NoteEditor2 } from "../components/NoteEditor2";

export const NotesPage = () => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const { query, handleSearchChange, filteredNotes } = useSearchNotes(notes);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleCreateNewNote = () => dispatch(openEmptyNoteEditor());
  // const [pinnedSortBy, setPinnedSortBy] = useState<SortBy>("dateDesc");
  // const [activeSortBy, setActiveSortBy] = useState<SortBy>("dateDesc");

  // const pinnedNotes = useMemo(() => {
  //   const filtered = notes.filter((note) => note.status === "pinned");

  //   return sortNotesArray(filtered, pinnedSortBy);
  // }, [notes, pinnedSortBy]);

  // const activeNotes = useMemo(() => {
  //   const filtered = notes.filter((note) => note.status === "active");

  //   return sortNotesArray(filtered, activeSortBy);
  // }, [notes, activeSortBy]);

  // const dispatch = useDispatch();
  // const { t } = useTranslation();

  // const handleCreateNewNote = () => dispatch(openEmptyNoteEditor());

  // const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
  // const [query, setQuery] = useState(() => searchQuery ?? "");

  // useEffect(() => {
  //   setQuery(searchQuery);
  // }, [searchQuery]);

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setQuery(value);
  //   dispatch(setSearchQuery(value));
  // };

  // const filteredNotes =
  //   query.trim().length > 0 ?
  //     notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase()) || note.text.toLowerCase().includes(query.toLowerCase()))
  //   : notes;

  const handleOpenEditMenu = () => console.log("Open");

  return (
    <section className="h-full w-full flex gap-3">
      {/* <div className="flex overflow-auto min-w-74 flex-1"> */}
      <div className="flex min-w-74 flex-1">
        {/* <SearchInput name="search-note" value={query} onChange={handleSearchChange} placeholder={t("search_placeholder")} /> */}
        {/* {pinnedNotes.length > 0 && (
        <>
          <div className="pl-3 pb-3 sm:p-3 flex justify-between items-center">
            <h2>{t("pinned")}</h2>
            <NotesSorter sortBy={pinnedSortBy} changeSortBy={setPinnedSortBy} />
          </div>
          <Notes notes={pinnedNotes} />
        </>
      )} */}

        <div className="flex flex-col w-full gap-3">
          {/* <div className="pb-3 flex gap-3 overflow-auto"> */}
          <div className="flex gap-3">
            {/* <h2>{t("notes")}</h2> */}
            <SearchInput name="search-note" value={query} onChange={handleSearchChange} placeholder={t("search_placeholder")} />
            {/* <AddNoteButton action={handleCreateNewNote} /> */}
            <NoteIconButton action={handleCreateNewNote} icon={Add} ariaLabel="Add note" />
            <NoteIconButton action={handleOpenEditMenu} icon={MoreVert} ariaLabel="Open menu" />
            {/* <EditMenu /> */}
            {/* <NotesSorter sortBy={activeSortBy} changeSortBy={setActiveSortBy} /> */}
          </div>
          <div className="overflow-y-auto">
            {/* <Notes notes={activeNotes} addButton={true} action={handleCreateNewNote} /> */}
            <Notes notes={filteredNotes} />
          </div>
        </div>
      </div>
      {/* <NoteEditor2 /> */}
      <NoteEditor />
    </section>
  );
};

// const AddNoteButton = ({ action }: { action: () => void }) => {
//   return (
//     <IconButton aria-label="Add note" onClick={action} sx={{ backgroundColor: "var(--color-surface)", borderRadius: "8px", padding: "12px" }}>
//       <Add sx={{ width: 24, height: 24, color: "var(--text-primary)" }} />
//     </IconButton>
//   );
// };

// const AddNoteButton = ({ action }: { action: () => void }) => {
//   return (
//     <IconButton
//       aria-label="Add note"
//       onClick={action}
//       sx={{
//         width: "48px", // Така ж висота, як у SearchInput
//         height: "48px",
//         backgroundColor: "var(--color-surface)",
//         borderRadius: "8px", // Уніфікований радіус
//         border: "2px solid transparent", // Така ж товщина, як у інпуту
//         transition: "all 0.2s ease-in-out",

//         "&:hover": {
//           backgroundColor: "var(--color-hover)",
//           // borderColor: "var(--color-border)", // Залишаємо той самий колір або змінюємо на primary
//         },

//         // Щоб іконка була чітко по центру
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Add sx={{ fontSize: 24, color: "var(--text-primary)" }} />
//     </IconButton>
//   );
// };

import { Button } from "@mui/material";
import { ElementType } from "react";
// import Add from "@mui/icons-material/Add";

// const AddNoteButton = ({ action }: { action: () => void }) => {
//   return (
//     <Button
//       onClick={action}
//       variant="contained"
//       disableElevation
//       sx={{
//         minWidth: 48,
//         width: 48,
//         height: 48,
//         padding: 0,
//         borderRadius: "8px",
//         backgroundColor: "var(--color-surface)",
//         transition: "0.1s ease-in-out",
//         overflow: "hidden",

//         "&:hover": {
//           backgroundColor: "var(--color-hover)",
//         },
//       }}
//     >
//       <Add sx={{ fontSize: 24, color: "var(--text-primary)" }} />
//     </Button>
//   );
// };

// const EditMenu = () => {
//   return (
//     <IconButton aria-label="Add note" sx={{ backgroundColor: "var(--color-surface)", borderRadius: "8px", padding: "12px" }}>
//       <MoreVert sx={{ width: 24, height: 24, color: "var(--text-primary)" }} />
//     </IconButton>
//   );
// };

// const NoteButton = ({ action, icon }: { action: () => void; icon: ElementType }) => {
//   return (
//     <Button
//       onClick={action}
//       variant="contained"
//       disableElevation
//       sx={{
//         minWidth: 48,
//         width: 48,
//         height: 48,
//         padding: 0,
//         borderRadius: "8px",
//         backgroundColor: "var(--color-surface)",
//         transition: "0.1s ease-in-out",
//         overflow: "hidden",

//         "&:hover": {
//           backgroundColor: "var(--color-hover)",
//         },
//       }}
//     >
//       <Add sx={{ fontSize: 24, color: "var(--text-primary)" }} />
//     </Button>
//   );
// };

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
        transition: "0.1s ease-in-out",
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
