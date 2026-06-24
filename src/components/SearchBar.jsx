import { RiSearchLine } from "react-icons/ri";

export default function SearchBar({ value, onChange, placeholder = "Search…" }) {
  return (
    <div className="relative">
      <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64646C] text-base pointer-events-none" />
      <input
        type="text"
        className="input pl-9 w-64"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
