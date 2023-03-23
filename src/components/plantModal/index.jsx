import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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
    var reader = new FileReader();
    if (!EditModal) {
      reader.readAsDataURL(data.profile[0]);
      reader.onload = function () {
        dispatch(
          treeActions.Addplant({
            ...data,
            id: Math.random(),
            profile: reader.result,
          })
        );
      };
    } else {
      let editProfile = data.profile;
      if (typeof data.profile !== "string") {
        reader.readAsDataURL(data.profile[0]);
        reader.onload = () => {
          // editProfile = reader.result;
          dispatch(
            treeActions.EditPlant({
              index: EditIndex,
              data: {
                ...data,
                id: imageData[EditIndex].id,
                profile: reader.result,
              },
            })
          );
        };
      } else {
        dispatch(
          treeActions.EditPlant({
            index: EditIndex,
            data: {
              ...data,
              id: imageData[EditIndex].id,
              profile: editProfile,
            },
          })
        );
      }
    }

    // console.log(data.profile[0])
    // console.log({ ...data, id: Math.random(), profile: data.profile[0] });

    onClose();
    setImage("");
    reset();
  };

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
