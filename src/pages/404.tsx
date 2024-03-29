import React from 'react'
import NavBar from '@/components/navigation/NavBar'
import NextLink from 'next/link'

function notFound() {
  return (
    <div>
    <NavBar />
<main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find what you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <NextLink
              href="/"
              className="rounded-md bg-orange px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Continue Shopping
            </NextLink>
            <div
            onClick={() => history.back()}
            className="text-sm font-semibold text-gray-900 cursor-pointer">
              Go Back <span aria-hidden="true">&rarr;</span>
            </div>
          </div>
        </div>
      </main>

      </div>
  )
}

export default notFound
