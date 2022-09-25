import React, { useState, useEffect, createContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../components/hero/Hero";
import { Api, createSession } from "../../services/Api";
import swal from "sweetalert";
import Loading from "../../components/Loading/loading";

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

  useEffect(() => {
    //Recuperando os valores do LocalStorage para atribuir novamente ao dar o refresh na página
    const usuarioRecuperado = localStorage.getItem("usuario");
    const tokenRecuperado = localStorage.getItem("token");

    console.log("recu", usuarioRecuperado, tokenRecuperado);

    if (usuarioRecuperado && tokenRecuperado) {
      setUsuario(JSON.parse(usuarioRecuperado));
      Api.defaults.headers.Authorization = `Bearer ${tokenRecuperado}`;
    }

    setCarregando(false);
    console.log('aajjuu')
  }, []);

  console.log("recu 2", usuario);

  console.log(parametrosBusca);

  const login = async (usuario, senha) => {
    console.log("Login Autenticado", { usuario, senha });

    const response = await createSession(usuario, senha);    

    console.log("login", response);
    console.log("login", response.data.token);

    if (response.status !== 200){
      swal({
        title: "Erro!",
        text: response.data,
        icon: "error",
        button: "Fechar",
      });

      return;
    }    

    // api criar uma session
    const usuarioLogado = response.data.usuario;
    const token = response.data.token;

    //Enviando o Token no Header
    Api.defaults.headers.Authorization = `Bearer ${token}`;
    
    console.log("usu", usuarioLogado, token);
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

  console.log(usuario);

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
        setCarregando,
        login,
        logout,        
        ServicesRefCategorias,
        ServicesRefEstados,
        irPara,
        parametrosBusca        
      }}
    >
      {children}
      <Loading carregando={carregando} />
    </SistemaContext.Provider>
  );
};
