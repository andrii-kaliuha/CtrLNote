import { useState } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { addNote } from "./store/slices/notesSlice";

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
  SvgIconComponent,
} from "@mui/icons-material";
import { Button, IconButton, Tooltip, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";

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
  { title: "Bullet List", icon: FormatListBulleted, action: () => null, isActive: () => false },
];

// Кнопки кольору та заливки
const colorButtons: FormatButtonProps[] = [
  { title: "Text Color", icon: FormatColorText, action: () => null, isActive: () => false },
  { title: "Highlight", icon: FormatColorFill, action: () => null, isActive: () => false },
];

// Кнопки відступів
const indentButtons: FormatButtonProps[] = [
  { title: "Increase Indent", icon: FormatIndentIncrease, action: () => null, isActive: () => false },
  { title: "Decrease Indent", icon: FormatIndentDecrease, action: () => null, isActive: () => false },
];

// Панель форматування
const FormattingToolbar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  const [fontSize, setFontSize] = useState<number>(16);
  const [fontFamily, setFontFamily] = useState<string>("Times New Roman");
  const fontFamilies: string[] = ["Times New Roman", "Roboto", "Lora", "Montserrat"];

  // Функція для зміни шрифту
  const fontChange = (event: SelectChangeEvent<string>): void => {
    setFontFamily(event.target.value);
  };

  // Функція для зміни розміру шрифту
  const fontSizeChange = (increment: boolean): void => {
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

  return (
    <div className="bg-white rounded-lg max-w-max mx-auto flex justify-between">
      <div className="flex items-center p-3">
        {/* Вибір шрифту */}
        {/* <FormControl size="small" variant="outlined" className="w-48">
          <InputLabel>Font</InputLabel>
          <Select value={fontFamily} label="Font" onChange={fontChange}>
            {fontFamilies.map((font) => (
              <MenuItem key={font} value={font}>
                {font}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        {/* Розмір шрифту */}
        {/* <div className="flex items-center">
          <IconButton onClick={() => fontSizeChange(false)} disabled={fontSize <= 8}>
            <Remove />
          </IconButton>
          <span className="mx-2 text-sm">{fontSize}</span>
          <IconButton onClick={() => fontSizeChange(true)} disabled={fontSize >= 72}>
            <Add />
          </IconButton>
        </div> */}

        {/* Групи кнопок форматування */}
        <div className="flex items-center">{renderButtons(formatButtons)}</div>
        <div className="flex items-center">{renderButtons(alignmentButtons)}</div>
        <div className="flex items-center">{renderButtons(colorButtons)}</div>
        <div className="flex items-center">{renderButtons(indentButtons)}</div>
      </div>
    </div>
  );
};

const TextEditor: React.FC<{ editor: Editor | null; onSave: () => void; onClear: () => void }> = ({ editor, onSave, onClear }) => {
  return (
    <div className="relative">
      <EditorContent editor={editor} className="bg-[#faedcd] rounded-lg" />
      <div className="absolute bottom-3 right-3">
        <Button variant="text" onClick={onClear}>
          Очистити
        </Button>
        <Button variant="text" onClick={onSave}>
          Зберегти
        </Button>
      </div>
    </div>
  );
};

export const NoteEditor: React.FC = () => {
  // Використовуємо Redux замість локального стану
  const dispatch = useAppDispatch();

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "Натисніть тут",
    editorProps: { attributes: { class: "focus:outline-none min-h-[300px] w-full p-3 cursor-text" } },
  });

  const SaveNote = () => {
    if (!editor) return;
    const content = editor.getText().trim();
    if (!content) return;

    // Використовуємо Redux action для додавання нотатки
    dispatch(addNote({ id: Date.now(), date: Date.now(), title: `Нотатка ${Date.now()}`, content }));

    // editor.commands.clearContent();
  };

  return (
    <div className="flex flex-col gap-3">
      {/* <FormattingToolbar editor={editor} /> */}
      <TextEditor editor={editor} onSave={SaveNote} onClear={() => editor?.commands.clearContent()} />
    </div>
  );
};
