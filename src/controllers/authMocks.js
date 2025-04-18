let usuarioLogadoId = null;

module.exports = {
  setUsuarioLogado: (id) => {
    usuarioLogadoId = id;
  },
  getUsuarioLogado: () => usuarioLogadoId
};