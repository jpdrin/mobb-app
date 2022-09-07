import React, { useState, useContext } from "react";
import "./Login.css";
import { SistemaContext } from "../../contexts/Aplicacao/sistema";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MobbPassword from "../../components/MobbPassword/MobbPassword";

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

  console.log(senha);
  return (
    <div /*style={{width: "100%", height: "100vh", backgroundColor: "orange"}}*/>
      <div className="container">
        {/* <!-- Outer Row --> */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Bem Vindo!</h1>
                      </div>
                      <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <TextField
                            label="Usuário"
                            className="form-control form-control-user"
                            size="small"
                            maxLength="80"
                            type="text"
                            name="usuario"
                            id="usuario"
                            value={usuario}
                            onChange={(e) => {
                              setUsuario(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <MobbPassword
                            type="password"
                            name="senha"
                            id="senha"
                            value={senha}
                            /*onChange={(e) => {
                            setSenha(e.target.value);
                          }}*/
                            onBlur={(e) => setSenha(e.target.value)}
                          />
                        </div>
                        <input
                          type="submit"
                          value="Entrar"
                          className="btn btn-warning btn-user btn-block"
                        />
                        <hr />
                        <input
                          type="button"
                          value="Cadastre-se grátis"
                          className="btn btn-primary btn-user btn-block"
                          onClick={() => navigate("/cadastro-pessoa")}
                        />
                        <input
                          type="button"
                          value="Buscar por anúncios"
                          className="btn btn-secondary btn-user btn-block"
                          onClick={() => navigate("/")}
                        />
                      </form>
                      <hr />
                      <div className="text-center">
                        <a className="small" href="forgot-password.html">
                          Esqueceu a senha?
                        </a>
                      </div>
                      {/* <div className="text-center">
                      <a className="small" href="register.html">
                        Cadastre-se agora!
                      </a>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
