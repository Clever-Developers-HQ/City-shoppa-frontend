import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { userAuthenticateToken } from '../Utils/TokenAuthentication';
import { createOrderAction } from '@/redux/Features/order/createOrderSlice';
import { showSuccess, showError, showWarning } from "@/components/Utils/AlertMsg";
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "@/redux/store";
import { formatPhoneNumber } from '../Utils/utilFuncs';
import { unwrapResult } from '@reduxjs/toolkit';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

interface SellerData {
  merchant: any
  quantity: number
  discounted_productId: string
  isCheckout: boolean
  setIsCheckout: any
  setShowLoginModal: any
  products: string
  merchant_id: string
  discountedmerchant_id: string
}

export default function SellerModal({ merchant,  discountedmerchant_id,  merchant_id, setShowLoginModal, products,  quantity, discounted_productId, isCheckout, setIsCheckout }: SellerData) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  const [user, setUser] = useState<any>()
  const [showUserDetails, setShowUserDetails] = useState(false)
  const [coupon, setCoupon] = useState("")
  const [placeOrder, setPlaceOrder] = useState(false)

  console.log(coupon, "THE COUPON")


  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (isCheckout) {
      // update the state or dispatch an action here
      const token = localStorage.getItem('token');

      setUser(userAuthenticateToken())

          if (!token){
            setPlaceOrder(false)
            showWarning("Please Login to continue shopping on CityShoppa");
            setShowLoginModal(true);
            setIsCheckout(false);
            return
          }

            if (!discounted_productId){
              setIsCheckout(false);
              setPlaceOrder(false)
              showWarning("Kindly select your discounted product offer to continue")
              return
            }

            setPlaceOrder(true)

            if (placeOrder) {
              placeOrderNow()
            }

            console.log(products,  quantity, discounted_productId, "details wey enter")
    }
    // setPlaceOrder(false)

  }, [isCheckout, placeOrder])


  const placeOrderNow = () =>{

      if (!coupon) {
        showSuccess("Order Processing...Please wait")
        dispatch(createOrderAction({userId : user.id,  discountedmerchant_id,  merchant_id, token: user.token,  products, discounted_productId: discounted_productId, quantity }))
          .then(unwrapResult)
          .then((response: any) => {
            console.log(response, "FROM ORDER CREATED")
            if (response.cart) {
              showSuccess("Order Created Successfully")
              setCoupon(response?.cart.couponIds)
            }
            setPlaceOrder(false)
            setShowUserDetails(true);
            setIsCheckout(false);
            return
          })
          .catch((err: any) => {
            showError("Something went wrong. Please try again")
            setPlaceOrder(false)
            setShowUserDetails(false);
            setIsCheckout(false);
            return
          })
          .finally(() => {
            setPlaceOrder(false)
            setIsCheckout(false);
            return
          })
      } 

      if(coupon) {
        setPlaceOrder(false)
        setIsCheckout(false);
        setShowUserDetails(true);
        return
      }
  }
   



  const modalCloseHandler = () => {
    setShowUserDetails(false);
    setOpen(false);
    setPlaceOrder(false)
  }

  return (
    <div>
      <Button onClick={handleOpen} style={{
        backgroundColor: "#e77600",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        outline: "none",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "1px",
        marginTop: '25px'
      }}>Visit & contact seller to buy now </Button>

      {
        showUserDetails && (
          <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h2" style={{
              color: "#000",
              fontSize: "20px",
              textAlign: 'center',
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "10px",
              fontWeight: 'bold'
            }}>
              Merchant Details
            </Typography>
            <CancelOutlinedIcon
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                fontSize: "30px",
                color: "#000"
              }}
              onClick={() => modalCloseHandler()}
            />
            <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: '100%',
  
            }}>
              <Box>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{
                  color: "#000",
                  fontSize: "15px",
                  letterSpacing: "1px",
                }}
                >
                  Name
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{
                  color: "#000",
                  fontSize: "15px",
                  letterSpacing: "1px",
                }}
                >
                  Address
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{
                  color: "#000",
                  fontSize: "15px",
                  letterSpacing: "1px",
                }}
                >
                  Phone Number
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{
                  color: "#000",
                  fontSize: "15px",
                  letterSpacing: "1px",
                }}
                >
                  Email
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{
                  color: "#000",
                  fontSize: "15px",
                  letterSpacing: "1px",
                }}
                >
                  Website
                </Typography>

                <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{
                  color: "#000",
                  fontSize: "15px",
                  letterSpacing: "1px",
                }}
                >
                 Coupon
                </Typography>
              </Box>
              <Box>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{
                  color: "#000",
                  fontSize: "15px",
                  letterSpacing: "1px",
                }}
                >
                  {merchant?.name}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{
                  color: "#F85606",
                  fontSize: "15px",
                  letterSpacing: "1px",
                }}
                >
                  {merchant?.address}
                </Typography>
                <Link
                  href="tel:88787124334"
                  passHref
                >
                  <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{
                    color: "#000",
                    fontSize: "15px",
                    letterSpacing: "1px",
                  }}
                  >
                    {formatPhoneNumber(merchant?.phone) || "Not Available"}
                  </Typography>
                </Link>
                <a href={`mailto:${merchant?.email}`}>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{
                    color: "#000",
                    fontSize: "15px",
                    letterSpacing: "1px",
                  }}
                  >
                    {merchant?.email}
                  </Typography>
                </a>
                <a href={`https://${merchant?.website}`} target="_blank" >
                  <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{
                    // color: "#000",
                    fontSize: "15px",
                    letterSpacing: "1px",
                  }}
                  >
                    {merchant?.website}
                  </Typography>
                </a>

                <p className="px-3 text-center text-[15px] py-1 bg-orange text-white font-bold w-1/2 mt-3 rounded
                ">
                  {coupon}
                </p>
              </Box>
            </Box>
          </Box>
        </Modal>
        )
      }

    </div>
  );
}