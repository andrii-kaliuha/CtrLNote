import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import { useTranslation } from "react-i18next";
import { autoDeleteNotes } from "../note/autoDeleteNotes";

export const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

export const useSettings = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const settings = useSelector((state: RootState) => state.settings);
  const notes = useSelector((state: RootState) => state.notes.notes);

  const { theme, mainColor, language, trashEnabled, autoDeletePeriod } = settings;
  const days = autoDeletePeriod / MILLISECONDS_IN_DAY;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.setProperty("--color-primary", `var(--color-primary-${mainColor})`);
  }, [theme, mainColor]);

  useEffect(() => {
    if (i18n.language !== language) i18n.changeLanguage(language);
  }, [language, i18n]);

  useEffect(() => {
    if (trashEnabled && notes.some((n) => n.status === "deleted")) {
      autoDeleteNotes(dispatch, notes, autoDeletePeriod);
    }
  }, [notes, trashEnabled, autoDeletePeriod, dispatch]);

  return { ...settings, days, notes };
};
