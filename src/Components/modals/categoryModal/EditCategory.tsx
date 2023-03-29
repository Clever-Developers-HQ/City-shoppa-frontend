import { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
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
import { updateCategoryAction } from './../../../redux/Features/category/updateCategorySlice';
import { unwrapResult } from "@reduxjs/toolkit";


interface ModalProps{
  open: boolean;
  setOpen: any
  token: string;
  setIsUpdated: any
}


export default function EditCategory({open, setOpen, token, setIsUpdated}:ModalProps) {

  const dispatch = useDispatch<AppDispatch>()

  const {loading, category} = useSelector((store:RootState) => store.getCategory)



  
  return (
    <ModalLayout
      open={open}
      setOpen={setOpen}
      title="Edit Category"
      >

        {/* LOADING STATE */}
      {loading && <Loader />}

      {/* SUCCESS STATE */}

      {!loading && (
     <Formik
     initialValues={{name: category.name}}
     validationSchema={Yup.object({
      name: Yup.string()
        .required('Category Name Is Required'), 
    })}
     onSubmit={(values : any, { setSubmitting }) => {
      console.log(values.name, "the name updateddddd")
      console.log(token, "THE TOKEN HERE OOSOSOSO")
            dispatch(updateCategoryAction({name: values.name, token, id: category._id}))
            .then(unwrapResult)
            .then((result : any) => {
              if (result.category) {
                showSuccess("Category Updated Successfully")
                setSubmitting(false)
                setIsUpdated(true)
                setOpen(false)
              }
              setSubmitting(false)
            })
            .catch((err: any) => {
              showError("Something went wrong. Please Try Again")
              setSubmitting(false)
            })

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

          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <SubmitBtn disabled={isSubmitting} text={isSubmitting ? "Please Wait" : "Update Category"} />
            <CancelBtn text="Cancel" setOpen={setOpen} />
            </div>
       </form>
     )}
   </Formik>
      )}
    </ModalLayout>
  )
}