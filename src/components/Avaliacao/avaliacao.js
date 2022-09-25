import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { RiUserStarFill } from "react-icons/ri";
import "./avaliacao.css";

const labels = { 
  0: "N/A",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
};

const Avaliacao = ({valor, setValor, hover, setHover, avaliacaoAnterior, openModal}) => {  
  
  useEffect(() => {
    if (avaliacaoAnterior){
      setValor(avaliacaoAnterior)
    }else {
      setValor(0);
    }
  }, []);  

  useEffect(() => {
    getLabelText(avaliacaoAnterior);
    console.log("atessss", avaliacaoAnterior);
  }, [openModal]);

  function getLabelText(value) {    
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
    
  return (
    <div className="avaliacao">
      {valor !== null ? (
        <span style={{ fontSize: "35px", fontWeight: "bold" }}>
          {labels[hover !== -1 ? hover : valor]}
        </span>
      ) :
      <span style={{ fontSize: "35px", fontWeight: "bold" }}>0</span>}

      <Rating
        name="hover-feedback"
        value={valor}
        readOnly={false}
        precision={1}
        size="large"
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValor(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </div>
  );
};

export default Avaliacao;
