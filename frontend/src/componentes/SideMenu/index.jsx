import { AccountCircle, AddBox, Logout, VolunteerActivism } from "@mui/icons-material";
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import {useContext, useEffect, useState} from "react";
import {getIsAdmin} from "../../service/acessoService.jsx";
import {AppContext} from "../../commom/context/appContext.jsx";

const drawerWidth = 200;

const LinkEstilizado = styled(Link)`
  text-decoration: none;
  color: #e01f4c;
  &:visited {
    color: rgba(0, 0, 0, 0.7);
  }
`
const ImgEstilizado = styled.img`
  width: 148px;
  padding: 1em;
  box-sizing: border-box;
`

const SideMenu = ({ selectedIndex, handleListItemClick }) => {
  const appContext = useContext(AppContext)
  const [isAdmin, setIsAdmin] = useState(false)

  async function carregaIsAdmin() {
    setIsAdmin(await getIsAdmin(appContext.setError))
  }

  useEffect(() => {
    carregaIsAdmin()
  }, [])

  return (
    <Box
      component="nav"
      sx={{
        width: drawerWidth,
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth, 
            bgcolor: '#C0C0C0' 
          },
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', p: 0 }}>
          <ImgEstilizado src="/public/logo-bons-fluidos-removebg-titulo.png" alt="logo" />
        </Toolbar>
        <Divider />
        <List>
          <LinkEstilizado to="/home/produto">
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={() => handleListItemClick(0)}
            >
              <ListItemIcon>
                <AddBox style={{color: '#e01f4c'}}/>
              </ListItemIcon>
              <ListItemText
                primary="Produto"
                sx={{ py: 1 }}
              />
            </ListItemButton>
          </LinkEstilizado>
          <LinkEstilizado to="/home/doacao">
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={() => handleListItemClick(1)}
            >
              <ListItemIcon>
                <VolunteerActivism style={{color: '#e01f4c'}}/>
              </ListItemIcon>
              <ListItemText primary="Doação" sx={{ py: 1 }} />
            </ListItemButton>
          </LinkEstilizado>
          {isAdmin && <Divider />}
          {isAdmin && <LinkEstilizado to="/cadastrar">
            <ListItemButton>
              <ListItemIcon>
                <AccountCircle style={{color: '#e01f4c'}}/>
              </ListItemIcon>
              <ListItemText primary="Cadastrar" sx={{ py: 2 }} />
            </ListItemButton>
          </LinkEstilizado>}
        </List>
        <Divider />
        <LinkEstilizado to="/" onClick={() => {
          localStorage.clear()
        }}>
          <ListItemButton>
            <ListItemIcon>
              <Logout style={{color: '#e01f4c'}}/>
            </ListItemIcon>
            <ListItemText primary="Sair" sx={{ color: '#e01f4c', p: 2 }} />
          </ListItemButton>
        </LinkEstilizado >
      </Drawer>
    </Box>
  )
}

export default SideMenu