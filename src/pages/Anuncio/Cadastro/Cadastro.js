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
  listaEstados
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

const CadastroAnuncio = () => {
  const { logout, usuario, exibirAlertaSucesso, setExibirAlertaSucesso } =
    useContext(SistemaContext);
  const { enviarImagens, setCarregando, setImagens, deletaImagensCloudinary } = useContext(CadastroContext);
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

  const estadosIniciais = [{ value: 999, label: "Exterior" }];
  const cidadesIniciais = [{ value: 1, label: "Queiroz" }];

  const [valores, setValores] = useState(valorInicial);
  const [categorias, setCategorias] = useState(categoriasInicial);    
  const [imagensEditar, setImagensEditar] = useState();
  const [estados, setEstados] = useState(estadosIniciais);
  const [idEstado, setIdEstado] = useState(0);
  const [cidades, setCidades] = useState(cidadesIniciais);  
  // const [exibirAlertaSucesso, setExibirAlertaSucesso] = useState(false);
  const {idAnuncio} = useParams();

  useEffect(() => {
    validaToken();

    if (idAnuncio){
      recuperaDadosAnuncio(decryptId(idAnuncio));      
      recuperaImagensAnuncio(decryptId(idAnuncio));
    }
     
    categoriasAnuncio();
    buscaEstados();    
  }, []);

  useEffect(() => {    
    buscaCidades(idEstado);
    setValores({ ...valores, idEstado: idEstado});
  }, [idEstado]);

  console.log("agoraaaa", valores);
  console.log("EDITAR IMAGENSS", imagensEditar);

  const recuperaDadosAnuncio = async (idAnuncio) => {
    const response = await dadosAnuncio(idAnuncio);

    setValores(response.data);
    setIdEstado(response.data.idEstado);
  }

  const recuperaImagensAnuncio = async (idAnuncio) => {
    const response = await dadosAnuncioImagens(idAnuncio);

    setImagensEditar(response.data);
    setImagens(response.data);
  }

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
    }else if (e.hasOwnProperty("idEstado")){      
      setValores({ ...valores, idCidade: e.value, nomeCidade: e.label});
    }else if(e.hasOwnProperty("ufEstado")){
      setValores({ ...valores, idEstado: e.value, nomeEstado: e.label, idCidade: 0, nomeCidade: ""})
      setIdEstado(e.value);      
    } else {
      setValores({ ...valores, idCategoriaAnuncio: e.value, nomeCategoriaAnuncio: e.label });      
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
      if (idAnuncio){                        
        response = await deletaImagensCloudinary();

        if (response){
          console.log("RESPONDEUU", response);
          console.log("RESPONDEUU", { ...jsonEnviar, urlImagensAnuncioDel: response});         
          jsonEnviar = { ...jsonEnviar, urlImagensAnuncioDel: response};
        }

        await AtualizaAnuncio(jsonEnviar);

        //response = await AtualizaAnuncio(jsonEnviar);

        
        
      }else{ //Inserir Anúncio
        
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
        <h1>Cadastro de Anuncio</h1>
        <button onClick={handleLogout}>Sair</button>
        <form onSubmit={cadastrarAnuncio}>
          <div>
            <label htmlFor="categorias">Categoria do Anúncio</label>
            <Select              
              name="categorias"
              id="categorias"
              options={categorias}                                    
              value={{value: valores.idCategoriaAnuncio, label: valores.nomeCategoriaAnuncio}}
              onChange={(e) => atualizaValores(e)}
            />
          </div>
          <div>
            <label htmlFor="tituloAnuncio">Titulo do Anúncio</label>
            <input
              type="text"
              name="tituloAnuncio"
              id="tituloAnuncio"
              onChange={atualizaValores}
              value={valores.tituloAnuncio}
            />
          </div>
          <div>
            <label htmlFor="descricaoAnuncio">Descrição do Anúncio</label>
            <textarea
              name="descricaoAnuncio"
              id="descricaoAnuncio"
              onChange={atualizaValores}
              value={valores.descricaoAnuncio}
            />
          </div>
          <div>
            <label htmlFor="valorServicoAnuncio">Valor do Serviço</label>
            <input
              type="text"
              name="valorServicoAnuncio"
              id="valorServicoAnuncio"
              onChange={atualizaValores}
              value={valores.valorServicoAnuncio}
            />
          </div>
          <div>
            <label htmlFor="horasServicoAnuncio">Horas do Serviço</label>
            <input
              type="number"
              name="horasServicoAnuncio"
              id="horasServicoAnuncio"
              onChange={atualizaValores}
              value={valores.horasServicoAnuncio}
            />
          </div>
          <div>
            <label htmlFor="telefoneContatoAnuncio">Telefone para contato do Anúncio</label>
            <input
              type="text"
              name="telefoneContatoAnuncio"
              id="telefoneContatoAnuncio"
              onChange={atualizaValores}
              value={valores.telefoneContatoAnuncio}
            />
          </div>
          <div>
          <label htmlFor="uf">Estado</label>
            <Select
              name="uf"
              id="uf"
              placeholder="Selecione..."
              // onChange={(e) => setIdEstado(e.value)}
              onChange={(e) => atualizaValores(e)}
              options={estados}
              noOptionsMessage={() => "Nenhuma opção encontrada!"}
              value={{value: valores.idEstado, label: valores.nomeEstado}}
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
              value={{value: valores.idCidade, label: valores.nomeCidade}}
            />
          </div>
          <Container>
            <Content>
              <UploadImagem />
            </Content>
          </Container>
          <input type="submit" value="Cadastrar" />
        </form>
        <Alerta exibir={exibirAlertaSucesso} />
      </div>
      <MobbFooter />
    </>
  );
};

export default CadastroAnuncio;
