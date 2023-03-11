import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import beauty from "/public/assets/Beauty.png";
import Home from "/public/assets/Home.png";
import Mart from "/public/assets/Mart.png";
import Health from "/public/assets/Health.png";

const Categories = () => {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-2">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem",
            borderRadius: "5rem",
            background: "#ffb9b9",
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
            background: "#ffde8b",

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
            background: "#a1eeff",

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
            background: "#bdebb6",

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
      </div>
    </div>
  );
};

export default Categories;
