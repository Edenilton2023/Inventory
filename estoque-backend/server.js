// import cors from 'cors'; 
// ...

// --- Configuração de Middlewares (USE ESTA SOLUÇÃO) ---
const allowedOrigins = [
  'https://react-frontend-production-fba8.up.railway.app', // Domínio do seu Front-end
  'http://localhost:5173' // Para desenvolvimento local
  // Adicione a URL base do Back-end também, caso esteja usando uma rota relativa.
];

app.use(cors({
    origin: function(origin, callback){
        // Permite requisições sem 'origin' (como apps ou Postman)
        if(!origin) return callback(null, true); 
        // Permite se a origem estiver na lista
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = 'A política CORS para esta origem não permite acesso.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json()); // Mantém o suporte a JSON
// --- FIM DA CORREÇÃO CORS ---

// ... (Todas as suas rotas CRUD GET, POST, PUT, DELETE permanecem as mesmas)

// Inicia o servidor e o coloca para escutar na porta 3001
app.listen(PORT, () => {
    // Note que em produção, process.env.PORT será a porta real do Railway.
    console.log(`Servidor rodando na porta ${PORT}`); 
});