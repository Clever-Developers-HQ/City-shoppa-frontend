import React from "react";

function InputField() {
  return (
    <div>
      <div className="mt-2">
        <div>
          <label
            htmlFor="city"
            className="block text-sm text-left font-medium text-gray-700 py-3">
            Product Name
          </label>
          <input
            type="text"
            name="product name"
            id="product name"
            className="shadow-sm focus:ring-primary focus:border-primary block w-full border-gray-300 sm:text-sm rounded-md p-2"
          />
        </div>
      </div>
    </div>
  );
}

export default InputField;
