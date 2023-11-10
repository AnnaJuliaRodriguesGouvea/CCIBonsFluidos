import axios from "axios";
import { createContext, useContext, useState } from "react";
import { formataData } from "../../utils/formataData";

export const DadosDoacao = createContext();
DadosDoacao.displayName = "Dados da Doacao";

export const DadosDoacaoProvider = ({ children }) => {

    const [rows, setRows] = useState()
    const [erro, setErro] = useState()

    return (
        <DadosDoacao.Provider
            value={{
                rows,
                setRows,
                erro,
                setErro,
            }}
        >
            {children}
        </DadosDoacao.Provider>
    )
};

export const useDadosDoacaoContext = () => {
    const {
        rows,
        setRows,
        erro,
        setErro,
    } = useContext(DadosDoacao)

    async function adicionarDoacao(novaDoacao) {
        try {
            await axios.post('http://localhost:3000/api/doacao', {
                data: formataData(novaDoacao.data),
                quantidade: parseInt(novaDoacao.quantidade),
                codigo_transacao: novaDoacao.codigo_transacao,
                codigo_produto: novaDoacao.codigo_produto,
                codigo_acesso: novaDoacao.codigo_acesso,
                cnpj_destino: parseInt(novaDoacao.cnpj_destino),
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

    async function listaDoacoes(page) {
        const resultado = await axios.get(`http://localhost:3000/api/doacao?limite=5&pagina=${page}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        const listaDeDoacoes = resultado.data.rows;
        return setRows(listaDeDoacoes)
    }

    return {
        rows,
        setRows,
        erro,
        setErro,
        adicionarDoacao,
        listaDoacoes,
    }
}