import { createSlice, configureStore } from "@reduxjs/toolkit";

import balsam from "../assets/balsam.jpeg";
import hibicus from "../assets/hibicus.jpg";
import insulin from "../assets/insulin.jpg";
import jasmine from "../assets/jasmine.jpg";
import lavendar from "../assets/lavendar.jpg";
import lilly from "../assets/lilly.jpeg";
import lotus from "../assets/lotus.jpg";
import marigold from "../assets/marigold.jpg";
import rose from "../assets/rose.jpg";

const initialState = {
  trees: [
    {
      id: "1",
      name: "Lilly plant",
      profile: lilly,
      price: "30",
      sellerName: "flipkart",
      rating: 4,
      reviews: 400,
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error assumenda possimus blanditiis qui? Blanditiis autem quia nisi, incidunt sint facere odit aperiam enim quisquam laboriosam aliquam, perspiciatis ea hic maiores!",
    },
    {
      id: "2",
      name: "Rose plant",
      profile: rose,
      price: "30",
      sellerName: "flipkart",
      rating: 4,
      reviews: 400,
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error assumenda possimus blanditiis qui? Blanditiis autem quia nisi, incidunt sint facere odit aperiam enim quisquam laboriosam aliquam, perspiciatis ea hic maiores!",
    },
    {
      id: "3",
      name: "Balsam plant",
      profile: balsam,
      price: "30",
      sellerName: "flipkart",
      rating: 4,
      reviews: 400,
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error assumenda possimus blanditiis qui? Blanditiis autem quia nisi, incidunt sint facere odit aperiam enim quisquam laboriosam aliquam, perspiciatis ea hic maiores!",
    },
    {
      id: "4",
      name: "Insulin plant",
      profile: insulin,
      price: "30",
      sellerName: "flipkart",
      rating: 4,
      reviews: 400,
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error assumenda possimus blanditiis qui? Blanditiis autem quia nisi, incidunt sint facere odit aperiam enim quisquam laboriosam aliquam, perspiciatis ea hic maiores!",
    },
    {
      id: "5",
      name: "Jasmine plant",
      profile: jasmine,
      price: "30",
      sellerName: "flipkart",
      rating: 4,
      reviews: 400,
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error assumenda possimus blanditiis qui? Blanditiis autem quia nisi, incidunt sint facere odit aperiam enim quisquam laboriosam aliquam, perspiciatis ea hic maiores!",
    },
    {
      id: "6",
      name: "Lotus plant",
      profile: lotus,
      price: "30",
      sellerName: "flipkart",
      rating: 4,
      reviews: 400,
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error assumenda possimus blanditiis qui? Blanditiis autem quia nisi, incidunt sint facere odit aperiam enim quisquam laboriosam aliquam, perspiciatis ea hic maiores!",
    },
    {
      id: "7",
      name: "Hibicus plant",
      profile: hibicus,
      price: "30",
      sellerName: "flipkart",
      rating: 4,
      reviews: 400,
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error assumenda possimus blanditiis qui? Blanditiis autem quia nisi, incidunt sint facere odit aperiam enim quisquam laboriosam aliquam, perspiciatis ea hic maiores!",
    },
    {
      id: "8",
      name: "Lavendar plant",
      profile: lavendar,
      price: "30",
      sellerName: "flipkart",
      rating: 4,
      reviews: 400,
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error assumenda possimus blanditiis qui? Blanditiis autem quia nisi, incidunt sint facere odit aperiam enim quisquam laboriosam aliquam, perspiciatis ea hic maiores!",
    },
    {
      id: "9",
      name: "Marigold plant",
      profile: marigold,
      price: "30",
      sellerName: "flipkart",
      rating: 4,
      reviews: 400,
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error assumenda possimus blanditiis qui? Blanditiis autem quia nisi, incidunt sint facere odit aperiam enim quisquam laboriosam aliquam, perspiciatis ea hic maiores!",
    },
  ],
  cart: [],
  testIndex: "",
};

export const treeSlice = createSlice({
  name: "trees",
  initialState,
  reducers: {
    Addplant: (state, action) => {
      state.trees = [...state.trees, action.payload];
    },
    DeletePlant: (state, action) => {
      // state.trees = [...state.trees.splice(action.payload, 1)];
      let deletelist = [...state.trees];
      deletelist.splice(action.payload, 1);
      state.trees = deletelist;
      // state.trees.splice(action.payload, 1);
    },
    EditPlant: (state, action) => {
      let EditList = [...state.trees];
      EditList[action.payload.index] = action.payload.data;
      state.trees = EditList;
    },

    AddIndex: (state, action) => {
      state.testIndex = action.payload;
    },
  },
});

export const treeActions = treeSlice.actions;

export const store = configureStore({
  reducer: {
    tree: treeSlice.reducer,
  },
});

