import { styled, Box, Badge, CardActions, Typography } from "@mui/material";
import { height } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export const ContainerBox = styled(Box)({
  width: "100vw",
  height: "auto",
});
export const HeaderBox = styled(Box)({
  position: "sticky",
  top: "0",
  zIndex: "1",
  boxSizing: "border-box",
  background: "white",
  width: "100%",
  height: "5rem",
  //   background: "red",
  padding: "0 2rem",
  gap: "2rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const BodyBox = styled(Box)(({ theme }) => ({
  width: "100%",
  boxSizing: "border-box",
  justifyItems: "center",
  padding: "2rem 4rem",
  display: "grid",
  gridTemplateColumns: `repeat(4,1fr)`,
  // gridTemplateColumns: `repeat(auto-fit,minmax(200px,1fr))`,
  gap: "4rem 4rem",
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: `repeat(3,1fr)`,
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: `repeat(2,1fr)`,
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: `repeat(1,1fr)`,
  },
}));

export const IconBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
});

export const Logo = styled("img")({
  width: "auto",
  height: "100%",
  borderRadius: "60%",
  padding: "5px 0px",
  boxSizing: "border-box",
});

export const CartIcon = styled(ShoppingCartIcon)({
  color: "green",
  fontSize: "2rem",
  cursor: "pointer",
});

export const AdminIcon = styled(AdminPanelSettingsIcon)({
  color: "green",
  fontSize: "2rem",
  cursor: "pointer",
});

export const PlusIcon = styled(ControlPointIcon)({
  color: "green",
  fontSize: "2rem",
  cursor: "pointer",
});

export const MinusIcon = styled(RemoveCircleOutlineIcon)({
  color: "green",
  fontSize: "2rem",
  cursor: "pointer",
});

export const CartBatch = styled(Badge)({
  "& .MuiBadge-badge": {
    right: 1,
    top: 3,
    border: "2px solid white",
    padding: "4px 5px",
  },
});

export const CartActions = styled(CardActions)({
  display: "flex",
  justifyContent: "space-around",
  Box: {},
});
export const BuyActions = styled(CardActions)({
  display: "flex",
  justifyContent: "space-around",
});

export const CartIconBox = styled(Box)({
  display: "flex",
  gap: "0.5rem",
});

export const PopoverList = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "green",
  },
}));
