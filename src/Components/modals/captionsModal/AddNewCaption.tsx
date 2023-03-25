import { useState } from 'react'
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
import FileUpload from '@/components/inputs/FileUpload';
import { createCaptionAction } from '@/redux/Features/caption/createCaption';


interface AddNewMerchantProps{
  open: boolean;
  setOpen: any
  setIsUpdated: any
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmUwMjA4NzkxMGMyYmY1ZWNkYmYzZCIsImlhdCI6MTY3OTI5NDUzMSwiZXhwIjoxNjgwMTU4NTMxfQ.vjXHZy9wPSyPae3tx148TlZUmhtfaTQoDLITEHTH_TE";

export default function AddNewCaption({open, setOpen, setIsUpdated}:AddNewMerchantProps) {

  const dispatch = useDispatch<AppDispatch>()
  const {loading, success, message, caption, error} = useSelector((store:RootState) => store.createCaption)

  console.log(caption, success, message, error, "THE STATES OOOOOOO")




  const [label, setLabel] = useState<any>("")
  
  console.log(label, "THE IMAGE")

  return (
    <ModalLayout
      open={open}
      setOpen={setOpen}
      title="Add New Caption"
      >


     <Formik
     initialValues={{heading: "", sub_heading: "", website: "", image: label,}}
     validationSchema={Yup.object({
      heading: Yup.string()
        .required('Required'),
        sub_heading: Yup.string()
        .required('Required'),
    })}

     onSubmit={(values : any, { setSubmitting }) => {
      const heading = values.heading
      const sub_heading = values.sub_heading
      const image = label[0].file.name
      console.log(image, "NA ME")
      alert(image)
        dispatch(createCaptionAction({token, sub_heading, heading, image}))

        if(caption){
          showSuccess("Merchant Account Created Successfully")
          // setOpen(false)
          setIsUpdated(true)
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
          name="heading"
          id="heading"
          label="Heading"
          value={values.heading}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <InputField 
          name="sub_heading"
          id="sub_heading"
          label="Sub Heading"
          value={values.sub_heading}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <FileUpload 
        multiple={false}
        label={"Click or Drag Caption Image Here"}
        images={label}
        setImages={(img: any) => setLabel(img)}
        />

          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <SubmitBtn disabled={isSubmitting} text="Add Caption" />
            <CancelBtn text="Cancel" setOpen={() => setOpen(false)} />
            </div>

            {loading && <Loader />}
       </form>
     )}
   </Formik>
    </ModalLayout>
  )
}