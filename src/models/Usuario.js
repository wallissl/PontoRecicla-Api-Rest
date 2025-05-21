const {DataTypes} = require('sequelize'); // Importa o DataTypes do sequelize, que é um objeto que contém os tipos de dados do sequelize. O DataTypes é usado para definir os tipos de dados dos campos do modelo.

const connection = require('../database/connection'); // Importa a conexão com o banco de dados. O arquivo connection.js é responsável por criar a conexão com o banco de dados usando o sequelize.

const { hashSync } = require('bcryptjs'); // Importa o hasySync do bcrypt, que é uma biblioteca para criptografar senhas. O hasySync é usado para criptografar a senha do usuário antes de salvar no banco de dados.

const Usuario = connection.define('usuarios',
    { // Cria o modelo de usuários. O define cria uma tabela no banco de dados com o nome passado como primeiro parâmetro e os campos passados como segundo parâmetro.
        nome:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        sexo:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        endereco:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        senha:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        data_nascimento:{
            type: DataTypes.DATEONLY,
            allowNull: false,
        },    
    },
    {
        underscored: true, // Configura o Sequelize para usar snake_case no banco de dados em vez de camelCase. Isso significa que os nomes das colunas no banco de dados serão escritos em letras minúsculas e separados por underscores. Por exemplo, o campo dataNascimento será escrito como data_nascimento no banco de dados.
    }
);

Usuario.beforeSave((usuario) => {

    if(usuario.changed('senha')){
         
    usuario.senha = hashSync(usuario.senha, 10); // Criptografa a senha do usuário antes de salvar no banco de dados. O hasySync recebe a senha e o número de rounds de criptografia (quanto maior o número, mais seguro, mas mais lento). O valor 10 é um valor padrão e seguro para a maioria dos casos.
    return usuario // Retorna o usuário com a senha criptografada. O beforeSave é um hook do Sequelize que é executado antes de salvar o usuário no banco de dados. O hook pode ser usado para fazer validações ou modificações nos dados antes de salvar.
    }
})

module.exports = Usuario; // Exporta o modelo de usuários. O modelo é exportado para ser usado em outros arquivos, como o controller e o router. O modelo é usado para fazer operações no banco de dados, como criar, ler, atualizar e deletar registros.