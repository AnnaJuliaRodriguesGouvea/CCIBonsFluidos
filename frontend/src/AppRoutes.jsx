import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from "axios"

import { UserInfoProvider } from "./commom/context/dadosUsuario.jsx"
import { DadosPessoaJuridicaProvider } from "./commom/context/dadosPessoaJuridica.jsx"

import EstilosGlobais from "./componentes/EstilosGlobais"
import MainContainer from "./componentes/MainContainer"
import MainPagePadrao from './pages/MainPagePadrao/index.jsx'
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import Perfil from "./pages/Perfil/index.jsx"
import { Alert } from "@mui/material"

function AppRoutes() {

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const [data, setData] = useState();

  const installBD = async () => {
    const res = await axios.get('http://localhost:3000/install')
    const data = res.data
    setData(data)
  }

  useEffect(() => {
    installBD()
  }, [])

  const [isAdmin, setIsAdmin] = useState();
  const [entidade, setEntidade] = useState();

  return (
    <>
      <BrowserRouter>
        <EstilosGlobais />
        <UserInfoProvider>
          <DadosPessoaJuridicaProvider>
            <Routes>
              <Route path="/" element={<MainContainer />}>
                <Route index element={<Login setIsAdmin={setIsAdmin} setEntidade={setEntidade} />} />
                <Route path="cadastrar" element={<Cadastro isAdmin={isAdmin} />} />
              </Route>
              <Route path='/home' element={<MainPagePadrao selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} aoClickarItemLista={handleListItemClick} entidade={entidade} setIsAdmin={setIsAdmin} />}>
                <Route path='/home/perfil' element={<Perfil entidade={entidade} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
              </Route>
              <Route path="*" element={<Alert severity="error">Error 404: Page not found</Alert>} />
            </Routes>
          </ DadosPessoaJuridicaProvider>
        </UserInfoProvider>
      </BrowserRouter >
    </>
  )
}

export default AppRoutes