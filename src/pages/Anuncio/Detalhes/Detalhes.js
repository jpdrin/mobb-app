import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { decryptId } from "../../../utils/cryptoUtils";
import {
  dadosAnuncio,
  dadosAnuncioImagens,
  verificaTokenValido,
  InsereAnuncioFavorito,
  verificaAnuncioFavorito,
  removeAnuncioFavorito,
} from "../../../services/Api";
import CarouselAnuncio from "../../../components/Carousel/Carousel";
import { Container, Row, Col } from "reactstrap";
import Avaliacao from "../../../components/Avaliacao/avaliacao";
import { Markup } from "interweave";
import "./detalhes.css";
import Comentarios from "../../../components/Modal/Comentarios/comentarios";
import Navbar from "../../../components/navbar_novo/Navbar";
import MobbFooter from "../../../components/Footer/Footer";
import { SistemaContext } from "../../../contexts/Aplicacao/sistema";
import { useNavigate, hist } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { SiWhatsapp } from "react-icons/si";
import { RiUserStarFill, RiArrowGoBackFill } from "react-icons/ri";
import { MdOutlineComment } from "react-icons/md";
import { BsHeartFill } from "react-icons/bs";
import { FaHeartBroken } from "react-icons/fa";
import Avaliar from "../../../components/Modal/Avaliacoes/Avaliar";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const Detalhes = () => {
  const { idAnuncio } = useParams();
  const [anuncio, setAnuncio] = useState({});
  const [anuncioImagens, setAnuncioImagens] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openModalAvaliar, setOpenModalAvaliar] = useState(false);
  const [tokenValido, setTokenValido] = useState(false);
  const [anuncioFavorito, setAnuncioFavorito] = useState(false);
  const { usuario } = useContext(SistemaContext);
  const ServicesRefTopo = useRef(document.getElementById("navMobb"));
  const navigate = useNavigate();

  useEffect(() => {
    console.log("teste");
    listaAnuncio(decryptId(idAnuncio));
    listaAnuncioImagens(decryptId(idAnuncio));
    validaToken();

    if (ServicesRefTopo.current) {
      //Verifica se o elemento existe para referência-lo
      window.scrollTo({
        top: ServicesRefTopo.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    validaAnuncioFavorito();
  }, [usuario]);

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

  const validaToken = async () => {
    const response = await verificaTokenValido();

    setTokenValido(response.data);
  };

  const validaAnuncioFavorito = async () => {
    const idPessoa = usuario !== null ? usuario.idPessoa : 0; //Pois o ID não vem logo de cara, ele demora "um pouco"

    const response = await verificaAnuncioFavorito(
      idPessoa,
      decryptId(idAnuncio)
    );

    setAnuncioFavorito(response.data);
  };

  const insereFavorito = async () => {
    const response = await InsereAnuncioFavorito(
      usuario.idPessoa,
      decryptId(idAnuncio)
    );
    if (response) {
      alert("Anuncio Favoritado");
    }

    validaAnuncioFavorito();
  };

  const removeFavorito = async () => {
    const response = await removeAnuncioFavorito(
      usuario.idPessoa,
      decryptId(idAnuncio)
    );

    if (response) {
      setAnuncioFavorito(false);
    }
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
                <CarouselAnuncio data={anuncioImagens} />
              ) : (
                <p>Não há imagens para este anúncio</p>
              )}
            </Col>

            <Col lg="4">
              <div className="car__info">
                <h2 className="section__title titulo">
                  {anuncio.tituloAnuncio}
                </h2>
                <h6
                  className="rent__price fw-bold fs-4"
                  style={{
                    border: "1px solid #FF6500",
                    borderRadius: "0 0 15px 15px",
                    backgroundColor: "#FF6500",
                  }}
                >
                  <div style={{ padding: "10px", color: "white" }}>
                    <span style={{ textAlign: "center" }}>
                      {anuncio.horasServicoAnuncio &&
                        anuncio.valorServicoAnuncio.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        }) +
                          " a cada " +
                          anuncio.horasServicoAnuncio +
                          (anuncio.horasServicoAnuncio > 1
                            ? " Horas"
                            : " Hora")}
                    </span>
                  </div>
                </h6>
                <div className="avaliacao-text">
                  <h1>{anuncio.avaliacaoAnuncio ? anuncio.avaliacaoAnuncio.toFixed(1) : "N/A"}</h1>
                  {anuncio && (
                    <Rating
                      name="text-feedback"
                      value={anuncio.avaliacaoAnuncio ? anuncio.avaliacaoAnuncio : 0}
                      readOnly
                      precision={0.1}
                      size="large"
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                  )}
                </div>
                <div className=" d-flex  gap-5 mb-4 mt-3 interacoes">
                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}></span>
                  </span>
                </div>

                <div className=" d-flex  gap-1 mb-4 mt-3 interacoes">
                  <button
                    onClick={() => setOpenModalAvaliar(true)}
                    className="btn btn-primary"
                  >
                    <RiUserStarFill size={25} /> Avaliação
                  </button>
                  {usuario &&
                    tokenValido &&
                    (anuncioFavorito ? (
                      <button
                        onClick={() => removeFavorito()}
                        className="btn btn-danger"
                      >
                        <FaHeartBroken size={25} /> Desfavoritar
                      </button>
                    ) : (
                      <button
                        onClick={() => insereFavorito()}
                        className="btn btn-danger"
                      >
                        <BsHeartFill size={25} /> Favoritar
                      </button>
                    ))}
                  <button className="btn btn-success">
                    <a
                      href="https://web.whatsapp.com/send?phone=55%2014%2099833-6660&text=chamaaa"
                      target="_blank"
                      className="enviar-msg"
                    >
                      <SiWhatsapp size={25} /> Mensagem
                    </a>
                  </button>
                  <button
                    style={{ paddingLeft: "15px" }}
                    className="btn btn-secondary"
                    onClick={() => setOpenModal(true)}
                  >
                    <MdOutlineComment size={25} /> Comentários
                  </button>
                  <button
                    className="btn btn-primary btn-voltar"
                    onClick={() => navigate(-1)}
                  >
                    <RiArrowGoBackFill size={25} /> Voltar
                  </button>
                </div>
                <div className=" d-flex align-items-center gap-5 mb-4 mt-3"></div>
                <Comentarios
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  idAnuncio={decryptId(idAnuncio)}
                />
                {usuario && (
                  <Avaliar
                    openModal={openModalAvaliar}
                    setOpenModal={setOpenModalAvaliar}
                    idAnuncio={decryptId(idAnuncio)}
                    idPessoa={usuario.idPessoa}
                  />
                )}
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
