import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useEffect, useState } from 'react'

import { DadosDoacaoProvider } from './commom/context/dadosDoacao.jsx'
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
import {AppContextProvider} from "./commom/context/appContext.jsx";
import {DadosParametrizacaoProvider} from "./commom/context/dadosParametrizacao.jsx";

function AppRoutes() {

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const data = []

  return (
    <>
      <BrowserRouter>
        <EstilosGlobais />
        <AppContextProvider>
          <DadosDoacaoProvider>
            <DadosPessoaJuridicaProvider>
              <Routes>
                <Route path="/" element={<MainContainer />}>
                  <Route index element={<Login/>} />
                  <Route path="cadastrar" element={<Cadastro/>} />
                </Route>
                <Route path='/home' element={<MainPagePadrao selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} aoClickarItemLista={handleListItemClick}/>}>
                  {/* FEITO - TODO - recuperar valores de parametrizacao pela rota correta - Anna*/}
                  <Route path='/home/produto' element={<Produto/>}/>
                  <Route path='/home/doacao' element={<Doacao selectMenuItems={data} />} />
                  <Route path='/home/perfil' element={<Perfil />} />
                </Route>
                <Route path='/adicionaProduto' element={
                  <DadosParametrizacaoProvider>
                    <AdicionaProduto/>
                  </DadosParametrizacaoProvider>
                } />
                <Route path='/AdicionaDoacao' element={<AdicionaDoacao selectMenuItems={data} />} />
                <Route path="*" element={<Alert severity="error">Error 404: Page not found</Alert>} />
              </Routes>
            </ DadosPessoaJuridicaProvider>
          </DadosDoacaoProvider>
        </AppContextProvider>
      </BrowserRouter >
    </>
  )
}

export default AppRoutes