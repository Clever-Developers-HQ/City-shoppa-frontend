import React from 'react'
import AdminLayout from '@/components/layouts/AdminLayout'



function CompletedOrders() {
  return (
    <div>
        <AdminLayout title="Donation">
            <section className="bg-[#E9EBF2] h-60 w-full p-5 rounded">


            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-5">
                    Amount
                </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                </div>
                <input
                type="text"
                name="price"
                id="price"
                className="block rounded-md py-2 px-5 md:w-80 w-full border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="$0.00"
                />
            </div>
        </div>


    <div className="flex items-end mt-10 justify-end"> 
                <button
                    type="button"
                    className="mt-5 md:0 w-full items-center justify-center rounded-md border border-transparent bg-[#F85606] px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-offset-2 sm:w-auto cursor-pointer"
                >
                  Publish
                 </button>
                </div>


            </section>
        </AdminLayout>
    </div>
  )
}

export default CompletedOrders