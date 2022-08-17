import React, { useEffect, useState } from "react";
import Select from "react-select";
import { listaEstados, listaCidades, InserePessoa } from "../../../services/Api";
import { useNavigate } from "react-router-dom";

import "./cadastro.css";

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
  const [valores, setValores] = useState(valorInicial);  
  const [estados, setEstados] = useState(estadosIniciais);
  const [idEstado, setIdEstado] = useState(0);
  const [cidades, setCidades] = useState(cidadesIniciais);  
  const navigate = useNavigate();

  useEffect(() => {    
    buscaEstados();    
  }, []);

  useEffect(() => {    
    buscaCidades(idEstado);
  }, [idEstado]);

  const atualizaValores = (e) => {
    if (e.hasOwnProperty("target")) {
      const { name, value } = e.target;
      setValores({ ...valores, [name]: value });
    } else if (e.value === "F" || e.value === "M") {
      setValores({ ...valores, sexoPessoa: e.value });
    } else {
      setValores({ ...valores, idCidade: e.value });
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

  const cadastraPessoa = async (e) => {
    e.preventDefault();

    const response = await InserePessoa(valores);
    
    if (response){
      console.log("FOIII!")
      navigate("/login");
    }else{
      console.log("NÃOO FOI!");
    }
  };

  return (
    <div id="cadastro-pessoa">
      <h1>Cadastro de Pessoa</h1>
      <form onSubmit={cadastraPessoa}>
        <h3>Dados Pessoais</h3>
        <div>
          <label htmlFor="nomePessoa">Nome</label>
          <input
            type="text"
            maxLength="80"
            name="nomePessoa"
            id="nomePessoa"
            onChange={atualizaValores}
          />
        </div>
        <div>
          <label htmlFor="sexoPessoa">Genero</label>
          <Select
            name="sexoPessoa"
            id="sexoPessoa"
            options={generos}
            onChange={(e) => atualizaValores(e)}
          />
        </div>
        <div>
          <label htmlFor="inscricaoNacionalPessoa">CPF</label>
          <input
            type="text"
            name="inscricaoNacionalPessoa"
            id="inscricaoNacionalPessoa"
            onChange={atualizaValores}
          />
        </div>
        <div>
          <label htmlFor="emailPessoa">E-mail</label>
          <input
            type="email"
            maxLength="80"
            name="emailPessoa"
            id="emailPessoa"
            onChange={atualizaValores}
          />
        </div>
        <div>
          <label htmlFor="telefoneCelularPessoa">Telefone</label>
          <input
            type="tel"
            maxLength="20"
            name="telefoneCelularPessoa"
            id="telefoneCelularPessoa"
            onChange={atualizaValores}
          />
        </div>
        <div>
          <label htmlFor="dataNascimentoPessoa">Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimentoPessoa"
            id="dataNascimentoPessoa"
            onChange={atualizaValores}
          />
        </div>
        <h3>Endereço</h3>         
        <div>
          <label htmlFor="uf">Estado</label>
          <Select
            name="uf"
            id="uf"
            placeholder="Selecione..."
            onChange={(e) => setIdEstado(e.value)}
            options={estados}
            noOptionsMessage={() => "Nenhuma opção encontrada!"}            
          />
        </div>
        <div>
          <label htmlFor="idCidade">Cidade</label>
          <Select
            name="idCidade"
            id="idCidade"
            placeholder="Selecione..."
            options={cidades}
            isDisabled={!idEstado > 0}
            onChange={(e) => atualizaValores(e)}
            noOptionsMessage={() => "Nenhuma opção encontrada!"}
          />
        </div>
        <div>
          <label htmlFor="logradouroEndereco">Logradouro</label>
          <input
            type="text"
            maxLength="100"
            name="logradouroEndereco"
            id="logradouroEndereco"
            onChange={atualizaValores}
          />
        </div>
        <div>
          <label htmlFor="numeroLogradouroEndereco">Número</label>
          <input
            type="text"
            maxLength="10"
            name="numeroLogradouroEndereco"
            id="numeroLogradouroEndereco"
            onChange={atualizaValores}
          />
        </div>
        <div>
          <label htmlFor="bairroEndereco">Bairro</label>
          <input
            type="text"
            maxLength="80"
            name="bairroEndereco"
            id="bairroEndereco"
            onChange={atualizaValores}
          />
        </div>
        <div>
          <label htmlFor="complementoEndereco">Complemento</label>
          <input
            type="text"
            maxLength="80"
            name="complementoEndereco"
            id="complementoEndereco"
            onChange={atualizaValores}
          />
        </div>
        <h3>Usuário</h3>
        <div>
          <label htmlFor="codigoUsuarioPessoa">Código de Usuário</label>
          <input
            type="text"
            maxLength="15"
            name="codigoUsuarioPessoa"
            id="codigoUsuarioPessoa"
            onChange={atualizaValores}
          />
        </div>
        <div>
          <label htmlFor="senhaUsuarioPessoa">Senha</label>
          <input
            type="password"
            maxLength="15"
            name="senhaUsuarioPessoa"
            id="senhaUsuarioPessoa"
            onChange={atualizaValores}
          />
        </div>
        <div>
          <label htmlFor="confirmaSenha">Confirme a Senha</label>
          <input
            type="password"
            maxLength="15"
            name="confirmaSenha"
            id="confirmaSenha"
          />
        </div>
        <br />
        <input className="enviar" type="submit" value="Cadastrar" />
      </form>
    </div>
  );
};

export default CadastroPessoa;
