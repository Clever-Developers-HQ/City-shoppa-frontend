import React from 'react'


function SubmitBtn({handleSubmit, isSubmitting, text}:any) {
  return (
    <button
    disabled= {isSubmitting}
    type="submit"
    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-secondary text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
    onClick={handleSubmit}
  >
    {text}
    
  </button>
  )
}

export default SubmitBtn
