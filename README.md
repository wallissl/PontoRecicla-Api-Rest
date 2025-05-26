# **Recicla365-API-REST** ♻️

API RESTful desenvolvida em Node.js com Express para gerenciar usuários e locais de coleta de materiais recicláveis.

✅ Cadastro e autenticação de usuários  
✅ CRUD de locais de coleta (somente pelo usuário que criou)  
✅ Geração de link do Google Maps para um local, via integração com Nominatim (OpenStreetMap)  
✅ Proteção de rotas com JWT  
✅ Validações de segurança e integridade  
✅ Documentação interativa com Swagger  

---

## 📮 **Rotas Principais**

### **Usuários**  
`POST /usuarios` → Cadastrar usuário  
`PUT /usuarios/:id` → Atualizar usuário  
`DELETE /usuarios/:id` → Deletar conta (somente se não houver locais cadastrados)  

### **Autenticação**  
`POST /login` → Login e geração de token JWT  

### **Locais de Coleta**  
`POST /local` → Cadastrar local  
`GET /local` → Listar locais  
`GET /local/:local_id` → Detalhar local  
`PUT /local/:local_id` → Atualizar local  
`DELETE /local/:local_id` → Excluir local  
`GET /local/:local_id/maps` → Gerar link do Google Maps  

---

## 🛠️ **Tecnologias Utilizadas**

- Node.js — ambiente de execução JavaScript  
- Express — framework para construção do servidor HTTP  
- Sequelize — ORM para interação com banco de dados relacional  
- PostgreSQL — sistema de gerenciamento de banco de dados  
- JWT (JSON Web Token) — autenticação segura  
- bcryptjs — criptografia de senhas  
- dotenv — gerenciamento de variáveis de ambiente  
- axios — consumo de APIs externas  
- CORS — controle de acesso entre domínios  
- Swagger — documentação automática (`swagger-autogen` e `swagger-ui-express`)  

---

## ⚙️ **Pré-requisitos**

- Node.js (>= 14)  
- PostgreSQL  
- npm ou yarn  

---

## 🏗️ **Estrutura do Projeto**
src/<br>
├── controllers/<br>
├── models/<br>
├── routes/<br>
├── middlewares/<br>
├── config/<br>
└── app.js<br>

---

## 📦 **Instalação**
**Clone o repositório:**<br>
git clone https://github.com/seu-usuario/recicla365-api-rest.git <br>

**Acesse a pasta do projeto:**<br>
cd recicla365-api-rest <br>

**Instale as dependências:**<br>
npm install <br>

---

## ⚙️ **Configuração**
- Renomeie o arquivo .env.example para .env.
- Preencha as variáveis de ambiente, por exemplo:
- DB_HOST=localhost
- DB_USER=seu_usuario
- DB_PASSWORD=sua_senha
- DB_NAME=recicla365
- DB_PORT=5432
- JWT_SECRET=sua_chave_secreta

---

## 🗄️ **Rodando as Migrations**
- npx sequelize-cli db:migrate

---

## ▶️ **Executando a aplicação**
- npm run start:dev

---

## 📄 **Documentação da API**
Acesse a documentação interativa via Swagger:
👉 http://localhost:3000/docs/

---

## 🛡️ **Autenticação**
A maioria das rotas é protegida. <br>
Utilize um token JWT no header Authorization com o prefixo Bearer.

---

## 📞 **Contato**
🙋‍♂️ Wallis Silva <br>
📧 Email: wallis.sl@outlook.com <br>
🔗 LinkedIn: www.linkedin.com/in/wallis/
