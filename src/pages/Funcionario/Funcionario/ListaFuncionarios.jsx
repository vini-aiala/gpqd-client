import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router';


 import { 
    Box,
    Collapse,
    Toolbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    TextField,
    Modal,
    Typography
} from '@material-ui/core';

import { Edit } from "@material-ui/icons";

import Api from "../../../services/api";
import SidebarFuncionario from '../../../components/SidebarFuncionario.jsx';

const ListaFuncionarios = () => {

    const history = useHistory();
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setNome("");
        setCargo("");
        setOpen(true);
    }
        
    const handleClose = () => setOpen(false);
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    const [id, setId] = useState(0);
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    function Row(props) {
        const { row } = props;      
        return (
          <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => getFuncionarioById(row.id)}
                >
                    <Edit />
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.nome}</TableCell>
              <TableCell align="right">{row.cargo}</TableCell>
              
            </TableRow>
          </React.Fragment>
        );
      }
      
    const [rows, setRows] = useState([]);

    const [nome, setNome] = useState("");
    const [cargo, setCargo] = useState("");

    useEffect(() => {
        async function getFuncionarios() {
            try {
                const response = await Api.get("/funcionario");
                console.log(response.data);

                if(response) {
                    const funcionarios = (response.data).map(function(item){
                        let json = {
                            id: item.id,
                            nome: item.nome,
                            cargo: item.cargo
                        }
                        return json;
                    })
                    console.log(funcionarios);
                    setRows(funcionarios);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getFuncionarios();
    }, []);

    async function createFuncionario(e){
        e.preventDefault();
        try {
            const response = await Api.post("/funcionario/?cargo=" + cargo + "&nome=" + nome);

            if(response){
                console.log(response);
                alert("Funcionário criado com sucesso!");
                window.location.reload();
            }
        } catch (error){
            console.log(error);
        }
    };

    async function getFuncionarioById(id){
        try {
            const response = await Api.get("/funcionario/" + id);

            if(response){
                setId(response.data.id);
                setNome(response.data.nome);
                setCargo(response.data.cargo);
            }
        } catch (error){
            console.log(error);
        }
        handleOpenEdit();
    }

    async function editFuncionario(e){
        e.preventDefault();

        try {
            const response = await Api.put("/funcionario/" + id, {
                nome,
                cargo
            });

            if(response){
                console.log(response);
                alert("Funcionário atualizado com sucesso!");
                window.location.reload();
            }
        } catch (error){
            console.log(error);
        }
    }

    async function deleteFuncionario(id){
        try {
            const response = await Api.delete("/funcionario/" + id);

            if(response.status == 200){
                alert("Funcionário deletado com sucesso!");
                window.location.reload();
            }
        } catch (error){
            console.log(error);
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <SidebarFuncionario/>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
            <Toolbar />

            <Button onClick={handleOpen} sx={{marginBottom: 5}} variant="contained">Novo Funcionário</Button>

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={ style }
                    component="form"
                    onSubmit={createFuncionario}
                    noValidate
                    autoComplete="off"
                  >
                    
                    <TextField
                        label="Nome"
                        id="outlined-size-small"
                        size="small"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        sx={{marginBottom: 5, width: "100%"}}
                    />

                    <TextField
                        label="Cargo"
                        id="outlined-size-small"
                        size="small"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        sx={{marginBottom: 5, width: "100%"}}
                    />

                    <Button type="submit" sx={{mr: 5}} variant="outlined">Salvar</Button>
                  </Box>
                </Modal>
            </div>

            <div>
                <Modal
                    open={openEdit}
                    onClose={handleCloseEdit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={ style }
                    component="form"
                    onSubmit={editFuncionario}
                    noValidate
                    autoComplete="off"
                  >
                    
                    <TextField
                        label="Nome"
                        id="outlined-size-small"
                        size="small"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        sx={{marginBottom: 5, width: "100%"}}
                    />

                    <TextField
                        label="Cargo"
                        id="outlined-size-small"
                        size="small"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        sx={{marginBottom: 5, width: "100%"}}
                    />

                    <Button type="submit" sx={{mr: 5}} variant="outlined">Salvar</Button>
                    <Button onClick={() => deleteFuncionario()} sx={{mr: 5}} variant="contained">Excluir</Button>

                  </Box>
                </Modal>
            </div>
            
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Nome</TableCell>
                        <TableCell align="right">Cargo</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    </Box>
  );
}

export default ListaFuncionarios;
