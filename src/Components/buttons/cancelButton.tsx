import React from 'react'

function CancelBtn({setOpen}:any) {
  return (
    <button
    type="button"
    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
    onClick={setOpen}
  >
    Cancel
  </button>
  )
}

export default CancelBtn