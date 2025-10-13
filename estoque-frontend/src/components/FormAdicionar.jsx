import React, { useState } from 'react';

function FormAdicionar({ onAdicionar }) {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const numQuantidade = parseInt(quantidade, 10);
        
        if (!nome || isNaN(numQuantidade) || numQuantidade <= 0) {
            alert('Preencha nome e quantidade válida.');
            return;
        }
        
        onAdicionar(nome, numQuantidade);
        setNome('');
        setQuantidade('');
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-xl shadow-lg mb-8"
        >
            <input
                type="text"
                placeholder="Nome do Material"
                value={nome}
                onChange={(e) => setNome(e.target.value)} 
                required
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="number"
                placeholder="Quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                min="1"
                required
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
                type="submit"
                className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 hover:bg-blue-700 w-full md:w-auto whitespace-nowrap"
            >
                Adicionar
            </button>
        </form>
    );
}

export default FormAdicionar;