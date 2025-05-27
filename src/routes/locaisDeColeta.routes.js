const { Router } = require('express');

const LocaisDeColetaController = require('../controllers/LocaisDeColetaController');
console.log(LocaisDeColetaController)

const locaisDeColetaRoutes = new Router()

locaisDeColetaRoutes.post('/cadastrar', LocaisDeColetaController.criarLocalDeColeta 

    /*
        #swagger.tags = ['Locais de Coleta'],
        #swagger.description = 'Endpoint para CRIAR um novo local de coleta',
        #swagger.parameters['Cadastrar locais de coleta'] = {
            in: 'body',
            description: 'Dados do local de coleta a ser criado',
            required: true,
            schema: {
                nome_do_local: "Eco Ponto",
                descricao: "Local para coleta de materiais recicláveis",
                estado: "São Paulo",
                cidade: "São Paulo",
                cep: "12345-678",
                bairro: "Centro",
                rua: "Rua das Flores",
                numero: "123",
                coordenadas: "-23.5505,-46.6333",
                materiais_aceitos: "papel, plástico, vidro",
            }   
        }
    */

); // Rota para criar um novo local de coleta. O método post é usado para criar um novo registro no banco de dados. O método recebe a rota e o controller que será responsável por criar o local de coleta.

locaisDeColetaRoutes.get('/listar', LocaisDeColetaController.listarLocaisDeColeta

    /*
        #swagger.tags = ['Locais de Coleta'],
        #swagger.description = 'Endpoint para LISTAR todos os locais cadastrados',
        
    */

); // Rota para listar todos os locais de coleta. O método get é usado para listar todos os registros do banco de dados. O método recebe a rota e o controller que será responsável por listar os locais de coleta.

locaisDeColetaRoutes.get('/local/:local_id', LocaisDeColetaController.detalharLocalDeColeta

    /*
        #swagger.tags = ['Locais de Coleta'],
        #swagger.description = 'Endpoint para LISTAR UM LOCAL de coleta detalhadamente',
        
    */

); // Rota para listar os detalhes de um local de coleta. O método get é usado para listar os detalhes de um registro do banco de dados. O método recebe a rota e o controller que será responsável por listar os detalhes do local de coleta.

locaisDeColetaRoutes.delete('/local/:local_id', LocaisDeColetaController.deletarLocalDeColeta

    /*
        #swagger.tags = ['Locais de Coleta'],
        #swagger.description = 'Endpoint para DELETAR locais cadastrados por ID',
        
    */

); // Rota para deletar um local de coleta. O método delete é usado para deletar um registro do banco de dados. O método recebe a rota e o controller que será responsável por deletar o local de coleta.

locaisDeColetaRoutes.put('/atualizar/:local_id', LocaisDeColetaController.atualizarLocalDeColeta

    /*
        #swagger.tags = ['Locais de Coleta'],
        #swagger.description = 'Endpoint para ATUALIZAR um local de coleta',
        #swagger.parameters['Atualizar locais de coleta'] = {
            in: 'body',
            description: 'Dados do local de coleta a ser atualizado',
            required: true,
            schema: {
                nome_do_local: "Recicla +",
                descricao: "Local Muito Massa",
                estado: "SP",
                cidade: "São Paulo",
                cep: "88020010",
                bairro: "Centro",
                rua: "Rua da Sustentabilidade",
                numero: "123",
                coordenadas: "1",
                materiais_aceitos: "Plástico, Papel, Vidro, Metal"
            }   
        }
        
    */

); // Rota para atualizar um local de coleta. O método put é usado para atualizar um registro do banco de dados. O método recebe a rota e o controller que será responsável por atualizar o local de coleta.

locaisDeColetaRoutes.get('/local/maps/:local_id', LocaisDeColetaController.linkDoMaps

    /*
        #swagger.tags = ['Locais de Coleta'],
        #swagger.description = 'Endpoint para LISTAR todos os locais cadastrados',
        
    */

); // Rota para detalhar um local de coleta. O método get é usado para listar os detalhes de um registro do banco de dados. O método recebe a rota e o controller que será responsável por listar os detalhes do local de coleta.

module.exports = locaisDeColetaRoutes;