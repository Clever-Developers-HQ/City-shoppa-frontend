/* eslint-disable @next/next/no-img-element */
const products = [
  {
    id: 1,
    name: "Machined Pen",
    color: "Black",
    price: "$35",
    discount: "50",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg",
    imageAlt:
      "Black machined steel pen with hexagonal grip and small white logo at top.",
    availableColors: [
      { name: "Black", colorBg: "#111827" },
      { name: "Brass", colorBg: "#FDE68A" },
      { name: "Chrome", colorBg: "#E5E7EB" },
    ],
  },
  {
    id: 2,
    name: "Leather Desk Pad",
    color: "Brown",
    price: "$45",
    discount: "50",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-product-02.jpg",
    imageAlt:
      "Rustic brown leather desk pad with stitched edges and a small white logo at bottom right corner.",
    availableColors: [
      { name: "Brown", colorBg: "#A78B6D" },
      { name: "Black", colorBg: "#111827" },
      { name: "White", colorBg: "#F9FAFB" },
    ],
  },
  {
    id: 3,
    name: "Leather Desk Pad",
    color: "Black",
    price: "$45",
    discount: "50",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-product-03.jpg",
    imageAlt:
      "Black leather desk pad with stitched edges and a small white logo at bottom right corner.",
    availableColors: [
      { name: "Brown", colorBg: "#A78B6D" },
      { name: "Black", colorBg: "#111827" },
      { name: "White", colorBg: "#F9FAFB" },
    ],
  },
  {
    id: 4,
    name: "Leather Desk Pad",
    color: "White",
    price: "$45",
    discount: "50",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-product-04.jpg",
    imageAlt:
      "White leather desk pad with stitched edges and a small white logo at bottom right corner.",
    availableColors: [
      { name: "Brown", colorBg: "#A78B6D" },
      { name: "Black", colorBg: "#111827" },
      { name: "White", colorBg: "#F9FAFB" },
    ],
  },
  {
    id: 5,
    name: "Leather Desk Pad",
    color: "Brown",
    price: "$45",
    discount: "50",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-product-04.jpg",
    imageAlt:
      "Rustic brown leather desk pad with stitched edges and a small white logo at bottom right corner.",
    availableColors: [
      { name: "Brown", colorBg: "#A78B6D" },
      { name: "Black", colorBg: "#111827" },
      { name: "White", colorBg: "#F9FAFB" },
    ],
  },
  {
    id: 6,
    name: "Leather Desk Pad",
    color: "Black",
    price: "$45",
    discount: "50",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-product-04.jpg",
    imageAlt:
      "Black leather desk pad with stitched edges and a small white logo at bottom right corner.",
    availableColors: [
      { name: "Brown", colorBg: "#A78B6D" },
      { name: "Black", colorBg: "#111827" },
      { name: "White", colorBg: "#F9FAFB" },
    ],
  },
];

export default function DiscountedProducts() {
  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24 lg:max-w-7xl lg:mx-auto lg:px-8">
        <div className="px-4 flex items-center justify-between sm:px-6 lg:px-0">
          <a
            href="#"
            className="inline-flex items-center text-sm text-gray-400 hover:text-gray-700"
            style={{
              textDecoration: "underline",
            }}
          >
            <h2 className="text-[20px] tracking-tight text-gray-500">
              Discount Products And Services Coupen{" "}
            </h2>
          </a>
        </div>

        <div className="mt-8 relative">
          <div className="relative w-full pb-6 -mb-6 overflow-x-auto">
            <ul
              role="list"
              className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:space-x-0 lg:grid lg:grid-cols-6 lg:gap-x-8"
            >
              {products.map((product) => (
                <li
                  key={product.id}
                  className="w-64 inline-flex flex-col text-center lg:w-auto"
                >
                  <div className="group relative bg-[#d7d7d7]">
                    <div className="w-full bg-gray-100 rounded-md overflow-hidden aspect-w-1 aspect-h-1">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                      />
                    </div>
                    <div className="mt-6">
                      <h3 className="mt-1 font-semibold text-gray-900">
                        <a href={product.href}>
                          <span className="absolute inset-0" />
                          {product.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-gray-900">{product.price}</p>
                    </div>
                    <div className="absolute top-0 left-0 z-10 p-1 bg-[#e77600] text-white text-[12px]">
                      {product.discount}% OFF
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
