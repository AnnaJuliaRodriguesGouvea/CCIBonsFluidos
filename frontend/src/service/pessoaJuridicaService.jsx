import axios from "axios";

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
        const result = await axios.get(`http://localhost:3000/api/pessoa-juridica/${substring}`, {
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

export async function getUserInfoPJ(codigoUsuario, setError) {
    try {
        const resPJ = await axios.get(`http://localhost:3000/api/pessoa-juridica/${codigoUsuario}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        setError(null)
        return resPJ.data
    } catch (err) {
        setError(err)
    }
}

export async function alteraPJ(dadosUsuario, codigoDoUsuario, setError) {
    try {
        await axios.put(`http://localhost:3000/api/pessoa-juridica/${codigoDoUsuario}`, {
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
    } catch (err) {
        setError(err)
    }
}

export async function deletePJ(codigoDoUsuario, setError) {
    try {
        await axios.delete(`http://localhost:3000/api/pessoa-juridica/${codigoDoUsuario}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        setError(null)
    } catch (err) {
        setError(err)
    }
}