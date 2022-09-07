import React from "react";
import Styles from "./Luxury.module.css";
import {
  FaShoppingCart,
  FaRegBookmark,
  FaStar,
  FaFireAlt,
} from "react-icons/fa";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { AiOutlineHeart } from "react-icons/ai";
import "./index.css";
import { encryptId } from "../../utils/cryptoUtils";
import { useNavigate } from "react-router-dom";

const Cards = ({ anuncios }) => {
  const navigate = useNavigate();

  return (
    <div className={Styles.luxury}>
      <div className={Styles.container}>
        {anuncios.map((anuncio, index) => (
          <div
            key={anuncio.idAnuncio}
            className="productCard"
            onClick={() =>
              navigate(
                `/detalhes/${anuncio.tituloAnuncio}/${encryptId(
                  String(anuncio.idAnuncio)
                )}`
              )
            }
          >
            <img
              src={anuncio.urlImagemAnuncio}
              alt="product-img"
              className="productImage"
            ></img>

            <AiOutlineHeart
              className={"productCard__cart"}
              onClick={() => alert("foi no coração")}
            />
            {/* <FaRegBookmark className={"productCard__wishlist"} />
            <FaFireAlt className={"productCard__fastSelling"} /> */}

            <div className="productCard__content">
              <h3
                className="productName"
                style={{
                  whiteSspace: "pre-wrap",
                  overflowWrap: "break-word",
                  maxWidth: "240px",
                }}
              >
                {anuncio.tituloAnuncio}
              </h3>
              <div className="displayStack__1">
                <div className="productPrice">
                  R${anuncio.valorServicoAnuncio}/{anuncio.horasServicoAnuncio}{" "}
                  {anuncio.valorServicoAnuncio > 1 ? "Horas" : "Hora"}
                </div>
                <div className="productSales">
                  {anuncio.totalSales} units sold
                </div>
              </div>
              <div className="displayStack__2">
                <div className="productRating">
                  {/* {[...Array(anuncios.rating)].map((index) => (
                    <FaStar id={index + 1} key={index} />
                  ))} */}
                  <Rating
                    name="text-feedback"
                    value={0}
                    readOnly
                    precision={0.5}
                    size="small"
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                </div>
                <div className="productTime">{anuncio.timeLeft} days left</div>
              </div>
              <input
                type="button"
                value="Ver Anúncio"
                className="btn"
                style={{ width: "100%", backgroundColor: "#ff6500", color: "#FFFFFF" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
