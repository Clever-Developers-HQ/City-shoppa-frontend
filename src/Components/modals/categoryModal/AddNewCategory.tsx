import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaCity } from "react-icons/fa";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/loader/Loader";
import * as Yup from "yup";
import { Formik } from "formik";
import ModalLayout from "@/components/layouts/ModalLayout";
import InputField from "@/components/inputs/InputField";
import { createCategoryAction } from "@/redux/Features/category/createCategorySlice";
import SubmitBtn from "@/components/buttons/submitBtn";
import CancelBtn from "@/components/buttons/cancelButton";
import { showSuccess, showError } from "@/components/Utils/AlertMsg";
import { unwrapResult } from "@reduxjs/toolkit";

interface AddNewCategoryProps {
  open: boolean;
  setOpen: any;
  setIsUpdated: any;
  token: string;
}

export default function AddNewMerchant({
  open,
  setOpen,
  setIsUpdated,
  token,
}: AddNewCategoryProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector(
    (store: RootState) => store.createCategory
  );

  return (
    <ModalLayout open={open} setOpen={setOpen} title="Add New Category ">
      <Formik
        initialValues={{ name: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required("Category Name Is Required"),
        })}
        onSubmit={async (values: any, { setSubmitting }) => {
          const resultAction = await dispatch(
            createCategoryAction({ name: values.name, token })
          );
          const result = unwrapResult(resultAction);
          if (result.category) {
            showSuccess(result.status);
            setIsUpdated(true);
            setOpen(false);
          }
        }}>
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <InputField
              name="name"
              id="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <SubmitBtn
                disabled={isSubmitting}
                text={loading ? "Please Wait" : "Add Category"}
              />
              <CancelBtn text="Cancel" setOpen={setOpen} />
            </div>

            {loading && <Loader />}
          </form>
        )}
      </Formik>
    </ModalLayout>
  );
}
