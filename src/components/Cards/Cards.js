import React from "react";
import Styles from "./CardsContainer.module.css";
import {
  FaShoppingCart,
  FaRegBookmark,
  FaStar,
  FaFireAlt,
} from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { AiOutlineHeart } from "react-icons/ai";
import "./Cards.css";
import { encryptId } from "../../utils/cryptoUtils";
import { useNavigate } from "react-router-dom";

const Cards = ({ anuncios, anunciosFavoritos }) => {
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
            />

            {anunciosFavoritos.includes(anuncio.idAnuncio) && (
              <FcLike className="productCard__cart" />
            )}

            {/* <FaRegBookmark className={"productCard__wishlist"} />
            <FaFireAlt className={"productCard__fastSelling"} /> */}

            <div className="productCard__content">
              <div className="displayStack__1">
                <div className="productPrice">
                  R${anuncio.valorServicoAnuncio} /{" "}
                  {anuncio.horasServicoAnuncio}{" "}
                  {anuncio.horasServicoAnuncio > 1 ? "Horas" : "Hora"}
                </div>
                {/* <div className="productSales">
                  {anuncio.totalSales} units sold
                </div> */}
              </div>
              <div className="displayStack__2">
                <div className="productRating">
                  {/* {[...Array(anuncios.rating)].map((index) => (
                    <FaStar id={index + 1} key={index} />
                  ))} */}
                  {anuncio.avaliacaoAnuncio ? (
                    <Rating
                      key={index}
                      name="text-feedback"
                      value={anuncio.avaliacaoAnuncio}
                      readOnly
                      precision={0.5}
                      size="small"
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                  ) : (
                    <span>Nenhuma</span>
                  )}
                </div>
                <div className="productTime">
                  {anuncio.timeLeft} Pessoa que cadastrou
                </div>
              </div>
              <div>
                <h3
                  className="productName"
                  // style={{
                  //   whiteSspace: "pre-wrap",
                  //   overflowWrap: "break-word",
                  //   maxWidth: "240px",
                  //   maxHeight: "70px",
                  //   overflow: "hidden",
                  //   textOverflow: "ellipsis"
                  // }}
                >
                  {anuncio.tituloAnuncio}
                </h3>
              </div>
              {/* <input
                type="button"
                value="Ver Anúncio"
                className="btn"
                style={{ width: "100%", backgroundColor: "#ff6500", color: "#FFFFFF" }}
              /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
