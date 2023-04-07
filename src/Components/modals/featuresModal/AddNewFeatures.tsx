import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FileUpload from "@/components/inputs/FileUpload";
import * as Yup from "yup";
import ModalLayout from "@/components/layouts/ModalLayout";
import InputField from "@/components/inputs/InputField";
import SubmitBtn from "@/components/buttons/submitBtn";
import CancelBtn from "@/components/buttons/cancelButton";
import { createFeatureAction } from "@/redux/Features/feature/createFeatureSlice";
import { showSuccess, showError } from "@/components/Utils/AlertMsg";
import { unwrapResult } from "@reduxjs/toolkit";
import { ErrorMessage, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

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

  console.log(images[0]?.data_url, "THE IMAGES");

  return (
    <ModalLayout open={open} setOpen={setOpen} title="Add New Features">
      <Formik
        initialValues={{ image: "" }}
        validationSchema={Yup.object({
          // image: Yup.string()
          //   .required('Ensure Feature Image Is Uploaded'),
        })}
        onSubmit={async (values: any, { setSubmitting }) => {
          validateImage();
          const image = images[0]?.data_url;

          console.log("dispatched")
          const resultAction = await dispatch(
            createFeatureAction({ token, image })
          );

          const result = unwrapResult(resultAction);
          if (result.user) {
            showSuccess("User Created Successfully");
            setIsUpdated(true);
            setOpen(false);
          } else {
            showError(result.status);
            setSubmitting(false);
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
              <SubmitBtn disabled={isSubmitting} text={loading? "Please Wait....." : "Add Features" }/>
              <CancelBtn text="Cancel" setOpen={() => setOpen(false)} />
            </div>
          </form>
        )}
      </Formik>
    </ModalLayout>
  );
}

