import axios from "axios";

export const Api = axios.create({
  baseURL: "https://localhost:7208/api/",
  // baseURL: "http://mobbwebapi.us-east-1.elasticbeanstalk.com/api/",  
});

//Login
export const createSession = async (codigoUsuarioPessoa, senhaPessoa) => {
  return Api.post("Pessoas/login", { codigoUsuarioPessoa, senhaPessoa })
    .then((response) => {
      return response;
    })
    .catch((ex) => {
      return ex.response;
    });
};

//Verifica se o Token ainda é válido
export const verificaTokenValido = async () => {
  return Api.get("Pessoas/authenticated");
};

//Retornar os dados da Categoria do Anúncio
export const listaCategoriasAnuncio = async () => {
  return Api.get("Anuncios/lista-categorias-anuncio");
};

//Retorna os anúncios da Pessoa
export const listaAnunciosPessoa = async (idPessoa) => {
  return Api.get(`Anuncios/lista-anuncios-pessoa/${idPessoa}`);
};

//Insere o anúncio
export const InsereAnuncio = async (json) => {
  //Delete esta propriedade pois ela não é esperada na API
  delete json.nomeCategoriaAnuncio;

  console.log("APIII INSERT", json);

  return Api.post("Anuncios/insere-anuncio", json)
    .then(() => {
      console.log("deu certooo!");
      return true;
    })
    .catch(() => {
      console.log("Deu erro!!");
      return false;
    });
};

export const InserePessoa = async (json) => {
  console.log("INSERT ", json);
  return Api.post("Pessoas/insere-pessoa", json)
    .then((response) => {
      console.log("Inserido com sucesso!");
      return response;
    })
    .catch((ex) => {
      console.log("Erro ao inserir Usuário: ", ex.response.data);
      return ex.response;
    });
};

//Insere Imagem no Cloudinary
export const InsereImagem = async (imagens) => {
  return Api.post("http://localhost:4000/upload", { imagens })
    .then((response) => {
      console.log("Insere Imagem:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
      return false;
    });
};

export const InsereComentario = async (json) => {
  return Api.post("Anuncios/insere-comentario-anuncio", json)
    .then(() => {
      console.log("Comentário inserido com sucesso!");
      return true;
    })
    .catch(() => {
      console.log("Erro ao inserir Comentário");
      return false;
    });
};

export const deletaImagemCloudinary = async (public_id) => {
  return Api.post("http://localhost:4000/delete/", { public_id })
    .then((response) => {
      console.log("Imagem excluída do Cloudinary");
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
      return false;
    });
};

export const AtualizaAnuncio = async (json) => {
  console.log("APIII UPDATE", json);

  return Api.post("Anuncios/atualiza-anuncio", json)
    .then(() => {
      console.log("deu certooo!");
      return true;
    })
    .catch(() => {
      console.log("Deu erro!!");
      return false;
    });
};

export const InsereAnuncioFavorito = async (idPessoa, idAnuncio) => {
  return Api.post(`Anuncios/insere-anuncio-favorito/${idPessoa}/${idAnuncio}`)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    })
}

export const deletaAnuncio = async (idAnuncio) => {
  return Api.delete(`Anuncios/deleta-anuncio/${idAnuncio}`)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error.message);
      return false;
    });
};

export const removeAnuncioFavorito = async (idPessoa, idAnuncio) => {
  return Api.delete(`Anuncios/remove-anuncio-favorito/${idPessoa}/${idAnuncio}`)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

//Listagem dos Países
export const listaPaises = async () => {
  return Api.get("Pessoas/lista-paises");
};

//Listagem dos Estados
export const listaEstados = async () => {
  return Api.get("Pessoas/lista-estados");
};

//Lista de Cidades
export const listaCidades = async (idEstado) => {
  return Api.get(`Pessoas/lista-cidades/${idEstado}`);
};

//Lista Anúncio por ID
export const dadosAnuncio = async (idAnuncio) => {
  return Api.get(`Anuncios/lista-anuncios/${idAnuncio}`);
};

export const dadosAnuncioImagens = async (idAnuncio) => {
  return Api.get(`Anuncios/lista-imagens-anuncio/${idAnuncio}`);
};

export const dadosComentarios = async (idAnuncio) => {
  return Api.get(`Anuncios/lista-comentarios-anuncio/${idAnuncio}`);
};

export const verificaAnuncios = async (idEstado, idCidade, idCategoriaAnuncio) => {
  return Api.get(`Anuncios/verifica-anuncios/${idEstado}/${idCidade}/${idCategoriaAnuncio}`);
}

export const dadosAnunciosFavoritos = async (idPessoa) => {
  return Api.get(`Anuncios/anuncios-favoritos/${idPessoa}`);  
}

export const verificaAnuncioFavorito = async (idPessoa, idAnuncio) => {
  return Api.get(`Anuncios/verifica-anuncio-favorito/${idPessoa}/${idAnuncio}`);
}
