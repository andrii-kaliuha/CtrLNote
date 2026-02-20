import { SearchInputProps } from "../types/types";

export const SearchInput: React.FC<SearchInputProps> = ({ name, value, onChange, placeholder }) => {
  return (
    <input
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      // className="p-3 outline-none border-3 rounded-md caret-[var(--color-primary)]
      //            focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]
      //            hover:border-[var(--color-primary)] transition min-w-32 max-w-64 h-12"
      className="p-3 outline-none rounded-[8px] caret-[var(--color-primary)] 
      bg-[var(--color-surface)] focus:bg-transparent
                 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]
                 hover:border-[var(--color-primary)] transition w-full h-12"
      // className="p-3 outline-none border-2 rounded-[8px] caret-[var(--color-primary)] border-gray-200
      // bg-gray-200 hover:bg-transparent focus:bg-transparent
      //            focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]
      //            hover:border-[var(--color-primary)] transition min-w-32 max-w-64 h-12"
    />
  );
};
