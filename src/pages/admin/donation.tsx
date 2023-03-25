import React, {useState,} from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import * as Yup from "yup";
import { ErrorMessage, Formik } from "formik";
import { createDonationAction } from "@/redux/Features/donation/createDonationSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/loader/Loader";
import { showSuccess, showError} from "@/components/Utils/AlertMsg";
import { AppDispatch } from "../../redux/store";
import { RootState } from "@/redux/store";




function Donation() {
  //Get Token from Local Storage
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmUwMjA4NzkxMGMyYmY1ZWNkYmYzZCIsImlhdCI6MTY3ODA4NTg2OSwiZXhwIjoxNjc4OTQ5ODY5fQ.MEtjdDLrwi-BAfCr6mJZbC8Lb0sp54qf3-fdhEAQb4E";

  const dispatch = useDispatch<AppDispatch>();

  const { loading, success} = useSelector(
    (store: RootState) => store.createDonation
  );

  return (
    <div>
      <AdminLayout title="Donation">
        <section className="bg-[#E9EBF2] h-60 w-full p-5 rounded">
          <Formik
            initialValues={{ amount: "" }}
            validationSchema={Yup.object({
              amount: Yup.string().required("Amount is Required"),
            })}
             onSubmit={(values: any, { setSubmitting }) => {
              console.log(values, "THE VALUES");
              const amount = values.amount;
             dispatch(createDonationAction({ token, amount }));

            // if (success) {
            //   showSuccess(message)
            //   return
            // }
                  //Set the Amount Field to Empty
                  values.amount = "";

              setSubmitting(false);

            }}>
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-5">
                    Amount
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
                    <input
                      type="text"
                      name="amount"
                      id="amount"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.amount}
                      className="block rounded-md py-2 px-5 md:w-80 w-full border-gray-300  focus:border-primary focus:ring-primary sm:text-sm"
                      placeholder="$0.00"
                    />

                    <div className="text-orange text-sm italic text-start text">
                      <ErrorMessage name="amount" />
                    </div>
                  </div>
                </div>

                <div className="flex items-end mt-10 justify-end">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="mt-5 md:0 w-full items-center justify-center rounded-md border border-transparent bg-[#F85606] px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-offset-2 sm:w-auto cursor-pointer">
                    {loading ? "Please Wait...": "Donate"}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </section>
      </AdminLayout>
    </div>
  );
}

export default Donation;
