import React, { useEffect, useState } from "react";
import PlantModal from "../plantModal";
import axios from "axios";

import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Popover,
  Typography,
  Badge,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Switch,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import treeshoplogo from "../../assets/treeshoplogo.jpg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import {
  HeaderBox,
  BodyBox,
  Logo,
  IconBox,
  CartIcon,
  AdminIcon,
  PlusIcon,
  MinusIcon,
  CartBatch,
  CartActions,
  BuyActions,
  CartIconBox,
  PopoverList,
} from "./dashboard.styled";
import { treeActions } from "../../store/store";

const Dashboard = () => {
  const ImageData = useSelector((state) => state.tree.trees);
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [editModal, seteditModal] = useState(false);
  const [editIndex, seteditIndex] = useState();
  const dispatch = useDispatch();
  const [dbData, setDbData] = useState([]);
  const [loading, setLoading] = useState(true);
  const FilteredArray = ImageData?.filter((val) =>
    val.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  // console.log(ImageData);

  const getAllData = () => {
    axios.get("http://localhost:5000/info").then((res) => {
      console.log("response", res);
      setDbData(res.data);
      dispatch(treeActions.storePlant(res.data));
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllData();
  }, []);

  // test data
  const getRedirect = () => {
    axios.get("http://localhost:5000/info/redirect").then((res) => {
      console.log("res", res);
    });
  };

  return (
    <Box>
      <HeaderBox>
        <Logo src={treeshoplogo} alt="" />
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          placeholder="Search here what ever you want...."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <IconBox>
          <CartBatch badgeContent={3} color="primary">
            <CartIcon />
          </CartBatch>
          <AdminIcon onClick={handleClick} />

          <Popover
            id="hello"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <PopoverList sx={{ p: 2 }}>
              Edit delete
              <Switch
                checked={toggle}
                onChange={() => {
                  setToggle(!toggle);
                  setTimeout(() => {
                    handleClose();
                  }, 200);
                }}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </PopoverList>
            <PopoverList
              onClick={() => {
                setModalOpen(true);
                handleClose();
              }}
              sx={{ p: 2 }}
            >
              Add new plants
            </PopoverList>
            <PopoverList sx={{ p: 2, cursor: "not-allowed" }}>
              Advanced
            </PopoverList>
          </Popover>
          <Button onClick={getRedirect} variant="contained">
            {" "}
            Redirect
          </Button>
        </IconBox>
      </HeaderBox>
      {loading && <Typography>Loading...</Typography>}
      <BodyBox>
        {FilteredArray?.map((data, index) => (
          <Card key={data._id} sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={data.profile}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.details}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CartActions>
              <Button variant="contained" size="small" color="primary">
                Add to cart
              </Button>
              <CartIconBox>
                <MinusIcon />
                <CartIcon />
                <PlusIcon />
              </CartIconBox>
            </CartActions>
            <BuyActions>
              <Typography variant="body2" color="text.secondary">
                Price :₹{data.price}
              </Typography>
              <Button variant="contained" size="small" color="primary">
                Buy
              </Button>
            </BuyActions>

            {toggle && (
              <BuyActions>
                <Button
                  onClick={() => {
                    seteditModal(true);
                    setModalOpen(true);
                    seteditIndex(index);
                  }}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => dispatch(treeActions.DeletePlant(index))}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Delete
                </Button>
              </BuyActions>
            )}
          </Card>
        ))}
      </BodyBox>
      <PlantModal
        EditIndex={editIndex}
        EditModal={editModal}
        open={ModalOpen}
        onClose={() => {
          setModalOpen(false);
          if (editModal) {
            seteditModal(false);
            seteditIndex("");
          }
        }}
      />
    </Box>
  );
};

export default Dashboard;
