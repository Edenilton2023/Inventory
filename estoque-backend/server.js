// Importa bibliotecas essenciais para o servidor
import express from 'express'; 
import cors from 'cors';     
import mysql from 'mysql2';  
import dotenv from 'dotenv'; // Para ler o .env localmente

// Carrega as variáveis de ambiente do arquivo .env (apenas para desenvolvimento local)
dotenv.config(); 

const app = express();
// O Railway injetará a porta correta. 3001 é o fallback local.
const PORT = process.env.PORT || 3001;     

// --- Configuração da Conexão com o MySQL ---
// dotenv.config(); 

const db = mysql.createConnection({
    // Host e porta fixos (Correto)
    host: 'mysql', 
    port: 3306,
    
    // Credenciais: Não use fallbacks, apenas as variáveis que o Railway injeta
    user: process.env.MYSQLUSER, 
    password: process.env.MYSQLPASSWORD, 
    database: process.env.MYSQLDATABASE 
});

// Testa a conexão ao iniciar o servidor
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.stack);
        return;
    }
    console.log('Conectado ao banco de dados MySQL com sucesso!');
});

// --- Configuração de Middlewares ---
// CORS: Permite que o Front-end (React) acesse esta API de qualquer domínio (*),
// resolvendo o "Network Error" em produção.
app.use(cors()); 

// Permite que o Express leia JSON nas requisições (para POST/PUT)
app.use(express.json()); 

// --- ROTAS CRUD (API REST) ---

// READ (GET /api/itens)
app.get('/api/itens', (req, res) => {
    const q = "SELECT * FROM itens_estoque"; 
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err); 
        return res.json(data); 
    });
});

// CREATE (POST /api/itens)
app.post('/api/itens', (req, res) => {
    const { nome, quantidade } = req.body; 
    const q = "INSERT INTO itens_estoque (nome, quantidade) VALUES (?, ?)";
    db.query(q, [nome, quantidade], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar item:', err);
            return res.status(500).json({ error: 'Erro ao adicionar item.' });
        }
        return res.status(201).json({ message: 'Item adicionado com sucesso!' });
    });
});

// UPDATE (PUT /api/itens/:id)
app.put('/api/itens/:id', (req, res) => {
    const itemId = req.params.id;
    const novaQuantidade = parseInt(req.body.quantidade); 

    if (isNaN(novaQuantidade)) {
        return res.status(400).json({ error: 'Quantidade inválida enviada.' });
    }
    const q = "UPDATE itens_estoque SET quantidade = ? WHERE id = ?";

    db.query(q, [novaQuantidade, itemId], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar item:', err);
            return res.status(500).json({ error: 'Erro no servidor ao atualizar item.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Item não encontrado.' });
        }
        return res.json({ message: 'Quantidade atualizada com sucesso!' });
    });
});

// DELETE (DELETE /api/itens/:id)
app.delete('/api/itens/:id', (req, res) => {
    const itemId = req.params.id;
    const q = "DELETE FROM itens_estoque WHERE id = ?";
    db.query(q, [itemId], (err, result) => {
        if (err) {
            console.error('Erro ao deletar item:', err);
            return res.status(500).json({ error: 'Erro ao deletar item.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Item não encontrado.' });
        }
        return res.json({ message: 'Item removido com sucesso!' });
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});