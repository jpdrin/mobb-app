import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Detalhes from "./pages/Anuncio/Detalhes/Detalhes";
import LoginPage from "./pages/Login/Login";
import CadastroAnuncio from "./pages/Anuncio/Cadastro/Cadastro.js";
import {
  SistemaProvider,
  SistemaContext,
} from "./contexts/Aplicacao/sistema";
import CadastroPessoa from "./pages/Pessoa/Cadastro/cadastro";

import { CadastroContext, CadastroProvider } from "./contexts/Anuncio/cadastro";

import AnuncioPessoa from "./pages/Anuncio/Pessoa/anuncioPessoa";
import Navbar from "./components/navbar_novo/Navbar";
import ListagemAnuncios from "./pages/Anuncio/Listagem/listagemAnuncios";
import MobbFooter from "./components/Footer/Footer";

const AppRoutes = () => {
  
  //Verifica se está autenticado, senão estiver volta pro login, se estiver vai para onde deseja
  const Private = ({ children }) => {
    const { autenticado, carregando, usuario } = useContext(SistemaContext);

    if (carregando) {
      return <div className="loading">Carregando..</div>;
    }

    if (!autenticado) {
      return <Navigate to="/login" />;
    }
    
    return children;
  };

  return (

    <BrowserRouter>
    {/* <Navbar /> */}
      <SistemaProvider>
        <Routes>
          <Route path="/" exact element={<Home></Home>} />
          <Route path="/login" element={<LoginPage></LoginPage>} />
          <Route
            path="/cadastro-pessoa"
            element={<CadastroPessoa></CadastroPessoa>}
          />

          <Route
            path="/cadastro"
            element={
              <Private>
                <CadastroProvider>
                  <CadastroAnuncio></CadastroAnuncio>
                </CadastroProvider>
              </Private>
            }
          />

          <Route
            path="/editar-anuncio/:idAnuncio"
            element={
              <Private>
                <CadastroProvider>
                  <CadastroAnuncio></CadastroAnuncio>
                </CadastroProvider>
              </Private>
            }
          />

          <Route
            path="/meus-anuncios/"
            element={
              <Private>
                <AnuncioPessoa></AnuncioPessoa>
              </Private>
            }
          />

          <Route
            path="/detalhes/:tituloAnuncio/:idAnuncio"
            element={
              // <Private>
              <Detalhes></Detalhes>
              // </Private>
            }
          />

          <Route path="/anuncios/:idEstado/:idCidade/:idCategoriaAnuncio"
          element={<ListagemAnuncios></ListagemAnuncios>} />
        </Routes>
      </SistemaProvider> 
      {/* <MobbFooter />      */}
    </BrowserRouter>
  );
};

export default AppRoutes;
