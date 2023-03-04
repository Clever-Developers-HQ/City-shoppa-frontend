import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import beauty from "assets/beauty.png";
import Home from "assets/home.png";
import Mart from "assets/mart.png";
import Health from "assets/health.png";

const Categories = () => {
  return (
    <div
      style={{
        padding: "1rem",
        marginTop: "1rem",
        display: "flex",
        justifyContent: "center",
              alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <Grid spacing={2} display="flex" justifyContent="center">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem",
            borderRadius: "5rem",
            width: "15rem",
            background: "#ffb9b9",
            marginRight: "4rem",
            cursor: "pointer",
            "&:hover": {
              background: "#ff9a9a",
            },
          }}
        >
          <Image
            src={beauty}
            alt="hero"
            style={{
              width: "30px",
              height: "30px",
              marginRight: "0.5rem",
            }}
          />
          <Typography
            sx={{
              fontSize: "1.2rem",
            }}
          >
            Food
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem",
            borderRadius: "5rem",
            width: "15rem",
            background: "#ffde8b",
            marginRight: "4rem",
            cursor: "pointer",
            "&:hover": {
              background: "#ffde8b",
            },
          }}
        >
          <Image
            src={Home}
            alt="hero"
            style={{
              width: "30px",
              height: "30px",
              marginRight: "0.5rem",
            }}
          />
          <Typography
            sx={{
              fontSize: "1.2rem",
            }}
          >
            Home & Decor
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem",
            borderRadius: "5rem",
            width: "15rem",
            background: "#a1eeff",
            marginRight: "4rem",
            cursor: "pointer",
            "&:hover": {
              background: "#a1eeff",
            },
          }}
        >
          <Image
            src={Mart}
            alt="hero"
            style={{
              width: "30px",
              height: "30px",
              marginRight: "0.5rem",
            }}
          />
          <Typography
            sx={{
              fontSize: "1.2rem",
            }}
          >
            Mart
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem",
            borderRadius: "5rem",
            width: "15rem",
            background: "#bdebb6",
            marginRight: "4rem",
            cursor: "pointer",
            "&:hover": {
              background: "#bdebb6",
            },
          }}
        >
          <Image
            src={Health}
            alt="hero"
            style={{
              width: "30px",
              height: "30px",
              marginRight: "0.5rem",
            }}
          />
          <Typography
            sx={{
              fontSize: "1.2rem",
            }}
          >
            Health & Fitness
          </Typography>
        </Box>
      </Grid>
    </div>
  );
};

export default Categories;
