import "@fontsource/roboto/index.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { NotesPage } from "./pages/NotesPage";
import { TaskPage } from "./pages/TaskPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ArchivePage } from "./pages/ArchivePage";
import { TrashPage } from "./pages/TrashPage";
import { SettingsPage } from "./pages/SettingsPage";
import { useState } from "react";

export const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Router>
      <Header setIsVisible={() => setIsVisible((prev) => !prev)} />
      <main className="relative flex flex-1 min-h-0 py-3 max-w-7xl w-full mx-auto pt-6">
        <Navigation isVisible={isVisible} />
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
    </Router>
  );
};
