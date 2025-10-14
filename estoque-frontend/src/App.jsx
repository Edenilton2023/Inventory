      import React, { useState, useEffect } from 'react';
      import axios from 'axios';
      import FormAdicionar from "./components/FormAdicionar"; 
      import ItemEstoque from "./components/ItemEstoque"; 
      import './index.css'; // Importe o CSS principal do Tailwind

  // A URL muda no deploy. Você deve usar uma variável de ambiente ou o URL fixo.
// Por enquanto, usaremos uma string vazia (será substituída no deploy)
// Em um deploy real, você passaria isso via variável de ambiente do Vite/Railway.

// POR ENQUANTO, DEIXE ASSIM, MAS ESTE VALOR SERÁ O CAUSADOR DO ERRO APÓS O DEPLOY.
const API_URL = 'http://localhost:3001/api/itens';
// VOCÊ TERÁ QUE MUDAR ISSO PARA: 'https://seubackend.up.railway.app/api/itens'

      function App() {
          const [itens, setItens] = useState([]);
          const [loading, setLoading] = useState(true);

          const fetchItens = () => {
              setLoading(true);
              axios.get(API_URL)
                  .then(response => {
                      setItens(response.data);
                      setLoading(false);
                  })
                  .catch(error => {
                      console.error("Erro ao buscar itens. O Back-end está rodando?", error);
                      setLoading(false);
                  });
          };

          useEffect(() => {
              fetchItens();
          }, []);

          const adicionarItem = (nome, quantidade) => {
              axios.post(API_URL, { nome, quantidade })
                  .then(() => fetchItens())
                  .catch(error => alert(`Erro ao adicionar: ${error.message}`));
          };

          const removerItem = (id, nome) => {
              if (!window.confirm(`Remover "${nome}"?`)) return;
              axios.delete(`${API_URL}/${id}`)
                  .then(() => fetchItens())
                  .catch(error => alert(`Erro ao remover: ${error.message}`));
          };

          const updateQuantidade = (id, nome, novaQuantidade) => {
              if (novaQuantidade < 0) return alert("Quantidade não pode ser negativa.");
              
              axios.put(`${API_URL}/${id}`, { quantidade: novaQuantidade })
                  .then(() => {
                      // Atualização otimista: atualiza o estado localmente sem recarregar tudo
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