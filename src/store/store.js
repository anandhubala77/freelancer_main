import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH, // Import these action types
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import projectsReducer from "./slices/projectSlice";
import hireSlice from "./slices/hireSlice";
import jobReducer from "./slices/jobSlice";
import quotationReducer from "./slices/quotationSlice";
import applicationReducer from "./slices/applicationSlice";
import paymentReducer from "./slices/paymentSlice";
import adminProjectsReducer from "./slices/adminProjectSlice";
import adminUsersReducer from "./slices/adminUserSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
  hire: hireSlice,
  jobs: jobReducer,
  quotation: quotationReducer,
  application: applicationReducer,
  payment: paymentReducer,
  adminProjects: adminProjectsReducer,
  adminUsers: adminUsersReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist the auth slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
