import React, { useState, useEffect, useContext } from "react";
import { SistemaContext } from "../../../contexts/Aplicacao/sistema";
import {
  verificaTokenValido,
  listaCategoriasAnuncio,
  InsereAnuncio,
  dadosAnuncio,
  dadosAnuncioImagens,
  AtualizaAnuncio,
  listaCidades,
  listaEstados,
} from "../../../services/Api";
import Select from "react-select";
import "../Cadastro/cadastro.css";
import UploadImagem from "../../../components/UploadImagem/UploadImagem";
import { Container, Content } from "../../../components/UploadImagem/styles";
import { CadastroContext } from "../../../contexts/Anuncio/cadastro";
import { useNavigate, useParams } from "react-router-dom";
import { decryptId } from "../../../utils/cryptoUtils";
import Navbar from "../../../components/navbar_novo/Navbar";
import MobbFooter from "../../../components/Footer/Footer";
import TextField from "@mui/material/TextField";
import { FormHelperText } from "@mui/material";
import MobbSelect from "../../../components/MobbSelect/Select";
import {
  mascaraMoeda,
  apenasNumeros,
  telefoneDDIMask,
  mascaraMoedaParaDecimalSQL,
} from "../../../utils/mascarasUtils.js";
import Swal from "sweetalert2";

const CadastroAnuncio = () => {
  const { logout, usuario, exibirAlertaSucesso, setExibirAlertaSucesso } =
    useContext(SistemaContext);
  const { enviarImagens, setCarregando, setImagens, deletaImagensCloudinary } =
    useContext(CadastroContext);
  const navigate = useNavigate();

  const valorInicial = {
    idPessoa: usuario.idPessoa,
    idCategoriaAnuncio: 0,
    nomeCategoriaAnuncio: "Selecione...",
    idEstado: 0,
    nomeEstado: "Selecione...",
    idCidade: 0,
    nomeCidade: "",
    tituloAnuncio: "",
    descricaoAnuncio: "",
    valorServicoAnuncio: "",
    horasServicoAnuncio: "",
    telefoneContatoAnuncio: "",
    urlImagensAnuncio: "",
  };

  const categoriasInicial = {
    idCategoriaAnuncio: 0,
    nomeCategoriaAnuncio: "",
  };

  const [erros, setErros] = useState({
    tituloAnuncio: "*Obrigatório",
    descricaoAnuncio: "*Obrigatório",
    valorServicoAnuncio: "*Obrigatório",
    horasServicoAnuncio: "*Obrigatório",
    telefoneContatoAnuncio: "*Obrigatório",
    idCategoriaAnuncio: "*Obrigatório",
    idEstado: "*Obrigatório",
    idCidade: "*Obrigatório",
  });

  const estadosIniciais = [{ value: 999, label: "Exterior" }];
  const cidadesIniciais = [{ value: 1, label: "Queiroz" }];

  const [valores, setValores] = useState(valorInicial);
  const [categorias, setCategorias] = useState(categoriasInicial);
  const [imagensEditar, setImagensEditar] = useState();
  const [estados, setEstados] = useState(estadosIniciais);
  const [idEstado, setIdEstado] = useState(0);
  const [cidades, setCidades] = useState(cidadesIniciais);
  // const [exibirAlertaSucesso, setExibirAlertaSucesso] = useState(false);
  const { idAnuncio } = useParams();

  useEffect(() => {
    validaToken();

    if (idAnuncio) {
      recuperaDadosAnuncio(decryptId(idAnuncio));
      recuperaImagensAnuncio(decryptId(idAnuncio));
    }

    categoriasAnuncio();
    buscaEstados();
  }, []);

  useEffect(() => {
    buscaCidades(idEstado);
    setValores({ ...valores, idEstado: idEstado });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idEstado]);

  //#region Validação dos campos
  useEffect(() => {
    if (valores.tituloAnuncio.length < 4)
      setErros({ ...erros, tituloAnuncio: "Título Inválido!" });
    else setErros({ ...erros, tituloAnuncio: "Ok!" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valores.tituloAnuncio]);

  useEffect(() => {
    if (valores.descricaoAnuncio.length < 10)
      setErros({ ...erros, descricaoAnuncio: "Descrição Inválida!" });
    else setErros({ ...erros, descricaoAnuncio: "Ok!" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valores.descricaoAnuncio]);

  /*useEffect(() => {
    if (mascaraMoedaParaDecimalSQL(valores.valorServicoAnuncio).length < 1)
      setErros({
        ...erros,
        valorServicoAnuncio: "Insira um valor correto!",
      });
    else setErros({ ...erros, valorServicoAnuncio: "Ok!" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valores.valorServicoAnuncio]);*/

  useEffect(() => {
    if (!valores.horasServicoAnuncio > 0)
      setErros({
        ...erros,
        horasServicoAnuncio: "Informe uma quantidade!",
      });
    else setErros({ ...erros, horasServicoAnuncio: "Ok!" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valores.horasServicoAnuncio]);

  useEffect(() => {
    if (valores.telefoneContatoAnuncio.length < 19)
      setErros({ ...erros, telefoneContatoAnuncio: "Telefone Inválido!" });
    else setErros({ ...erros, telefoneContatoAnuncio: "Ok!" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valores.telefoneContatoAnuncio]);

  useEffect(() => {
    if (!valores.idCategoriaAnuncio > 0)
      setErros({ ...erros, idCategoriaAnuncio: "Categoria Inválida!" });
    else setErros({ ...erros, idCategoriaAnuncio: "Ok!" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valores.idCategoriaAnuncio]);

  useEffect(() => {
    if (!idEstado > 0) setErros({ ...erros, idEstado: "*Obrigatório" });
    else setErros({ ...erros, idEstado: "Ok!" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idEstado]);

  useEffect(() => {
    if (!valores.idCidade > 0) setErros({ ...erros, idCidade: "*Obrigatório" });
    else setErros({ ...erros, idCidade: "Ok!" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valores.idCidade]);

  function verificaCamposInvalidos(obj) {
    var camposInvalidos = 0;

    for (var propriedade in obj) {
      if (obj.hasOwnProperty(propriedade)) {
        if (typeof obj[propriedade] == "object") {
          verificaCamposInvalidos(obj[propriedade]);
        } else {
          if (obj[propriedade] !== "Ok!") camposInvalidos += 1;
        }
      }
    }

    return camposInvalidos;
  }
  //#endregion

  // console.log("agoraaaa", valores);
  // console.log("EDITAR IMAGENSS", imagensEditar);

  const recuperaDadosAnuncio = async (idAnuncio) => {
    const response = await dadosAnuncio(idAnuncio);

    setValores(response.data);
    setIdEstado(response.data.idEstado);
  };

  const recuperaImagensAnuncio = async (idAnuncio) => {
    const response = await dadosAnuncioImagens(idAnuncio);

    setImagensEditar(response.data);
    setImagens(response.data);
  };

  const validaToken = async () => {
    const response = await verificaTokenValido();

    if (!response.data) {
      logout();
    }
  };

  const categoriasAnuncio = async () => {
    const response = await listaCategoriasAnuncio();
    const data = response.data;

    data.forEach(function (value) {
      value.value = value.idCategoriaAnuncio;
      value.label = value.nomeCategoriaAnuncio;
      delete value.idCategoriaAnuncio;
      delete value.nomeCategoriaAnuncio;
    });

    setCategorias(data);
  };

  const atualizaValores = (e) => {
    if (e.hasOwnProperty("target")) {
      const { name, value } = e.target;
      if (name === "valorServicoAnuncio") {
        setValores({ ...valores, [name]: mascaraMoeda(value) });
      } else if (name === "horasServicoAnuncio") {
        setValores({ ...valores, [name]: apenasNumeros(value) });
      } else if (name === "telefoneContatoAnuncio") {
        setValores({ ...valores, [name]: telefoneDDIMask(value) });
      } else {
        setValores({ ...valores, [name]: value });
      }
    } else if (e.hasOwnProperty("idEstado")) {
      setValores({ ...valores, idCidade: e.value, nomeCidade: e.label });
    } else if (e.hasOwnProperty("ufEstado")) {
      setValores({
        ...valores,
        idEstado: e.value,
        nomeEstado: e.label,
        idCidade: 0,
        nomeCidade: "",
      });
      setIdEstado(e.value);
    } else {
      setValores({
        ...valores,
        idCategoriaAnuncio: e.value,
        nomeCategoriaAnuncio: e.label,
      });
    }
  };

  const buscaEstados = async () => {
    const response = await listaEstados();
    const data = response.data;

    data.forEach((value) => {
      value.value = value.idEstado;
      value.label = value.nomeEstado;

      delete value.idEstado;
      delete value.nomeEstado;
    });

    setEstados(data);
  };

  const buscaCidades = async (idEstado) => {
    const response = await listaCidades(idEstado);
    const data = response.data;

    data.forEach((value) => {
      value.value = value.idCidade;
      value.label = value.nomeCidade;

      delete value.idCidade;
      delete value.nomeCidade;
    });

    setCidades(data);
  };

  const cadastrarAnuncio = async (e) => {
    e.preventDefault();

    if (verificaCamposInvalidos(erros) > 0) return;

    // setExibirAlertaSucesso(true);
    setCarregando(true);

    var retorno = await enviarImagens();

    if (retorno.OK) {
      if (retorno.urlImagens === "") {
        Swal.fire({
          title: "Aviso!",
          text: "Necessário adicionar ao mínimo uma imagem!",
          icon: "error",
          confirmButtonText: "Fechar",
        });

        setCarregando(false);
        return;
      }

      setValores({ ...valores, urlImagensAnuncio: retorno.urlImagens });
      let jsonEnviar = { ...valores, urlImagensAnuncio: retorno.urlImagens };
      // console.log("URL IMAGENS: ", retorno.urlImagens);

      let response;
      //Editar o Anuncio
      if (idAnuncio) {
        response = await deletaImagensCloudinary();

        if (response) {
          // console.log("RESPONDEUU", response);
          console.log("RESPONDEUU", {
            ...jsonEnviar,
            urlImagensAnuncioDel: response,
          });
          jsonEnviar = { ...jsonEnviar, urlImagensAnuncioDel: response };
        }

        await AtualizaAnuncio(jsonEnviar);

        //response = await AtualizaAnuncio(jsonEnviar);
      } else {
        //Inserir Anúncio
        jsonEnviar = {
          ...jsonEnviar,
          valorServicoAnuncio: mascaraMoedaParaDecimalSQL(
            valores.valorServicoAnuncio
          ),
        };

        response = await InsereAnuncio(jsonEnviar);

        if (response) {
          navigate("/");
          // setExibirAlertaSucesso(true);
        }
      }
    } else {
      console.log("Erro ao cadastrar anuncio");
    }

    setCarregando(false);
  };

  console.log(valores);

  return (
    <>
      <Navbar />
      <div id="cadastro-anuncio">
        {/* <h1>Cadastro de Anuncio</h1> */}
        <div className="bg-gradient-primary ">
          <div className="container ">
            <div className="card o-hidden border-0  my-5 shadow-lg">
              {/* shadow-lg */}
              <div className="card-body p-0">
                {" "}
                {/*pode retirar*/}
                <div className="row">
                  <div
                    className="col-lg-12 "
                    // style={{
                    //   border: "1px solid lightgray",
                    //   borderRadius: "5px",
                    // }}
                  >
                    {" "}
                    {/*col-lg-12"*/}
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">
                          O que você está anunciando?
                        </h1>
                      </div>
                      <form onSubmit={cadastrarAnuncio} className="user ">
                        <div className="form-group row">
                          <div className="col-lg-8 mb-3 mb-sm-0 ">
                            <TextField
                              label="Título"
                              className="form-control form-control-user"
                              size="small"
                              maxLength="80"
                              name="tituloAnuncio"
                              id="tituloAnuncio"
                              onChange={atualizaValores}
                              onBlur={atualizaValores}
                              type="text"
                              value={valores.tituloAnuncio}
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
                        <div className="form-group row">
                          <div className="col-lg-8 mb-3 mb-sm-0">
                            <TextField
                              style={{ width: "100%" }}
                              label="Descrição"
                              multiline
                              rows={4}
                              name="descricaoAnuncio"
                              id="descricaoAnuncio"
                              onChange={atualizaValores}
                              value={valores.descricaoAnuncio}
                            />
                            <FormHelperText
                              style={
                                erros.descricaoAnuncio !== "Ok!"
                                  ? { color: "red" }
                                  : { color: "green" }
                              }
                              className="helper-text-pessoa"
                            >
                              {erros.descricaoAnuncio}
                            </FormHelperText>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-4 mb-3 mb-sm-3">
                            <TextField
                              label="Valor do Serviço"
                              className="form-control form-control-user"
                              size="small"
                              type="text"
                              maxLength="11"
                              value={valores.valorServicoAnuncio}
                              name="valorServicoAnuncio"
                              id="valorServicoAnuncio"
                              onChange={atualizaValores}
                              onBlur={atualizaValores}
                            />
                            <FormHelperText
                              style={
                                erros.valorServicoAnuncio !== "Ok!"
                                  ? { color: "red" }
                                  : { color: "green" }
                              }
                              className="helper-text-pessoa"
                            >
                              {erros.valorServicoAnuncio}
                            </FormHelperText>
                          </div>
                          <div className="col-lg-4">
                            <TextField
                              label="Horas do Serviço"
                              className="form-control form-control-user"
                              size="small"
                              type="text"
                              inputProps={{ maxLength: 5 }}
                              name="horasServicoAnuncio"
                              id="horasServicoAnuncio"
                              onChange={atualizaValores}
                              onBlur={atualizaValores}
                              value={valores.horasServicoAnuncio}
                            />
                            <FormHelperText
                              style={
                                erros.horasServicoAnuncio !== "Ok!"
                                  ? { color: "red" }
                                  : { color: "green" }
                              }
                              className="helper-text-pessoa"
                            >
                              {erros.horasServicoAnuncio}
                            </FormHelperText>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-4 mb-3 mb-sm-3">
                            <TextField
                              label="Telefone"
                              className="form-control form-control-user"
                              size="small"
                              type="text"
                              maxLength="11"
                              value={valores.telefoneContatoAnuncio}
                              name="telefoneContatoAnuncio"
                              id="telefoneContatoAnuncio"
                              onChange={atualizaValores}
                              onBlur={atualizaValores}
                            />
                            <FormHelperText
                              style={
                                erros.telefoneContatoAnuncio !== "Ok!"
                                  ? { color: "red" }
                                  : { color: "green" }
                              }
                              className="helper-text-pessoa"
                            >
                              {erros.telefoneContatoAnuncio}
                            </FormHelperText>
                          </div>
                          <div className="col-lg-4">
                            <MobbSelect
                              valorLabel="Categoria"
                              name="categorias"
                              id="categorias"
                              dataOptions={categorias}
                              defaultValue={{
                                value: valores.idCategoriaAnuncio,
                                label: valores.nomeCategoriaAnuncio,
                              }}
                              onChange={atualizaValores}
                            />
                            <FormHelperText
                              style={
                                erros.idCategoriaAnuncio !== "Ok!"
                                  ? { color: "red" }
                                  : { color: "green" }
                              }
                              className="helper-text-pessoa"
                            >
                              {erros.idCategoriaAnuncio}
                            </FormHelperText>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-lg-4 mb-3 mb-sm-3">
                            <MobbSelect
                              valorLabel="Estado"
                              name="uf"
                              id="uf"
                              dataOptions={estados}
                              onChange={(e) => atualizaValores(e)}
                              defaultValue={{
                                value: valores.idEstado,
                                label: valores.nomeEstado,
                              }}
                            />
                            <FormHelperText
                              style={
                                erros.idEstado !== "Ok!"
                                  ? { color: "red" }
                                  : { color: "green" }
                              }
                              className="helper-text-pessoa"
                            >
                              {erros.idEstado}
                            </FormHelperText>
                          </div>
                          <div className="col-lg-4">
                            <MobbSelect
                              valorLabel="Cidade"
                              name="idCidade"
                              id="idCidade"
                              dataOptions={cidades}
                              disabled={!idEstado > 0}
                              onChange={(e) => atualizaValores(e)}
                              defaultValue={{
                                value: valores.idCidade,
                                label: valores.nomeCidade,
                              }}
                            />
                            <FormHelperText
                              style={
                                erros.idCidade !== "Ok!"
                                  ? { color: "red" }
                                  : { color: "green" }
                              }
                              className="helper-text-pessoa"
                            >
                              {erros.idCidade}
                            </FormHelperText>
                          </div>
                        </div>
                        <div className="form-group row ">
                          <div className="col-lg-12 text-center">
                            <Container>
                              <Content>
                                <UploadImagem />
                              </Content>
                            </Container>
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
                              value="Voltar"
                              className="btn btn-dark btn-user btn-block"
                              style={{ maxWidth: "600px" }}
                              onClick={() => {
                                navigate("/");
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
      </div>
      <MobbFooter />
    </>
  );
};

export default CadastroAnuncio;
