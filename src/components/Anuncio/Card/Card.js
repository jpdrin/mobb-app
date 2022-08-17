import react from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css'
import { encryptId } from '../../../utils/cryptoUtils';

const Card = ({ anuncio }) => {
  const navigate = useNavigate();

  return (
    <div className="anuncio-card">
     {/* <img src={anuncio.descricaoAnuncio} alt={anuncio.descricaoAnuncio} className="anuncio-card__image" /> */}
      <div className="anuncio-card__info">
        <h1 className="anuncio-card__title">
          {anuncio.tituloAnuncio}
        </h1>
        <span className="anuncio-card__price">
          R$:{anuncio.descricaoAnuncio}
        </span>
        <footer className="anuncio-card__footer">
          {anuncio.descricaoAnuncio.length > 0 && (
            <div className='anuncio-card__comment'>
              {anuncio.idAnuncio}
            </div>
          )}
          <div className="anuncio-card__comments-count">
            {anuncio.descricaoAnuncio.length}
            {anuncio.descricaoAnuncio.length > 1 ? ' Comentários' : ' Comentário'}
          </div>
          {/* <a href={anuncio.descricaoAnuncio} target="_blank" rel="noreferrer" className="anuncio-card__link">Ir para o Site </a> */}
          <button onClick={() => navigate(`/detalhes/${anuncio.tituloAnuncio}/${encryptId(String(anuncio.idAnuncio))}`)} >IR</button>
        </footer>
      </div> 
    </div>
  );
}

export default Card;