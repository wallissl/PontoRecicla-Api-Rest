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

