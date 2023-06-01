import React, { useEffect, useState } from "react";
import PlantModal from "../plantModal";
import { useDelete, useTotalGet } from "../../query/query";
import io from "socket.io-client";
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
import Loader from "../loader";

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
import { useQueryClient } from "@tanstack/react-query";
import { red } from "@mui/material/colors";

const Dashboard = () => {
  const ImageData = useSelector((state) => state.tree.trees);
  const loader = useSelector((state) => state.tree.loader);
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [editModal, seteditModal] = useState(false);
  const [editIndex, seteditIndex] = useState();
  const dispatch = useDispatch();
  const { mutate: deletePlant } = useDelete(
    "https://treeshop.onrender.com/info/del"
  );

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

  // const getAllData = () => {
  //   axios.get("https://treeshop.onrender.com/info").then((res) => {
  //     console.log("response", res);
  //     setDbData(res.data);
  //     dispatch(treeActions.storePlant(res.data));
  //     setLoading(false);
  //   });
  // };

  const {
    data: plantData,
    isLoading,
    isFetching,
    isStale,
    isRefetching,
    refetch,
  } = useTotalGet("https://treeshop.onrender.com/info");

  // console.log(plantData);

  // const socket = io("http://localhost:5000");
  // const queryClient = useQueryClient();

  // socket.on("connect", () => {
  //   console.log("connected to socket.io server");
  // });

  // socket.on("message", (data) => {
  //   console.log("ReceivedData", data);
  //   queryClient.setQueryData(["totalData"], { data });
  // });

  // const requestHandler = async () => {
  //   socket.emit("requestData");
  // };

  useEffect(() => {
    if (plantData) {
      dispatch(treeActions.storePlant(plantData.data));
    }
  }, [plantData]);

  useEffect(() => {
    dispatch(treeActions.updateLoader(isLoading));
  }, [isLoading]);

  return (
    <Box>
      {loader && <Loader />}
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
        </IconBox>
      </HeaderBox>
      {/* {isLoading && <Typography>Loading...</Typography>} */}
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
                  onClick={() => {
                    dispatch(treeActions.updateLoader(true));
                    const id = ImageData[index]._id;
                    deletePlant(id, {
                      onSuccess: async () => {
                        await refetch();
                        dispatch(treeActions.updateLoader(false));
                      },
                    });
                  }}
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
