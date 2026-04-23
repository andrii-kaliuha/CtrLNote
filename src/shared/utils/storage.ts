export const loadFromLocalStorage = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error(`Помилка читання ${key}:`, e);
    return undefined;
  }
};

export const hydrateState = <T>(key: string, defaultValue: T): T => {
  const saved = loadFromLocalStorage(key);
  return saved === undefined ? defaultValue : { ...defaultValue, ...saved };
};
