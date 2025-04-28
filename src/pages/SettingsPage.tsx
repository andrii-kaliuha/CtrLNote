import React, { useCallback, useEffect } from "react";
import { Switch, FormControl, MenuItem, Select, Typography, SelectChangeEvent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setDateFormat, setLanguage, setMainColor, setTheme, setTimeFormat, toggleTrash } from "../store/slices/settingsSlice";
import { RootState } from "../store/store";

function useThemeAndColor() {
  const theme = useSelector((state: RootState) => state.settings.theme);
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
}

export default useThemeAndColor;

const Settings = () => {
  const dateFormat = useSelector((state: RootState) => state.settings.dateFormat);
  const timeFormat = useSelector((state: RootState) => state.settings.timeFormat);
  const language = useSelector((state: RootState) => state.settings.language);
  const mainColor = useSelector((state: RootState) => state.settings.mainColor);
  const trashEnabled = useSelector((state: RootState) => state.settings.trashEnabled);
  const theme = useSelector((state: RootState) => state.settings.theme);

  const dispatch = useDispatch();

  const handleDateFormatChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      dispatch(setDateFormat(event.target.value));
    },
    [dispatch]
  );

  const handleTimeFormatChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      dispatch(setTimeFormat(event.target.value));
    },
    [dispatch]
  );

  const handleLanguageChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      dispatch(setLanguage(event.target.value));
    },
    [dispatch]
  );

  // useThemeAndColor.ts

  // Шлях до вашого store

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

  const handleTrashToggle = useCallback(
    (_event: React.ChangeEvent<HTMLInputElement>, _checked: boolean) => {
      dispatch(toggleTrash());
    },
    [dispatch]
  );

  return (
    <ul className="flex flex-col gap-3">
      <Setting
        title="Формат дати"
        value={dateFormat}
        function={handleDateFormatChange}
        options={[
          { name: "DD/MM/YYYY", value: "DD/MM/YYYY" },
          { name: "MM/DD/YYYY", value: "MM/DD/YYYY" },
          { name: "YYYY-MM-DD", value: "YYYY-MM-DD" },
        ]}
      />
      <Setting
        title="Формат часу"
        value={timeFormat}
        function={handleTimeFormatChange}
        options={[
          { name: "12 годин", value: "12_hour" },
          { name: "24 години", value: "24_hour" },
        ]}
      />
      <Setting
        title="Тема інтерфейсу"
        value={theme}
        function={handleThemeChange}
        options={[
          { name: "Світла", value: "light" },
          { name: "Темна", value: "dark" },
        ]}
      />
      <Setting
        title="Мова"
        value={language}
        function={handleLanguageChange}
        options={[
          { name: "Англійська", value: "english" },
          { name: "Українська", value: "ukrainian" },
          { name: "Польська", value: "polish" },
        ]}
      />
      <Setting
        title="Основний колір інтерфейсу"
        value={mainColor}
        function={handleMainColorChange}
        options={[
          { name: "Зелений", value: "green" },
          { name: "Фіолетовий", value: "purple" },
          { name: "Синій", value: "blue" },
          { name: "Червоний", value: "red" },
          { name: "Жовтий", value: "yellow" },
          { name: "Оранжевий", value: "orange" },
        ]}
      />
      <li>
        <div className="flex items-center justify-between w-full">
          <p>Увімкнути Кошик</p>
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
        </div>
      </li>
    </ul>
  );
};

type Option = { value: string; name: string };
type SettingProps = {
  title: string;
  value: string;
  options: Option[];
  function: (event: SelectChangeEvent<string>) => void;
};

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

export const SettingsPage = () => (
  <section className="flex-1">
    <Settings />
    <div className="bg-[var(--color-primary)] w-32 h-32 rounded-full"></div>
  </section>
);
