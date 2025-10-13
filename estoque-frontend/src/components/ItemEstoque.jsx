import React from 'react';

function ItemEstoque({ item, onUpdate, onRemove }) {
    return (
        <tr className="border-b hover:bg-gray-50 transition duration-150">
            <td className="p-4 text-gray-600">{item.id}</td>
            <td className="p-4 font-medium text-gray-800">{item.nome}</td>
            <td className="p-4 font-semibold text-center">{item.quantidade}</td>
            <td className="p-4 flex gap-2 justify-center">
                <button 
                    onClick={() => onUpdate(item.id, item.nome, item.quantidade + 1)}
                    className="bg-green-500 text-white font-bold w-8 h-8 rounded-full hover:bg-green-600 transition"
                >
                    +
                </button>
                <button 
                    onClick={() => onUpdate(item.id, item.nome, item.quantidade - 1)}
                    className="bg-yellow-500 text-gray-800 font-bold w-8 h-8 rounded-full hover:bg-yellow-600 transition disabled:opacity-50"
                    disabled={item.quantidade <= 0} // Desabilita se for 0
                >
                    -
                </button>
                <button 
                    onClick={() => onRemove(item.id, item.nome)}
                    className="bg-red-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-red-600 transition"
                >
                    Remover
                </button>
            </td>
        </tr>
    );
}

export default ItemEstoque;