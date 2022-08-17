import React, { useState, useContext } from "react";
import "./Login.css";
import { SistemaContext } from "../../contexts/Aplicacao/sistema";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { autenticado, login } = useContext(SistemaContext);

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", { usuario, senha });    

    login(usuario, senha); //Integração com o contexto / api
  }; 

  return (
    <div id="login">
      <h1 className="title">MOBB Login</h1>
      <p>{String(autenticado)}</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="usuario"> Usuário </label>
          <input
            type="text"
            name="usuario"
            id="usuario"
            value={usuario}
            onChange={(e) => {
              setUsuario(e.target.value);
            }}
          ></input>
        </div>

        <div className="field">
          <label htmlFor="senha"> Senha </label>
          <input
            type="password"
            name="senha"
            id="senha"
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
            }}
          ></input>
        </div>

        <div className="actions">
          <button type="submit">Entrar</button>                    
          <label className="cadastro-pessoa" onClick={() => navigate('/cadastro-pessoa')}> Criar Conta</label>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
