import axios from "axios";
import {formataData} from "../utils/formataData/index.js";

export async function getUserInfoPF(codigoUsuario, setError) {
    try {
        const resPF = await axios.get(`http://localhost:3000/api/pessoa-fisica/${codigoUsuario}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        setError(null)
        return resPF.data
    } catch (err) {
        setError(err)
    }
}

export async function alteraPF(dadosUsuario, codigoDoUsuario, setError) {
    try {
        await axios.put(`http://localhost:3000/api/pessoa-fisica/${codigoDoUsuario}`, {
            email: dadosUsuario.email,
            senha: dadosUsuario.senha,
            isAdmin: dadosUsuario.isAdmin,
            cpf: dadosUsuario.cpf,
            nome: dadosUsuario.nomePF,
            dataNascimento: formataData(dadosUsuario.dataDeNascimento),
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        setError(null)
    } catch (err) {
        setError(err)
    }
}

export async function deletePF(codigoDoUsuario, setError) {
    try {
        await axios.delete(`http://localhost:3000/api/pessoa-fisica/${codigoDoUsuario}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        setError(null)
    } catch (err) {
        setError(err)
    }
}