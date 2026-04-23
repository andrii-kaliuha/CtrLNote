import { exportDB, importDB } from "dexie-export-import";
import { db } from "../../app/db";

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
    throw error;
  }
};

export const importDatabase = async (file: File) => {
  try {
    await importDB(file, {
      overwriteValues: true,
      acceptNameDiff: true,
    } as any);

    return true;
  } catch (error) {
    console.error("Імпорт не вдався:", error);
    throw error;
  }
};
