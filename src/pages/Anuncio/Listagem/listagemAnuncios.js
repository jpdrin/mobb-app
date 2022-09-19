import React, { useState, useEffect, useMemo, useContext, useRef } from "react";
import "../../../App.css";
import {
  Api,
  dadosAnunciosFavoritos,
  verificaTokenValido,
} from "../../../services/Api";
import { SistemaContext } from "../../../contexts/Aplicacao/sistema";
import Cards from "../../../components/Cards/Cards";
import { useParams } from "react-router-dom";
import { decryptId } from "../../../utils/cryptoUtils";
import Navbar from "../../../components/navbar_novo/Navbar";
import MobbFooter from "../../../components/Footer/Footer";
import "./listagemAnuncio.css";
import { GiCardPick } from "react-icons/gi";
import { VscListFilter } from "react-icons/vsc";
import { AiOutlineStar } from "react-icons/ai";
import { BsArrowUpShort, BsArrowDownShort, BsSearch } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import { IconButton, useForkRef } from "@mui/material";
import MobbFilter from "../../../components/MobbFilter/Filter";
import Paginacao from "../../../components/Paginacao/Paginacao";
import Loading from "../../../components/Loading/loading";

const data = [
  {
    value: "TA",
    text: "Titulo",
    icon: <VscListFilter />,
  },
  {
    value: "ID",
    text: "ID",
    icon: <VscListFilter />,
  },
  {
    value: 2,
    text: "Maior Avaliação",
    icon: (
      <>
        <AiOutlineStar /> <BsArrowUpShort />
      </>
    ),
  },
  {
    value: 3,
    text: "Menor Avaliação",
    icon: (
      <>
        <AiOutlineStar /> <BsArrowDownShort />
      </>
    ),
  },
];

const LIMITE_POR_PAGINA = 8;

const ListagemAnuncios = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [anunciosFavoritos, setAnunciosFavoritos] = useState([]);
  const [idAnunciosFavoritos, setIdAnunciosFavoritos] = useState([]);
  const [busca, setBusca] = useState("");
  const [offset, setOffset] = useState(0);
  const [ordenacao, setOrdenacao] = useState("A");
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const { idEstado, idCidade, idCategoriaAnuncio } = useParams();
  const { usuario } = useContext(SistemaContext);
  const ServicesRefTopo = useRef(document.getElementById('navMobb'));

  async function Dados() {
    const response = await Api.get(
      `Anuncios/lista-anuncios/${decryptId(idEstado)}/${decryptId(
        idCidade
      )}/${decryptId(
        idCategoriaAnuncio
      )}/${offset}/${LIMITE_POR_PAGINA}?ordenacao=${ordenacao}&titulo=${busca}`
    );

    console.log(response.data);
    setTotalRegistros(response.data.quantidadeRegistros);
    setAnuncios(response.data.listaAnuncios);
  }

  const listaAnunciosFavoritos = async () => {
    const response = await verificaTokenValido();

    if (response.data) {
      const idPessoa = usuario !== null ? usuario.idPessoa : 0;

      let response = await dadosAnunciosFavoritos(idPessoa);

      if (response) {
        setAnunciosFavoritos(response.data);
      }

      const id = [];
      response.data.forEach((value) => {
        id.push(value.idAnuncio);
      });

      setIdAnunciosFavoritos(id);
    }
  };

  console.log("favoritos", anunciosFavoritos);

  useEffect(() => {
    setCarregando(true);
    Dados();
    setCarregando(false);
    console.log("AAAAAAAA");
  }, [offset]);

  useEffect(() => {
    console.log(usuario);
    Dados();
    console.log(
      decryptId(idEstado),
      decryptId(idCidade),
      decryptId(idCategoriaAnuncio)
    );

    if (ServicesRefTopo.current){ //Verifica se o elemento existe para referência-lo
      window.scrollTo({
        top: ServicesRefTopo.current.offsetTop,
        behavior: "smooth",
      }); 
    }    
  }, []);  

  useEffect(() => {
    //Precisou deste useEffet pois só deve listar quando retornar os dados do Usuário, pois dependendo ele não carrega de cara, então tem que ficar monitorando
    listaAnunciosFavoritos();
  }, [usuario]);

  useEffect(() => {
    Dados();
    setOffset(0); //Setando OffSet igual a 0 ele volta para a primeira página
  }, [ordenacao]);

  const buscar = () => {
    if (busca === "") return;

    setOffset(0); //Setando OffSet igual a 0 ele volta para a primeira página
    Dados();
  };

  console.log(anuncios);

  return (
    <div className="listagem-anuncio" id="listaAnuncio">
      <Navbar />
      <div>
        <div className="ListagemAnuncio__pesquisa-container">
          <TextField
            className="ListagemAnuncio__input-pesquisar"
            label="Pesquise aqui"
            type="text"
            name="teste2"
            size="small"
            onChange={(e) => setBusca(e.target.value)}
          ></TextField>
          <button
            className="ListagemAnuncio__btn-pesquisar btn btn-warning"
            onClick={() => buscar()}
          >
            <BsSearch />
          </button>
          <MobbFilter
            valorLabel="Ordenar por"
            dataOptions={data}
            onChange={(e) => setOrdenacao(e.value)}
          />
        </div>

        {anuncios.length > 0 ? (
          <Cards anuncios={anuncios} anunciosFavoritos={idAnunciosFavoritos} />
        ) : (
          <div className="not-found">
            <p className="not-found-text">
              Ops... Nenhum registro foi encontrado
            </p>
            <GiCardPick className="not-found-icon" />
          </div>
        )}
      </div>
      {anuncios.length > 0 && (
        <Paginacao
          limite={LIMITE_POR_PAGINA}
          total={totalRegistros}
          offset={offset}
          setOffset={setOffset}
        />
      )}

      <Loading carregando={carregando} />
      <MobbFooter />
    </div>
  );
};

export default ListagemAnuncios;
