import React, { useEffect, useState } from "react";
import { getCategoriesAction } from "../../redux/Features/category/getCategoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { ErrorMessage } from 'formik';

interface SelectInputProps {
  label: string;
  name: string;
  onChange: any
  onBlur: any,
  value: any
  // category_id: any
}


export default function SelectInput({ label, name, onChange, onBlur, value, }: SelectInputProps) {
  const dispatch = useDispatch<AppDispatch>();
const token="empty"
  const { categories } = useSelector((store: RootState) => store.getCategories);

  useEffect(() => {
    dispatch(getCategoriesAction(token));
  }, [dispatch]);

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
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className="mt-1 mb-3 block w-full pl-3 pr-10 py-[40px]. text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
        defaultValue="Canada">
        <option value="">Select Category</option>
        {categories?.map((category: any) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>

      <div className="text-orange text-sm italic text-start text">
      <ErrorMessage name={name} />
    </div>
    </div>
  );
}
