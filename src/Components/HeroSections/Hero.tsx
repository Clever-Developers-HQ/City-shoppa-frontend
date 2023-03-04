/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import HeroImage from "assets/hero.png";
import { Grid, Container, Typography, Box } from "@mui/material";

export default function Hero() {
  const style = {
    textStyle: {
      fontSize: "1.1rem",
      color: "#000",
      padding: "0.9rem",
      marginLeft: "1rem",
      cursor: "pointer",
      "&:hover": {
        background: "#fff",
        color: "#000",
      }
    },
  };
  return (
    <Grid
      container
      sx={{
        width: "100%",
        background: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          background: "#f5f5f5",
          width: "20%",
          height: "100%",
          marginTop: "1rem",
        }}
      >
        <Typography sx={style.textStyle}>Food</Typography>
        <Typography sx={style.textStyle}>Consumer Electronics</Typography>
        <Typography sx={style.textStyle}>Bags & Accessories</Typography>
        <Typography sx={style.textStyle}>Mens Wear</Typography>
        <Typography sx={style.textStyle}>Art & Craft</Typography>
        <Typography sx={style.textStyle}>Computer & Accessories</Typography>
        <Typography sx={style.textStyle}>Furniture</Typography>
        <Typography sx={style.textStyle}>Gardening Supplies</Typography>
        <Typography sx={style.textStyle}>Health & fitness</Typography>
        <Typography sx={style.textStyle}>Kids & Toys</Typography>
        <Typography sx={{
          ...style.textStyle,
          color: "#ff7235",
          fontWeight: "bold",
          fontSize: '1.2rem',
        }}>All Categories</Typography>
      </Box>
      <Image
        src={HeroImage}
        alt="hero"
        style={{
          height: "100%",
          width: "80%",
          objectFit: "cover",
        }}
      />
    </Grid>
  );
}
