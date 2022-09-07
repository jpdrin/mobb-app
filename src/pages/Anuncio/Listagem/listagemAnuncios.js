import React, { useState, useEffect, useMemo, useContext } from "react";
import "../../../App.css";
import { Api } from "../../../services/Api";
import { SistemaContext } from "../../../contexts/Aplicacao/sistema";
import Cards from "../../../components/Cards/Cards";
import { useParams } from "react-router-dom";
import { decryptId } from "../../../utils/cryptoUtils";
import Navbar from "../../../components/navbar_novo/Navbar";
import MobbFooter from "../../../components/Footer/Footer";
import "./listagemAnuncio.css";
import { GiCardPick } from "react-icons/gi";
import { VscListFilter } from "react-icons/vsc";
import {AiOutlineStar} from "react-icons/ai";
import {BsArrowUpShort, BsArrowDownShort} from "react-icons/bs";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import MobbFilter from "../../../components/MobbFilter/Filter";

const data = [
  {
    value: 1,
    text: "Titulo",
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

const ListagemAnuncios = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [busca, setBusca] = useState("");
  const { idEstado, idCidade, idCategoriaAnuncio } = useParams();

  async function Dados() {
    const response = await Api.get(
      `Anuncios/lista-anuncios/${decryptId(idEstado)}/${decryptId(
        idCidade
      )}/${decryptId(idCategoriaAnuncio)}`
    );
    setAnuncios(response.data);
  }

  useEffect(() => {
    Dados();
  }, [busca]);

  useEffect(() => {
    Dados();
    console.log(
      decryptId(idEstado),
      decryptId(idCidade),
      decryptId(idCategoriaAnuncio)
    );
  }, []);

  console.log(anuncios);

  const dadosFilter = useMemo(() => {
    const lowerBusca = busca.toLowerCase();
    return anuncios.filter((dados) =>
      dados.tituloAnuncio.toLowerCase().includes(lowerBusca)
    );
  }, [busca, anuncios]);

  return (
    <div className="listagem-anuncio">
      <Navbar />
      <div>
        <div className="ListagemAnuncio__pesquisa-container">
          <TextField
            className="ListagemAnuncio__input-pesquisar"
            label="Pesquisar"
            type="text"
            name="teste2"
            size="small"
            onChange={(e) => setBusca(e.target.value)}
          />
          <MobbFilter valorLabel="Ordenar por" dataOptions={data} />
        </div>

        {dadosFilter.length > 0 ? (
          <Cards anuncios={dadosFilter} />
        ) : (
          <div className="not-found">
            <p className="not-found-text">
              Ops... Nenhum registro foi encontrado
            </p>
            <GiCardPick className="not-found-icon" />
          </div>
        )}
      </div>
      <MobbFooter />
    </div>
  );
};

export default ListagemAnuncios;
