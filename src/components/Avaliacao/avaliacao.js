import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  1: "Horrível",
  2: "Péssimo",
  3: "Mediano",
  4: "Bom",
  5: "Excelente",
};

const Avaliacao = () => {
  const [valor, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={valor}
        readOnly={false}
        precision={1}
        size="large"
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {valor !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : valor]}</Box>
      )}

      <Rating
        name="text-feedback"
        value={0}
        readOnly
        precision={0.5}
        size="large"
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </Box>
  );
};

export default Avaliacao;
