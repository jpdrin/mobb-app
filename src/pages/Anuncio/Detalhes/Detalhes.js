import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { decryptId } from "../../../utils/cryptoUtils";
import { dadosAnuncio, dadosAnuncioImagens } from "../../../services/Api";
import CarouselAnuncio from "../../../components/Carousel/Carousel";
import { Container, Row, Col } from "reactstrap";
import Avaliacao from "../../../components/Avaliacao/avaliacao";
import { Markup } from "interweave";
import "./detalhes.css";
import Comentarios from "../../../components/Modal/Comentarios/comentarios";
import Navbar from "../../../components/navbar_novo/Navbar";
import MobbFooter from "../../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const data = [
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
    caption: `<div>
                San Francisco
                <br/>
                Next line
              </div>`,
  },
  {
    image:
      "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
    caption: "Scotland",
  },
  {
    image:
      "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
    caption: "Darjeeling",
  },
];

const Detalhes = () => {
  const { idAnuncio } = useParams();
  const [anuncio, setAnuncio] = useState({});
  const [anuncioImagens, setAnuncioImagens] = useState({});
  const [openModal, setOpenModal] = useState(false);
  // const navigate = useNavigate();

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

  console.log(anuncio);

  console.log(anuncioImagens);

  return (
    <>
      <Navbar />
      <section className="detalhesPage" style={{ paddingTop: "15px" }}>
        <Container>
          <Row>
            <Col lg="8">
              {anuncioImagens.length > 0 ? (
                <CarouselAnuncio data={data} />
              ) : (
                <p>Não há imagens para este anúncio</p>
              )}
            </Col>

            <Col lg="4">
              <div className="car__info">
                <h2 className="section__title titulo">
                  {anuncio.tituloAnuncio}
                </h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    R${anuncio.horasServicoAnuncio}.00 / Hora
                  </h6>
                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}></span>
                  </span>
                </div>
                <h6>{anuncio.telefoneContatoAnuncio}</h6>

                <button>
                  <a
                    href="https://web.whatsapp.com/send?phone=55%2014%2099833-6660&text=chamaaa"
                    target="_blank"
                  >
                    Enviar Mensagem
                  </a>
                </button>
                <button onClick={() => setOpenModal(true)}>Abrir</button>
                <button onClick={() => {}}>Favoritar</button>
                <button onClick={() => {}}>Voltar</button>
                <Comentarios
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  idAnuncio={decryptId(idAnuncio)}
                />

                <div style={{ paddingTop: "5%" }}>
                  <h1 style={{ paddingLeft: "8%" }}>4.7</h1>
                  <Avaliacao />
                </div>
              </div>
            </Col>
            <Col lg="8">
              <h1>Descrição</h1>
              <p className="descricao">
                <Markup content={anuncio.descricaoAnuncio} />
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <MobbFooter />
    </>
  );
};

export default Detalhes;
