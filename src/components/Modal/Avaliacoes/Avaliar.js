import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Avaliacao from "../../Avaliacao/avaliacao";
import { InsereAvaliacaoAnuncio } from "../../../services/Api";
import swal from "sweetalert";

const Avaliar = ({ openModal, setOpenModal, idAnuncio, idPessoa, avaliacaoAnterior }) => {
  const [avaliacao, setAvaliacao] = useState(2);
  const [hover, setHover] = useState(-1);

  const insereAvaliacao = async () => {    
    if (avaliacao === 0){
      swal({
        title: "Erro!",
        text: "Por favor, insira uma nota válida!",
        icon: "error",
        button: "Fechar",
      });
      return;
    }    
      
    console.log(avaliacao);
    const response = await InsereAvaliacaoAnuncio(
      idAnuncio,
      idPessoa,
      avaliacao === null ? 0 : avaliacao //Se o valor da Avaliação for NULL, é porque definiu 0
    );

    if (response) {
      swal({
        title: "Sucesso!",
        text: "Avaliação enviada!",
        icon: "success",
        button: "Fechar",
      });

      setOpenModal(false);
    }
  };

  return (
    <div>
      <Modal
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
            Avaliação do Anúncio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            ></Form.Group>
            <Avaliacao
              valor={avaliacao}
              setValor={setAvaliacao}
              hover={hover}
              setHover={setHover}
              avaliacaoAnterior={avaliacaoAnterior}
              openModal={openModal}
            />            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-success"
            onClick={() => insereAvaliacao()}
          >
            Avaliar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setOpenModal(false)}
          >
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Avaliar;
