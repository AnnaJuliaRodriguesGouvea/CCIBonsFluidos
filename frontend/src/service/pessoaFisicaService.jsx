import axios from "axios";
import {formataData} from "../utils/formataData/index.js";

export async function cadastrarPessoaFisica(dadosUsuario, setError) {
    try {
        const result = await axios.post('http://localhost:3000/api/pessoa-fisica', {
            email: dadosUsuario.email,
            senha: dadosUsuario.senha,
            cpf: dadosUsuario.CPF,
            nome: dadosUsuario.nomePF,
            dataNascimento: formataData(dadosUsuario.dataDeNascimento)
        })
        setError(null)
        return result
    } catch (err) {
        setError(err)
    }
}

export async function cadastrarPessoaFisicaAdmin(dadosUsuario, setError) {
    try {
        const result = await axios.post('http://localhost:3000/api/pessoa-fisica/admin', {
            email: dadosUsuario.email,
            senha: dadosUsuario.senha,
            cpf: dadosUsuario.CPF,
            nome: dadosUsuario.nomePF,
            dataNascimento: formataData(dadosUsuario.dataDeNascimento)
        }, {
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

export async function getPessoaFisicaLogada(setError) {
    try {
        const result = await axios.get(`http://localhost:3000/api/pessoa-fisica/logado/dados`, {
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

export async function alterarPessoaFisica(dadosUsuario, setError) {
    try {
        const result = await axios.put(`http://localhost:3000/api/pessoa-fisica/${dadosUsuario.codigo}`, {
            email: dadosUsuario.email,
            senha: dadosUsuario.senha,
            isAdmin: dadosUsuario.isAdmin,
            cpf: dadosUsuario.cpf,
            nome: dadosUsuario.nome,
            dataNascimento: formataData(dadosUsuario.dataDeNascimento),
        }, {
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

export async function deletarPessoaFisica(codigoUsuario, setError) {
    try {
        const result = await axios.delete(`http://localhost:3000/api/pessoa-fisica/${codigoUsuario}`, {
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