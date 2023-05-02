import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import FileUpload from '../../inputs/FileUpload'
import ModalLayout from '../../layouts/ModalLayout'

interface ModalProps {
  open: boolean
  setOpen: any
}

export default function EditBrandModal({ open, setOpen }: ModalProps) {
  const cancelButtonRef = useRef(null)
  const [images, setImages] = useState([])
  const [productData, setProductData] = useState<any>({})

  return (
    <ModalLayout open={open} setOpen={setOpen} title="Edit Brand">
      <div>
        <label
          htmlFor="brand"
          className="block text-sm text-left font-medium text-gray-700 py-3"
        >
          Logo
        </label>
        <input
          type="text"
          name="brand"
          id="city"
          className="shadow-sm focus:ring-primary focus:border-primary block w-full border-gray-300 sm:text-sm rounded-md p-2"
        />
      </div>

      <div>
        <label
          htmlFor="url"
          className="block text-sm text-left font-medium text-gray-700 py-3"
        >
        URL
        </label>
        <input
          type="text"
          name="brand"
          placeholder='https://example.com'
          id="city"
          className="shadow-sm focus:ring-primary focus:border-primary block w-full border-gray-300 sm:text-sm rounded-md p-2"
        />
      </div>

      <div className=" mt-3">
        <FileUpload
          multiple={false}
          label="Click or Drag Brand Logo Here"
          images={images}
          setImages={setImages}
        />
      </div>
    </ModalLayout>
  )
}