import React from 'react'
import AdminLayout from '@/components/layouts/AdminLayout'
import { Animated } from 'react-animated-css'

function UnCompletedOrders() {
  return (
    <div>
      <AdminLayout title="Uncompleted Orders">
        <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
          <section className="bg-[#E9EBF2] p-5 rounded">
            <div className="bg-white p-5 mb-5">
              {/* ORDER ABD PRICE CONTAINER  */}
              <div className="flex justify-between items-center border-b-2 border-b-black">
                <div>
                  <p className="font-bold">Order #24322343</p>
                  <p className="text-[#282222]">Placed on 14 Feb 2023</p>
                </div>

                <div>
                  <span className="text-[#282222]">Total: </span>
                  <span className="font-bold">$35</span>
                </div>
              </div>

              <div className="my-5 flex justify-between ">
                <div className="md:flex ">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                      width="220"
                      height="220"
                      className="rounded md:h-40 md:w-40 w-20 h-20"
                    />
                  </div>

                  <div className="md:ml-3 md:mt-0 mt-3">
                    <h3 className="text-xl font-bold">Sai Tech</h3>
                    <p>Model : x56</p>

                    <p className="md:mt-20">Quantity: 1</p>
                  </div>
                </div>

                <div>
                  <p className="md:ml-10 font-bold">Related</p>
                  <p className="md:ml-10 mb-3">Product/Services</p>
                  <p className="font-bold text-[#5582F6]">Discount: 50% </p>

                  <div className="md:flex justify-center items-center mt-3">
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                      width="50"
                      height="50"
                      className="rounded h-10 w-10"
                    />

                    <div className="md:pl-3">
                      <p>Supplier: KAYODE INC</p>
                      <span>Address:</span>{' '}
                      <span className="text-[#FC8347]">Calgary Canada.</span>
                    </div>
                  </div>

                  <div className="my-5">
                    <p className="font-bold md:text-xl text-[#5582F6]">
                      Coupon: 455638
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:flex justify-between items-center">
                <div>
                  <p>
                    <span> Address: </span>
                    <span className="text-[#FC8347]">
                      {' '}
                      A14 Brent street, Ontario Canada.
                    </span>
                  </p>
                  <p>
                    <span> Website: </span>
                    <a href="www.cityshopper.com">
                      <span className="text-[#5582F6]">
                        {' '}
                        www.cityshopper.com
                      </span>
                    </a>
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex mt-5 md:0 w-full items-center justify-center rounded-md border border-transparent bg-[#838080] px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-offset-2 sm:w-auto cursor-not-allowed"
                >
                  Pending
                </button>
              </div>
            </div>
          </section>
        </Animated>
      </AdminLayout>
    </div>
  )
}

export default UnCompletedOrders
