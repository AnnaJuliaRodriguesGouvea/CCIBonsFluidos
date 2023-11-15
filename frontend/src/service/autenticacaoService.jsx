import axios from "axios";

export async function login(dadosLogin, setError) {
    try {
        const result = await axios.post('http://localhost:3000/login', {
            email: dadosLogin.email,
            senha: dadosLogin.senha
        })

        setError(null);
        return result
    } catch (err) {
        setError(err)
    }
}