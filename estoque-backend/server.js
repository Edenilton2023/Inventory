// ... (imports e dotenv.config())

const app = express();
const PORT = process.env.PORT || 3001; // Railway define a porta em produção
// ... (db.connect e lógica de conexão)

// --- Configuração de Middlewares (AQUI ESTÁ A CORREÇÃO DO CORS) ---

// Remove a linha 'app.use(cors());' e usa a configuração manual para garantir
// que o servidor aceite requisições do Front-end público do Railway.
app.use(function(req, res, next) {
  // Configura a resposta para aceitar requisições de QUALQUER origem pública (*).
  res.header('Access-Control-Allow-Origin', '*'); 
  
  // Especifica quais métodos HTTP (CRUD) são permitidos.
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  // Especifica os cabeçalhos que o cliente pode enviar.
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  next();
});

app.use(express.json()); // Mantém o suporte a JSON
// --- FIM DA CORREÇÃO CORS ---

// ... (Todas as suas rotas CRUD GET, POST, PUT, DELETE permanecem as mesmas)

// Inicia o servidor e o coloca para escutar na porta 3001
app.listen(PORT, () => {
    // Note que em produção, process.env.PORT será a porta real do Railway.
    console.log(`Servidor rodando na porta ${PORT}`); 
});