import React, { useContext, useState, useEffect } from "react";
import styles from "./Hero.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import Select from "react-select";
import { SistemaContext } from "../../contexts/Aplicacao/sistema";
import { listaEstados, listaCidades, InserePessoa } from "../../services/Api";

const Hero = () => {
  const { irPara, parametrosBusca, setParametrosBusca, ServicesRefEstados } = useContext(SistemaContext);

  const estadosIniciais = [{ value: 0, label: "" }];
  const cidadesIniciais = [{ value: 0, label: "" }];
  const [estados, setEstados] = useState(estadosIniciais);
  const [idEstado, setIdEstado] = useState(0);
  const [cidades, setCidades] = useState(cidadesIniciais);
  const [valorCidade, setValorCidade] = useState(cidadesIniciais);

  useEffect(() => {
    buscaEstados();
    parametrosBusca.idEstado = 0;
    parametrosBusca.idCidade = 0;
    parametrosBusca.idCategoriaAnuncio = 0;
  }, []);

  useEffect(() => {
    setValorCidade(cidadesIniciais);
    buscaCidades(idEstado);
  }, [idEstado]);

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

  const filtrar = () => {    
    irPara('categorias');
  } 

  const atualizaValores = (e) => {
    console.log(e);
    if (e.hasOwnProperty("ufEstado")){ // Se veio do combo Estado
      setIdEstado(e.value);
      parametrosBusca.idEstado = e.value;
    }else if (e.hasOwnProperty("idEstado")){ //Se veio do Combo Cidade
      setValorCidade({ value: e.value, label: e.label});      
      parametrosBusca.idCidade = e.value;
    }        
  }

  const enviar = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.hero} >
      <form onSubmit={enviar}>
        <div className={styles.from}>
          <span style={{ width: "290px" }}></span>
          <label ref={ServicesRefEstados}>Buscar para o Estado:</label>
          <Select 
            name="categorias"
            id="categorias"
            options={estados}
            placeholder="Selecione..."            
            onChange={(e) => atualizaValores(e)}
            noOptionsMessage={() => "Nenhuma opção encontrada!"}
          />
        </div>
        <div className={styles.from}>
          <span style={{ width: "290px" }}></span>
          <label>Buscar para a Cidade de:</label>
          <Select
            name="idCidade"
            id="idCidade"
            placeholder="Selecione..."
            options={cidades}
            value={valorCidade}            
            onChange={(e) => atualizaValores(e)}
            isDisabled={!idEstado > 0}
            noOptionsMessage={() => "Nenhuma opção encontrada!"}
          />
        </div>
        <div className={styles.search_btn} onClick={() => filtrar()}>
          <button className={styles.btn}>Search for cars</button>
          <AiOutlineSearch size={25} className={styles.icon} />
        </div>
      </form>
    </div>
  );
};

export default Hero;
