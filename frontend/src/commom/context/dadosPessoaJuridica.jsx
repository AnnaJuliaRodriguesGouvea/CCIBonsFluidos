import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DadosPessoaJuridica = createContext();
DadosPessoaJuridica.displayName = "Dados Pessoa Juridica";

export const DadosPessoaJuridicaProvider = ({ children }) => {

    const [pessoasJuridicas, setPessoasJuridicas] = useState()
    const [erro, setErro] = useState()

    return (
        <DadosPessoaJuridica.Provider
            value={{
                pessoasJuridicas,
                setPessoasJuridicas,
                erro,
                setErro,
            }}
        >
            {children}
        </DadosPessoaJuridica.Provider>
    )
};

export const useDadosPessoaJuridica = () => {
    const {
        pessoasJuridicas,
        setPessoasJuridicas,
        erro,
        setErro,
    } = useContext(DadosPessoaJuridica)

    async function listaPessoasJuridicas(limit, page) {
        try {
            const resultado = await axios.get(`http://localhost:3000/api/pessoa-juridica?limite=${limit}&pagina=${page}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            })
            const listaDePessoasJuridicas = resultado.data.rows;
            setPessoasJuridicas(listaDePessoasJuridicas)
            setErro(null);
        } catch (err) {
            setErro(err);
        }
    }

    return {
        pessoasJuridicas,
        setPessoasJuridicas,
        erro,
        setErro,
        listaPessoasJuridicas
    }
}