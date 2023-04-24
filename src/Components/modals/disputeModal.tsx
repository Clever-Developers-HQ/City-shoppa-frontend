import { useRef, useState, useEffect } from "react";
import ModalLayout from "@/components/layouts/ModalLayout";
import SubmitBtn from "../buttons/submitBtn";
import CancelBtn from "../buttons/cancelButton";
import { createDisputeAction } from "@/redux/Features/dispute/createDisputeSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Loader from "../loader/Loader";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import InputField from "../inputs/InputField";
import { unwrapResult } from "@reduxjs/toolkit";
import { showSuccess } from "../Utils/AlertMsg";

interface ModalProps {
  open: boolean;
  setOpen: any;
}

export default function DisputeModal({ open, setOpen }: ModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    // GET THE USER DETAILS FROM LOCAL STORAGE
    const userDetails = JSON.parse(localStorage.getItem("user")!);
    setUser(userDetails);
  }, []);

  return (
    <ModalLayout open={open} setOpen={setOpen} title="Disputes">
      <Formik
        initialValues={{
          seller_id: "",
          product_name: "",
          dispute_reason: "",
        }}
        validationSchema={Yup.object({
          seller_id: Yup.string().required("Seller ID is required")
          .matches(/^([0-9a-f]){24}$/i, "Invalid Seller ID Provided"),
          product_name: Yup.string().required("Product Name is required"),
          dispute_reason: Yup.string().required("Reason for dispute"),
        })}
        onSubmit={async (values: any, { setSubmitting }) => {
          const seller_id = values.seller_id;
          const product_name = values.product_name;
          const dispute_reason = values.dispute_reason;
          const email = user?.email;
          const phone = user?.phone;
          const token = user?.token;

          const resultAction = await dispatch(
            createDisputeAction({
              seller_id,
              product_name,
              dispute_reason,
              email,
              phone,
              token,
            })
          );
          setSubmitting(true);

          const result = unwrapResult(resultAction);
          if (result.dispute) {
            showSuccess("Dispute Ticket Created Successfully");
            setOpen(false);
          } else {
            setSubmitting(false);
          }
        }}>
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <InputField
              label="Seller ID"
              id="seller_id"
              name="seller_id"
              value={values.seller_id}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <InputField
              label="Product Name"
              id="product_name"
              name="product_name"
              value={values.product_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div className=" mt-3">
              <label
                htmlFor="description"
                className="block text-sm text-left font-medium text-gray-700 py-3">
                Reason for dispute
              </label>
              <textarea
                rows={5}
                id="dispute_reason"
                name="dispute_reason"
                value={values.dispute_reason}
                onChange={handleChange}
                onBlur={handleBlur}
                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="text-sm italic text-start text-orange">
              <ErrorMessage name="dispute_reason" />
            </div>

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <SubmitBtn text={isSubmitting ? "Processing..." : "Submit"} />
              <CancelBtn text="Cancel" setOpen={() => setOpen(false)} />
            </div>
          </form>
        )}
      </Formik>
    </ModalLayout>
  );
}
