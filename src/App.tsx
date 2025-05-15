import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { DesktopNavigation, MobileNavigation } from "./components/Navigation";
import { NotesPage } from "./pages/NotesPage";
import { ArchivePage } from "./pages/ArchivePage";
import { SearchPage } from "./pages/SearchPage";
import { TrashPage } from "./pages/TrashPage";
import { SettingsPage, useSettings } from "./pages/SettingsPage";

export const App = () => {
  useSettings();

  return (
    <Router>
      <div className="flex flex-col sm:flex-row h-screen">
        <DesktopNavigation />
        <main className="h-full w-full overflow-y-auto p-3">
          <Routes>
            <Route path="/" element={<Navigate to="/notes" replace />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/trash" element={<TrashPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        <MobileNavigation />
      </div>
    </Router>
  );
};
