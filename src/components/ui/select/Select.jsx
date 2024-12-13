import React, { useEffect, useRef, useState } from "react";

export const Select = ({
  options,
  onSelect,
  className,
  selectedClass,
  dropdownClass,
  dropdownItemClass,
  placeHolder,
  controller,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const selectRef = useRef(null); // Reference to the component wrapper

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false); // Close the dropdown after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <div
        className={`cursor-pointer ${selectedClass}`}
        onClick={toggleDropdown}
      >
        {controller ? selectedOption?.name : placeHolder}
      </div>
      {isOpen && (
        <ul
          className={`absolute left-0 top-full mt-1 w-full bg-white border rounded ${dropdownClass}`}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className={`cursor-pointer p-2 ${dropdownItemClass}`}
              onClick={() => handleSelect(option)}
            >
              {option?.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

