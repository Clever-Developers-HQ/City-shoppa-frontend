import React, {useEffect, useState,} from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import * as Yup from "yup";
import { ErrorMessage, Formik } from "formik";
import { createDonationAction } from "@/redux/Features/donation/createDonationSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/loader/Loader";
import { showSuccess, showError} from "@/components/Utils/AlertMsg";
import { AppDispatch } from "../../redux/store";
import { RootState } from "@/redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { adminTokenAuthentication } from "@/components/Utils/TokenAuthentication";
import LoadingScreen from "@/components/loader/loadingScreen";


function Donation() {
  const dispatch = useDispatch<AppDispatch>();


const [token, setToken] = useState<any>("")
const [loaded, setLoaded] = useState(false)

  const { loading, success} = useSelector(
    (store: RootState) => store.createDonation
  );

  useEffect(() => {
    setToken(adminTokenAuthentication());
    if (token) {
      setLoaded(true);
    }
  }, [token]);

  return (
    <div>
      {
        loaded === false ? <LoadingScreen /> :
        (
<AdminLayout title="Donation">
        <section className="bg-[#E9EBF2] h-60 w-full p-5 rounded">
          <Formik
            initialValues={{ amount: "" }}
            validationSchema={Yup.object({
              amount: Yup.number().required()
            })}
             onSubmit={async (values: any, { setSubmitting }) => {
  
              const amount = values.amount;
             const resultAction= await dispatch(createDonationAction({ token, amount }))
              const result = unwrapResult(resultAction)
              if (createDonationAction.fulfilled.match(resultAction)) {
                showSuccess(result.status)
                values.amount = ""
              } else{
                showError("Something Went Wrong. Please Try Again")
              }
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
                    {isSubmitting ? "Please Wait...": "Donate"}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </section>
      </AdminLayout>
        )
      }
      
    </div>
  );
}

export default Donation;
