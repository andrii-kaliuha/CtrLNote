import { Switch, FormControl, MenuItem, Select, Typography, SelectChangeEvent } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setTheme, setLanguage, setMainColor, toggleTrash } from "../store/slices/settingsSlice";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

// useSettings.ts
export const useSettings = () => {
  const theme = useSelector((state: RootState) => state.settings.theme);
  const language = useSelector((state: RootState) => state.settings.language);
  const mainColor = useSelector((state: RootState) => state.settings.mainColor);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
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
  const { t, i18n } = useTranslation();

  const theme = useSelector((state: RootState) => state.settings.theme);
  const language = useSelector((state: RootState) => state.settings.language);
  const mainColor = useSelector((state: RootState) => state.settings.mainColor);
  const trashEnabled = useSelector((state: RootState) => state.settings.trashEnabled);

  const dispatch = useDispatch();

  const handleLanguageChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      i18n.changeLanguage(event.target.value);
      dispatch(setLanguage(event.target.value));
    },
    [dispatch, i18n]
  );

  const handleThemeChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      dispatch(setTheme(event.target.value as "light" | "dark"));
    },
    [dispatch]
  );

  const handleMainColorChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      dispatch(setMainColor(event.target.value));
    },
    [dispatch]
  );

  const handleTrashToggle = useCallback(() => {
    dispatch(toggleTrash());
  }, [dispatch]);

  return (
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
      <li className="flex items-center justify-between w-full">
        <p>{t("settings_enable_trash")}</p>
        <Switch
          sx={{
            "& .MuiSwitch-thumb": {
              backgroundColor: "var(--color-primary)",
            },
            "& .MuiSwitch-track": {
              backgroundColor: "var(--color-primary) !important",
              opacity: 0.38,
            },
            "&.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "var(--color-primary)",
              opacity: 0.5,
            },
            "&.Mui-checked .MuiSwitch-thumb": {
              backgroundColor: "var(--color-primary)",
            },
          }}
          name="trash"
          checked={trashEnabled}
          onChange={handleTrashToggle}
        />
      </li>
    </ul>
  );
};

type Option = { value: string; name: string };
type SettingProps = { title: string; value: string; options: Option[]; function: (event: SelectChangeEvent<string>) => void };

const Setting = ({ title, value, options, function: handleChange }: SettingProps) => {
  return (
    <li>
      <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Typography variant="body1">{title}</Typography>
        <Select
          name={title}
          value={value}
          onChange={handleChange}
          sx={{
            color: "var(--text-primary)",
            height: 40,
            width: 200,
            borderColor: "var(--color-primary)",
            "& .MuiSelect-select": { padding: "0.5px 12px" },
            "& fieldset": { borderColor: "transparent !important" },
            "&:hover fieldset": { borderColor: "var(--color-primary) !important" },
            "&.Mui-focused fieldset": { borderColor: "var(--color-primary) !important" },
            "& .MuiSvgIcon-root": { color: "inherit" },
            "&.Mui-focused .MuiSvgIcon-root": { color: "var(--color-primary)" },
            "&:hover .MuiSvgIcon-root": { color: "var(--color-primary)" },
          }}
        >
          {options.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </li>
  );
};
