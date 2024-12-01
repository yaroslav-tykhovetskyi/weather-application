"use client";

import { WeatherSearchInputProps } from "./WeatherSearchInput.types";
import { IoSearch } from "react-icons/io5";

const WeatherSearchInput: React.FC<WeatherSearchInputProps> = ({
  isDisabled = false,
  searchText,
  placeholder,
  onChange,
  handleSearch,
  onFocus,
  onBlur,
}) => {
  const handleFocus = () => {
    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <div className="flex h-30">
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={isDisabled}
        type="text"
        value={searchText}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="px-4 py-2 w-full border border-gray-300 focus:outline-none focus:border-blue-500 h-full rounded-l-md"
      />
      <button
        className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600"
        onClick={handleSearch}
      >
        <IoSearch />
      </button>
    </div>
  );
};

export default WeatherSearchInput;
