import React, { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DropContainer } from "./styles";
import "././UploadImagem.css";
import { CadastroContext } from "../../contexts/Anuncio/cadastro";

const UploadImagem = () => {
  const { onDrop, imagens, setImagens, imagensExcluidas, setImagensExcluidas } = useContext(CadastroContext);


  console.log(imagens);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
  });

  var excluidas = [];

  const removerImagem = (index) => {      
    const items = [...imagens];

    let item = items[index];

    setImagensExcluidas((prevState) => [ ...prevState, item]);

    console.log("EXC", excluidas);

    delete items[index];        
    /*items.forEach((item, index) => {      
      if (!item) {
        delete items[index];
      }      
    });*/
        
    setImagens(items.filter(function (el) {
      return el != null;
    }));
  };

  console.log("EXCLUIDAS", imagensExcluidas);
  console.log("IMAGENSS AGORAAA ", imagens);

  const imagensCadastro = (index, imagem) => {
    //Verifica se existe o idAnuncio, pois se existir é porque veio da Edição
    if ( imagem.hasOwnProperty("idAnuncio")){
      return  <img
                className="imagens-selecionadas"              
                src={imagem.urlImagemAnuncio} 
                key={index}
                onClick={() => removerImagem(index)}
              />
    }else{
      return <img
                className="imagens-selecionadas"
                src={imagem}                
                key={index}
                onClick={() => removerImagem(index)}
             />
    }
  }

  return (
    <>
      <div>
        <div className="dropzone" {...getRootProps()}>
          <DropContainer
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} />
            {isDragAccept && <p>Arquivo aceito</p>}
            {isDragReject && <p>Arquivo não suportado</p>}
            {!isDragActive && <p>Arraste os arquivos aqui ...</p>}
          </DropContainer>
        </div>
        {imagens.length > 0 && (
          <div>
            {imagens.map(
              (imagem, index) =>
                imagem && (
                  imagensCadastro(index, imagem)
                )                
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UploadImagem;
