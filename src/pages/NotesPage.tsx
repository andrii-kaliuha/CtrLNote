import { useState, useMemo } from "react"; // Додано useState та useMemo
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Notes, SortBy } from "../components/Notes";
import { Note as NoteType } from "../store/slices/notesSlice"; // Переконайтеся, що шлях правильний

// Допоміжна функція для сортування (можна винести в окремий файл utils)
const sortNotesArray = (notes: NoteType[], sortBy: SortBy): NoteType[] => {
  const sortedNotes = [...notes]; // Створюємо копію
  switch (sortBy) {
    case "titleAsc":
      sortedNotes.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "titleDesc":
      sortedNotes.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "dateAsc":
      sortedNotes.sort((a, b) => a.createdAt - b.createdAt);
      break;
    case "dateDesc":
      sortedNotes.sort((a, b) => b.createdAt - a.createdAt);
      break;
  }
  return sortedNotes;
};

export const NotesPage = () => {
  // Отримуємо всі нотатки з Redux
  const { notes } = useSelector((state: RootState) => state.notes);

  // Локальний стан для сортування кожної секції
  const [pinnedSortBy, setPinnedSortBy] = useState<SortBy>("dateDesc"); // Початкове сортування для закріплених
  const [activeSortBy, setActiveSortBy] = useState<SortBy>("dateDesc"); // Початкове сортування для активних

  // Фільтруємо та СОРТУЄМО закріплені нотатки за допомогою useMemo
  const pinnedNotes = useMemo(() => {
    const filtered = notes.filter((note) => note.status === "pinned");
    // Сортуємо ВЖЕ відфільтрований масив
    return sortNotesArray(filtered, pinnedSortBy);
  }, [notes, pinnedSortBy]); // Перераховуємо, якщо змінився весь список або критерій сортування закріплених

  // Фільтруємо та СОРТУЄМО активні нотатки за допомогою useMemo
  const activeNotes = useMemo(() => {
    const filtered = notes.filter((note) => note.status === "active");
    // Сортуємо ВЖЕ відфільтрований масив
    return sortNotesArray(filtered, activeSortBy);
  }, [notes, activeSortBy]); // Перераховуємо, якщо змінився весь список або критерій сортування активних

  return (
    <section>
      {/* Рендеримо закріплені, якщо вони є, передаючи стан сортування та обробник */}
      {pinnedNotes.length > 0 && (
        <>
          <Notes
            title="Закріплені"
            notes={pinnedNotes} // Передаємо відфільтровані та відсортовані
            sortBy={pinnedSortBy} // Передаємо поточний критерій
            onSortChange={setPinnedSortBy} // Передаємо функцію для оновлення критерію
          />
        </>
      )}

      {/* Рендеримо активні нотатки, передаючи їх стан сортування та обробник */}
      <Notes
        title="Нотатки"
        notes={activeNotes} // Передаємо відфільтровані та відсортовані
        sortBy={activeSortBy} // Передаємо поточний критерій
        onSortChange={setActiveSortBy} // Передаємо функцію для оновлення критерію
      />
    </section>
  );
};
