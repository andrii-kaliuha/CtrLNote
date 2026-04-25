export const formatDate = (timestamp: number, language: string, full = false) => {
  const date = new Date(timestamp);
  const now = new Date();

  if (full) {
    return new Intl.DateTimeFormat(language, {
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
      .format(date)
      .replace(/\s*р\.\s*о\s*/i, " о ")
      .replace(/\s*[рy]\.?\s*$/i, "")
      .trim();
  }

  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return new Intl.DateTimeFormat(language, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  const isSameYear = date.getFullYear() === now.getFullYear();

  const formatted = new Intl.DateTimeFormat(language, {
    day: "numeric",
    month: "long",
    ...(isSameYear ? {} : { year: "numeric" }),
  }).format(date);

  return formatted.replace(/\s*[рy]\.?$/i, "").trim();
};
