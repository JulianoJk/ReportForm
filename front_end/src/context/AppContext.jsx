import React, { useContext, useReducer } from "react";

const defaultState = {
  errorAlertMessage: "",
  isSessionExpired: false,
  isUserLogged: false,
  userInfo: {
    username: "",
    email: "",
    role: "",
    token: "",
  },
};
const ApplicationState = React.createContext(undefined);

ApplicationState.displayName = "ApplicationState";
const ApplicationDispatch = React.createContext(undefined);

// Reducer function
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
    default:
      return;
  }
};
// Context Provider for the user
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
// Pass the state of the user
const useAppState = () => {
  const context = useContext(ApplicationState);
  if (context === undefined) {
    throw new Error("useAppState must be used within useAppStateContext");
  }
  return context;
};

// Function to use the userDispatch
const useAppDispatch = () => {
  const context = useContext(ApplicationDispatch);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within AppDispatchContext");
  }
  return context;
};

export { AppContextProvider, useAppState, useAppDispatch };
