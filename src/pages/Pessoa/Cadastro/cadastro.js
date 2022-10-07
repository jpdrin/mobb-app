import React, { useEffect, useState } from "react";
import {
  listaEstados,
  listaCidades,
  InserePessoa,
} from "../../../services/Api";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./cadastro.css";
// import Cad from "./cad2";
import MobbSelect from "../../../components/MobbSelect/Select";
import MobbPassword from "../../../components/MobbPassword/MobbPassword";
import {
  cpfMask,
  validaCPF,
  validateEmail,
  telefoneDDIMask,
  validaSenhaForte,
} from "../../../utils/mascarasUtils";
import { FormHelperText } from "@mui/material";
import swal from "sweetalert";

const valorInicial = {
  nomePessoa: "",
  sexoPessoa: "",
  inscricaoNacionalPessoa: "",
  emailPessoa: "",
  telefoneCelularPessoa: "",
  dataNascimentoPessoa: "",
  codigoUsuarioPessoa: "",
  senhaUsuarioPessoa: "",
  idCidade: 0,
  logradouroEndereco: "",
  bairroEndereco: "",
  complementoEndereco: "",
  numeroLogradouroEndereco: "",
};

const estadosIniciais = [{ value: 999, label: "Exterior" }];

const cidadesIniciais = [{ value: 1, label: "Queiroz" }];

const generos = [
  { value: "M", label: "Masculino" },
  { value: "F", label: "Feminino" },
];

const CadastroPessoa = () => {
  // const [valores, setValores] = useState(valorInicial);
  const valores = valorInicial;
  const [estados, setEstados] = useState(estadosIniciais);
  // const [idEstado, setIdEstado] = useState(0);
  // const [cidades, setCidades] = useState(cidadesIniciais);
  const [erros, setErros] = useState({
    nomePessoa: "*Obrigatório",
    sexoPessoa: "*Obrigatório",
    inscricaoNacionalPessoa: "*Obrigatório",
    emailPessoa: "*Obrigatório",
    telefoneCelularPessoa: "*Obrigatório",
    dataNascimentoPessoa: "*Obrigatório",
    codigoUsuarioPessoa: "*Obrigatório",
    senhaUsuarioPessoa: "*Obrigatório",
  });
  const navigate = useNavigate();

  // useEffect(() => {
  //   buscaEstados();
  // }, []);

  // useEffect(() => {
  //   buscaCidades(idEstado);
  // }, [idEstado]);

  const atualizaValores = (e) => {
    if (e.hasOwnProperty("target")) {
      const { name, value } = e.target;

      if (name === "inscricaoNacionalPessoa") {
        valores[name] = cpfMask(value);
      } else if (name === "telefoneCelularPessoa") {
        valores[name] = telefoneDDIMask(value);
      } else {
        valores[name] = value;
      }
    } else if (e.value === "F" || e.value === "M") {
      valores.sexoPessoa = e.value;
    } else {
      valores.idCidade = e.value;
    }

    validaCampos(e);
  };

  const validaCampos = (e) => {
    if (e.hasOwnProperty("target")) {
      const { name, value } = e.target;

      switch (name) {
        case "nomePessoa":
          if (valores.nomePessoa.length < 3)
            setErros({ ...erros, [name]: "Nome Inválido!" });
          else setErros({ ...erros, [name]: "Ok!" });
          break;

        case "inscricaoNacionalPessoa":
          if (!validaCPF(valores.inscricaoNacionalPessoa))
            setErros({ ...erros, [name]: "CPF Inválido!" });
          else setErros({ ...erros, [name]: "Ok!" });
          break;

        case "emailPessoa":
          if (!validateEmail(valores.emailPessoa))
            setErros({ ...erros, [name]: "E-mail Inválido!" });
          else setErros({ ...erros, [name]: "Ok!" });
          break;

        case "telefoneCelularPessoa":
          if (valores.telefoneCelularPessoa.length < 19)
            setErros({ ...erros, [name]: "Telefone Inválido!" });
          else setErros({ ...erros, [name]: "Ok!" });
          break;

        case "dataNascimentoPessoa":
          if (valores.dataNascimentoPessoa === "")
            setErros({ ...erros, [name]: "Data Inválida!" });
          else setErros({ ...erros, [name]: "Ok!" });
          break;

        case "codigoUsuarioPessoa":
          if (valores.codigoUsuarioPessoa.length < 3)
            setErros({
              ...erros,
              [name]:
                "O Código do usuário deve haver pelo menos 3 caracteres !",
            });
          else setErros({ ...erros, [name]: "Ok!" });
          break;

        case "senhaUsuarioPessoa":
          if (!validaSenhaForte(valores.senhaUsuarioPessoa))
            setErros({
              ...erros,
              [name]:
                "Mínimo 8 caracteres, uma letra maiúscula, uma minuscula, um caractere especial e um número!",
            });
          else setErros({ ...erros, [name]: "Ok!" });
          break;
      }
    } else if (e.value === "F" || e.value === "M") {
      setErros({ ...erros, sexoPessoa: "Ok!" });
    }
  };

  /*const buscaEstados = async () => {
    const response = await listaEstados();
    const data = response.data;

    data.forEach((value) => {
      value.value = value.idEstado;
      value.label = value.nomeEstado;

      delete value.idEstado;
      delete value.nomeEstado;
    });

    setEstados(data);
  };*/

  /*const buscaCidades = async (idEstado) => {
    const response = await listaCidades(idEstado);
    const data = response.data;

    data.forEach((value) => {
      value.value = value.idCidade;
      value.label = value.nomeCidade;

      delete value.idCidade;
      delete value.nomeCidade;
    });

    setCidades(data);
  };*/

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

  const cadastraPessoa = async (e) => {
    e.preventDefault();

    if (verificaCamposInvalidos(erros) > 0) return;

    const response = await InserePessoa(valores);

    if (response.status === 200) {
      swal({
        title: "Sucesso!",
        text: "Cadastro realizado com sucesso!",
        icon: "success",
        button: "Fechar",
      });
      console.log("FOIII!");
      console.log(response);
      navigate("/login");
    } else {
      swal({
        title: "Erro!",
        text: response.data,
        icon: "error",
        button: "Fechar",
      });
    }
  };

  console.log(valores);

  return (
    <div>
      <div id="cadastro-pessoa">
        <div className="bg-gradient-primary">
          <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                  <div className="col-lg-7">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">
                          Cadastre-se grátis!
                        </h1>
                      </div>
                      <form onSubmit={cadastraPessoa} className="user">
                        <div className="form-group row">
                          <div className="col-sm-8 mb-3 mb-sm-0">
                            <TextField
                              label="Nome"
                              className="form-control form-control-user"
                              size="small"
                              inputProps={{ maxLength: 80 }}
                              name="nomePessoa"
                              id="nomePessoa"
                              onChange={atualizaValores}
                              onBlur={atualizaValores}
                            />
                            <FormHelperText
                              style={
                                erros.nomePessoa !== "Ok!"
                                  ? { color: "red" }
                                  : { color: "green" }
                              }
                              className="helper-text-pessoa"
                            >
                              {erros.nomePessoa}
                            </FormHelperText>
                          </div>
                          <div className="col-sm-4">
                            <MobbSelect
                              valorLabel="Genero"
                              name="sexoPessoa"
                              id="sexoPessoa"
                              dataOptions={generos}
                              onChange={atualizaValores}
                              focus={atualizaValores}
                            />
                            <FormHelperText
                              style={
                                erros.sexoPessoa !== "Ok!"
                                  ? { color: "red" }
                                  : { color: "green" }
                              }
                              className="helper-text-pessoa"
                            >
                              {erros.sexoPessoa}
                            </FormHelperText>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-sm-5 mb-3 mb-sm-0">
                            <TextField
                              label="CPF"
                              className="form-control form-control-user"
                              size="small"
                              type="text"
                              inputProps={{ maxLength: 11 }}
                              value={valores.inscricaoNacionalPessoa}
                              name="inscricaoNacionalPessoa"
                              id="inscricaoNacionalPessoa"
                              onChange={atualizaValores}
                              onBlur={atualizaValores}
                            />
                            <FormHelperText
                              style={
                                erros.inscricaoNacionalPessoa !== "Ok!"
                                  ? { color: "red" }
                                  : { color: "green" }
                              }
                              className="helper-text-pessoa"
                            >
                              {erros.inscricaoNacionalPessoa}
                            </FormHelperText>
                          </div>
                          <div className="col-sm-7">
                            <TextField
                              label="E-mail"
                              className="form-control form-control-user"
                              size="small"
                              type="email"
                              inputProps={{ maxLength: 80 }}
                              name="emailPessoa"
                              id="emailPessoa"
                              onChange={atualizaValores}
                              onBlur={atualizaValores}
                            />
                            <FormHelperText
                              style={
                                erros.emailPessoa !== "Ok!"
                                  ? { color: "red" }
                                  : { color: "green" }
                              }
                              className="helper-text-pessoa"
                            >
                              {erros.emailPessoa}
                            </FormHelperText>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <TextField
                              label="Telefone"
                              className="form-control form-control-user"
                              size="small"
                              type="text"
                              inputProps={{ maxLength: 20 }}
                              value={valores.telefoneCelularPessoa}
                              name="telefoneCelularPessoa"
                              id="telefoneCelularPessoa"
                              onChange={atualizaValores}
                              onBlur={atualizaValores}
                            />
                            <FormHelperText
                              style={
                                erros.telefoneCelularPessoa !== "Ok!"
                                  ? { color: "red" }
                                  : { color: "green" }
                              }
                              className="helper-text-pessoa"
                            >
                              {erros.telefoneCelularPessoa}
                            </FormHelperText>
                          </div>
                          <div className="col-sm-6">
                            <TextField
                              label="Data Nascimento"
                              className="form-control form-control-user"
                              size="small"
                              type="date"
                              InputLabelProps={{ shrink: true }}
                              name="dataNascimentoPessoa"
                              id="dataNascimentoPessoa"
                              onChange={atualizaValores}
                              onBlur={atualizaValores}
                            />
                            <FormHelperText
                              style={
                                erros.dataNascimentoPessoa !== "Ok!"
                                  ? { color: "red" }
                                  : { color: "green" }
                              }
                              className="helper-text-pessoa"
                            >
                              {erros.dataNascimentoPessoa}
                            </FormHelperText>
                          </div>
                        </div>
                        <div className="form-group">
                          <TextField
                            label="Usuário"
                            className="form-control form-control-user"
                            size="small"
                            type="text"
                            inputProps={{ maxLength: 15 }}
                            name="codigoUsuarioPessoa"
                            id="codigoUsuarioPessoa"
                            onChange={atualizaValores}
                          />
                          <FormHelperText
                            style={
                              erros.codigoUsuarioPessoa !== "Ok!"
                                ? { color: "red" }
                                : { color: "green" }
                            }
                            className="helper-text-pessoa"
                          >
                            {erros.codigoUsuarioPessoa}
                          </FormHelperText>
                        </div>
                        <div className="form-group">
                          <MobbPassword
                            name="senhaUsuarioPessoa"
                            id="senhaUsuarioPessoa"
                            value={valores.senhaUsuarioPessoa}
                            onChange={atualizaValores}
                            onBlur={atualizaValores}
                          />
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
                        <input
                          type="submit"
                          value="Cadastrar"
                          className="btn btn-warning btn-user btn-block"
                          style={{ width: "100%" }}
                        />

                        <hr />
                        <input
                          type="button"
                          value="Voltar para o Login"
                          className="btn btn-dark btn-user btn-block"
                          style={{ width: "100%" }}
                          onClick={() => {
                            navigate("/login");
                          }}
                        />
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
    </div>
  );
};

export default CadastroPessoa;
