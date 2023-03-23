import { Box, styled, Dialog, Button, TextField } from "@mui/material";

export const ContainerBox = styled(Box)(({}) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
}));

export const ModalContainer = styled(Dialog)(({}) => ({
  ".MuiPaper-root": {
    padding: "4rem 4rem",
    width: "20rem",
    background: "#ffffffe0",
  },
}));

export const ModalInput = styled(TextField)(({}) => ({}));

export const ModalButton = styled(Button)(({}) => ({
  width: "fit-content",
}));

export const UploadBox = styled(Box)(({}) => ({
  display: "flex",
  justifyContent: "right",
  gap: "2rem",
  alignItems: "center",
}));
