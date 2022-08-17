import "./loading.css";
import { Bars } from "react-loader-spinner";
import React from "react";
import Backdrop from "@mui/material/Backdrop";

const Loading = ({ carregando }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={carregando}
    >
      <Bars color="#00BFFF" height={80} width={80} />
    </Backdrop>
  );
};

export default Loading;
