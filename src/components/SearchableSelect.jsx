import React, { useEffect, useMemo, useRef, useState } from "react";

const MAX_VISIBLE_OPTIONS = 60;

const SearchableSelect = ({ options, value, onChange, disabled }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    const matches = query
      ? options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()))
      : options;
    return matches.slice(0, MAX_VISIBLE_OPTIONS);
  }, [options, query]);

  const selectedLabel = options.find((option) => option.value === value)?.label ?? value;

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="searchable-select" ref={containerRef}>
      <input
        type="text"
        className="searchable-select-input"
        value={open ? query : selectedLabel}
        disabled={disabled}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setOpen(true);
          setQuery(e.target.value);
        }}
      />
      {open && !disabled && (
        <div className="searchable-select-list">
          {filteredOptions.length === 0 && (
            <div className="searchable-select-empty">No matches</div>
          )}
          {filteredOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`searchable-select-option ${option.value === value ? "active" : ""}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
