const getLocaleFromLanguage = (language: string): string => {
  const locales: Record<string, string> = {
    ukrainian: "uk",
    english: "en",
    polish: "pl",
  };
  return locales[language] || "en";
};

export const formatDate = (timestamp: number, language: string) => {
  const locale = getLocaleFromLanguage(language);

  const date = new Date(timestamp);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  const isSameYear = date.getFullYear() === now.getFullYear();

  const formatted = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    ...(isSameYear ? {} : { year: "numeric" }),
  }).format(date);

  return formatted.replace(/\s*[рy]\.?$/i, "").trim();
};
