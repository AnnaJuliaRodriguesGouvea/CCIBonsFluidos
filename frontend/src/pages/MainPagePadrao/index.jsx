import { AppBar, Box, Button, Container, CssBaseline, Popover, Toolbar, Typography } from "@mui/material";
import SideMenu from "../../componentes/SideMenu";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useUserInfoContext } from "../../commom/context/dadosUsuario";


const LinkEstilizado = styled(Link)`
    text-decoration: none;
    color: black;
`

const drawerWidth = 200;

const MainPagePadrao = ({ selectedIndex, setSelectedIndex, aoClickarItemLista, entidade, setIsAdmin }) => {
  const navigate = useNavigate();
  const { getUserInfoPF, getUserInfoPJ, infoPF, setInfoPF, infoPJ, setInfoPJ } = useUserInfoContext();

  //TODO - criar uma rota no backend para recuperar usuario - Anna
  async function carregaInfoUsuario() {
    if (entidade == "PessoaFisica")
      await getUserInfoPF(localStorage.getItem("codigo"))
    if (entidade == "PessoaJuridica")
      await getUserInfoPJ(localStorage.getItem("codigo"))
  }

  useEffect(() => {
    setSelectedIndex(-1)
    carregaInfoUsuario()
  }, [])

  //TODO - fazer no back a verificacao de exclusao logica na rota de login - Anna
  if (infoPJ?.acesso.isExcluido) {
    localStorage.clear()
    alert('Acesso negado!')
    navigate('/')
  } else if (infoPF?.acesso.isExcluido) {
    localStorage.clear()
    alert('Acesso negado!')
    navigate('/')
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //TODO - renomer para isOPEN - Anna
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Container sx={{
      display: 'flex',
      p: '0',
      m: '0',
      '@media (min-width: 600px)': {
        p: '0',
      },
      '@media (min-width: 1200px)': {
        maxWidth: 'none',
      }
    }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          background: 'linear-gradient(#e66465, #9198e5)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h4"
            component="div"
          >
            Solidary Flow
          </Typography>
          <Button aria-describedby={id} onClick={handleClick} sx={{ fontSize: '16px', color: '#FFF', p: 2 }}>
            Minha Conta
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            slotProps={{
              paper: {
                sx() {
                  return {
                    width: "10%",
                    height: "40px",
                  };
                },
              },
            }}

          >
            <LinkEstilizado to='/home/perfil'>
              <Typography sx={{ p: 1 }}>Perfil</Typography>
            </LinkEstilizado>
          </Popover>
        </Toolbar>
      </AppBar>
      <SideMenu selectedIndex={selectedIndex} handleListItemClick={aoClickarItemLista} setIsAdmin={setIsAdmin} />
      <Box
        component="main"
        sx={{
          p: 3,
          mx: 'auto',
          height: '100vh',
          width: `calc(100% - ${drawerWidth}px)`,
          backgroundColor: '#fafafa',
        }}
      >
        <Outlet />
      </Box>
    </Container>
  )
}

export default MainPagePadrao