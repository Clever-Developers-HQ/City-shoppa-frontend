import React from "react";
import { ErrorMessage } from 'formik';

interface InputFieldProps{
  name : string,
  value : any,
  onBlur : any,
  onChange : any,
  id : string,
  label : string,
}

function PasswordField({name, id, onBlur, onChange, value, label }:InputFieldProps) {
  return (
    <div>
    <label
      htmlFor={name}
      className="block text-sm text-left font-medium text-gray-700 py-3">
      {label}
    </label>
    <input
      type="password"
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      id={id}
      className="shadow-sm focus:ring-primary focus:border-primary block w-full border-gray-300 sm:text-sm rounded-md p-2"
    />

    <div className="text-orange text-sm italic text-start text">
      <ErrorMessage name={name} />
    </div>
  </div>
  );
}

export default PasswordField;