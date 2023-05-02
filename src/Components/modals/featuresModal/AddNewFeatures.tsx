import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FileUpload from "../../inputs/FileUpload";
import * as Yup from "yup";
import ModalLayout from "../../layouts/ModalLayout";
import SubmitBtn from "../../buttons/submitBtn";
import CancelBtn from "../../buttons/cancelButton";
import { createFeatureAction } from "@/redux/Features/feature/createFeatureSlice";
import { showSuccess, showError } from "../../Utils/AlertMsg";
import { unwrapResult } from "@reduxjs/toolkit";
import { ErrorMessage, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {uploadFile} from "../../Utils/cloudinaryUpload"

interface ModalProps {
  open: boolean;
  setOpen: any;
  setIsUpdated: any;
  token: string;
}

export default function AddNewFeaturesModal({
  open,
  setOpen,
  setIsUpdated,
  token,
}: ModalProps) {
  
  let [images, setImages] = useState<any>([]);
  const [error, setError] = useState("");
  const [isUploaded, setIsUploaded] = useState(false)

  const dispatch = useDispatch<AppDispatch>();

  const {loading, features, message, } = useSelector(
    (store: RootState) => store.createFeature
  );

  const validateImage = () => {
    if (images.length === 0) {
      setError("Ensure Feature Image Is Uploaded");
      return false;
    }
  };

  return (
    <ModalLayout open={open} setOpen={setOpen} title="Add New Features">
      <Formik
        initialValues={{ image: "" }}
        validationSchema={Yup.object({
        })}
        onSubmit={async (values: any, { setSubmitting }) => {
          validateImage();
          const image = images[0]?.data_url;
          setIsUploaded(true)
         const uploaded = await uploadFile(image);
         if (uploaded) {
          setIsUploaded(false)
          const resultAction = await dispatch(
            createFeatureAction({ token, image:uploaded })
          );

          const result = unwrapResult(resultAction);
          if (result.feature) {
            showSuccess("Feature Created Successfully");
            setIsUpdated(true);
            setOpen(false);
          } else {
            showError(result.status);
            setSubmitting(false);
          }
         } else {
            showError("Error Uploading Image")
            setIsUploaded(false)
         }


        }}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-4 my-4 text-justify bg-secondary text-white rounded-md">
              <p className="text-left pb-4 font-bold text-xl">Note:</p>
              <p>
                The ideal Cityshoppa banner size is 2560 x 1440 pixels, but you
                can use minimum banner dimensions of 2239.24 x 660.42 pixels.
                For best results, create a channel banner image with a 16:9
                aspect ratio. JPG, PNG, GIF, and BMP image files up to 6MB are
                supported.
              </p>
            </div>

            <div className="">
              <FileUpload
                multiple={false}
                label="Click or Drag Features Image Here"
                images={images}
                setImages={setImages}
              />
              <div className="text-orange text-sm italic text-start text">
                <ErrorMessage name="image" />
              </div>
            </div>

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              {
                isUploaded === true ?  <SubmitBtn disabled={isSubmitting} text="Uploading..."/> :<SubmitBtn disabled={isSubmitting} text={loading? "Please Wait....." : "Add Features" }/>

              }
              <CancelBtn text="Cancel" setOpen={() => setOpen(false)} />
            </div>
          </form>
        )}
      </Formik>
    </ModalLayout>
  );
}

