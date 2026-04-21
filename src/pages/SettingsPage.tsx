import { useCallback, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { setTheme, setLanguage, setMainColor, toggleTrash, setAutoDeletePeriod } from "../store/slices/settingsSlice";
import { clearTrash } from "../store/slices/notesSlice";
import { Setting } from "../components/Setting";
import { Switch } from "../shared/ui/Switch";
import { MILLISECONDS_IN_DAY, useSettings } from "../shared/hooks/useSettings";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ConfirmDialog } from "../shared/ui/ConfirmDialog";
import styles from "./SettingsPage.module.css";

export const SettingsPage = () => {
  const { theme, language, mainColor, trashEnabled, notes, days } = useSettings();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleThemeChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      dispatch(setTheme(e.target.value as "light" | "dark"));
    },
    [dispatch],
  );

  const handleLanguageChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      dispatch(setLanguage(e.target.value));
    },
    [dispatch],
  );

  const handleMainColorChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      dispatch(setMainColor(e.target.value));
    },
    [dispatch],
  );

  const handleAutoDeleteChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      const selectedDays = Number(e.target.value);
      dispatch(setAutoDeletePeriod(selectedDays * MILLISECONDS_IN_DAY));
    },
    [dispatch],
  );

  const handleTrashToggle = () => {
    const hasNotesInTrash = notes.some((note) => note.status === "deleted");

    if (trashEnabled && hasNotesInTrash) {
      setIsConfirmOpen(true);
    } else {
      dispatch(toggleTrash());
    }
  };

  const handleConfirmDisable = () => {
    dispatch(clearTrash());
    dispatch(toggleTrash());
    setIsConfirmOpen(false);
  };

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        <Setting
          title={t("settings.theme")}
          value={theme}
          function={handleThemeChange}
          options={[
            { name: t("settings.themes.light"), value: "light" },
            { name: t("settings.themes.dark"), value: "dark" },
          ]}
        />

        <Setting
          title={t("settings.language")}
          value={language}
          function={handleLanguageChange}
          options={[
            { name: "English", value: "english" },
            { name: "Українська", value: "ukrainian" },
            { name: "Polski", value: "polish" },
          ]}
        />

        <Setting
          title={t("settings.main_color")}
          value={mainColor}
          function={handleMainColorChange}
          options={["green", "purple", "blue", "red", "yellow", "orange"].map((color) => ({
            name: t(`settings.colors.${color}`),
            value: color,
          }))}
        />

        <Setting
          title={t("settings.auto_delete")}
          value={String(days)}
          function={handleAutoDeleteChange}
          options={["1", "7", "10", "30"].map((day) => ({
            name: t("settings.days", { count: Number(day) }),
            value: day,
          }))}
        />

        <Switch text={t("settings.enable_trash")} name="trash" checked={trashEnabled} onChange={handleTrashToggle} />

        <ConfirmDialog
          open={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirmDisable}
          title={t("settings.confirm_disable.title")}
          description={t("settings.confirm_disable.message")}
        />
      </ul>
    </section>
  );
};
