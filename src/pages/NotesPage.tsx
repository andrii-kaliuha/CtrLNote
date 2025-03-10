import notes from "../notes.json";
import { Notes } from "./ArchivePage";

export const NotesPage = () => {
  return (
    <section className="flex flex-col w-full ">
      <NoteEditor />
      <PinnedNotes />
      <NotesList />
    </section>
  );
};

const PinnedNotes = () => {
  return (
    <div>
      <h2 className="p-3 pl-7">Закріплене</h2>
      <ul className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 px-3 w-full">
        {notes.map((note) => (
          <Notes key={note.id} title={note.title} description={note.description} color={note.color} date={note.date} />
        ))}
      </ul>
    </div>
  );
};

const NotesList = () => {
  return (
    <div>
      <h2 className="p-3 pl-7">Нотатки</h2>
      <ul className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 px-3 w-full">
        {notes.map((note) => (
          <Notes key={note.id} title={note.title} description={note.description} color={note.color} date={note.date} />
        ))}
      </ul>
    </div>
  );
};

// const NoteEditor = () => {
//   return <section></section>;
// };

import React, { useState } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  Add,
  Remove,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatStrikethrough,
  FormatAlignLeft,
  FormatListBulleted,
  FormatColorText,
  FormatColorFill,
  FormatIndentDecrease,
  FormatIndentIncrease,
} from "@mui/icons-material";
import { IconButton, Tooltip, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

// Визначення типу для кнопки форматування
interface FormatButtonProps {
  title: string;
  icon: SvgIconComponent;
  action: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
}

// Конфігурація кнопок форматування тексту
const formatButtons: FormatButtonProps[] = [
  {
    title: "Bold",
    icon: FormatBold,
    action: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive("bold"),
  },
  {
    title: "Italic",
    icon: FormatItalic,
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive("italic"),
  },
  {
    title: "Underline",
    icon: FormatUnderlined,
    action: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive("underline"),
  },
  {
    title: "Strikethrough",
    icon: FormatStrikethrough,
    action: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive("strike"),
  },
];

// Кнопки вирівнювання та списків
const alignmentButtons: FormatButtonProps[] = [
  { title: "Align Left", icon: FormatAlignLeft, action: () => null, isActive: () => false },
  {
    title: "Bullet List",
    icon: FormatListBulleted,
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive("bulletList"),
  },
];

// Кнопки кольору та підсвічування
const colorButtons: FormatButtonProps[] = [
  { title: "Text Color", icon: FormatColorText, action: () => null, isActive: () => false },
  { title: "Highlight", icon: FormatColorFill, action: () => null, isActive: () => false },
];

// Кнопки відступів
const indentButtons: FormatButtonProps[] = [
  { title: "Increase Indent", icon: FormatIndentIncrease, action: () => null, isActive: () => false },
  { title: "Decrease Indent", icon: FormatIndentDecrease, action: () => null, isActive: () => false },
];

export const NoteEditor: React.FC = () => {
  const [fontSize, setFontSize] = useState<number>(16);
  const [fontFamily, setFontFamily] = useState<string>("Times New Roman");
  const fontFamilies: string[] = ["Times New Roman", "Roboto", "Lora", "Montserrat"];

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "<p>Start typing here...</p>",
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[300px] w-full p-3 cursor-text",
      },
    },
  });

  // Функція для обробки зміни шрифту
  const handleFontChange = (event: SelectChangeEvent<string>): void => {
    setFontFamily(event.target.value);
  };

  // Функція для зміни розміру шрифту
  const handleFontSizeChange = (increment: boolean): void => {
    if (increment) {
      setFontSize((prevSize) => Math.min(72, prevSize + 1));
    } else {
      setFontSize((prevSize) => Math.max(8, prevSize - 1));
    }
  };

  // Функція для рендерингу кнопок форматування
  const renderButtons = (buttons: FormatButtonProps[]): React.ReactNode =>
    buttons.map(({ title, icon: Icon, action, isActive }) => (
      <Tooltip key={title} title={title}>
        <IconButton onClick={() => editor && action(editor)} color={editor && isActive(editor) ? "primary" : "default"}>
          <Icon />
        </IconButton>
      </Tooltip>
    ));

  if (!editor) return null;

  return (
    <section>
      <div className="bg-white rounded-lg shadow-md max-w-max mx-auto mt-6">
        <div className="flex items-center p-3">
          {/* Вибір шрифту */}
          <FormControl size="small" variant="outlined" className="w-48">
            <InputLabel>Font</InputLabel>
            <Select value={fontFamily} label="Font" onChange={handleFontChange}>
              {fontFamilies.map((font) => (
                <MenuItem key={font} value={font}>
                  {font}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Розмір шрифту */}
          <div className="flex items-center">
            <IconButton onClick={() => handleFontSizeChange(false)} disabled={fontSize <= 8}>
              <Remove />
            </IconButton>
            <span className="mx-2 text-sm">{fontSize}</span>
            <IconButton onClick={() => handleFontSizeChange(true)} disabled={fontSize >= 72}>
              <Add />
            </IconButton>
          </div>

          {/* Групи кнопок форматування */}
          <div className="flex items-center">{renderButtons(formatButtons)}</div>
          <div className="flex items-center">{renderButtons(alignmentButtons)}</div>
          <div className="flex items-center">{renderButtons(colorButtons)}</div>
          <div className="flex items-center">{renderButtons(indentButtons)}</div>
        </div>
      </div>

      {/* Зона редактора */}
      <div>
        <EditorContent editor={editor} className="bg-white rounded-lg shadow-md mx-6 mt-6" />
      </div>
    </section>
  );
};
