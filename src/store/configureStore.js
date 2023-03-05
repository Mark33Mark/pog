import { configureStore } from "@reduxjs/toolkit";
import toast from "./middleware/toast";
import api from "./middleware/api";
import reducer from "./reducer";

const configStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      toast,
      api,
    ],
  });
};

export default configStore;
