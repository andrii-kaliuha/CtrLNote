import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setTitle, setContent, clearNote, addNote } from "../store/slices/notesSlice";
import { Button } from "@mui/material";

export function NoteEditor() {
  const dispatch = useDispatch<AppDispatch>();
  const { title, text } = useSelector((state: RootState) => state.note);

  return (
    <div className="relative flex flex-col h-[300px] rounded-xl shadow-lg bg-[#faedcd] p-3">
      <input
        type="text"
        className="w-full p-3 text-lg font-bold focus:outline-none"
        placeholder="Заголовок"
        name="noteTitle"
        value={title}
        onChange={(e) => dispatch(setTitle(e.target.value))}
      />
      <textarea
        className="flex-1 w-full resize-none px-3 pb-3 focus:outline-none"
        placeholder="Введіть текст нотатки..."
        name="noteDescription"
        value={text}
        onChange={(e) => dispatch(setContent(e.target.value))}
      />
      <div className="absolute bottom-3 right-3 flex gap-2">
        <Button variant="text" color="primary" onClick={() => dispatch(clearNote())}>
          Очистити
        </Button>
        <Button variant="text" color="primary" onClick={() => dispatch(addNote())}>
          Додати
        </Button>
      </div>
    </div>
  );
}
