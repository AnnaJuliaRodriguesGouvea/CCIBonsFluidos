import { AppBar, Box, Button, Container, CssBaseline, Popover, Toolbar, Typography } from "@mui/material";
import SideMenu from "../../componentes/SideMenu";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import styled from "@emotion/styled";
import {AppContext} from "../../commom/context/appContext.jsx";

const LinkEstilizado = styled(Link)`
    text-decoration: none;
    color: black;
`

const drawerWidth = 200;

const MainPagePadrao = (props) => {
    const appContext = useContext(AppContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if(!localStorage.getItem("token")) {
           navigate(-1)
        } else {
            appContext.setSelectedIndex(-1)
        }
    }, [])

  return (
    <Container sx={{display: 'flex', p: '0', m: '0',
        '@media (min-width: 600px)': {p: '0'},
        '@media (min-width: 1200px)': {maxWidth: 'none'}
    }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          background: 'linear-gradient(#e66465, #9198e5)',
        }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h4"
            component="div">
            Solidary Flow
          </Typography>
          <Button
              aria-describedby={isOpen ? 'simple-popover' : undefined}
              onClick={handleClick}
              sx={{ fontSize: '16px', color: '#FFF', p: 2 }}>
                Minha Conta
          </Button>
          <Popover
            id={isOpen ? 'simple-popover' : undefined}
            open={isOpen}
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
      <SideMenu/>
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