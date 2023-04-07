
const products = [
  {
    id: 1,
    name: "Zebronics ZEB-JUKE BAR DOLBY ",
    href: "#",
    price: "$599",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Zebronics ZEB-JUKE BAR DOLBY ",
    href: "#",
    price: "$599",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Zebronics ZEB-JUKE BAR DOLBY ",
    href: "#",
    price: "$599",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Zebronics ZEB-JUKE BAR DOLBY ",
    href: "#",
    price: "$599",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 5,
    name: "Zebronics ZEB-JUKE BAR DOLBY ",
    href: "#",
    price: "$48",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 6,
    name: "Zebronics ZEB-JUKE BAR DOLBY ",
    href: "#",
    price: "$599",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 7,
    name: "Zebronics ZEB-JUKE BAR DOLBY ",
    href: "#",
    price: "$599",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 8,
    name: "Zebronics ZEB-JUKE BAR DOLBY ",
    href: "#",
    price: "$599",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 9,
    name: "Zebronics ZEB-JUKE BAR DOLBY ",
    href: "#",
    price: "$599",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 10,
    name: "Zebronics ZEB-JUKE BAR DOLBY ",
    href: "#",
    price: "$599",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 11,
    name: "Zebronics ZEB-JUKE BAR DOLBY ",
    href: "#",
    price: "$599",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 12,
    name: "Zebronics ZEB-JUKE BAR DOLBY ",
    href: "#",
    price: "$599",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
];

export default function ProductsList() {
  return (
    <div className="bg-white mb-10">
      <div
        className="flex justify-between items-center"
        style={{
          height: "100px",
          width: "90%",
          margin: "auto",
        }}
      >
        <h1 className="text-2xl font-bold">Just For You</h1>
        <h2 className="text-1xl mr-10 text-white cursor-pointer hover: bg-orange p-2">SHOP MORE</h2>
      </div>
      <div className="max-w-2xl mx-auto py-5 px-4 bg-slate-100 sm:px-6 lg:max-w-7xl lg:px-4">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <div
                className="mt-4 flex justify-between"
                style={{ height: "100px" }}
              >
                <h3 className=" text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div
        className="flex justify-center items-center"
        style={{ height: "100px" }}
      >
        <button className="text-white px-4 py-2 rounded-md" style={{backgroundColor: "#f85606"}}>
          Load More
        </button>
      </div>
    </div>
  );
}
