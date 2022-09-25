import React, { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { dadosComentarios, InsereComentario, deletaComentarioAnuncio } from "../../../services/Api.js";
import ArvoreComentarios from "./Tree/ArvoreComentarios.js";
import Form from "react-bootstrap/Form";
import { SistemaContext } from "../../../contexts/Aplicacao/sistema";
import {
  FaceRetouchingNaturalTwoTone,
  RemoveCircleOutlineRounded,
} from "@mui/icons-material";
import Swal from "sweetalert2";

const Comentarios = ({
  openModal,
  setOpenModal,
  idAnuncio,
  realizaComentario,
  idPessoaLogada
}) => {
  const [comentarios, setComentarios] = useState([]);
  const [comentario, setComentario] = useState("");
  const { usuario } = useContext(SistemaContext);

  useEffect(() => {
    listaComentarios(idAnuncio);
  }, []);

  const listaComentarios = async (idAnuncio) => {
    const response = await dadosComentarios(idAnuncio);
    setComentarios(response.data);
  };

  console.log(comentarios);

  const InserirComentario = async (e) => {
    e.preventDefault();

    if (comentario === "") {
      alert("não pode ser vazio");
      return;
    }

    const jsonEnviar = {
      idAnuncio: parseInt(idAnuncio),
      idPessoa: usuario.idPessoa,
      comentario: comentario,
      idComentarioAnuncioPai: 0,
    };
    const response = await InsereComentario(jsonEnviar);

    if (response) {
      console.log("Inserido com sucesso!");
      setComentario("");
      listaComentarios(idAnuncio);
    } else {
      console.log("Erro ao inserir");
    }
  };

  const InserirComentarioResposta = async (comentarioResposta, parentId) => {
    if (comentarioResposta === "") {
      alert("Não pode ser vazio");
      return;
    }

    const jsonEnviar = {
      idAnuncio: parseInt(idAnuncio),
      idPessoa: usuario.idPessoa,
      comentario: comentarioResposta,
      idComentarioAnuncioPai: parentId,
    };
    const response = await InsereComentario(jsonEnviar);

    if (response) {
      console.log("Inserido com sucesso!");
      setComentario("");
      listaComentarios(idAnuncio);
    } else {
      console.log("Erro ao inserir");
    }
  };

  const excluirCometario = async (idComentario) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Deseja realmente excluir este comentário?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim, excluir!",
    }).then((result) => {
      if (result.value) {
        deletaComentarioAnuncio(idComentario).then((response) => {
          listaComentarios(idAnuncio);          
          Swal.fire({
            title: "Sucesso!",
            text: "Comentário excluído!",
            icon: "success",
            confirmButtonText: "Fechar",
          });
        });
      }
    });
  };  

  return (
    <Modal
      // fadeInDown
      aria-labelledby="example-modal-sizes-title-lg"
      show={openModal}
      animation={false}
      backdrop={true}
      onHide={() => setOpenModal(false)}
      size="lg"
      style={{ height: "500px" }}
      centered
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Comentários
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {realizaComentario && (
          <Form onSubmit={InserirComentario}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Escreva um comentário:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                autoFocus
                onChange={(e) => setComentario(e.target.value)}
                value={comentario}
              />
            </Form.Group>
            <input type="submit" value="Enviar" className="btn btn-success" />
          </Form>
        )}
        <ArvoreComentarios
          Comentarios={comentarios}
          enviarResposta={InserirComentarioResposta}
          excluirCometario={excluirCometario}
          idPessoaLogada={idPessoaLogada}
        />
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-danger" onClick={() => setOpenModal(false)}>
          Cancelar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default Comentarios;
