import axios from "axios";

export async function cadastrarPessoaJuridica(dadosUsuario, setError) {
    try {
        const result = await axios.post('http://localhost:3000/api/pessoa-juridica', {
            email: dadosUsuario.email,
            senha: dadosUsuario.senha,
            cnpj: dadosUsuario.CNPJ,
            razaoSocial: dadosUsuario.razaoSocial
        })
        setError(null)
        return result
    } catch (err) {
        setError(err)
    }
}

export async function cadastrarPessoaJuridicaAdmin(dadosUsuario, setError) {
    try {
        const result = await axios.post('http://localhost:3000/api/pessoa-juridica/admin', {
            email: dadosUsuario.email,
            senha: dadosUsuario.senha,
            cnpj: dadosUsuario.CNPJ,
            razaoSocial: dadosUsuario.razaoSocial
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

export async function listarPessoasJuridicas(limit, page, setError) {
    try {
        const result = await axios.get(`http://localhost:3000/api/pessoa-juridica?limite=${limit}&pagina=${page}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })

        setError(null);
        return result
    } catch (err) {
        setError(err);
    }
}

export async function listarTodasPessoasJuridicas(substring, setError) {
    try {
        const result = await axios.get(`http://localhost:3000/api/pessoa-juridica/razao-social/${substring}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })

        setError(null);
        return result
    } catch (err) {
        setError(err);
    }
}

export async function getPessoaJuridicaLogada(setError) {
    try {
        const result = await axios.get(`http://localhost:3000/api/pessoa-juridica/logado/dados`, {
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

export async function alterarPessoaJuridica(dadosUsuario, setError) {
    try {
        console.log(localStorage.getItem("token"))
        const result = await axios.put(`http://localhost:3000/api/pessoa-juridica/${dadosUsuario.codigo}`, {
            email: dadosUsuario.email,
            senha: dadosUsuario.senha,
            isAdmin: dadosUsuario.isAdmin,
            cnpj: dadosUsuario.cnpj,
            razaoSocial: dadosUsuario.razaoSocial,
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

export async function deletarPessoaJuridica(codigoDoUsuario, setError) {
    try {
        const result = await axios.delete(`http://localhost:3000/api/pessoa-juridica/${codigoDoUsuario}`, {
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