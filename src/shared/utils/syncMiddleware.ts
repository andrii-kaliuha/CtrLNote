import { Middleware } from "@reduxjs/toolkit";
import { setStorageError } from "../../app/store/uiSlice";
import i18n from "../i18n/i18n";
import { db } from "../../app/db";

let saveTimeout: ReturnType<typeof setTimeout>;

export const syncMiddleware: Middleware = (storeAPI) => (next) => (action: any) => {
  const result = next(action);

  if (action.type?.startsWith("ui/")) return result;
  if (saveTimeout) clearTimeout(saveTimeout);

  saveTimeout = setTimeout(async () => {
    const state = storeAPI.getState();
    const currentError = state.ui.storageError;

    try {
      localStorage.setItem("settings", JSON.stringify(state.settings));
      localStorage.setItem("search", JSON.stringify(state.search));

      await db.transaction("rw", db.notes, async () => {
        await db.notes.clear();
        await db.notes.bulkAdd(state.notes.notes);
      });

      if (currentError) {
        storeAPI.dispatch(setStorageError(null));
      }
    } catch (e: any) {
      console.error("Помилка синхронізації:", e);
      const message = i18n.t("management.storage_error");

      if (currentError !== message) {
        storeAPI.dispatch(setStorageError(message));
      }
    }
  }, 1000);

  return result;
};
