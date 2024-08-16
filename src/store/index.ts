import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authApi from "./apis/authApi";
import userSlice from "./slices/userSlice";
import companyApi from "./apis/companyApi";
import jobApi from "./apis/jobApi";
import applicationApi from "./apis/applicationApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [
    authApi.reducerPath,
    companyApi.reducerPath,
    jobApi.reducerPath,
    applicationApi.reducerPath,
  ],
};

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [companyApi.reducerPath]: companyApi.reducer,
  [jobApi.reducerPath]: jobApi.reducer,
  [applicationApi.reducerPath]: applicationApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(companyApi.middleware)
      .concat(jobApi.middleware)
      .concat(applicationApi.middleware),
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
