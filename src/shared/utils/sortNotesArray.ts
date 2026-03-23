import { NoteProps, SortBy } from "../types/types";

export const sortNotesArray = (notes: NoteProps[], sortBy: SortBy): NoteProps[] => {
  const sortedNotes = [...notes];

  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

  switch (sortBy) {
    case "titleAsc":
      sortedNotes.sort((a, b) => collator.compare(a.title, b.title));
      break;
    case "titleDesc":
      sortedNotes.sort((a, b) => collator.compare(b.title, a.title));
      break;
    case "dateAsc":
      sortedNotes.sort((a, b) => a.createdAt - b.createdAt);
      break;
    case "dateDesc":
      sortedNotes.sort((a, b) => b.createdAt - a.createdAt);
      break;
    default:
      return sortedNotes;
  }

  return sortedNotes;
};
