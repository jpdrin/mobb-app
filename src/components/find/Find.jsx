import React, {useContext, useEffect, useState} from 'react';
import styles from './Find.module.css';
import Card from './Card';
import { SistemaContext } from "../../contexts/Aplicacao/sistema";
import { listaCategoriasAnuncio } from '../../services/Api';
import { useNavigate } from 'react-router-dom';
import { encryptId } from '../../utils/cryptoUtils';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';


const Find = () => {
  const {ServicesRefCategorias, parametrosBusca, setParametrosBusca, irPara } = useContext(SistemaContext);
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  const CategoriasAnuncio = async () => {
    const response = await listaCategoriasAnuncio();

    setCategorias(response.data);
  }

  useEffect(() => {
    CategoriasAnuncio();
  }, []);

  const filtrarAnuncios = (idCategoriaAnuncio) => {
    if (parametrosBusca.idEstado == 0){
      irPara('estados');
      return;
    }
    
    parametrosBusca.idCategoriaAnuncio = idCategoriaAnuncio;      

    navigate(`anuncios/${encryptId(String(parametrosBusca.idEstado))}/${encryptId(String(parametrosBusca.idCidade))}/${encryptId(String(parametrosBusca.idCategoriaAnuncio))}`);
  }

  return (
    <div className={styles.find}>
      <div className={styles.heading} ref={ServicesRefCategorias}>
        <h1>Procure pela categoria desejada!</h1>
        <div className={styles.text_bg}>
          <p>
            <span>Encontre a mão de obra que quiser filtrando pela categoria que deseja</span>
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
            // when window width is >= 340px
            340: {
              width: 200,
              slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
              width: 768,
              slidesPerView: 4,
            },
            // when window width is >= 1040px
            1040: {
              width: 1040,
              slidesPerView: 5,
            },
          }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {!categorias.length > 0 && <p style={{alignItems: "center", justifyContent: "center", display: "flex"}}>Nenhuma categoria encontrada!</p>}
          {categorias.map((categoria, index) => (
            <SwiperSlide key={index} onClick={() => filtrarAnuncios(categoria.idCategoriaAnuncio)}>
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
