import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import FileUpload from '@/components/inputs/FileUpload'
import SelectInput from '@/components/inputs/SelectMenu'
import ModalLayout from '@/components/layouts/ModalLayout'

interface ModalProps {
  open: boolean
  setOpen: any
}

export default function EditFeaturesModal({ open, setOpen }: ModalProps) {
  const cancelButtonRef = useRef(null)
  const [images, setImages] = useState([])
  const [productData, setProductData] = useState<any>({})

  return (
    <ModalLayout open={open} setOpen={setOpen} title="Edit Features">
      <div className="p-4 my-4 text-justify bg-secondary text-white rounded-md">
        <p className="text-left pb-4 font-bold text-xl">Note:</p>
        <p>
          The ideal Cityshoppa banner size is 2560 x 1440 pixels, but you can
          use minimum banner dimensions of 2239.24 x 660.42 pixels. For best
          results, create a channel banner image with a 16:9 aspect ratio. JPG,
          PNG, GIF, and BMP image files up to 6MB are supported.
        </p>
      </div>

      <div className="">
        <FileUpload
          multiple={false}
          label="Click or Drag Features Image Here"
          images={images}
          setImages={setImages}
        />
      </div>
    </ModalLayout>
  )
}
