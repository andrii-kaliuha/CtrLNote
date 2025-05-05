// clearExpiredTrash: (state, action: PayloadAction<number>, { getState }: { getState: () => RootState }) => {
//   // Отримуємо період авто видалення з налаштувань
//   const { autoDeletePeriod } = getState().settings;
//   const currentTime = Date.now();

//   state.notes = state.notes.filter((note) => {
//     const shouldDelete = note.status === "deleted" && note.deletedAt && currentTime - note.deletedAt >= autoDeletePeriod;
//     return !shouldDelete;
//   });
// },

// if (shouldDelete) {
//   console.log(
//     "Deleting note:",
//     note?.id,
//     new Date().toLocaleString("uk-UA", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//     })
//   );
// }

// setAutoDeletePeriod: (state, action: PayloadAction<number>) => {
//   state.autoDeletePeriod = action.payload;
// },
