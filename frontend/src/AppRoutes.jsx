import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from "axios"

import { DadosProtudoProvider } from './commom/context/dadosProduto.jsx'
import { DadosDoacaoProvider } from './commom/context/dadosDoacao.jsx'
import { UserInfoProvider } from "./commom/context/dadosUsuario.jsx"
import { DadosPessoaJuridicaProvider } from "./commom/context/dadosPessoaJuridica.jsx"

import EstilosGlobais from "./componentes/EstilosGlobais"
import MainContainer from "./componentes/MainContainer"
import MainPagePadrao from './pages/MainPagePadrao/index.jsx'
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import Doacao from './pages/Doacao/index.jsx'
import Produto from './pages/Produto/index.jsx'
import AdicionaProduto from './pages/AdicionaProduto/index.jsx'
import AdicionaDoacao from './pages/AdicionaDoacao/index.jsx'
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
          <DadosProtudoProvider>
            <DadosDoacaoProvider>
              <DadosPessoaJuridicaProvider>
                <Routes>
                  <Route path="/" element={<MainContainer />}>
                    <Route index element={<Login setIsAdmin={setIsAdmin} setEntidade={setEntidade} />} />
                    <Route path="cadastrar" element={<Cadastro isAdmin={isAdmin} />} />
                  </Route>
                  <Route path='/home' element={<MainPagePadrao selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} aoClickarItemLista={handleListItemClick} entidade={entidade} setIsAdmin={setIsAdmin} />}>
                    <Route path='/home/produto' element={<Produto selectMenuItems={data} isAdmin={isAdmin} />} />
                    <Route path='/home/doacao' element={<Doacao selectMenuItems={data} />} />
                    <Route path='/home/perfil' element={<Perfil entidade={entidade} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
                  </Route>
                  <Route path='/AdicionaProduto' element={<AdicionaProduto selectMenuItems={data} />} />
                  <Route path='/AdicionaDoacao' element={<AdicionaDoacao selectMenuItems={data} />} />
                  <Route path="*" element={<Alert severity="error">Error 404: Page not found</Alert>} />
                </Routes>
              </ DadosPessoaJuridicaProvider>
            </DadosDoacaoProvider>
          </DadosProtudoProvider>
        </UserInfoProvider>
      </BrowserRouter >
    </>
  )
}

export default AppRoutes