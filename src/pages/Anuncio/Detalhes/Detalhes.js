import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { decryptId } from "../../../utils/cryptoUtils";
import { dadosAnuncio, dadosAnuncioImagens } from "../../../services/Api";
import { Rating } from "@mui/material";
import CarouselAnuncio from "../../../components/Carousel/Carousel";
import { Container, Row, Col } from "reactstrap";
import Avaliacao from "../../../components/Avaliacao/avaliacao";

const Detalhes = () => {
  const { idAnuncio } = useParams();
  const [anuncio, setAnuncio] = useState({});
  const [anuncioImagens, setAnuncioImagens] = useState({});

  useEffect(() => {
    console.log("teste");
    listaAnuncio(decryptId(idAnuncio));
    listaAnuncioImagens(decryptId(idAnuncio));
  }, []);

  const listaAnuncio = async (idAnuncio) => {
    const response = await dadosAnuncio(idAnuncio);
    setAnuncio(response.data);
  };

  const listaAnuncioImagens = async (idAnuncio) => {
    const response = await dadosAnuncioImagens(idAnuncio);
    const data = response.data;

    data.forEach((value) => {
      value.image = value.urlImagemAnuncio;
      value.caption = "";

      delete value.idAnuncio;
      delete value.idImagemAnuncio;
      delete value.urlImagemAnuncio;
    });

    setAnuncioImagens(data);
  };

  console.log(anuncioImagens);

  const singleCarItem = {
    id: 1,
    brand: "Tesla",
    rating: 112,
    carName: "Tesla Malibu",
    imgUrl:
      "https://res.cloudinary.com/jpex/image/upload/v1660275361/teste/o4q9lcbhtcdxzcirlnrm.png",
    model: "Model 3",
    price: 50,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      " Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam. Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam.",
  };

  // return (
  //   <div>
  //     <p>Detalhes do anúncio</p>
  //     <p>{anuncio.idAnuncio}</p>
  //     <p>{anuncio.tituloAnuncio}</p>
  //     <p>{anuncio.descricaoAnuncio}</p>
  //     {anuncioImagens.length > 0 &&(
  //       <CarouselAnuncio data={anuncioImagens}></CarouselAnuncio>
  //     )}

  //   </div>
  // );
  return (
    <section>      
      <Container>
        <Row>
          <Col lg="6">
            <img src={singleCarItem.imgUrl} alt="" className="w-100" />
          </Col>

          <Col lg="6">
            <div className="car__info">
              <h2 className="section__title">{singleCarItem.carName}</h2>

              <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                <h6 className="rent__price fw-bold fs-4">
                  ${singleCarItem.price}.00 / Day
                </h6>
                <span className=" d-flex align-items-center gap-2">
                  <span style={{ color: "#f9a826" }}></span>
                  
                  ({singleCarItem.rating} ratings)
                </span>
              </div>
              <Avaliacao />
              
              <p className="section__description">
                {singleCarItem.description}
              </p>

              <div
                className=" d-flex align-items-center mt-3"
                style={{ columnGap: "4rem" }}
              >
                <span className=" d-flex align-items-center gap-1 section__description">
                  <i class="ri-roadster-line" style={{ color: "#f9a826" }}></i>{" "}
                  {singleCarItem.model}
                </span>

                <span className=" d-flex align-items-center gap-1 section__description">
                  <i
                    class="ri-settings-2-line"
                    style={{ color: "#f9a826" }}
                  ></i>{" "}
                  {singleCarItem.automatic}
                </span>

                <span className=" d-flex align-items-center gap-1 section__description">
                  <i
                    class="ri-timer-flash-line"
                    style={{ color: "#f9a826" }}
                  ></i>{" "}
                  {singleCarItem.speed}
                </span>
              </div>

              <div
                className=" d-flex align-items-center mt-3"
                style={{ columnGap: "2.8rem" }}
              >
                <span className=" d-flex align-items-center gap-1 section__description">
                  <i class="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                  {singleCarItem.gps}
                </span>

                <span className=" d-flex align-items-center gap-1 section__description">
                  <i
                    class="ri-wheelchair-line"
                    style={{ color: "#f9a826" }}
                  ></i>{" "}
                  {singleCarItem.seatType}
                </span>

                <span className=" d-flex align-items-center gap-1 section__description">
                  <i
                    class="ri-building-2-line"
                    style={{ color: "#f9a826" }}
                  ></i>{" "}
                  {singleCarItem.brand}
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Detalhes;
