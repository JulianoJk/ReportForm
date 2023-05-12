import React from "react";
import { HeaderMegaMenu } from "../Header/Header.jsx";
import { useAppState } from "../../context/AppContext.jsx";
import { NotFound } from "../NotFound/NotFound.jsx";

const ManagerPage = () => {
  const { isUserLogged } = useAppState();
  return (
    <>
      {isUserLogged ? (
        <>
          <HeaderMegaMenu></HeaderMegaMenu>
          <h1>Manager Page</h1>
        </>
      ) : (
        <>
          <HeaderMegaMenu></HeaderMegaMenu>
          <NotFound></NotFound>
        </>
      )}
    </>
  );
};
export default ManagerPage;
