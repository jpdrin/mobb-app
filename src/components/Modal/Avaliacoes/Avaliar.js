import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Avaliacao from "../../Avaliacao/avaliacao";

const Avaliar = ({ openModal, setOpenModal, idAnuncio }) => {
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
          <Form /*onSubmit={InserirComentario}*/>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >              
            </Form.Group>
            <Avaliacao />
            <input type="submit" value="Enviar" className="btn btn-success" />
          </Form>          
        </Modal.Body>
        <Modal.Footer>
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
