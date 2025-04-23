// import { useState, useMemo, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   selectNotes,
//   selectPinnedNotes,
//   selectArchivedNotes,
//   selectDeletedNotes,
//   selectSearchQuery,
//   selectSearchHistory,
// } from "../store/notesSelectors";
// import { setSearchQuery, addSearchQueryToHistory } from "../store/slices/notesSlice";
// import { Note } from "../components/Note";
// import SearchIcon from "@mui/icons-material/Search";
// import HistoryIcon from "@mui/icons-material/History";

// export const SearchPage = () => {
//   const notes = useSelector(selectNotes);
//   const pinnedNotes = useSelector(selectPinnedNotes);
//   const archivedNotes = useSelector(selectArchivedNotes);
//   const deletedNotes = useSelector(selectDeletedNotes);
//   const searchQuery = useSelector(selectSearchQuery);
//   const searchHistory = useSelector(selectSearchHistory);
//   const dispatch = useDispatch();
//   const [searchValue, setSearchValue] = useState(searchQuery);
//   const searchInputRef = useRef<HTMLInputElement>(null);
//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
//   const DEBOUNCE_DELAY = 1000;

//   useEffect(() => {
//     if (searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }, []);

//   const handleInputChange = (event: any) => {
//     setSearchValue(event.target.value);

//     if (debounceTimeout.current) {
//       clearTimeout(debounceTimeout.current);
//     }

//     debounceTimeout.current = setTimeout(() => {
//       dispatch(setSearchQuery(event.target.value));
//       dispatch(addSearchQueryToHistory(event.target.value));
//     }, DEBOUNCE_DELAY);
//   };

//   const allNotes = useMemo(() => {
//     return [...notes, ...pinnedNotes, ...archivedNotes, ...deletedNotes];
//   }, [notes, pinnedNotes, archivedNotes, deletedNotes]);

//   const filteredNotes = useMemo(() => {
//     if (!searchQuery) {
//       return [];
//     }
//     const lowerCaseSearchQuery = searchQuery.toLowerCase();
//     return allNotes.filter(
//       (note) => note.title.toLowerCase().includes(lowerCaseSearchQuery) || note.text.toLowerCase().includes(lowerCaseSearchQuery)
//     );
//   }, [allNotes, searchQuery]);

//   return (
//     <section className="p-4" onKeyDown={() => searchInputRef.current?.focus()}>
//       <div className="relative flex items-center mb-4">
//         <SearchIcon className="absolute left-3 text-foreground" />
//         <input
//           ref={searchInputRef}
//           type="text"
//           value={searchValue}
//           onChange={handleInputChange}
//           placeholder="Пошук нотаток..."
//           className="w-full pl-10 pr-4 py-2 rounded-full bg-field outline-none"
//         />
//       </div>

//       {searchHistory.length > 0 && (
//         <div className="mb-4">
//           <h2 className="text-lg font-semibold mb-2">Історія пошуку</h2>
//           <div className="flex gap-2 flex-wrap">
//             {searchHistory.map((query, index) => (
//               <span
//                 key={index}
//                 className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-full text-sm cursor-pointer hover:bg-gray-300 transition"
//                 onClick={() => {
//                   setSearchValue(query);
//                   dispatch(setSearchQuery(query));
//                   dispatch(addSearchQueryToHistory(query));
//                   if (searchInputRef.current) {
//                     searchInputRef.current.focus();
//                   }
//                 }}
//               >
//                 <HistoryIcon className="text-gray-600" /> {query}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       <div>
//         <h2 className="text-lg font-semibold mb-2">Результати пошуку</h2>
//         {filteredNotes.length > 0 ? (
//           <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {filteredNotes.map((note) => (
//               <Note key={note.id} {...note} />
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">Нічого не знайдено</p>
//         )}
//       </div>
//     </section>
//   );
// };
