import { SVGProps } from "react";
import Logo from "/public/assets/cityshoppa.png";
import Image from "next/image";
import PinDropIcon from "@mui/icons-material/PinDrop";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CallIcon from "@mui/icons-material/Call";

export default function Footer() {
  return (
    <footer className="bg-black" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-8xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Image
              className="block lg:h-10 w-auto mb-10 sm:h-4"
              src={Logo}
              alt="hero"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h3 className="text-4xl font-semibold text-white tracking-wider uppercase">
              Shop Locally
            </h3>
            <button
              type="button"
              className="mt-4 px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white"
              style={{ backgroundColor: "#f85606" }}
            >
              <span className="ml-2">Find a Store</span>
            </button>
          </div>
        </div>
        <div
          className="footerCon"
        >
          <div className="listCon">
            <ul
              role="list"
              className="linksCon"
              style={{ display: "flex", flexDirection: "column"}}
            >
              <li>
              <a href="#" className="text-1xl text-white hover:text-gray-300">
                Want to do business?
              </a>
              </li>
              <li>
                <a href="#" className="text-1xl text-white hover:text-gray-300">
                  Cant find your business here?
                </a>
              </li>
              <li>
                <a href="#" className="text-1xl text-white hover:text-gray-300">
                  Become our partner
                </a>
              </li>
            </ul>
          </div>
          <div className="addressCon">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <PinDropIcon
                style={{
                  color: "#f85606",
                  fontSize: "1.5rem",
                  marginRight: "5px",
                }}
              />
              <p className="text-1xl text-white">
                1234, 5th Avenue, New York, NY 10001
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <MailOutlineIcon
                style={{
                  color: "#f85606",
                  fontSize: "1.5rem",
                  marginRight: "5px",
                }}
              />
              <p className="text-1xl text-white">contact@cityshoppa.com</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <CallIcon
                style={{
                  color: "#f85606",
                  fontSize: "1.5rem",
                  marginRight: "5px",
                }}
              />
              <p className="text-1xl text-white">+1 234 567 890</p>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-400 pt-8">
          <p className="text-base text-gray-400">
            &copy; 2023 CityShoppa. All rights reserved. Privacy Policy | Terms
            Of Use
          </p>
        </div>
      </div>
    </footer>
  );
}
