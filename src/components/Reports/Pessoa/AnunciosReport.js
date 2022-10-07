import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import TextField from "@mui/material/TextField";
import "./AnunciosReport.css";
import {
  formataValorBR,
  telefoneDDIMask,
  dataFormatadaBR,
} from "../../../utils/mascarasUtils";
import MobbSelect from "../../MobbSelect/Select";
import {
  listaCategoriasAnuncio,
  relAnunciosCadastrados,
  relInteracoesAnunciosCadastrados,
  relInteracoesAnunciosFavPessoa,
} from "../../../services/Api.js";
import Swal from "sweetalert2";

const AnunciosCadastradosReport = (anuncios) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: "Relatório - Meus anúncios cadastrados",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45], // left, top, right, bottom
    },
  ];

  const dados = anuncios.map((anuncio) => {
    return [
      { text: anuncio.tituloAnuncio, fontSize: 9, margin: [0, 2, 0, 2] },
      {
        text:
          formataValorBR(anuncio.valorServicoAnuncio) +
          " a cada " +
          anuncio.horasServicoAnuncio +
          " " +
          (anuncio.horasServicoAnuncio > 1 ? "Horas" : "Hora"),
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.avaliacaoAnuncio,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.dataCadastroAnuncio
          ? dataFormatadaBR(anuncio.dataCadastroAnuncio)
          : "",
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.telefoneContatoAnuncio
          ? telefoneDDIMask(anuncio.telefoneContatoAnuncio)
          : "",
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.nomeCidade + "-" + anuncio.ufEstado,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.nomeCategoriaAnuncio,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
    ];
  });

  const details = [
    {
      table: {
        headerRows: 1,
        widths: [180, 110, 45, 55, 90, 110, "*"],
        body: [
          [
            { text: "Título", style: "tableHeader", fontSize: 10 },
            { text: "Valor/ Qtd. Hora", style: "tableHeader", fontSize: 10 },
            { text: "Avaliação", style: "tableHeader", fontSize: 10 },
            { text: "Data do Cadastro", style: "tableHeader", fontSize: 10 },
            { text: "Tel. Contato", style: "tableHeader", fontSize: 10 },
            { text: "Cidade", style: "tableHeader", fontSize: 10 },
            { text: "Categoria", style: "tableHeader", fontSize: 10 },
          ],
          ...dados,
        ],
      },
      layout: "lightHorizontalLines", // headerLineOnly
    },
  ];

  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + " / " + pageCount,
        alignment: "right",
        fontSize: 9,
        margin: [0, 10, 20, 0], // left, top, right, bottom
      },
    ];
  }

  const docDefinitions = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],
    pageOrientation: "landscape",
    header: [reportTitle],
    content: [details],
    footer: Rodape,
  };

  // pdfMake.createPdf(docDefinitios).download();
  pdfMake.createPdf(docDefinitions).open();
};

const InteracoesAnunciosCadastradosReport = (anuncios) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: "Relatório - Interações dos Meus Anúncios Cadastrados",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45], // left, top, right, bottom
    },
  ];

  const dados = anuncios.map((anuncio) => {
    return [
      { text: anuncio.tituloAnuncio, fontSize: 9, margin: [0, 2, 0, 2] },
      {
        text:
          formataValorBR(anuncio.valorServicoAnuncio) +
          " a cada " +
          anuncio.horasServicoAnuncio +
          " " +
          (anuncio.horasServicoAnuncio > 1 ? "Horas" : "Hora"),
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.avaliacaoAnuncio,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.dataCadastroAnuncio,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.elefoneContatoAnuncio
          ? telefoneDDIMask(anuncio.elefoneContatoAnuncio)
          : "",
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.nomeCategoriaAnuncio,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.nomeCategoriaAnuncio,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.nomeCategoriaAnuncio,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
    ];
  });

  const details = [
    {
      table: {
        headerRows: 1,
        widths: [150, 110, 45, 55, 75, 75, 80, "*"],
        body: [
          [
            { text: "Título", style: "tableHeader", fontSize: 10 },
            { text: "Valor/ Qtd. Hora", style: "tableHeader", fontSize: 10 },
            { text: "Avaliação", style: "tableHeader", fontSize: 10 },
            { text: "Data do Cadastro", style: "tableHeader", fontSize: 10 },
            {
              text: "Quantidade de Mensagens Recebidas",
              style: "tableHeader",
              fontSize: 10,
            },
            {
              text: "Quantidade de Comentários",
              style: "tableHeader",
              fontSize: 10,
            },
            { text: "Tel. Contato", style: "tableHeader", fontSize: 10 },
            { text: "Categoria", style: "tableHeader", fontSize: 10 },
          ],
          ...dados,
        ],
      },
      layout: "lightHorizontalLines", // headerLineOnly
    },
  ];

  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + " / " + pageCount,
        alignment: "right",
        fontSize: 9,
        margin: [0, 10, 20, 0], // left, top, right, bottom
      },
    ];
  }

  const docDefinitions = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],
    pageOrientation: "landscape",
    header: [reportTitle],
    content: [details],
    footer: Rodape,
  };

  // pdfMake.createPdf(docDefinitios).download();
  pdfMake.createPdf(docDefinitions).open();
};

/*const AnunciosInteragidosReport = (anuncios) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: "Relatório - Anúncios Interagidos",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45], // left, top, right, bottom
    },
  ];

  const dados = anuncios.map((anuncio) => {
    return [
      { text: anuncio.tituloAnuncio, fontSize: 9, margin: [0, 2, 0, 2] },
      {
        text:
          formataValorBR(anuncio.valorServicoAnuncio) +
          " a cada " +
          anuncio.horasServicoAnuncio +
          " " +
          (anuncio.horasServicoAnuncio > 1 ? "Horas" : "Hora"),
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.avaliacaoAnuncioPessoa,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.qtdComentariosRealizados,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.nomeCategoriaAnuncio,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
    ];
  });

  const details = [
    {
      table: {
        headerRows: 1,
        widths: [170, 140, 50, 60, "*"],
        body: [
          [
            { text: "Título", style: "tableHeader", fontSize: 10 },
            { text: "Valor/ Qtd. Hora", style: "tableHeader", fontSize: 10 },
            { text: "Minha Avaliação", style: "tableHeader", fontSize: 10 },
            {
              text: "Quantiade de Comentários Realizados",
              style: "tableHeader",
              fontSize: 10,
            },
            { text: "Categoria", style: "tableHeader", fontSize: 10 },
          ],
          ...dados,
        ],
      },
      layout: "lightHorizontalLines", // headerLineOnly
    },
  ];

  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + " / " + pageCount,
        alignment: "right",
        fontSize: 9,
        margin: [0, 10, 20, 0], // left, top, right, bottom
      },
    ];
  }

  const docDefinitions = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],
    // pageOrientation: "landscape",
    header: [reportTitle],
    content: [details],
    footer: Rodape,
  };

  // pdfMake.createPdf(docDefinitios).download();
  pdfMake.createPdf(docDefinitions).open();
};*/

const AnunciosFavoritosReport = (anuncios) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: "Relatório - Anúncios Favoritos",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45], // left, top, right, bottom
    },
  ];

  const dados = anuncios.map((anuncio) => {
    return [
      { text: anuncio.tituloAnuncio, fontSize: 9, margin: [0, 2, 0, 2] },
      {
        text:
          formataValorBR(anuncio.valorServicoAnuncio) +
          " a cada " +
          anuncio.horasServicoAnuncio +
          " " +
          (anuncio.horasServicoAnuncio > 1 ? "Horas" : "Hora"),
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.avaliacaoAnuncio,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.interacaoMensagem,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.avaliacaoAnuncioPessoa,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.qtdComentariosRealizados,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.nomeCidade + " - " + anuncio.ufEstado,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: anuncio.nomeCategoriaAnuncio,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
    ];
  });

  const details = [
    {
      table: {
        headerRows: 1,
        widths: [150, 110, 60, 60, 60, 60, 80, "*"],
        body: [
          [
            { text: "Título", style: "tableHeader", fontSize: 10 },
            { text: "Valor/ Qtd. Hora", style: "tableHeader", fontSize: 10 },
            {
              text: "Avaliação do Anúncio",
              style: "tableHeader",
              fontSize: 10,
            },
            {
              text: "Interação de Mensagem",
              style: "tableHeader",
              fontSize: 10,
            },
            {
              text: "Minha Avaliação no Anúncio",
              style: "tableHeader",
              fontSize: 10,
            },
            {
              text: "Quantiade de Comentários Realizados",
              style: "tableHeader",
              fontSize: 10,
            },
            { text: "Cidade", style: "tableHeader", fontSize: 10 },
            { text: "Categoria", style: "tableHeader", fontSize: 10 },
          ],
          ...dados,
        ],
      },
      layout: "lightHorizontalLines", // headerLineOnly
    },
  ];

  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + " / " + pageCount,
        alignment: "right",
        fontSize: 9,
        margin: [0, 10, 20, 0], // left, top, right, bottom
      },
    ];
  }

  const docDefinitions = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],
    pageOrientation: "landscape",
    header: [reportTitle],
    content: [details],
    footer: Rodape,
  };

  // pdfMake.createPdf(docDefinitios).download();
  pdfMake.createPdf(docDefinitions).open();
};

const categoriasInicial = {
  value: 0,
  label: "Todas",
};

const tiposRelatório = [
  {
    value: 1,
    label: "Dados Cadastrais dos Meus Anúncios",
  },
  {
    value: 2,
    label: "Interações em Meus Anúncios",
  },
  {
    value: 3,
    label: "Dados Interações em Meus Anúncios Favoritos",
  },
];

const AnunciosReport = ({ openModal, setOpenModal, anuncios }) => {
  const [tipoRelatorio, setTipoRelatorio] = useState(0);
  const [categorias, setCategorias] = useState(categoriasInicial);

  const [dataInicial, setDataInicial] = useState("2020-01-01");
  const [dataFinal, setDataFinal] = useState("2999-12-31");
  const [avaliacaoInicial, setAvaliacaoInicial] = useState(0);
  const [avaliacaoFinal, setAvaliacaoFinal] = useState(5);

  console.log(dataInicial);

  useEffect(() => {
    categoriasAnuncio();
  }, []);

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

  console.log(categorias);

  const geraRelatorio = async () => {
    var response;

    switch (tipoRelatorio) {
      case 1:
        response = await relAnunciosCadastrados(
          11,
          0,
          dataInicial,
          dataFinal,
          avaliacaoInicial,
          avaliacaoFinal
        );

        AnunciosCadastradosReport(response.data);
        break;

      case 2:
        response = await relInteracoesAnunciosCadastrados(
          11,
          0,
          dataInicial,
          dataFinal,
          avaliacaoInicial,
          avaliacaoFinal
        );
        console.log(response.data);
        InteracoesAnunciosCadastradosReport(response.data);
        break;

      case 3:
        response = await relInteracoesAnunciosFavPessoa(
          11,
          0,
          dataInicial,
          dataFinal,
          avaliacaoInicial,
          avaliacaoFinal
        );
        console.log(response.data);
        AnunciosFavoritosReport(response.data);
        break;

      default:
        Swal.fire({
          title: "Aviso!",
          text: "Selecione o Tipo de Relatório desejado!",
          icon: "warning",
          confirmButtonText: "Fechar",
        });
        break;
    }
  };

  const fechaModal = () => {
    setTipoRelatorio(0);
    setOpenModal(false);
  }

  return (
    <div>
      <Modal
        aria-labelledby="example-modal-sizes-title-lg"
        show={openModal}
        animation={false}
        backdrop={true}
        onHide={() => fechaModal()}
        size="md"
        style={{ height: "500px" }}
        centered
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Relatórios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="my-4">
              <div className="Anuncio-Report_grupo-form">
                <div className="AnuncioReport__grupo-filtro">
                  <TextField
                    className="AnuncioReport__campo-filtro-data"
                    label="Data do Cadastro Inicial"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    name="dataCadastroInicial"
                    size="small"
                    // value={dataInicial}
                    // onChange={(e) => setDataInicial(e.target.value)}
                    onBlur={(e) => setDataInicial(e.target.value)}
                  />
                </div>
                <div className="AnuncioReport__grupo-filtro">
                  <TextField
                    className="AnuncioReport__campo-filtro-data"
                    label="Data do Cadastro Final"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    name="dataCadastroFinal"
                    size="small"
                    // onChange={(e) => setDataFinal(e.target.value)}
                    onBlur={(e) => setDataFinal(e.target.value)}
                  />
                </div>
              </div>
              <div className="Anuncio-Report_grupo-form">
                <div className="AnuncioReport__grupo-filtro">
                  <TextField
                    className="AnuncioReport__campo-filtro"
                    label="Avaliação Inicial"
                    type="text"
                    name="avaliacaoInicial"
                    size="small"
                    value={avaliacaoInicial}
                    onChange={(e) => setAvaliacaoInicial(e.target.value)}
                  />
                </div>
                <div className="AnuncioReport__grupo-filtro">
                  <TextField
                    className="AnuncioReport__campo-filtro"
                    label="Avaliação Final"
                    type="text"
                    name="avaliacaoFinal"
                    max="5"
                    size="small"
                    value={avaliacaoFinal}
                    onChange={(e) => setAvaliacaoFinal(e.target.value)}
                  />
                </div>
              </div>
              <div className="Anuncio-Report_grupo-form">
                <div className="AnuncioReport__grupo-filtro">
                  <MobbSelect
                    style={{ width: "80%" }}
                    valorLabel="Categoria"
                    name="categorias"
                    id="categorias"
                    dataOptions={categorias}
                    // defaultValue={{
                    //   value: valores.idCategoriaAnuncio,
                    //   label: valores.nomeCategoriaAnuncio,
                    // }}
                    // onChange={atualizaValores}
                  />
                </div>
              </div>
              <div className="Anuncio-Report_grupo-form">
                <div className="AnuncioReport__grupo-filtro">
                  <MobbSelect
                    valorLabel="Tipo do Relatório"
                    name="tipoRelatorio"
                    id="tipoRelatorio"
                    dataOptions={tiposRelatório}
                    onChange={(e) => setTipoRelatorio(e.value)}
                    // focus={atualizaValores}
                  />
                </div>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success" onClick={() => geraRelatorio()}>
            Gerar PDF
          </button>
          <button
            className="btn btn-danger"
            onClick={() => fechaModal()}
          >
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AnunciosReport;
