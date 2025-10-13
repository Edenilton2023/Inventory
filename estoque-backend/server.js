// Importa bibliotecas essenciais
import express from 'express'; // Framework para criar o servidor web e definir as rotas
import cors from 'cors';     // Middleware para segurança, permite requisições entre diferentes portas (Front-end e Back-end)
import mysql from 'mysql2';  // Driver para se comunicar com o MySQL

const app = express(); // Inicializa o aplicativo Express
const PORT = 3001;     // Define a porta onde o Back-end irá rodar

// --- Configuração da Conexão com o MySQL ---
const db = mysql.createConnection({
    // Informações de acesso ao seu banco de dados local
    host: 'localhost', 
    user: 'root', 
    password: 'AdminDev', // <-- SUBSTITUA PELA SUA SENHA!
    database: 'estoque'   // <-- NOME DO SEU BANCO DE DADOS
});

// Testa a conexão ao iniciar o servidor Node
db.connect(err => {
    if (err) {
        // Se a conexão falhar (ex: MySQL desligado ou credenciais erradas), exibe o erro e para o servidor
        console.error('Erro ao conectar ao MySQL:', err.stack);
        return;
    }
    console.log('Conectado ao banco de dados MySQL com sucesso!');
});

// --- Configuração de Middlewares ---
app.use(cors()); // Permite que o Front-end (React) acesse esta API
app.use(express.json()); // Diz ao Express para aceitar e processar dados no formato JSON (necessário para POST e PUT)

// --- ROTAS CRUD (API REST) ---

// READ (GET /api/itens): Retorna a lista completa do estoque
app.get('/api/itens', (req, res) => {
    const q = "SELECT * FROM itens_estoque"; // Query SQL para buscar todos os itens
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err); // Se erro SQL, retorna status 500
        return res.json(data); // Retorna os dados como um array JSON para o React
    });
});

// CREATE (POST /api/itens): Adiciona um novo item ao estoque
app.post('/api/itens', (req, res) => {
    // Pega 'nome' e 'quantidade' do corpo da requisição enviada pelo Front-end (React)
    const { nome, quantidade } = req.body; 
    // Query de inserção. O '?' é um placeholder para proteção contra SQL Injection
    const q = "INSERT INTO itens_estoque (nome, quantidade) VALUES (?, ?)";

    db.query(q, [nome, quantidade], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar item:', err);
            return res.status(500).json({ error: 'Erro ao adicionar item.' });
        }
        // Retorna status 201 (Created) em caso de sucesso
        return res.status(201).json({ message: 'Item adicionado com sucesso!', id: result.insertId });
    });
});

// UPDATE (PUT /api/itens/:id): Atualiza a quantidade de um item específico
app.put('/api/itens/:id', (req, res) => {
    // Pega o 'id' do item diretamente da URL (ex: /api/itens/5)
    const itemId = req.params.id;
    // Pega a nova quantidade do corpo e garante que é um número inteiro
    const novaQuantidade = parseInt(req.body.quantidade); 

    if (isNaN(novaQuantidade)) {
        return res.status(400).json({ error: 'Quantidade inválida enviada.' });
    }

    // Query SQL de atualização, atualiza a quantidade onde o ID corresponde
    const q = "UPDATE itens_estoque SET quantidade = ? WHERE id = ?";

    db.query(q, [novaQuantidade, itemId], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar item:', err);
            return res.status(500).json({ error: 'Erro no servidor ao atualizar item.' });
        }
        
        // Verifica se a atualização afetou alguma linha (se afetou 0, o ID não existia)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Item não encontrado.' });
        }

        return res.json({ message: 'Quantidade atualizada com sucesso!' });
    });
});

// DELETE (DELETE /api/itens/:id): Remove um item
app.delete('/api/itens/:id', (req, res) => {
    // Pega o ID do item a ser deletado da URL
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

// Inicia o servidor e o coloca para escutar na porta 3001
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});