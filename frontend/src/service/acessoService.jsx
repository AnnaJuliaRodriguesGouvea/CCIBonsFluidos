import axios from "axios";

export async function getIsAdmin(setError) {
    try {
        const result =  await axios.get(`http://localhost:3000/api/acesso/isAdmin`, {
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