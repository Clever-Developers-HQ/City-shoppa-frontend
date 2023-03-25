import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FileUpload from "@/components/inputs/FileUpload";
import ModalLayout from "@/components/layouts/ModalLayout";
import SubmitBtn from "../buttons/submitBtn";
import CancelBtn from "../buttons/cancelButton";

interface ModalProps {
  open: boolean;
  setOpen: any;
}

export default function DisputeModal({ open, setOpen }: ModalProps) {
  const cancelButtonRef = useRef(null);
  const [images, setImages] = useState([]);
  const [productData, setProductData] = useState<any>({});

  return (
    <ModalLayout open={open} setOpen={setOpen} title="Disputes">
      <div>
        <label
          htmlFor="Seller ID"
          className="block text-sm text-left font-medium text-gray-700 py-3">
          Seller ID
        </label>
        <input
          type="text"
          name="sellerID"
          id="sellerID"
          className="shadow-sm focus:ring-primary focus:border-primary block w-full border-gray-300 sm:text-sm rounded-md p-2"
        />
      </div>

      <div>
        <label
          htmlFor="Product Name"
          className="block text-sm text-left font-medium text-gray-700 py-3">
          Product Name
        </label>
        <input
          type="text"
          name="productName"
          id="productName"
          className="shadow-sm focus:ring-primary focus:border-primary block w-full border-gray-300 sm:text-sm rounded-md p-2"
        />
      </div>

      <div className=" mt-3">
        <label
          htmlFor="description"
          className="block text-sm text-left font-medium text-gray-700 py-3">
          Reason for dispute
        </label>
        <textarea
          rows={5}
          name="description"
          id="description"
          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>


      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <SubmitBtn text="Submit" />
            <CancelBtn text="Cancel" setOpen={() => setOpen(false)} />
            </div>

    </ModalLayout>
  );
}
