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
}

export default function SellerModal({ merchant,  setShowLoginModal,  quantity, discounted_productId, isCheckout, setIsCheckout }: SellerData) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  const [user, setUser] = useState<any>()
  const [showUserDetails, setShowUserDetails] = useState(false)



  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isCheckout) {
      const token = localStorage.getItem('token');
      //check if token is valid
      if (token) {
        setIsCheckout(false);
        setShowUserDetails(true);
      } else {
        setIsCheckout(false);
        setShowLoginModal(true);
        showWarning("Please Login to continue shopping on CityShoppa");
      }
    }
  }, [isCheckout, setShowLoginModal, setIsCheckout ]);

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
              onClick={handleClose}
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
                    {merchant?.phone || "Not Available"}
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
  
                <a href={`${merchant?.website}`} >
                  <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{
                    // color: "#000",
                    fontSize: "15px",
                    letterSpacing: "1px",
                  }}
                  >
                    {merchant?.website}
                  </Typography>
                </a>
              </Box>
            </Box>
          </Box>
        </Modal>
        )
      }

    </div>
  );
}