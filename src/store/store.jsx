import { createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  trees: [],
  cart: [],
  testIndex: "",
};

export const treeSlice = createSlice({
  name: "trees",
  initialState,
  reducers: {
    Addplant: (state, action) => {
      state.trees = [...state.trees, action.payload];
      axios.post("https://treeshop.onrender.com/info", action.payload);
    },
    DeletePlant: (state, action) => {
      axios.delete(
        `https://treeshop.onrender.com/info/del/${
          [...state.trees][action.payload]._id
        }`
      );
      // state.trees = [...state.trees.splice(action.payload, 1)];
      let deletelist = [...state.trees];
      deletelist.splice(action.payload, 1);
      state.trees = deletelist;
      // state.trees.splice(action.payload, 1);
    },
    EditPlant: (state, action) => {
      axios.put(
        `https://treeshop.onrender.com/info/update/${
          [...state.trees][action.payload.index]._id
        }`,
        action.payload.data
      );
      let EditList = [...state.trees];
      EditList[action.payload.index] = action.payload.data;
      state.trees = EditList;
    },

    AddIndex: (state, action) => {
      state.testIndex = action.payload;
    },

    storePlant: (state, action) => {
      state.trees = action.payload;
    },
  },
});

export const treeActions = treeSlice.actions;

export const store = configureStore({
  reducer: {
    tree: treeSlice.reducer,
  },
});
