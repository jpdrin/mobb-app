import React, { useState, useEffect, createContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../components/hero/Hero";
import { Api, createSession } from "../../services/Api";

export const SistemaContext = createContext();

const parametrosBusca = {
  idEstado: 0,
  idCidade: 0,
  idCategoriaAnuncio: 0,
};

export const SistemaProvider = ({ children }) => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [exibirAlertaSucesso, setExibirAlertaSucesso] = useState(false);  

  useEffect(() => {
    //Recuperando os valores do LocalStorage para atribuir novamente ao dar o refresh na página
    const usuarioRecuperado = localStorage.getItem("usuario");
    const tokenRecuperado = localStorage.getItem("token");

    if (usuarioRecuperado && tokenRecuperado) {
      setUsuario(JSON.parse(usuarioRecuperado));
      Api.defaults.headers.Authorization = `Bearer ${tokenRecuperado}`;
    }

    setCarregando(false);
  }, []);

  console.log(parametrosBusca);

  const login = async (usuario, senha) => {
    console.log("Login Autenticado", { usuario, senha });

    const response = await createSession(usuario, senha);
    console.log("login", response.data);

    // api criar uma session
    const usuarioLogado = response.data.usuario;
    const token = response.data.token;

    //Enviando o Token no Header
    Api.defaults.headers.Authorization = `Bearer ${token}`;

    localStorage.setItem("usuario", JSON.stringify(usuarioLogado));
    localStorage.setItem("token", token);

    setUsuario(usuarioLogado);
    navigate("/");
  };

  const logout = () => {
    console.log("Logout");

    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    Api.defaults.headers.Authorization = null;

    setUsuario(null);
    navigate("/login");
  };

  //#region Rolagem do Scroll
  const ServicesRefCategorias = useRef(null);
  const ServicesRefEstados = useRef(null);

  const irPara = (sender) => {
    if (sender === "categorias"){
      window.scrollTo({
        top: ServicesRefCategorias.current.offsetTop,
        behavior: "smooth",
      });      
    }else if (sender === 'estados'){
      window.scrollTo({
        top: ServicesRefEstados.current.offsetTop,
        behavior: "smooth",
      });
    }
  };
  //#endregion

  return (
    <SistemaContext.Provider
      value={{
        autenticado: !!usuario,
        usuario,
        carregando,
        login,
        logout,
        exibirAlertaSucesso,
        setExibirAlertaSucesso,
        ServicesRefCategorias,
        ServicesRefEstados,
        irPara,
        parametrosBusca        
      }}
    >
      {children}
    </SistemaContext.Provider>
  );
};
