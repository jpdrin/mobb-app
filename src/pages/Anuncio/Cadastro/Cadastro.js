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
import Alerta from "../../../components/Alerta/alerta";
import { decryptId } from "../../../utils/cryptoUtils";
import Navbar from "../../../components/navbar_novo/Navbar";
import MobbFooter from "../../../components/Footer/Footer";
import TextField from "@mui/material/TextField";
import { FormHelperText } from "@mui/material";
import MobbSelect from "../../../components/MobbSelect/Select";
import MobbPassword from "../../../components/MobbPassword/MobbPassword";

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
    sexoPessoa: "*Obrigatório",
    descricaoAnuncio: "*Obrigatório",
    horasServicoAnuncio: "*Obrigatório",
    telefoneCelularPessoa: "*Obrigatório",
    dataNascimentoPessoa: "*Obrigatório",
    codigoUsuarioPessoa: "*Obrigatório",
    senhaUsuarioPessoa: "*Obrigatório",
  });

  const generos = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Feminino" },
  ];

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
  }, [idEstado]);

  console.log("agoraaaa", valores);
  console.log("EDITAR IMAGENSS", imagensEditar);

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

  const handleLogout = () => {
    logout();
  };

  const atualizaValores = (e) => {
    if (e.hasOwnProperty("target")) {
      const { name, value } = e.target;
      setValores({ ...valores, [name]: value });
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
    // setExibirAlertaSucesso(true);
    setCarregando(true);

    var retorno = await enviarImagens();

    if (retorno.OK) {
      setValores({ ...valores, urlImagensAnuncio: retorno.urlImagens });
      let jsonEnviar = { ...valores, urlImagensAnuncio: retorno.urlImagens };
      console.log("URL IMAGENS: ", retorno.urlImagens);

      let response;
      //Editar o Anuncio
      if (idAnuncio) {
        response = await deletaImagensCloudinary();

        if (response) {
          console.log("RESPONDEUU", response);
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

        response = await InsereAnuncio(jsonEnviar);

        if (response) {
          navigate("/");
          setExibirAlertaSucesso(true);
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
            <div className="card o-hidden border-0  my-5 ">
              {/* shadow-lg */}
              <div className="card-body p-0"> {/*pode retirar*/}
              <div className="row">
                <div className="col-lg-12 " style={{border: "1px solid lightgray", borderRadius: "5px"}}>
                  {" "}
                  {/*col-lg-12"*/}
                  <div className="p-5"> {/*pode retirar, acho que esse é o padding da pagina*/}
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">
                      O que você está anunciando?
                    </h1>
                  </div>
                  <form onSubmit={() => {}} className="user ">
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
                        {/* <TextField
                        label="Descrição"
                        className="form-control form-control-user"
                        size="small"
                        type="text"
                        maxLength="11"
                        value={valores.descricaoAnuncio}
                        name="descricaoAnuncio"
                        id="descricaoAnuncio"
                        onChange={atualizaValores}
                        onBlur={atualizaValores}
                      /> */}
                        <TextField
                          style={{ width: "100%" }}
                          id="outlined-multiline-static"
                          label="Descrição"
                          multiline
                          rows={4}
                          defaultValue="Default Value"
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
                      {/* <div className="col-sm-7">
                            <TextField
                              label="E-mail"
                              className="form-control form-control-user"
                              size="small"
                              type="email"
                              maxLength="80"
                              name="horasServicoAnuncio"
                              id="horasServicoAnuncio"
                              onChange={atualizaValores}
                              onBlur={atualizaValores}
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
                          </div> */}
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
                            erros.horasServicoAnuncio !== "Ok!"
                              ? { color: "red" }
                              : { color: "green" }
                          }
                          className="helper-text-pessoa"
                        >
                          {erros.horasServicoAnuncio}
                        </FormHelperText>
                      </div>
                      <div className="col-lg-4">
                        <TextField
                          label="Horas do Serviço"
                          className="form-control form-control-user"
                          size="small"
                          type="email"
                          maxLength="80"
                          name="horasServicoAnuncio"
                          id="horasServicoAnuncio"
                          onChange={atualizaValores}
                          onBlur={atualizaValores}
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
                            erros.horasServicoAnuncio !== "Ok!"
                              ? { color: "red" }
                              : { color: "green" }
                          }
                          className="helper-text-pessoa"
                        >
                          {erros.horasServicoAnuncio}
                        </FormHelperText>
                      </div>
                      <div className="col-lg-4">
                        <MobbSelect
                          valorLabel="Categoria"
                          name="categorias"
                          id="categorias"
                          dataOptions={generos}
                          onChange={atualizaValores}
                          focus={atualizaValores}
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
                      <div className="col-lg-4 mb-3 mb-sm-0">
                        <label htmlFor="uf">Estado</label>
                        <Select
                          name="uf"
                          id="uf"
                          placeholder="Selecione..."
                          // onChange={(e) => setIdEstado(e.value)}
                          onChange={(e) => atualizaValores(e)}
                          options={estados}
                          noOptionsMessage={() => "Nenhuma opção encontrada!"}
                          value={{
                            value: valores.idEstado,
                            label: valores.nomeEstado,
                          }}
                        />
                      </div>
                      <div className="col-lg-4">
                        <label htmlFor="idCidade">Cidade</label>
                        <Select
                          name="idCidade"
                          id="idCidade"
                          placeholder="Selecione..."
                          options={cidades}
                          isDisabled={!idEstado > 0}
                          onChange={(e) => atualizaValores(e)}
                          noOptionsMessage={() => "Nenhuma opção encontrada!"}
                          value={{
                            value: valores.idCidade,
                            label: valores.nomeCidade,
                          }}
                        />
                      </div>
                      <FormHelperText
                        style={
                          erros.senhaUsuarioPessoa !== "Ok!"
                            ? { color: "red" }
                            : { color: "green" }
                        }
                        className="helper-text-pessoa"
                      >
                        {erros.senhaUsuarioPessoa}
                      </FormHelperText>
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
                  {/* <div className="text-center">
                      <a className="small" href="forgot-password.html">
                        Esqueceu sua senha?
                      </a>
                    </div> */}
                  {/* <div className="text-center">
                      <a className="small" href="login.html">
                        Já possui cadastro? Login!
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
      <MobbFooter />
    </>
  );
};

export default CadastroAnuncio;
