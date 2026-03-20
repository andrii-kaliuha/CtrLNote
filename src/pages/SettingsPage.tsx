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

export const SettingsPage = () => {
  const { theme, language, mainColor, trashEnabled, notes, days } = useSettings();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleThemeChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      dispatch(setTheme(event.target.value as "light" | "dark"));
    },
    [dispatch],
  );

  const handleLanguageChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      dispatch(setLanguage(event.target.value));
    },
    [dispatch],
  );

  const handleMainColorChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      dispatch(setMainColor(event.target.value));
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

  const handleAutoDeleteChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const selectedDays = Number(event.target.value);

      const milliseconds = selectedDays * MILLISECONDS_IN_DAY;

      dispatch(setAutoDeletePeriod(milliseconds));
    },
    [dispatch],
  );

  return (
    <section className="flex flex-col self-start h-full w-full overflow-y-auto">
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
          value={String(days)}
          function={handleAutoDeleteChange}
          options={[
            { name: t("auto_delete_1"), value: "1" },
            { name: t("auto_delete_7"), value: "7" },
            { name: t("auto_delete_10"), value: "10" },
            { name: t("auto_delete_30"), value: "30" },
          ]}
        />
        <Switch text={t("settings_enable_trash")} name="trash" checked={trashEnabled} onChange={handleTrashToggle} />

        <ConfirmDialog
          open={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirmDisable}
          title={t("confirm_disable_trash_title")}
          description={t("confirm_disable_trash_message")}
        />
      </ul>
    </section>
  );
};
