import React, { useState, useMemo } from "react";
import "./ArvoreComentarios.css";
import Form from "react-bootstrap/Form";

const getArvore = (lista) => {
  if (!lista) {
    return [];
  }

  const comentariosRaiz = [];
  const respostaPorIdPai = {};

  lista.forEach((item) => {
    if (!item.idComentarioAnuncioPai) {
      comentariosRaiz.push(item);
      return;
    }

    if (!respostaPorIdPai[item.idComentarioAnuncioPai]) {
      respostaPorIdPai[item.idComentarioAnuncioPai] = [];
    }

    respostaPorIdPai[item.idComentarioAnuncioPai].push(item);
  });

  function buildNodes(nodes) {
    if (!nodes) {
      return null;
    }

    return nodes.map((node) => ({
      ...node,
      children: buildNodes(respostaPorIdPai[node.idComentarioAnuncio]),
    }));
  }

  return buildNodes(comentariosRaiz);
};

const ArvoreComentarios = ({ Comentarios, enviarResposta }) => {
  const arvore = useMemo(() => getArvore(Comentarios), [Comentarios]);
  const [comentarioResposta, setComentarioResposta] = useState("");
  const [idCaixaRespostaAtivo, setIdCaixaRespostaAtivo] = useState(null); //Ao passar o id Nulo, ele fecha a caixa de resposta, pois n foi chamada por nenhum item da arvore

  if (!Comentarios) {
    return <di>Carregando...</di>;
  }

  const renderizarItem = (comentario, index) => {
    return (
      <li key={index} className="item">
        <img
          className="avatar"
          src="http://s2.glbimg.com/jsaPuF7nO23vRxQkuJ_V3WgouKA=/e.glbimg.com/og/ed/f/original/2014/06/10/461777879.jpg"
          alt="teste"
        />
        <div className="info">
          <span className="comentarista">{comentario.nomePessoa}</span>
          <p>{comentario.comentario}</p>
          <button className="acoes">
            Excluir
          </button>
          <button
            type="button"
            className="acoes"
            onClick={() => {
              setComentarioResposta("");
              setIdCaixaRespostaAtivo(
                idCaixaRespostaAtivo === comentario.idComentarioAnuncio
                  ? null
                  : comentario.idComentarioAnuncio
              );
            }}
          >
            Responder
          </button>          
          {idCaixaRespostaAtivo === comentario.idComentarioAnuncio && (
            <div className="caixa-comentario">
              <textarea
                value={comentarioResposta}
                onChange={(e) => {
                  setComentarioResposta(e.target.value);
                }}
                className="form-control"
              />
              <button
                type="button"
                className="enviar-resposta btn btn-primary"
                onClick={() => {
                  enviarResposta(
                    comentarioResposta,
                    comentario.idComentarioAnuncio
                  );
                  setComentarioResposta("");
                  setIdCaixaRespostaAtivo(null);
                }}
              >
                Enviar
              </button>
            </div>
          )}
          {comentario.children && renderizarLista(comentario.children)}
        </div>
      </li>
    );
  };

  const renderizarLista = (lista) => {
    return(
      <ul className="arvore-comentarios">
      {lista.map((comentario, index) => renderizarItem(comentario, index))}
    </ul>
    );
  };

  return renderizarLista(arvore);
};

ArvoreComentarios.defaultProps = {
  //Caso não passe esta propriedade nas props, ele pega esse default
  enviarResposta: () => {},
};

export default ArvoreComentarios;
