import { SearchInputProps } from "../types/types";

export const SearchInput: React.FC<SearchInputProps> = ({ name, value, onChange, placeholder }) => {
  return (
    <input
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-3 outline-none border border-transparent rounded-md caret-[var(--color-primary)]
                 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]
                 hover:border-[var(--color-primary)] transition w-full h-12"
    />
  );
};
