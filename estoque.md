# 📦 invetory

Este é um projeto **Full Stack (MERN/MySQL)** de CRUD completo, desenvolvido para demonstrar o fluxo de dados e a comunicação entre o Front-end (React) e o Back-end (Node/Express), utilizando a estilização moderna com Tailwind CSS.

## 🌟 Visão Geral e Aprendizagem

O objetivo principal deste projeto é consolidar os seguintes conceitos de forma didática:

* **Arquitetura de Componentes:** Separação limpa da lógica de estado (`App.jsx`) da lógica de apresentação (`FormAdicionar.jsx`, `ItemEstoque.jsx`).
* **Fluxo de Dados Unidirecional (React):** Entendimento de como o estado é passado via `props` e como funções de atualização (`onUpdate`, `onRemove`) são enviadas para os componentes filhos.
* **Comunicação API (Axios):** Uso de requisições `GET`, `POST`, `PUT` e `DELETE` para interagir com o Back-end.
* **Persistência de Dados:** Conexão segura e funcional com um banco de dados relacional (MySQL).

## 🚀 Tecnologias Utilizadas

| Camada | Tecnologia | Motivo/Conceito Aprendido |
| :--- | :--- | :--- |
| **Front-end** | **React.js (Vite)** | Criação de UI rápida usando Hooks (`useState`, `useEffect`). |
| **Estilização** | **Tailwind CSS** | Desenvolvimento de interfaces profissionais com classes utilitárias e design responsivo. |
| **Back-end** | **Node.js + Express** | Criação de APIs RESTful, Middlewares (`cors`, `express.json`). |
| **Banco de Dados** | **MySQL (com `mysql2`)** | Persistência de dados usando queries SQL (`SELECT`, `INSERT`, `UPDATE`, `DELETE`). |

## ✨ Funcionalidades (CRUD Completo)

O aplicativo permite a manipulação completa dos dados do estoque:

* **[R]ead:** Listagem e exibição dos itens do MySQL na tabela principal.
* **[C]reate:** Adição de novos itens via formulário (`POST` na API).
* **[U]pdate:** Atualização da quantidade (`+` e `-` na linha do item usando `PUT` na API) com **Atualização Otimista** no Front-end.
* **[D]elete:** Remoção de itens do banco de dados (`DELETE` na API).

## ⚙️ Como Rodar o Projeto Localmente

### 1. Configuração do MySQL

Certifique-se de que o servidor MySQL está ativo. Crie o banco de dados e a tabela:

```sql
CREATE DATABASE estoque;
USE estoque;

CREATE TABLE itens_estoque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL
);





MYSQLDATABASE
*******



MYSQLHOST
*******



MYSQLPASSWORD
*******



MYSQLPORT
*******



MYSQLUSER
*******



