import axios from "axios";
import { createContext, useContext, useState } from "react";
import { formataData } from "../../utils/formataData"

export const UserInfo = createContext();
UserInfo.displayName = "Informações do Usuário";

export const UserInfoProvider = ({ children }) => {

    const [infoPF, setInfoPF] = useState()
    const [infoPJ, setInfoPJ] = useState()
    const [erro, setErro] = useState()

    return (
        <UserInfo.Provider
            value={{
                infoPF,
                setInfoPF,
                infoPJ,
                setInfoPJ,
                erro,
                setErro,
            }}
        >
            {children}
        </UserInfo.Provider>
    )
};

export const useUserInfoContext = () => {
    const {
        infoPF,
        setInfoPF,
        infoPJ,
        setInfoPJ,
        erro,
        setErro
    } = useContext(UserInfo)

    async function getUserInfoPF(codigoUsuario) {
        try {
            const resPF = await axios.get(`http://localhost:3000/api/pessoa-fisica/${codigoUsuario}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            })
            const data = resPF.data
            setErro(null)
            return setInfoPF(data)
        } catch (err) {
            setErro(err)
        }
    }

    async function getUserInfoPJ(codigoUsuario) {
        try {
            const resPJ = await axios.get(`http://localhost:3000/api/pessoa-juridica/${codigoUsuario}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            })
            const data = resPJ.data
            setErro(null)
            return setInfoPJ(data)
        } catch (err) {
            setErro(err)
        }
    }

    async function alteraPF(dadosUsuarioPF, codigoDoUsuario) {
        try {
            await axios.put(`http://localhost:3000/api/pessoa-fisica/${codigoDoUsuario}`, {
                email: dadosUsuarioPF.email,
                senha: dadosUsuarioPF.senha,
                isAdmin: dadosUsuarioPF.isAdmin,
                cpf: dadosUsuarioPF.cpf,
                nome: dadosUsuarioPF.nomePF,
                dataNascimento: formataData(dadosUsuarioPF.dataDeNascimento),
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            })
            setErro(null)
            getUserInfoPF(codigoDoUsuario)
        } catch (err) {
            setErro(err)
        }
    }

    async function deletePF(codigoDoUsuario) {
        try {
            await axios.delete(`http://localhost:3000/api/pessoa-fisica/${codigoDoUsuario}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            })
            setErro(null)
        } catch (err) {
            setErro(err)
        }
    }

    async function alteraPJ(dadosUsuarioPJ, codigoDoUsuario) {
        try {
            await axios.put(`http://localhost:3000/api/pessoa-juridica/${codigoDoUsuario}`, {
                email: dadosUsuarioPJ.email,
                senha: dadosUsuarioPJ.senha,
                isAdmin: dadosUsuarioPJ.isAdmin,
                cnpj: dadosUsuarioPJ.cnpj,
                razaoSocial: dadosUsuarioPJ.razaoSocial,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            })
            setErro(null)
            getUserInfoPJ(codigoDoUsuario)
        } catch (err) {
            setErro(err)
        }
    }

    async function deletePJ(codigoDoUsuario) {
        try {
            await axios.delete(`http://localhost:3000/api/pessoa-juridica/${codigoDoUsuario}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            })
            setErro(null)
        } catch (err) {
            setErro(err)
        }
    }


    return {
        infoPF,
        setInfoPF,
        infoPJ,
        setInfoPJ,
        erro,
        setErro,
        getUserInfoPF,
        getUserInfoPJ,
        alteraPF,
        deletePF,
        alteraPJ,
        deletePJ
    }
}