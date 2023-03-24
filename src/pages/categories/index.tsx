import Footer from '@/Components/Footer/Footer'
import NavBar from '@/Components/NavBar/NavBar'
import { StarIcon } from '@heroicons/react/solid'

const products = [
  {
    id: 1,
    name: 'Food',
    productsCount: 38,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg',
    imageAlt: 'TODO',
    href: '/categories/products',
  },
  {
    id: 2,
    name: 'Consumer Electronics',
    productsCount: 18,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 3,
    name: 'Bags & Accessories',
    productsCount: 14,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 4,
    name: 'Mens Wear',
    productsCount: 21,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 5,
    name: 'Art & Craft',
    productsCount: 16,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-05.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 6,
    name: 'Computer & Accessories',
    productsCount: 11,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-06.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 7,
    name: 'Furniture',
    productsCount: 12,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-07.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 8,
    name: 'Gardening Supplies',
    productsCount: 12,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-08.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 9,
    name: 'Health & fitness',
    productsCount: 12,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-09.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 10,
    name: 'Kids & Toys',
    productsCount: 12,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-09.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 11,
    name: 'Transport & Logistics',
    productsCount: 12,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-09.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 12,
    name: 'Jewelleries',
    productsCount: 12,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-09.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 13,
    name: 'Autoshop and Repairs',
    productsCount: 12,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-09.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 14,
    name: 'Restaurants and Fast foods',
    productsCount: 12,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-09.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 15,
    name: ' Fashion',
    productsCount: 12,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-09.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 16,
    name: 'Frozen Foods',
    productsCount: 16,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-09.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Categories() {
  return (
    <>
      <NavBar/>
      <div className="bg-white">
  <div className="max-w-7xl mx-auto overflow-hidden mb-20 mt-20 sm:px-6 lg:px-8">
    <h2 className="sr-only">Products</h2>

        <div className="flex justify-between items-center py-4 border-b border-gray-200 mb-4">
          <div
            className=""
          >
            <h2 className="text-4xl font-bold text-gray-900">Categories</h2>
            <h6
              className=" mt-1 text-lg font-medium text-gray-500"
            >
             Click on a category to see more specific results
            </h6>
          </div>
      <button
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none"
        onClick={() => window.history.back()}
      >
        Back
      </button>
    </div>

    <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <div key={product.id} className="group relative p-4 border-r border-b border-gray-200 sm:p-6">
          <div
            className="relative rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75 cursor-pointer"
            onClick={() => window.open(product.href)}
          >
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="w-full h-full object-center object-cover transition-all transform hover:scale-110 duration-300"
            />

            {/* Add conditional rendering for mobile devices */}
            <div className="sm:block absolute bottom-0 left-0 w-full bg-white bg-opacity-75 px-5 py-2 text-center lg:hidden">
              <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{product.productsCount} Products</p>
            </div>

            {/* Add conditional rendering for desktop devices */}
            <div className="hidden sm:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white bg-opacity-75 px-5 py-2 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">{product.productsCount} Products</h3>
                <p className="text-xs text-gray-500 mt-1">{product.name}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
      </div>
      <Footer/>
    </>
  )
}