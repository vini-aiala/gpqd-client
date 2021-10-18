import * as React from 'react';

 import { AppBar, 
    Box, 
    CssBaseline, 
    Divider, 
    Drawer, 
    List, 
    ListItem, 
    ListItemText,
    Toolbar,
    Typography,
    ListItemIcon
} from '@material-ui/core';
import { ShoppingBasket } from '@material-ui/icons';
import { Event } from '@material-ui/icons';
import { PeopleAlt } from '@material-ui/icons';
import { AssignmentInd } from '@material-ui/icons';
import { ExitToApp } from '@material-ui/icons';
import { Pets } from '@material-ui/icons';
import { Assignment } from '@material-ui/icons';
import { useHistory } from 'react-router';

const drawerWidth = 240;


const SidebarFuncionario = () => {
    const history = useHistory();

    const handleLogout = () => {
        history.push("/");
    }

    const handleAgendamentos = () => {
        history.push("/lista_agendamentos");
    }

    const handleFuncionarios = () => {
        history.push("/lista_funcionarios");
    }

    const handleClientes = () => {
        history.push("/lista_clientes");
    }

    const handlePets = () => {
        history.push("/lista_pets");
    }

    const handleProdutos = () => {
        history.push("/lista_produtos");
    }

    const handlePedidos = () => {
        history.push("/lista_pedidos");
    }

    return (
        <>
        <CssBaseline />
        <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Seja Bem-Vindo, Funcionário
                </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider />
            <List>

                <ListItem button onClick={handleAgendamentos}>
                    <ListItemIcon>
                        <Event />
                    </ListItemIcon>
                    <ListItemText primary={"Agendamentos"} />
                </ListItem>

                <ListItem button onClick={handleClientes}>
                    <ListItemIcon>
                        <PeopleAlt />
                    </ListItemIcon>
                    <ListItemText primary={"Clientes"} />
                </ListItem>

                <ListItem button onClick={handlePets}>
                    <ListItemIcon>
                        <Pets />
                    </ListItemIcon>
                    <ListItemText primary={"Pets"} />
                </ListItem>

                <ListItem button onClick={handleFuncionarios}>
                    <ListItemIcon>
                        <AssignmentInd />
                    </ListItemIcon>
                    <ListItemText primary={"Funcionários"} />
                </ListItem>

                <ListItem button onClick={handleProdutos}>
                    <ListItemIcon>
                        <ShoppingBasket />
                    </ListItemIcon>
                    <ListItemText primary={"Produtos"} />
                </ListItem>

                <ListItem button onClick={handlePedidos}>
                    <ListItemIcon>
                        <Assignment />
                    </ListItemIcon>
                    <ListItemText primary={"Pedidos"} />
                </ListItem>

                <Divider/>

                <ListItem button onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary={"Sair"} />
                </ListItem>

            </List>
        </Drawer>
      </>
    );
};

export default SidebarFuncionario;