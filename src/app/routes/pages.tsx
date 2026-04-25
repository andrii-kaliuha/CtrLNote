import StickyNote2 from "@mui/icons-material/StickyNote2";
import Archive from "@mui/icons-material/Archive";
import Delete from "@mui/icons-material/Delete";
import Settings from "@mui/icons-material/Settings";
import { lazy } from "react";

const NotesPage = lazy(() => import("../../pages/NotesPage").then((m) => ({ default: m.NotesPage })));
const ArchivePage = lazy(() => import("../../pages/ArchivePage").then((m) => ({ default: m.ArchivePage })));
const TrashPage = lazy(() => import("../../pages/TrashPage").then((m) => ({ default: m.TrashPage })));
const SettingsPage = lazy(() => import("../../pages/SettingsPage").then((m) => ({ default: m.SettingsPage })));

export const appPages = [
  { title: "notes.title", path: "/notes", icon: <StickyNote2 />, element: <NotesPage /> },
  { title: "archive.title", path: "/archive", icon: <Archive />, element: <ArchivePage /> },
  { title: "trash.title", path: "/trash", icon: <Delete />, element: <TrashPage /> },
  { title: "settings.title", path: "/settings", icon: <Settings />, element: <SettingsPage /> },
];
