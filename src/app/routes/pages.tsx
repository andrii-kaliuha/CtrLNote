import { StickyNote2, Archive, Delete, Settings } from "@mui/icons-material";
import { NotesPage } from "../../pages/NotesPage";
import { ArchivePage } from "../../pages/ArchivePage";
import { TrashPage } from "../../pages/TrashPage";
import { SettingsPage } from "../../pages/SettingsPage";

export const appPages = [
  { title: "notes.title", path: "/notes", icon: <StickyNote2 />, element: <NotesPage /> },
  { title: "archive.title", path: "/archive", icon: <Archive />, element: <ArchivePage /> },
  { title: "trash.title", path: "/trash", icon: <Delete />, element: <TrashPage /> },
  { title: "settings.title", path: "/settings", icon: <Settings />, element: <SettingsPage /> },
];
