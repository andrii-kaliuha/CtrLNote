import { useState, KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import { addTag, removeTag } from "../editNote/noteEditorSlice";
import { useTranslation } from "react-i18next";
import styles from "./TagInput.module.css";

export const TagInput = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const tags = useSelector((state: RootState) => state.noteEditor.tags);
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = input.trim().replace(/,+$/, "");
      if (trimmed) {
        dispatch(addTag(trimmed));
        setInput("");
      }
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      dispatch(removeTag(tags[tags.length - 1]));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tagList}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            #{tag}
            <button className={styles.removeBtn} onClick={() => dispatch(removeTag(tag))} aria-label={`Remove tag ${tag}`}>
              ×
            </button>
          </span>
        ))}
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? t("notes.editor.tags_placeholder") : ""}
        />
      </div>
    </div>
  );
};
