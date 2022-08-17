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


const Cards = ({productDatas}) => {
  return (
    <div className={Styles.luxury}>
      <div className={Styles.container}>

        {productDatas.map((productData, index) => (
          <div key={productData.idAnuncio} className="productCard">
            <img
              src={productData.urlImagemAnuncio}
              alt="product-img"
              className="productImage"
            ></img>

            <AiOutlineHeart className={"productCard__cart"} onClick={() => alert('foi no coração')}/>
            {/* <FaRegBookmark className={"productCard__wishlist"} />
            <FaFireAlt className={"productCard__fastSelling"} /> */}

            <div className="productCard__content">
              <h3 className="productName">{productData.tituloAnuncio}</h3>
              <div className="displayStack__1">
                <div className="productPrice">R${productData.valorServicoAnuncio}/{productData.horasServicoAnuncio} {productData.valorServicoAnuncio > 1 ? "Horas" : "Hora"}</div>
                <div className="productSales">
                  {productData.totalSales} units sold
                </div>
              </div>
              <div className="displayStack__2">
                <div className="productRating">
                  {/* {[...Array(productData.rating)].map((index) => (
                    <FaStar id={index + 1} key={index} />
                  ))} */}
                  <Rating
                    name="text-feedback"
                    value={0}
                    readOnly
                    precision={0.5}
                    size="small"
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                </div>
                <div className="productTime">
                  {productData.timeLeft} days left
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Cards;
