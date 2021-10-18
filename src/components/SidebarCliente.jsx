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


const SidebarCliente = () => {
    const history = useHistory();

    const handleLogout = () => {
        history.push("/");
    }

    const handleAgendamentos = () => {
        history.push("/cliente/agendamento");
    }


    const handlePets = () => {
        history.push("/cliente/pets");
    }

    const handlePedidos = () => {
        history.push("/cliente/pedidos");
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
                    Seja Bem-Vindo, Cliente
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

                <ListItem button onClick={handlePets}>
                    <ListItemIcon>
                        <Pets />
                    </ListItemIcon>
                    <ListItemText primary={"Pets"} />
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

export default SidebarCliente;