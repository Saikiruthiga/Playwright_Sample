"use client";
import { Box, Button, Typography } from "@mui/material";
import Circle from "./components/Circle";
import { useState } from "react";
import Acknowledgement from "./components/Acknowledment";

export default function Home() {
  const numbers = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(null);
  const [ack, setAck] = useState(false);
  const handleSubmit = () => {
    if (rating) {
      setAck(true);
    }
  };

  const handleClick = (number) => {
    setRating(number);
  };

  return (
    <Box
      sx={{
        backgroundColor: "hsl(216, 12%, 8%)",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {ack ? (
        <Acknowledgement number={rating} />
      ) : (
        <Box
          sx={{
            background: "linear-gradient(to bottom, #2c3338, #1b1e22)",
            width: "450px",
            height: "450px",
            borderRadius: "25px",
            display: "flex",
            paddingLeft: "1.5%",
            paddingTop: "2%",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          <Circle
            value={
              <svg width="17" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m9.067.43 1.99 4.031c.112.228.33.386.58.422l4.45.647a.772.772 0 0 1 .427 1.316l-3.22 3.138a.773.773 0 0 0-.222.683l.76 4.431a.772.772 0 0 1-1.12.813l-3.98-2.092a.773.773 0 0 0-.718 0l-3.98 2.092a.772.772 0 0 1-1.119-.813l.76-4.431a.77.77 0 0 0-.222-.683L.233 6.846A.772.772 0 0 1 .661 5.53l4.449-.647a.772.772 0 0 0 .58-.422L7.68.43a.774.774 0 0 1 1.387 0Z"
                  fill="#FC7614"
                />
              </svg>
            }
          />
          <Typography
            variant="h6"
            color="#f5f5f5"
            sx={{ fontWeight: "bold", fontSize: "25px" }}
          >
            How did we do ?
          </Typography>
          <Typography
            sx={{
              color: "rgba(242, 240, 239, 0.5)",
              marginTop: "-7px",
              fontSize: "18x",
              display: "flex",
            }}
          >
            Please let us know how we did with your support request. All
            feedback is appreciated to help us improve our offering!
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              marginLeft: "-15px",
            }} data-testid="rating-circles"
          >
            {numbers.map((number, index) => (
              <Circle
                key={index}
                value={
                  <Box
                    sx={{
                      color:
                        rating === number
                          ? "#000000"
                          : "rgba(242, 240, 239, 0.5)",

                      backgroundColor:
                        rating === number ? "#FC7614" : "transparent",
                      "&:hover": {
                        backgroundColor: "#FFFFFF",
                        color: "#000000",
                      },
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => handleClick(number)}
                  >
                    {number}
                  </Box>
                }
              />
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FC7614",
                width: "270px",
                borderRadius: "15px",
                color: "rgb(0,0,0,0.7)",
                fontWeight: "bold",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
