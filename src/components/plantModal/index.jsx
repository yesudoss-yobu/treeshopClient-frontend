import { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEdit, usePost } from "../../query/query";
import io from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";

import {
  ModalContainer,
  ModalButton,
  UploadBox,
  ContainerBox,
} from "./plantmodal.styled";
import { Avatar } from "@mui/material";
import { treeActions } from "../../store/store";

const plantAddSchema = yup.object().shape({
  profile: yup.mixed().test("image required", "image required", (value) => {
    return value && value.length;
  }),
  name: yup.string().required("required"),
  sellerName: yup.string().required("required"),
  price: yup.string().required("required"),
  reviews: yup.string().required("required"),
  details: yup.string().required("required"),
  rating: yup.string().required("required"),
});

const PlantModal = ({ open, onClose, EditModal, EditIndex }) => {
  const imageData = useSelector((state) => state.tree.trees);

  const [image, setImage] = useState();
  const dispatch = useDispatch();

  const { mutate: plantMutate } = usePost("https://treeshop.onrender.com/info");
  const { mutate: EditPlant } = useEdit(
    "https://treeshop.onrender.com/info/update"
  );

  const queryClient = useQueryClient();

  // const fileResolver = (file, callback) => {
  //   let reader = new FileReader();
  //   let profile;
  //   reader.readAsDataURL(file);

  //   reader.onload = () => {
  //     // console.log("reader.result", reader.result);
  //     profile = reader.result;
  //     callback(profile);
  //   };
  // };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      sellerName: "",
      price: "",
      reviews: "",
      details: "",
      rating: "",
    },
    resolver: yupResolver(plantAddSchema),
  });

  useEffect(() => {
    if (EditModal) {
      let data = imageData[EditIndex];
      setImage(data.profile);
      setValue("profile", data.profile);
      setValue("name", data.name);
      setValue("sellerName", data.sellerName);
      setValue("price", data.price);
      setValue("reviews", data.reviews);
      setValue("details", data.details);
      setValue("rating", data.rating);
    }
  }, [EditModal, EditIndex]);

  const onsubmit = (data) => {
    // console.log("testProfile", test);
    dispatch(treeActions.updateLoader(true));
    var reader = new FileReader();
    if (!EditModal) {
      reader.readAsDataURL(data.profile[0]);
      reader.onload = () => {
        plantMutate(
          { ...data, _id: Math.random(), profile: reader.result },
          {
            onSuccess: async () => {
              await queryClient.invalidateQueries({ queryKey: ["totalData"] });
              dispatch(treeActions.updateLoader(false));
            },
          }
        );
      };
    } else {
      let editProfile = data.profile;
      if (typeof data.profile !== "string") {
        reader.readAsDataURL(data.profile[0]);
        reader.onload = () => {
          EditPlant(
            {
              ...data,
              _id: imageData[EditIndex]._id,
              profile: reader.result,
            },
            {
              onSuccess: async () => {
                await queryClient.invalidateQueries({
                  queryKey: ["totalData"],
                });
                dispatch(treeActions.updateLoader(false));
              },
            }
          );
        };
      } else {
        EditPlant(
          {
            ...data,
            _id: imageData[EditIndex]._id,
            profile: editProfile,
          },
          {
            onSuccess: async () => {
              await queryClient.invalidateQueries({ queryKey: ["totalData"] });
              dispatch(treeActions.updateLoader(false));
            },
          }
        );
      }
    }

    onClose();
    setImage("");
    reset();
  };

  // const socket = io("http://localhost:5000");
  // const queryClient = useQueryClient();

  // socket.on("connect", () => {
  //   console.log("connected to socket.io server");
  // });

  // socket.on("message", (data) => {
  //   console.log("ReceivedData", data);
  //   queryClient.setQueryData(["totalData"], { data });
  // });

  // const requestHandler = () => {
  //   socket.emit("requestData");
  // };

  return (
    <ModalContainer
      onClose={() => {
        onClose();
        setImage("");
        reset();
      }}
      open={open}
    >
      <form onSubmit={handleSubmit(onsubmit)}>
        <ContainerBox>
          <UploadBox>
            <ModalButton variant="contained" component="label">
              Upload
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                {...register("profile", {
                  onChange: (e) => {
                    var reader = new FileReader();
                    reader.readAsDataURL(e.target.files?.[0]);
                    reader.onload = function () {
                      setImage(reader.result);
                    };
                  },
                })}
              />
            </ModalButton>
            <Avatar
              src={image}
              alt="plant"
              sx={{ width: "7rem", height: "7rem" }}
            />
          </UploadBox>
          {errors.profile && <p>{errors.profile && errors.profile.message}</p>}
          <TextField
            size="small"
            placeholder="Plant Name"
            helperText={errors.name && errors.name.message}
            {...register("name")}
          />
          <TextField
            size="small"
            placeholder="Seller Name"
            helperText={errors.sellerName && errors.sellerName.message}
            {...register("sellerName")}
          />
          <TextField
            size="small"
            placeholder="Price in ₹"
            type="number"
            helperText={errors.price && errors.price.message}
            {...register("price")}
          />
          <TextField
            size="small"
            placeholder="review"
            type="number"
            helperText={errors.reviews && errors.reviews.message}
            {...register("reviews")}
          />
          <TextField
            size="small"
            placeholder="Details"
            {...register("details")}
            helperText={errors.details && errors.details.message}
          />
          <TextField
            size="small"
            placeholder="rating out of 10"
            type="number"
            helperText={errors.rating && errors.rating.message}
            {...register("rating")}
          />

          {!EditModal && (
            <ModalButton type="submit" variant="contained">
              Add Plant
            </ModalButton>
          )}
          {EditModal && (
            <ModalButton type="submit" variant="contained">
              Edit plant
            </ModalButton>
          )}
        </ContainerBox>
      </form>
    </ModalContainer>
  );
};

export default PlantModal;
