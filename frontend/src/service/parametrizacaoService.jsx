import axios from "axios";

export async function getTiposAbsorvente(setError) {
    try {
        const result =  await axios.get(`http://localhost:3000/api/tipoAbsorvente`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        setError(null)
        return result.data
    } catch (err) {
        setError(err)
    }
}

export async function getSuavidade(setError) {
    try {
        const result = await axios.get(`http://localhost:3000/api/suavidade`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        setError(null)
        return result.data
    } catch (err) {
        setError(err)
    }
}

export async function getFluxo(setError) {
    try {
        const result = await axios.get(`http://localhost:3000/api/fluxo`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        setError(null)
        return result.data
    } catch (err) {
        setError(err)
    }
}

export async function getTamanho(setError) {
    try {
        const result = await axios.get(`http://localhost:3000/api/tamanho`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        setError(null)
        return result.data
    } catch (err) {
        setError(err)
    }
}

export async function getTransacao(setError) {
    try {
        const result = await axios.get(`http://localhost:3000/api/transacao`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        setError(null)
        return result.data
    } catch (err) {
        setError(err)
    }
}
