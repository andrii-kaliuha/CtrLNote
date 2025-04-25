import { useCallback, useState } from "react";
import { Switch, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setDateFormat, setLanguage, setMainColor, setTheme, setTimeFormat, toggleTrash } from "../store/slices/settingsSlice";

export const SettingsPage = () => (
  <section className="flex-1">
    <Settings />
    <div className="bg-[var(--color-primary)] w-32 h-32"></div>
  </section>
);

const Settings = () => {
  const dateFormat = useSelector((state: any) => state.settings.dateFormat);
  const timeFormat = useSelector((state: any) => state.settings.timeFormat);
  const theme = useSelector((state: any) => state.settings.theme);
  const language = useSelector((state: any) => state.settings.language);
  const mainColor = useSelector((state: any) => state.settings.mainColor);
  const trashEnabled = useSelector((state: any) => state.settings.trashEnabled);

  const dispatch = useDispatch();

  const handleDateFormatChange = useCallback(
    (newFormat: string) => {
      dispatch(setDateFormat(newFormat));
    },
    [dispatch]
  );

  const handleTimeFormatChange = useCallback(
    (newFormat: string) => {
      dispatch(setTimeFormat(newFormat));
    },
    [dispatch]
  );

  const handleThemeChange = useCallback(
    (newTheme: "light" | "dark") => {
      dispatch(setTheme(newTheme));
    },
    [dispatch]
  );

  const handleLanguageChange = useCallback(
    (newLanguage: string) => {
      dispatch(setLanguage(newLanguage));
    },
    [dispatch]
  );

  const handleMainColorChange = useCallback(
    (newColor: string) => {
      dispatch(setMainColor(newColor));
    },
    [dispatch]
  );

  const handleTrashToggle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      dispatch(toggleTrash()); // toggleTrash не приймає аргументів, стан перемикається всередині редюсера
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
        function={(value: string) => handleThemeChange(value as "light" | "dark")}
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
          <Switch name="trash" checked={trashEnabled} onChange={handleTrashToggle} />
        </div>
      </li>
    </ul>
  );
};

type Option = { value: string; name: string };
type SettingProps = { title: string; value: string; options: Option[]; function: (value: string) => void };

const Setting = ({ title, value, options, function: handleChange }: SettingProps) => {
  return (
    <li>
      <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Typography variant="body1">{title}</Typography>
        <Select name={title} value={value} sx={{ height: 40, width: 200 }} onChange={(e) => handleChange(e.target.value)}>
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
