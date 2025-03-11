import "@fontsource/roboto/index.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { NotesPage } from "./pages/NotesPage";
import { TaskPage } from "./pages/TaskPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ArchivePage } from "./pages/ArchivePage";
import { TrashPage } from "./pages/TrashPage";
import { SettingsPage } from "./pages/SettingsPage";

export const App = () => {
  return (
    <Router>
      <div className="relative flex h-screen max-w-[1280px] w-full">
        <Navigation />
        <main className="flex-1 py-6 pr-6">
          <Routes>
            <Route path="/" element={<Navigate to="/notes" replace />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/trash" element={<TrashPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};
