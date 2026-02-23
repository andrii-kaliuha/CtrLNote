import { SelectChangeEvent } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setTheme, setLanguage, setMainColor, toggleTrash, setAutoDeletePeriod } from "../store/slices/settingsSlice";
import { useTranslation } from "react-i18next";
import { Setting } from "../components/Setting";
import { Switch } from "..//shared/ui/Switch";
import { removeNote as removeNotePermanently } from "../store/slices/notesSlice";

// useSettings.ts
export const useSettings = () => {
  const { i18n } = useTranslation();

  const theme = useSelector((state: RootState) => state.settings.theme);
  const language = useSelector((state: RootState) => state.settings.language);
  const mainColor = useSelector((state: RootState) => state.settings.mainColor);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--color-primary", `var(--color-primary-${mainColor})`);
  }, [mainColor]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
};

export const SettingsPage = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const notes = useSelector((state: RootState) => state.notes.notes);

  const theme = useSelector((state: RootState) => state.settings.theme);
  const language = useSelector((state: RootState) => state.settings.language);
  const mainColor = useSelector((state: RootState) => state.settings.mainColor);
  const trashEnabled = useSelector((state: RootState) => state.settings.trashEnabled);
  const autoDeletePeriod = useSelector((state: RootState) => state.settings.autoDeletePeriod);

  const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

  const handleLanguageChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      i18n.changeLanguage(event.target.value);
      dispatch(setLanguage(event.target.value));
    },
    [dispatch, i18n],
  );

  const handleThemeChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      dispatch(setTheme(event.target.value as "light" | "dark"));
    },
    [dispatch],
  );

  const handleMainColorChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      dispatch(setMainColor(event.target.value));
    },
    [dispatch],
  );

  const handleTrashToggle = useCallback(() => {
    if (trashEnabled) {
      notes.filter((note) => note.status === "deleted").forEach((note) => dispatch(removeNotePermanently(note.id)));
    }

    dispatch(toggleTrash());
  }, [dispatch, trashEnabled, notes]);

  const handleAutoDeleteChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      dispatch(setAutoDeletePeriod(Number(event.target.value)));
    },
    [dispatch],
  );

  return (
    <section className="flex flex-col self-start justify-between h-full w-full overflow-y-auto">
      <ul className="flex flex-col gap-3">
        <Setting
          title={t("settings_theme")}
          value={theme}
          function={handleThemeChange}
          options={[
            { name: t("theme_light"), value: "light" },
            { name: t("theme_dark"), value: "dark" },
          ]}
        />
        <Setting
          title={t("settings_language")}
          value={language}
          function={handleLanguageChange}
          options={[
            { name: "English", value: "english" },
            { name: "Українська", value: "ukrainian" },
            { name: "Polski", value: "polish" },
          ]}
        />
        <Setting
          title={t("settings_main_color")}
          value={mainColor}
          function={handleMainColorChange}
          options={[
            { name: t("color_green"), value: "green" },
            { name: t("color_purple"), value: "purple" },
            { name: t("color_blue"), value: "blue" },
            { name: t("color_red"), value: "red" },
            { name: t("color_yellow"), value: "yellow" },
            { name: t("color_orange"), value: "orange" },
          ]}
        />
        <Setting
          title={t("settings_auto_delete")}
          value={String(autoDeletePeriod)}
          function={handleAutoDeleteChange}
          options={[
            { name: t("auto_delete_1"), value: String(1 * MILLISECONDS_IN_DAY) },
            { name: t("auto_delete_7"), value: String(7 * MILLISECONDS_IN_DAY) },
            { name: t("auto_delete_10"), value: String(10 * MILLISECONDS_IN_DAY) },
            { name: t("auto_delete_30"), value: String(30 * MILLISECONDS_IN_DAY) },
          ]}
        />
        <Switch text={t("settings_enable_trash")} name="trash" checked={trashEnabled} onChange={handleTrashToggle} />
      </ul>
    </section>
  );
};
