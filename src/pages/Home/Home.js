import Alerta from "../../components/Alerta/alerta";
import React, { useState, useEffect, useMemo, useContext } from "react";
import "../../App.css";
import Card from "../../components/Anuncio/Card/Card";
import { Api } from "../../services/Api";
import { SistemaContext } from "../../contexts/Aplicacao/sistema";
// import Navbar from "../../components/Navbar/Navbar";
import Luxury from "../../components/Cards/Cards";
import Find from "../../components/find/Find";
import Hero from "../../components/hero/Hero";
// import { Products } from "../../components/product/products";
import Navbar from "../../components/navbar_novo/Navbar";
import MobbFooter from "../../components/Footer/Footer";

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
    <>
      <Navbar />
      <div>
        <Hero />
        <Find />        
      </div>
      <MobbFooter />
    </>
  );
};

export default Home;
