import { styled } from "@mui/material";

export const StyledLoader = styled("div")(({}) => ({
  position: "fixed",
  width: "100%",
  height: "100%",
  background: " #00800085",
  zIndex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}));
