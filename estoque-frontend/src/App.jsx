// Importa bibliotecas e componentes essenciais
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormAdicionar from "./components/FormAdicionar"; 
import ItemEstoque from "./components/ItemEstoque"; 
import './index.css'; 

// 🚨 URL BASE DA API EM PRODUÇÃO: Você precisa substituir este valor!
// Exemplo: 'https://nodejs-production-67f4.up.railway.app'
const API_BASE_URL = 'https://[DOMINIO_DO_SEU_BACKEND_AQUI]'; 


function App() {
    // Hooks useState para gerenciar o estado global
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(true);

    // Função para buscar dados (READ)
    const fetchItens = () => {
        setLoading(true);
        // Usa a URL base + a rota GET
        axios.get(`${API_BASE_URL}/api/itens`) 
            .then(response => {
                setItens(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar itens. Verifique o Back-end e o CORS:", error);
                setLoading(false);
            });
    };

    // Hook useEffect para carregar dados na inicialização
    useEffect(() => {
        fetchItens();
    }, []);

    // Função para Adicionar Item (CREATE)
    const adicionarItem = (nome, quantidade) => {
        // Envia POST para a rota /api/itens
        axios.post(`${API_BASE_URL}/api/itens`, { nome, quantidade }) 
            .then(() => fetchItens())
            .catch(error => alert(`Erro ao adicionar: ${error.message}`));
    };

    // Função para Remover Item (DELETE)
    const removerItem = (id, nome) => {
        if (!window.confirm(`Remover "${nome}"?`)) return;
        // Envia DELETE para a rota /api/itens/:id
        axios.delete(`${API_BASE_URL}/api/itens/${id}`)
            .then(() => fetchItens())
            .catch(error => alert(`Erro ao remover: ${error.message}`));
    };

    // Função para Atualizar Quantidade (UPDATE)
    const updateQuantidade = (id, nome, novaQuantidade) => {
        if (novaQuantidade < 0) return alert("Quantidade não pode ser negativa.");
        
        // Envia PUT para a rota /api/itens/:id
        axios.put(`${API_BASE_URL}/api/itens/${id}`, { quantidade: novaQuantidade })
            .then(() => {
                // Atualização Otimista
                setItens(prevItens => prevItens.map(item => 
                    item.id === id ? { ...item, quantidade: novaQuantidade } : item
                ));
            })
            .catch(error => {
                console.error('Erro ao atualizar:', error);
                alert(`Erro ao atualizar quantidade do item ${nome}!`);
                fetchItens(); 
            });
    };


    if (loading) {
        return <div className="flex justify-center items-center h-screen text-xl font-semibold">Carregando estoque...</div>;
    }
    
    return (
        <div className="max-w-4xl mx-auto p-4 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mt-8 mb-8">
                SISTEMA DE ESTOQUE
            </h1>
            
            <FormAdicionar onAdicionar={adicionarItem} />

            {itens.length === 0 ? (
                <p className="text-center text-gray-600">Estoque vazio. Adicione seu primeiro item!</p>
            ) : (
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="p-4 text-left text-sm font-medium">ID</th>
                                <th className="p-4 text-left text-sm font-medium">Nome</th>
                                <th className="p-4 text-center text-sm font-medium">Quantidade</th>
                                <th className="p-4 text-center text-sm font-medium">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {itens.map(item => (
                                <ItemEstoque 
                                    key={item.id} 
                                    item={item}
                                    onUpdate={updateQuantidade} 
                                    onRemove={removerItem} 
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default App;