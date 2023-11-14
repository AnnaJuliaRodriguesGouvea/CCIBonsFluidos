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



    return {
        rows,
        setRows,
        erro,
        setErro,
        adicionarDoacao,
        listaDoacoes,
    }
}