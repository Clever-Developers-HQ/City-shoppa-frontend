import { Fragment, useRef, useState, useEffect } from 'react'
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/loader/Loader";
import * as Yup from 'yup';
import { Formik } from "formik";
import ModalLayout from "@/components/layouts/ModalLayout";
import InputField from "@/components/inputs/InputField";
import SubmitBtn from "@/components/buttons/submitBtn";
import CancelBtn from "@/components/buttons/cancelButton";
import { showSuccess, showError } from "@/components/Utils/AlertMsg";
import { unwrapResult } from "@reduxjs/toolkit";
import { createCityAction } from '@/redux/Features/city/createCitySlice';


interface AddNewCategoryProps{
  open: boolean;
  setOpen: any
  setIsUpdated: any
  token: string;
}

export default function AddNewMerchant({open, setOpen, setIsUpdated, token}:AddNewCategoryProps) {

  const dispatch = useDispatch<AppDispatch>()
  const {loading} = useSelector((store:RootState) => store.createCity)

  return (
    <ModalLayout
      open={open}
      setOpen={setOpen}
      title="Add New City"
      >


     <Formik
     initialValues={{name: "", street: "", province: ""}}
     validationSchema={Yup.object({
      name: Yup.string()
        .required('Category Name Is Required'), 

      street: Yup.string()
      .required('Street Is Required'), 

      province: Yup.string()
      .required('Province Is Required'), 
    })}
     onSubmit={async (values : any, { setSubmitting }) => {
       const  name = values.name
        const street = values.street
       const  province = values.province
            const resultAction = await dispatch(createCityAction({name, street, province, token}))
            const result = unwrapResult(resultAction)
            if (result.city) {
              showSuccess(result.status)
              setIsUpdated(true)
              setOpen(false)
            } else {
              setSubmitting(false)
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
          label="Name"
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
            <SubmitBtn disabled={isSubmitting} text={loading ? "Please Wait" : "Add City"} />
            <CancelBtn text="Cancel" setOpen={setOpen} />
            </div>

            {loading && <Loader />}

       </form>
     )}
   </Formik>
    </ModalLayout>
  )
}