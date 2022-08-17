import Alerta from "../../components/Alerta/alerta";
import React, { useState, useEffect, useMemo, useContext } from "react";
import "../../App.css";
import Card from "../../components/Anuncio/Card/Card";
import { Api } from "../../services/Api";
import { SistemaContext } from "../../contexts/Aplicacao/sistema";
// import Navbar from "../../components/Navbar/Navbar";
import Navbar from "../../components/navbar_novo/Navbar";
import Luxury from "../../components/Cards/Cards";
import Find from "../../components/find/Find";
import Hero from "../../components/hero/Hero";
// import { Products } from "../../components/product/products";


const Home = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [busca, setBusca] = useState("");  

  const { exibirAlertaSucesso } = useContext(SistemaContext);

  async function Dados() {
    const response = await Api.get("Anuncios/lista-anuncios");
    setAnuncios(response.data);
  }

  // useEffect(() => {
  //   Dados();
  // }, [busca]);

  // useEffect(() => {
  //   Dados();
  // }, []);

  const dadosFilter = useMemo(() => {
    const lowerBusca = busca.toLowerCase();
    return anuncios.filter((dados) =>
      dados.tituloAnuncio.toLowerCase().includes(lowerBusca)
    );
  }, [busca, anuncios]);

  return (
    <div>
      {/* <Navbar /> */}
      <Hero />
      <Find />        
      {/* <div style={{ width: 800, margin: "30px auto" }}>       */}
      {/* <input
        type="text"
        name="teste"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {!dadosFilter.length > 0 && <p>Nenhum registro encontrado!</p>}

      {dadosFilter.map((anuncio, index) => (
        <Card key={index} anuncio={anuncio} />
      ))}

      <Alerta exibir={exibirAlertaSucesso} /> */}
      {/* </div> */}
    </div>
  );
};

export default Home;
