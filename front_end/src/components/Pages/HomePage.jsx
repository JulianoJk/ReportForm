import React from "react";
import { HeaderMegaMenu } from "../Header/Header.jsx";
import { useAppState } from "../../context/AppContext.jsx";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import SectionForm from "../IncidentReportForm/SectionForm.jsx";
const HomePage = () => {
  const { isUserLogged } = useAppState();
  const navigate = useNavigate();
  return (
    <>
      {isUserLogged ? (
        <>
          <HeaderMegaMenu></HeaderMegaMenu>
          <SectionForm />
        </>
      ) : (
        <>
          <HeaderMegaMenu></HeaderMegaMenu>

          <h1>Not logged</h1>
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </Button>
        </>
      )}
    </>
  );
};
export default HomePage;
