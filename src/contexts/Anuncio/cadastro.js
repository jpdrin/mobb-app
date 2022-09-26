import React, { useState, useCallback, createContext, useEffect } from "react";
import { InsereImagem, deletaImagemCloudinary } from "../../services/Api";
import Loading from "../../components/Loading/loading";
import Swal from "sweetalert2";

export const CadastroContext = createContext();

export const CadastroProvider = ({ children }) => {
  const [imagens, setImagens] = useState([]);
  const [imagensExcluidas, setImagensExcluidas] = useState([]);
  const [carregando, setCarregando] = useState(false);

  var urlImagensEnviadas = "";

  const onDrop = useCallback(
    (arquivosAceitos, arquivosRejeitados) => {
      if (arquivosAceitos.length + imagens.length > 5) {
        console.log("MAXIMO DE IMAGENS PERMITIDO");
        Swal.fire({
          title: "Aviso!",
          text: "É permitido adicionar apenas 5 imagens!",
          icon: "error",
          confirmButtonText: "Fechar",
        });
      } else {
        if (arquivosAceitos.length > 5) {
          console.log(arquivosAceitos.length);
          console.log("MAXIMO DE IMAGENS PERMITIDO");
          Swal.fire({
            title: "Aviso!",
            text: "É permitido adicionar apenas 5 imagens!",
            icon: "error",
            confirmButtonText: "Fechar",
          });
        } else {
          //Convertendo para Base64
          arquivosAceitos.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
              setImagens((prevState) => [...prevState, reader.result]);
            };
            reader.readAsDataURL(file);
          });
        }
      }

      console.log("Arquivos Aceitos", arquivosAceitos);
      console.log("Arquivos Rejeitados", arquivosRejeitados);
    },
    [imagens]
  );

  const enviarImagens = async () => {    
    console.log("Fazendo o upload...");

    if (imagens.length > 0) {
      const response = await InsereImagem(imagens);

      if (!response) {        
        console.log("Erro ao realizar o Upload");
        setCarregando(false);
        return;
      } else {
        console.log("Upload realizado com sucesso!", response);
        setImagens([]);

        urlImagensEnviadas = "[";
        response.forEach((url, index) => {                              
          //urlImagensEnviadas = urlImagensEnviadas + url.url + ",";
          urlImagensEnviadas = urlImagensEnviadas.concat(`{"url": "${url.url}", "public_id": "${url.public_id}"}`);

          //Verifica se não é a última linha
          if ((index !== (response.length - 1)))
            urlImagensEnviadas = urlImagensEnviadas.concat(", ");          
          
        });

        urlImagensEnviadas = urlImagensEnviadas.concat("]");        

        return { OK: true, urlImagens: urlImagensEnviadas };
      }
    } else {      
      return { OK: true, urlImagens: urlImagensEnviadas };
    }    
  };

  const deletaImagensCloudinary = async () => {
    var imagensDeleteBanco = [];    
    
    for (let img of imagensExcluidas){
      console.log("PARA DEL ", img.publicIdCloudinaryImagemAnuncio);      
      const response = await deletaImagemCloudinary(img.publicIdCloudinaryImagemAnuncio);
      
      if (response[0].result === 'ok'){
        imagensDeleteBanco.push(img);
        console.log("PARA DEL A", imagensDeleteBanco);
      }      
    }
    return JSON.stringify(imagensDeleteBanco);        
  }

  return (
    <CadastroContext.Provider
      value={{
        onDrop,
        enviarImagens,
        imagens,
        setImagens,
        urlImagensEnviadas,
        setCarregando,
        imagensExcluidas,
        setImagensExcluidas,
        deletaImagensCloudinary
      }}
    >
      {children}
      <Loading carregando={carregando} />
    </CadastroContext.Provider>
  );
};
