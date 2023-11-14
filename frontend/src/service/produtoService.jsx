import axios from "axios";

export async function adicionarProduto(novoProduto, setError) {
    try {
        await axios.post('http://localhost:3000/api/product', {
            marca: novoProduto.marca,
            nome: novoProduto.nome,
            temAbas: novoProduto.temAba,
            quantidadeNoPacote: novoProduto.quantidadeNoPacote,
            isNoturno: novoProduto.ehNoturno,
            temEscapeUrina: novoProduto.temEscapeDeUrina,
            quantidadeDePacote: novoProduto.quantidadeDePacote,
            codigo_tipo_absorvente: novoProduto.tipoDeAbsorvente,
            codigo_suavidade: novoProduto.suavidade,
            codigo_fluxo: novoProduto.fluxo,
            codigo_tamanho: novoProduto.tamanho,
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        setError(null);
    } catch (err) {
        setError(err);
    }
}

export async function listarProdutos(limit, page, setError) {
    try {
        const resultado = await axios.get(`http://localhost:3000/api/product?limite=${limit}&pagina=${page}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        setError(null)
        return resultado.data
    } catch (err) {
        setError(err);
    }
}

export async function listaUmProduto(codigoDoProduto, setError) {
    try {
        const resultado = await axios.get(`http://localhost:3000/api/product/${codigoDoProduto}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        setError(null)
        return resultado.data.product
    } catch (err) {
        setError(err);
    }
}

export async function alteraProduto(produto, codigoDoProduto, setError) {
    try {
        const result = await axios.put(`http://localhost:3000/api/product/${codigoDoProduto}`, {
            marca: produto.marca,
            nome: produto.nome,
            temAbas: produto.temAba,
            quantidadeNoPacote: produto.quantidadeNoPacote,
            isNoturno: produto.ehNoturno,
            temEscapeUrina: produto.temEscapeDeUrina,
            quantidadeDePacote: produto.quantidadeDePacote,
            codigo_tipo_absorvente: produto.tipoDeAbsorvente,
            codigo_suavidade: produto.suavidade,
            codigo_fluxo: produto.fluxo,
            codigo_tamanho: produto.tamanho,
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        setError(null)
        return result
    } catch (err) {
        setError(err);
    }
}

export async function deletaProduto(codigoDoProduto, setError) {
    try {
        const result = await axios.delete(`http://localhost:3000/api/product/${codigoDoProduto}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        setError(null)
        return result
    } catch (err) {
        setError(err)
    }

}