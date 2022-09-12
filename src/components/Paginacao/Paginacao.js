import React, {useRef} from "react";
import "./Paginacao.css";
import {GrNext, GrPrevious} from 'react-icons/gr';

var MAX_ITENS = 9;

var largura = window.screen.width;

if (largura < 600)
  MAX_ITENS = 3

const MAX_LEFT = (MAX_ITENS - 1) / 2; //Para saber quantos itens mostrar do lado fora o item atual

const Paginacao = ({ limite, total, offset, setOffset }) => {
  const paginaAtual = offset ? offset / limite + 1 : 1; //Se o offset for 0, ele retorna 1, porque sabe que está na prmieira página
  const totalPaginas = Math.ceil(total / limite); //Arredonda para jogar os itens quebrados na próxima página
  const ultimaPagina = Math.max(totalPaginas - (MAX_ITENS - 1), 1);
  const primeiraPagina = Math.min(Math.max(paginaAtual - MAX_LEFT, 1), ultimaPagina);
  const ServicesRefTopo = useRef(document.getElementById('navMobb')); 

  const onPageChange = (pagina) => {        
    setOffset((pagina - 1) * limite);
    
    window.scrollTo({
      top: ServicesRefTopo.current.offsetTop,
      behavior: "smooth",
    }); 
  };

  return (
    <ul className="paginacao">
      <li>
        <button
          onClick={() => onPageChange(paginaAtual - 1)}
          disabled={paginaAtual === 1}
          className="btn"          
        >
          <GrPrevious />          
        </button>
      </li>
      {Array.from({ length: Math.min(MAX_ITENS, totalPaginas) })
        .map((_, index) => index + primeiraPagina)
        .map((pagina) => (
          <li key={pagina}>
            <button
              onClick={() => onPageChange(pagina)}
              className={
                pagina === paginaAtual ? "paginacao__item--ativo" : "btn btn-outline-primary"
              }
            >
              {pagina}
            </button>
          </li>
        ))}
      <li>
        <button
          onClick={() => onPageChange(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas}
          className="btn"          
        >
          <GrNext />
        </button>
      </li>
    </ul>
  );
};

export default Paginacao;
