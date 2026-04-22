import { exportDB, importDB } from "dexie-export-import";
import { db } from "../../db";

export const exportDatabase = async () => {
  try {
    const blob = await exportDB(db, { prettyJson: true });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `CtrLNote_Backup_${new Date().toLocaleDateString()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Експорт не вдався:", error);
    alert("Помилка при експорті даних");
  }
};

export const importDatabase = async (file: File) => {
  try {
    await importDB(file, {
      overwriteValues: true, // Дозволяє перезаписувати об'єкти з однаковими ID
      acceptNameDiff: true,
      progressCallback: () => {
        return true;
      },
    } as any);

    // Після імпорту перезавантажити сторінку, щоб Redux підтягнув нові дані з IndexedDB
    window.location.reload();
  } catch (error) {
    console.error("Імпорт не вдався:", error);
    alert("Помилка: Файл пошкоджений або має неправильний формат");
  }
};
