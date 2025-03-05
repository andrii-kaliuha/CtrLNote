import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotesPage } from "./pages/NotesPage";
import { TaskPage } from "./pages/TaskPage";
import { EventPage } from "./pages/EventPage";
import { ArchivePage } from "./pages/ArchivePage";
import { TrashPage } from "./pages/TrashPage";
import { SettingsPage } from "./pages/SettingsPage";

export const App = () => {
  return (
    <Router>
      <Header />
      <Navigation />
      <main className="flex h-[calc(100vh-64px)]">
        <Routes>
          <Route path="/" element={<NotesPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/trash" element={<TrashPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </Router>
  );
};
