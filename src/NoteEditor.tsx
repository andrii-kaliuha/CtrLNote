import { Button } from "@mui/material";
import { useState } from "react";

export function NoteEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="relative flex flex-col h-[300px] rounded-xl shadow-lg bg-[#faedcd]">
      <input
        type="text"
        className="w-full p-3 text-lg font-bold focus:outline-none"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="flex-1 w-full resize-none p-3 focus:outline-none"
        placeholder="Введіть текст нотатки..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="absolute bottom-3 right-3">
        <Button
          variant="text"
          onClick={() => {
            console.log("clear");
          }}
        >
          Очистити
        </Button>
        <Button
          variant="text"
          onClick={() => {
            console.log("save");
          }}
        >
          Зберегти
        </Button>
      </div>
    </div>
  );
}
