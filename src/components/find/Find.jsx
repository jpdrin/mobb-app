import React, { useContext, useEffect, useState } from "react";
import styles from "./Find.module.css";
import Card from "./Card";
import { SistemaContext } from "../../contexts/Aplicacao/sistema";
import { listaCategoriasAnuncio } from "../../services/Api";
import { useNavigate } from "react-router-dom";
import { encryptId, decryptId } from "../../utils/cryptoUtils";
import { Api, verificaAnuncios } from "../../services/Api";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import swal from "sweetalert";

import "swiper/css";
import "swiper/css/navigation";

const Find = () => {
  const { ServicesRefCategorias, parametrosBusca, setParametrosBusca, irPara, carregando, setCarregando } =
    useContext(SistemaContext);
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  const CategoriasAnuncio = async () => {
    const response = await listaCategoriasAnuncio();

    setCategorias(response.data);
  };

  useEffect(() => {
    CategoriasAnuncio();
  }, []);

  const filtrarAnuncios = (idCategoriaAnuncio) => {
    if (parametrosBusca.idEstado == 0) {
      irPara("estados");

      swal({
        title: "Aviso!",
        text: "Escolha o estado para a busca",
        icon: "warning",
        button: "Fechar",
      });

      return;
    }
    setCarregando(true);

    parametrosBusca.idCategoriaAnuncio = idCategoriaAnuncio;

    buscaAnuncios();
  };

  async function buscaAnuncios() {    
    const response = await verificaAnuncios(
      parametrosBusca.idEstado,
      parametrosBusca.idCidade,
      parametrosBusca.idCategoriaAnuncio
    );
    
    setCarregando(false);
    
    //caso for falso, não irá para tela de listagem de anúncios, pois não haverá
    if (!response.data) {
      swal({
        title: "Ops...",
        text: "Não existem anúncios para o filtro informado!",
        icon: "warning",
        button: "Fechar",
      });
      
      return;
    }        

    navigate(
      `anuncios/${encryptId(String(parametrosBusca.idEstado))}/${encryptId(
        String(parametrosBusca.idCidade)
      )}/${encryptId(String(parametrosBusca.idCategoriaAnuncio))}`
    );
  }

  return (
    <div className={styles.find}>
      <div className={styles.heading} ref={ServicesRefCategorias}>
        <h1>Procure pela categoria desejada!</h1>
        <div className={styles.text_bg}>
          <p>
            <span>
              Encontre a mão de obra que quiser filtrando pela categoria que
              deseja
            </span>
          </p>
        </div>
      </div>
      <div className={styles.slider_container}>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={5}
          navigation
          breakpoints={{
            // ajusta a visão dependendo do tamanho da tela
            340: {
              width: 200,
              slidesPerView: 1,
            },            
            768: {
              width: 768,
              slidesPerView: 4,
            },
            1040: {
              width: 1040,
              slidesPerView: 5,
            },
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {!categorias.length > 0 && (
            <p
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              Nenhuma categoria encontrada!
            </p>
          )}
          {categorias.map((categoria, index) => (
            <SwiperSlide
              key={index}
              onClick={() => filtrarAnuncios(categoria.idCategoriaAnuncio)}
            >
              <Card
                image={categoria.urlImagemCategoriaAnuncio}
                make={categoria.nomeCategoriaAnuncio}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Find;
