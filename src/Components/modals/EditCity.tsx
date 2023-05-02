import {useState} from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import * as Yup from 'yup';
import { Formik } from "formik";
import ModalLayout from "../layouts/ModalLayout";
import InputField from "../inputs/InputField";
import SubmitBtn from "../buttons/submitBtn";
import CancelBtn from "../buttons/cancelButton";
import { showSuccess, showError } from "../Utils/AlertMsg";
import { unwrapResult } from "@reduxjs/toolkit";
import {updateCityAction} from  "@/redux/Features/city/updateCitySlice";


interface ModalProps {
  open: boolean;
  setOpen: any;
  setIsUpdated: any;
  token: string;
}

export default function Editcity({ open, setOpen, setIsUpdated, token }: ModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, message, city, error } = useSelector(
    (store: RootState) => store.getCity
  );
  
  return (
    <ModalLayout
      open={open}
      setOpen={setOpen}
      title="Edit City"
      >

      {loading && <Loader />}


      {!loading && (
     <Formik
     initialValues={{name: city.name, street: city.street,  province: city.province }}
     validationSchema={Yup.object({
      name: Yup.string()
        .required('City Name Is Required'),
      street: Yup.string()
        .required('Street is Required'),
      province: Yup.string()
      .required('Province is Required'), 
    })}
     onSubmit={async (values : any, { setSubmitting }) => {
      const id = city._id
      const street = values.street
      const province = values.province
      const name = values.name

        const resultAction = await dispatch(updateCityAction({id, token,  name, street, province}))
        const result = unwrapResult(resultAction)

        if(result.city){
          setIsUpdated(true)
          showSuccess("City Updated Successfully")
          setOpen(false)
        } else {
          setSubmitting(false)
          showError("Something Went Wrong. Please try Again")
        }
     }}
   >
     {({
       values,
       handleChange,
       handleBlur,
       handleSubmit,
       isSubmitting,
     }) => (
       <form onSubmit={handleSubmit}>

        <InputField 
          name="name"
          id="name"
          label="City Name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <InputField 
          name="street"
          id="street"
          label="Street"
          value={values.street}
          onChange={handleChange}
          onBlur={handleBlur}
        />

          <InputField
          name="province"
          id="province"
          label="Province"
          value={values.province}
          onChange={handleChange}
          onBlur={handleBlur}
         />

          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <SubmitBtn disabled={isSubmitting} text={isSubmitting ? "Please Wait...." : "Update city"} />
            <CancelBtn text="Cancel" setOpen={setOpen} />
            </div>

            {isSubmitting && <Loader />}
       </form>
     )}
   </Formik>
      )}
    </ModalLayout>
  );
}
