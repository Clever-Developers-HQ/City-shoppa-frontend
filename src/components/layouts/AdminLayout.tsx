
import { FaCity } from 'react-icons/fa';
import { BiCaptions, BiDonateBlood, BiCategory, BiUserCircle} from 'react-icons/bi';
import { BsFillStarFill} from 'react-icons/bs';
import {AiFillBell, AiOutlineSearch, AiOutlineHome} from 'react-icons/ai';
import {TbBrandAdobe} from 'react-icons/tb';
import {FiUsers} from 'react-icons/fi';
import {MdOutlineProductionQuantityLimits, MdOutlineRemoveShoppingCart, MdCancel, MdMenu} from 'react-icons/md';
import {RiShoppingBagFill, RiUserStarFill, RiUserShared2Line} from 'react-icons/ri';
import Image from 'next/image';
import Logo from '../../assets/images/city-shoppa-logo.png';
import NextLink from 'next/link';
import { logOutAction } from '@/redux/Features/auth/authLoginSlice';




import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'

const navigation = [ 
  { name: 'Dashboard', href: '/admin', icon: <AiOutlineHome size={20}/>,  current: false},
  { name: 'Captions', href: '/admin/captions', icon: <BiCaptions size={20}/>,  current: false },
  { name: 'Cities', href: '/admin/cities', icon: <FaCity size='20' />, current: false },
  { name: 'Features', href: '/admin/features', icon: <BsFillStarFill size='20'/>, current: false },
  { name: 'Donation', href: '/admin/donation', icon: <BiDonateBlood size='20'/>, current: false },
  { name: 'Brands', href: '/admin/brands', icon: <TbBrandAdobe size='20'/>, current: false },
  { name: 'Categories', href: '/admin/categories', icon: <BiCategory size='20'/>,  current: false },
  { name: 'Merchants', href: '/admin/merchants', icon: <RiUserStarFill size='20'/>,  current: false },
  { name: 'Pending Merchant Applications', href: '/admin/pending_merchants', icon: <RiUserShared2Line size='20'/>,  current: false },
  { name: 'Users', href: '/admin/users', icon: <FiUsers size='20'/>,  current: false },
  { name: 'Products', href: '/admin/products', icon: <MdOutlineProductionQuantityLimits size='20'/>,  current: false },
  { name: 'Completed Orders', href: '/admin/completed-orders', icon: <RiShoppingBagFill size='20'/>,  current: false },
  { name: 'Uncompleted Orders', href: '/admin/uncompleted-orders', icon: <MdOutlineRemoveShoppingCart size='20'/>,  current: false },
]
const userNavigation = [
  { name: 'Sign out', href: '#' },
]

function classNames(...classes : any) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminLayout({children, title}: any) {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeScreen, setActiveScreen] = useState(false)

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-primary">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <MdCancel
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                        size="20"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                    <Image
                        className="h-8 w-auto"
                        src={Logo}
                        width = '200'
                        alt='City Shoppa'
                    />  
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <NextLink
                      onClick={() => item.current === true}
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-orange',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                      >
                        <div
                        className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300" aria-hidden="true"
                        >
                            {item.icon}
                        </div>
              
                        {item.name}
                      </NextLink>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
          
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow pt-5 bg-primary overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
            <Image
              className="h-8 w-auto"
                src={Logo}
                width = '200'
                alt='City Shoppa'
                    />  
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item) => (
                  <NextLink
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-orange active:text-black',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <span
                    className="mr-3 " aria-hidden="true"
                    >
                    {item.icon}
                    </span>
                    {item.name}
                  </NextLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MdMenu
                className="h-6 w-6 text-gray-500"
                aria-hidden="true"
                size="20"
              />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <AiOutlineSearch 
                        className="h-5 w-5"
                        aria-hidden="true"
                        size="20"
                      />

                    </div>
                    <input
                      id="search-field"
                      className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                      placeholder="Search for entry, "
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <AiFillBell 
                    className="h-6 w-6 text-gray-500"
                    aria-hidden="true"
                    size="20"
                  />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <BiUserCircle
                        className="h-8 w-8 rounded-full text-gray-500"
                        aria-hidden="true"
                        size="20"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right cursor-pointer absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <span
                             onClick = {() => logOutAction()}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700 '
                              )}
                            >
                              {item.name}
                            </span>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main>
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-10">
                  {children}
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

