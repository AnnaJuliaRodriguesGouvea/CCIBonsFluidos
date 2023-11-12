import {createContext, useContext, useState} from "react";

export const DadosParametrizacao = createContext();
DadosParametrizacao.displayName = "Dados de Parametrização";

export const DadosParametrizacaoProvider = ({ children }) => {

    const [listaTiposAbsorventes, setListaTiposAbsorventes] = useState([])
    const [listaSuavidades, setListaSuavidades] = useState([])
    const [listaFluxos, setListaFluxos] = useState([])
    const [listaTransacoes, setListaTransacoes] = useState([])
    const [listaTamanhos, setListaTamanhos] = useState([])

    return (
        <DadosParametrizacao.Provider
            value={{
                listaTiposAbsorventes, setListaTiposAbsorventes,
                listaSuavidades, setListaSuavidades,
                listaFluxos, setListaFluxos,
                listaTransacoes, setListaTransacoes,
                listaTamanhos, setListaTamanhos
            }}
        >
            {children}
        </DadosParametrizacao.Provider>
    )
};