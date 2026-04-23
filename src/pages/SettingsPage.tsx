import { useCallback, useState } from "react";
import { Box, SelectChangeEvent, Typography } from "@mui/material";
import { setTheme, setLanguage, setMainColor, toggleTrash, setAutoDeletePeriod } from "../features/Settings/settingsSlice";
import { clearTrash } from "../widgets/Notes/notesSlice";
import { Setting } from "../features/Settings/Setting";
import { Switch } from "../shared/ui/Switch";
import { MILLISECONDS_IN_DAY, useSettings } from "../shared/hooks/useSettings";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ConfirmDialog } from "../shared/ui/ConfirmDialog";
import styles from "./SettingsPage.module.css";
import { DataManagement } from "../features/ManageData/DataManagement";

const THEME_OPTIONS = ["light", "dark"] as const;
const LANGUAGE_OPTIONS = ["english", "ukrainian", "polish"] as const;
const COLOR_OPTIONS = ["green", "purple", "blue", "red", "yellow", "orange"] as const;
const AUTO_DELETE_OPTIONS = ["1", "7", "10", "30"] as const;

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

    if (trashEnabled && hasNotesInTrash) setIsConfirmOpen(true);
    else dispatch(toggleTrash());
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
          idKey="theme"
          title={t("settings.theme")}
          value={theme}
          function={handleThemeChange}
          options={THEME_OPTIONS.map((theme) => ({
            name: t(`settings.themes.${theme}`),
            value: theme,
          }))}
        />

        <Setting
          idKey="language"
          title={t("settings.language")}
          value={language}
          function={handleLanguageChange}
          options={LANGUAGE_OPTIONS.map((language) => ({
            name: t(`settings.languages.${language}`),
            value: language,
          }))}
        />

        <Setting
          idKey="mainColor"
          title={t("settings.main_color")}
          value={mainColor}
          function={handleMainColorChange}
          options={COLOR_OPTIONS.map((color) => ({
            name: t(`settings.colors.${color}`),
            value: color,
          }))}
        />

        <Setting
          idKey="autoDelete"
          title={t("settings.auto_delete")}
          value={String(days)}
          function={handleAutoDeleteChange}
          options={AUTO_DELETE_OPTIONS.map((day) => ({
            name: t("settings.days", { count: Number(day) }),
            value: day,
          }))}
        />

        <Switch text={t("settings.enable_trash")} name="trash" checked={trashEnabled} onChange={handleTrashToggle} />

        <Box
          component="li"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            listStyle: "none",
            paddingY: "2px",
          }}
        >
          <Typography variant="body2">Ваші дані</Typography>
          <DataManagement />
        </Box>
      </ul>

      <ConfirmDialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDisable}
        title={t("settings.confirm_disable.title")}
        description={t("settings.confirm_disable.message")}
      />
    </section>
  );
};
