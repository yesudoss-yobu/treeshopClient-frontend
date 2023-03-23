import { styled, Box } from "@mui/material";
import { borderRadius } from "@mui/system";
import treeshop from "../../../src/assets/treeshop.jpeg";

export const Container = styled(Box)({
  width: "100vw",
  height: "100vh",
  // overflow: "hidden",
  backgroundImage: `url(${treeshop})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const BackgroundImage = styled("img")({
  width: "100%",
  height: "100%",
});

export const FormBox = styled(Box)({
  width: "25rem",
  height: "17rem",
  background: "rgba(225,225,225,0.3)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1.5rem",
  borderRadius: "2rem",
});
