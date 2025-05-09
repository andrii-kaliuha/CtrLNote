const getLocaleFromLanguage = (language: string): string => {
  switch (language.toLowerCase()) {
    case "ukrainian":
      return "uk";
    case "english":
      return "en";
    case "polish":
      return "pl";
    default:
      return "en";
  }
};

export const formatDate = (timestamp: number, language: string) => {
  const locale = getLocaleFromLanguage(language);

  const date = new Date(timestamp);
  const now = new Date();

  const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

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

  return formatted.replace(/ р\.?$/, "");
};
