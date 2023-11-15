import axios from "axios";
import {formataData} from "../utils/formataData/index.js";

export async function adicionarDoacao(novaDoacao, setError) {
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
        setError(null);
    } catch (err) {
        console.log(err)
        setError(err);
    }
}

export async function listarDoacoes(limit, page, setError) {
    try {
        const result = await axios.get(`http://localhost:3000/api/doacao?limite=${limit}&pagina=${page}`, {
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