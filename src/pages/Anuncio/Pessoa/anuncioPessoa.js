import React, {useState, useEffect, useContext} from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { listaAnunciosPessoa } from "../../../services/Api";
import { useParams, useNavigate } from "react-router-dom";
import { SistemaProvider, SistemaContext } from "../../../contexts/Aplicacao/sistema";
import Card from "../../../components/Anuncio/Card/Card";
import { encryptId } from "../../../utils/cryptoUtils";
import { verificaTokenValido, deletaAnuncio } from "../../../services/Api";

const AnuncioPessoa = () => {
  
  const {usuario, logout} = useContext(SistemaContext);
  const [anuncios, setAnuncios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {      
    validaToken();

    anunciosPessoas();
  }, []);


  const anunciosPessoas = async () => {
    const response = await listaAnunciosPessoa(usuario.idPessoa);

    setAnuncios(response.data);
  }

  const validaToken = async () => {
    const response = await verificaTokenValido();

    if (!response.data) {
      logout();
    }
  };

  const apagaAnuncio = async (idAnuncio) => {
    const response = await deletaAnuncio(idAnuncio);

    if (response){
      navigate("/");
    }    
  }

  console.log(anuncios);

  return(
    <>
      <Navbar />
      
      {anuncios.map((anuncio, index) => (
        <div key={index}>
          <p>{anuncio.idAnuncio}</p>        
          <button onClick={() => navigate(`/editar-anuncio/${encryptId(String(anuncio.idAnuncio))}`)}>Editar</button>
          <button onClick={() => apagaAnuncio(anuncio.idAnuncio)}>Excluir</button>
        </div>
        
      ))}      
    </>
  );
}

export default AnuncioPessoa;