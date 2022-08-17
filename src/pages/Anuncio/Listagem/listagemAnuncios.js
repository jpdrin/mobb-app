import Alerta from "../../../components/Alerta/alerta";
import React, { useState, useEffect, useMemo, useContext } from "react";
import "../../../App.css";
import Card from "../../../components/Anuncio/Card/Card";
import { Api } from "../../../services/Api";
import { SistemaContext } from "../../../contexts/Aplicacao/sistema";
import Cards from "../../../components/Cards/Cards";
import { useParams } from "react-router-dom";
import { decryptId } from "../../../utils/cryptoUtils";


const ListagemAnuncios = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [busca, setBusca] = useState("");
  const { idEstado, idCidade, idCategoriaAnuncio} = useParams();

  const { exibirAlertaSucesso } = useContext(SistemaContext);

  async function Dados() {
    const response = await Api.get(`Anuncios/lista-anuncios/${decryptId(idEstado)}/${decryptId(idCidade)}/${decryptId(idCategoriaAnuncio)}`);
    setAnuncios(response.data);
  }

  // useEffect(() => {
  //   Dados();
  // }, [busca]);

  useEffect(() => {
     Dados();
    console.log(decryptId(idEstado), decryptId(idCidade), decryptId(idCategoriaAnuncio));
  }, []);

  console.log(anuncios);

  const dadosFilter = useMemo(() => {
    const lowerBusca = busca.toLowerCase();
    return anuncios.filter((dados) =>
      dados.tituloAnuncio.toLowerCase().includes(lowerBusca)
    );
  }, [busca, anuncios]);

  return (
    <div>    
      <input
        type="text"
        name="teste"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {/* {!dadosFilter.length > 0 && <p>Nenhum registro encontrado!</p>} */}

      <Cards productDatas={anuncios} />
      {/* {dadosFilter.map((anuncio, index) => (
        <Card key={index} anuncio={anuncio} />
        
      ))} */}

      <Alerta exibir={exibirAlertaSucesso} />
      {/* </div> */}
    </div>
  );
};

export default ListagemAnuncios;
