import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StartIcon from "@mui/icons-material/Start";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default function NavModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const styles = {
    activeButton: {
      background:
        "radial-gradient(65.28% 65.28% at 26.39% 20.83%, rgba(255, 255, 255, 0.413) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%), #FF7235",
      width: "6rem",
      height: "2.5rem",
      borderRadius: "0rem",
      border: "none",
      padding: "0.rem 1.7rem",
      fontSize: "0.8rem",
      lineHeight: "1.5rem",
      textAlign: "center",
      color: "#fff",
      marginRight: "1rem",
      cursor: "pointer",
      "&:hover": {
        background:
        "radial-gradient(65.28% 65.28% at 26.39% 20.83%, rgba(255, 255, 255, 0.413) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%), #FF7235",
        width: "6rem",
        height: "2.25rem",
        borderRadius: "0rem",
        border: "none",
        padding: "0.rem 1.7rem",
        fontSize: "0.8rem",
        lineHeight: "1.5rem",
        textAlign: "center",
        color: "#fff",
        cursor: "pointer",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <MenuIcon sx={{ color: "#fff", fontSize: "30px" }} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Button type="button" variant="contained" sx={styles.activeButton}>
              Sign in
            </Button>
            <Button type="button" variant="contained" sx={styles.activeButton}>
              Sign up
            </Button>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                mt: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FavoriteBorderIcon sx={{ fontSize: "30px", mr: 0.5 }} />
                <Typography sx={{ fontSize: "30px", textAlign: "center" }}>
                  $500
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "18px" }}>
                Donated To Charity
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Button
              sx={{
                fontSize: "18px",
                textAlign: "center",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              All Categories
            </Button>
            <StartIcon
              sx={{
                fontSize: "30px",
                color: "#000",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
