import { configureStore } from "@reduxjs/toolkit";
import isMobileSlice from "./slices/isMobileSlice";
import isLoadingReducer from "./slices/isLoadingSlice";
import errorsReducer from "./slices/errorsSlice";
import popupSlice from "./slices/popupSlice";

export default configureStore({
  reducer: {
    isLoading: isLoadingReducer,
    errors: errorsReducer,
    isMobile: isMobileSlice,
    popup: popupSlice,
  },
});
