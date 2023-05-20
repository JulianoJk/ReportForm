import React, { useContext, useReducer, useState } from "react";

const defaultState = {
  errorAlertMessage: "",
  isSessionExpired: false,
  isUserLogged: false,
  userInfo: {
    username: "",
    email: "",
    role: "",
    iat: "",
  },
  userToken: "",
};

const ApplicationState = React.createContext(undefined);

ApplicationState.displayName = "ApplicationState";
const ApplicationDispatch = React.createContext(undefined);

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_ERROR_ALERT_MESSAGE":
      return { ...state, errorAlertMessage: action.errorAlertMessage };
    case "SET_SESSION_TOKEN_EXPIRED":
      return { ...state, isSessionExpired: action.isSessionExpired };
    case "SET_USER_LOGGED":
      return { ...state, isUserLogged: action.isUserLogged };
    case "RESET_ERROR_MESSAGE":
      return { ...state, errorAlertMessage: "" };
    case "SET_USER_INFO":
      return { ...state, userInfo: action.userInfo };
    case "SET_USER_TOKEN":
      return { ...state, userToken: action.userToken };
    case "RESET":
      return defaultState;
    default:
      return;
  }
};
const AppContextProvider = ({ children }) => {
  const [useAppState, appDispatch] = useReducer(appReducer, defaultState);

  return (
    <ApplicationState.Provider value={useAppState}>
      <ApplicationDispatch.Provider value={appDispatch}>
        {children}
      </ApplicationDispatch.Provider>
    </ApplicationState.Provider>
  );
};
const useAppState = () => {
  const context = useContext(ApplicationState);
  if (context === undefined) {
    throw new Error("useAppState must be used within useAppStateContext");
  }
  return context;
};

const useAppDispatch = () => {
  const context = useContext(ApplicationDispatch);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within AppDispatchContext");
  }
  return context;
};

export { AppContextProvider, useAppState, useAppDispatch };
