import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {FaCity} from 'react-icons/fa'
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/loader/Loader";
import * as Yup from 'yup';
import { Formik } from "formik";
import ModalLayout from "@/components/layouts/ModalLayout";
import InputField from "@/components/inputs/InputField";
import { merchantRegisterAction } from '@/redux/Features/merchant/registerMerchantSlice';
import SubmitBtn from "@/components/buttons/submitBtn";
import CancelBtn from "@/components/buttons/cancelButton";
import { showSuccess, showError } from "@/components/Utils/AlertMsg";

interface AddNewCategoryProps{
  open: boolean;
  setOpen: any
  setIsUpdated: any
}

//Get Token From Local Storage 


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmUwMjA4NzkxMGMyYmY1ZWNkYmYzZCIsImlhdCI6MTY3OTI5NDUzMSwiZXhwIjoxNjgwMTU4NTMxfQ.vjXHZy9wPSyPae3tx148TlZUmhtfaTQoDLITEHTH_TE";

export default function AddNewMerchant({open, setOpen, setIsUpdated}:AddNewCategoryProps) {

  const dispatch = useDispatch<AppDispatch>()
  const {loading, success, message, merchant, error} = useSelector((store:RootState) => store.registerMerchant)

  console.log(loading, success, message, merchant, error, "THE STATES OOOOOOO")


  
  

  return (
    <ModalLayout
      open={open}
      setOpen={setOpen}
      title="Add New Category "
      >


     <Formik
     initialValues={{name: "",}}
     validationSchema={Yup.object({
      name: Yup.string()
        .required('Category Name Is Required'), 
    })}
     onSubmit={(values : any, { setSubmitting }) => {


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
            <SubmitBtn disabled={isSubmitting} text="Add Category" />
            <CancelBtn text="Cancel" setOpen={setOpen} />
            </div>

            {loading && <Loader />}

       </form>
     )}
   </Formik>
    </ModalLayout>
  )
}