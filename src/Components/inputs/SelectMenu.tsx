import React from "react";

interface selectInputProps {
  label: string;
  name: string;
  options: string[];
}

export default function SelectInput({
  label,
  name,
  options,
}: selectInputProps) {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-left text-gray-700 py-3">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="mt-1 mb-3 block w-full pl-3 pr-10 py-2. text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
        defaultValue="Canada">
        <option>Select Category</option>
        <option>Furniture</option>
        <option>Baby</option>
        <option>Home and Utensils</option>
      </select>
    </div>
  );
}
