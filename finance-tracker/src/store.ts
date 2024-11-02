import { configureStore } from "@reduxjs/toolkit";
import isMobileSlice from "./slices/isMobile";
import popupSlice from "./slices/popupSlice";

export default configureStore({
  reducer: {
    isMobile: isMobileSlice,
    popup: popupSlice,
  },
});
