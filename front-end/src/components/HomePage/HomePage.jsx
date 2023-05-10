import React from "react";
import { HeaderMegaMenu } from "../Header/Header.jsx";
import { useAppState } from "../../context/AppContext";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { isUserLogged } = useAppState();
  const navigate = useNavigate();
  return (
    <>
      {isUserLogged ? (
        <>
          <HeaderMegaMenu></HeaderMegaMenu>
          <h1>Home Page</h1>
          <p>This is the home page</p>
        </>
      ) : (
        <>
        <HeaderMegaMenu></HeaderMegaMenu>

          <h1>Not logged</h1>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >Log in</Button>
        </>
      )}
    </>
  );
};
export default HomePage;
