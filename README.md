# 🏨 Hotel Reserva

Sistema web para gerenciamento de quartos e reservas de hotel, desenvolvido com Node.js, Express, Prisma ORM, MySQL, HTML, CSS e JavaScript.

---

# 📌 Objetivo

O projeto tem como objetivo facilitar o controle de quartos e reservas de um hotel por meio de uma aplicação web completa, permitindo o cadastro, consulta, edição e exclusão de informações de forma simples e organizada.

---

# 📂 Estrutura do Projeto

```text
hotel-brasil/
│
├── prisma/
│   └── schema.prisma
│
├── public/
│   ├── index.html
│   ├── quartos.html
│   ├── reservas.html
│   ├── style.css
│   └── script.js
│
├── src/
│   ├── controllers/
│   ├── routes/
│   └── services/
│
├── print1.png
├── print2.png
├── print3.png
├── print4.png
│
├── server.js
├── package.json
├── .env
└── README.md
```

---

# 🚀 Tecnologias Utilizadas

## Back-end

- Node.js
- Express.js
- Prisma ORM
- MySQL
- CORS
- Dotenv

## Front-end

- HTML5
- CSS3
- JavaScript

---

# ⚙️ Funcionalidades

## Quartos

✅ Listar quartos

✅ Cadastrar quartos

✅ Editar quartos

✅ Excluir quartos

## Reservas

✅ Listar reservas

✅ Cadastrar reservas

✅ Editar reservas

✅ Cancelar reservas

---

# 🗄️ Banco de Dados

O projeto utiliza o banco de dados MySQL integrado ao Prisma ORM.

### Modelo Quarto

| Campo | Tipo |
|---------|---------|
| id | Integer |
| numero | String |
| tipo | String |
| preco | Float |

### Modelo Reserva

| Campo | Tipo |
|---------|---------|
| id | Integer |
| hospede | String |
| dataEntrada | DateTime |
| dataSaida | DateTime |
| quartoId | Integer |

### Relacionamentos

- Um quarto pode possuir várias reservas.
- Uma reserva pertence a apenas um quarto.

---

# ▶️ Como Executar

## 1. Clonar o repositório

```bash
git clone https://github.com/toto20zin/hotel-brasil.git
```

## 2. Entrar na pasta do projeto

```bash
cd hotel-brasil
```

## 3. Instalar as dependências

```bash
npm install
```

## 4. Configurar o arquivo .env

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/hotel_brasil"
PORT=3000
```

## 5. Executar as migrations

```bash
npx prisma migrate dev --name init
```

## 6. Gerar o Prisma Client

```bash
npx prisma generate
```

## 7. Iniciar o servidor

```bash
npm start
```

ou

```bash
node server.js
```

## 8. Executar o Front-end

Abra o arquivo:

```text
public/index.html
```

ou utilize a extensão Live Server do VS Code.

---

# 📡 Endpoints da API

## Quartos

| Método | Endpoint |
|---------|---------|
| GET | /quartos |
| GET | /quartos/:id |
| POST | /quartos |
| PUT | /quartos/:id |
| DELETE | /quartos/:id |

## Reservas

| Método | Endpoint |
|---------|---------|
| GET | /reservas |
| GET | /reservas/:id |
| POST | /reservas |
| PUT | /reservas/:id |
| DELETE | /reservas/:id |

---

# 📷 Demonstração do Sistema

## Página Inicial

<p align="center">
  <img src="./print1.png" width="900">
</p>

## Gerenciamento de Quartos

<p align="center">
  <img src="./print2.png" width="900">
</p>

## Gerenciamento de Reservas

<p align="center">
  <img src="./print3.png" width="900">
</p>

## Interface Responsiva

<p align="center">
  <img src="./print4.png" width="900">
</p>

---

# 📁 Documentação

O projeto contém toda a estrutura necessária para execução local, incluindo:

- Banco de dados MySQL
- Prisma ORM
- API REST
- Interface Web

---

# 👨‍💻 Desenvolvedor

Projeto desenvolvido por **Vinicius Godoi** para fins acadêmicos na disciplina de Desenvolvimento de Sistemas.

---

# 📄 Licença

Projeto desenvolvido exclusivamente para fins educacionais e acadêmicos.
