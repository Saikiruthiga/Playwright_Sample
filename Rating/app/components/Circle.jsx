import { Box } from "@mui/material";
const Circle = ({ value }) => {
  return (
    <Box
      sx={{
        borderRadius: "50%",
        backgroundColor: "#1b1e22",
        width: "50px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
          background: "#fff",
        },
      }}
    >
      {value}
    </Box>
  );
};
export default Circle;
