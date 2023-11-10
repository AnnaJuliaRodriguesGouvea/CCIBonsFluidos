import { AccountCircle, AddBox, Logout, VolunteerActivism } from "@mui/icons-material";
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const drawerWidth = 200;

const LinkEstilizado = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.7);
  &:visited {
    color: rgba(0, 0, 0, 0.7);
  }
`
const ImgEstilizado = styled.img`
  width: 148px;
  padding: 1em;
  box-sizing: border-box;
`

const SideMenu = ({ selectedIndex, handleListItemClick, setIsAdmin }) => {

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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
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
                <AddBox />
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
                <VolunteerActivism />
              </ListItemIcon>
              <ListItemText primary="Doação" sx={{ py: 1 }} />
            </ListItemButton>
          </LinkEstilizado>
          <Divider />
          <LinkEstilizado to="/cadastrar">
            <ListItemButton>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Cadastrar" sx={{ py: 2 }} />
            </ListItemButton>
          </LinkEstilizado>
        </List>
        <Divider />
        <LinkEstilizado to="/" onClick={() => {
          localStorage.clear()
          setIsAdmin(false)
        }}>
          <ListItemButton>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Sair" sx={{ color: 'rgba(0, 0, 0, 0.7)', p: 2 }} />
          </ListItemButton>
        </LinkEstilizado >
      </Drawer>
    </Box>
  )
}

export default SideMenu