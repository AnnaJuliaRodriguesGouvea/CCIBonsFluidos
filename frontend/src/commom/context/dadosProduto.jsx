import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DadosProtudo = createContext();
DadosProtudo.displayName = "Dados do Produto";

export const DadosProtudoProvider = ({ children }) => {

    const [rows, setRows] = useState()
    const [produto, setProduto] = useState()
    const [erro, setErro] = useState()

    return (
        <DadosProtudo.Provider
            value={{
                rows,
                setRows,
                erro,
                setErro,
                produto,
                setProduto
            }}
        >
            {children}
        </DadosProtudo.Provider>
    )
};

export const useDadosProdutoContext = () => {
    const {
        rows,
        setRows,
        erro,
        setErro,
        produto,
        setProduto
    } = useContext(DadosProtudo)

    async function adicionarProduto(novoProduto) {
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
            setErro(null);
        } catch (err) {
            setErro(err);
        }
    }

    async function listaProdutos(limit, page) {
        const resultado = await axios.get(`http://localhost:3000/api/product?limite=${limit}&pagina=${page}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        const listaDeProdutos = resultado.data.rows;
        return setRows(listaDeProdutos)
    }

    async function listaUmProduto(codigoDoProduto) {
        const resultado = await axios.get(`http://localhost:3000/api/product/${codigoDoProduto}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        const produtoData = resultado.data.product;
        return setProduto(produtoData)
    }

    async function alteraProduto(produto, codigoDoProduto, page) {
        await axios.put(`http://localhost:3000/api/product/${codigoDoProduto}`, {
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
        listaProdutos(5, page)
    }

    async function deletaProduto(codigoDoProduto, page) {
        await axios.delete(`http://localhost:3000/api/product/${codigoDoProduto}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        listaProdutos(5, page)
    }

    return {
        rows,
        setRows,
        produto,
        setProduto,
        erro,
        setErro,
        adicionarProduto,
        listaProdutos,
        listaUmProduto,
        alteraProduto,
        deletaProduto,
    }
}