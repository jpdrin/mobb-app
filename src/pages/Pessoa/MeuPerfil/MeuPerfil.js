import React, { useState, useEffect, useContext } from "react";
import { SistemaContext } from "../../../contexts/Aplicacao/sistema";
import { verificaTokenValido } from "../../../services/Api";
import "../Cadastro/cadastro.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar_novo/Navbar";
import MobbFooter from "../../../components/Footer/Footer";
import TextField from "@mui/material/TextField";
import { FormHelperText } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import MobbFilter from "../../../components/MobbFilter/Filter";
import AnunciosReport, {
  Report,
} from "../../../components/Reports/Pessoa/AnunciosReport";

const MeuPerfil = () => {


  const [relAnunciosInteragidos, setRelAnunciosInteragidos] = useState([ //Informações sobre os anúncio que eu interagi
    {
      idAnuncio: 1,
      idPessoa: 11,
      tituloAnuncio: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      valorServicoAnuncio: 111213,
      horasServicoAnuncio: 111,
      avaliacaoAnuncioPessoa: 3.0,
      qtdComentariosRealizados: 6,
      nomeCategoriaAnuncio: "Pintura", 
    },
    {
      idAnuncio: 1,
      idPessoa: 11,
      tituloAnuncio: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      valorServicoAnuncio: 111213,
      horasServicoAnuncio: 111,
      avaliacaoAnuncioPessoa: 3.0,
      qtdComentariosRealizados: 6,
      nomeCategoriaAnuncio: "Pintura", 
    },
    {
      idAnuncio: 1,
      idPessoa: 11,
      tituloAnuncio: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      valorServicoAnuncio: 111213,
      horasServicoAnuncio: 111,
      avaliacaoAnuncioPessoa: 3.0,
      qtdComentariosRealizados: 6,
      nomeCategoriaAnuncio: "Pintura", 
    },
  ]);

  const [relAnunciosFavoritos, setRelAnunciosFavoritos] = useState([ //Informações sobre Meus anúncio Favoritos e Interações que fiz
    {
      idAnuncio: 1,
      idPessoa: 11,
      tituloAnuncio: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      valorServicoAnuncio: 111213,
      horasServicoAnuncio: 111,
      avaliacaoAnuncio: 2.0,
      interacaoMensagem: "Sim",
      avaliacaoAnuncioPessoa: 3.0,
      qtdComentariosRealizados: 6,
      nomeCategoriaAnuncio: "Pintura", 
    },
  ]);

  const { logout, usuario, exibirAlertaSucesso, setExibirAlertaSucesso } =
    useContext(SistemaContext);
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const [erros, setErros] = useState({
    tituloAnuncio: "*Obrigatório",
    sexoPessoa: "*Obrigatório",
    descricaoAnuncio: "*Obrigatório",
    horasServicoAnuncio: "*Obrigatório",
    telefoneCelularPessoa: "*Obrigatório",
    dataNascimentoPessoa: "*Obrigatório",
    codigoUsuarioPessoa: "*Obrigatório",
    senhaUsuarioPessoa: "*Obrigatório",
  });

  useEffect(() => {
    validaToken();
  }, []);

  const validaToken = async () => {
    const response = await verificaTokenValido();

    if (!response.data) {
      logout();
    }
  };

  return (
    <div id="meu-perfil">
      <Navbar />
      <div className="bg-gradient-primary">
        <div className="ListagemAnuncio__pesquisa-container">
          <TextField
            className="ListagemAnuncio__input-pesquisar"
            label="Pesquise aqui"
            type="text"
            name="teste2"
            size="small"
          ></TextField>
          <button
            className="btn btn-warning"
            // onClick={() => AnunciosReport(clientes)}
            onClick={() => setOpenModal(true)}
          >
            Relatório
          </button>
          <MobbFilter valorLabel="Ordenar por" />
        </div>
        <div className="container">
          <div className="card o-hidden border-0   my-5 ">
            {/* shadow-lg */}
            <div className="card-body p-0">
              {" "}
              {/*pode retirar*/}
              <div className="row">
                <div
                  className="col-lg-12"
                  style={{ border: "1px solid lightgray", borderRadius: "5px" }}
                >
                  {" "}
                  {/*col-lg-12"*/}
                  <div className="p-5">
                    {" "}
                    {/*pode retirar*/}
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        O que você está anunciando?
                      </h1>
                    </div>
                    <form onSubmit={() => {}} className="user">
                      <div className="form-group row">
                        <div className="col-lg-6 mb-3 mb-sm-0">
                          <TextField
                            label="Título"
                            className="form-control form-control-user"
                            size="small"
                            maxLength="80"
                            name="tituloAnuncio"
                            id="tituloAnuncio"
                          />
                          <FormHelperText
                            style={
                              erros.tituloAnuncio !== "Ok!"
                                ? { color: "red" }
                                : { color: "green" }
                            }
                            className="helper-text-pessoa"
                          >
                            {erros.tituloAnuncio}
                          </FormHelperText>
                        </div>
                      </div>
                      <div className="form-group row ">
                        <div className="col-lg-12 text-center">
                          <input
                            type="submit"
                            value="Cadastrar"
                            className="btn btn-warning btn-user btn-block"
                            style={{ maxWidth: "600px" }}
                          />
                        </div>
                      </div>

                      <hr />
                      <div className="form-group row ">
                        <div className="col-lg-12 text-center">
                          <input
                            type="button"
                            value="Voltar para o Login"
                            className="btn btn-dark btn-user btn-block"
                            style={{ maxWidth: "600px" }}
                            onClick={() => {
                              navigate("/login");
                            }}
                          />
                        </div>
                      </div>
                    </form>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobbFooter />
      <AnunciosReport
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default MeuPerfil;
