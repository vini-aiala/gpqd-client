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
import SidebarCliente from "../../../components/SidebarCliente";

const ListaPetsCliente = () => {

    const history = useHistory();
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setNomePet("");
        setOpen(true);
    }
        
    const handleClose = () => setOpen(false);
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    const [id, setId] = useState("");
    const [idPet, setIdPet] = useState("");
    
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
                  onClick={() => getPetById(row.id)}
                >
                    <Edit />
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.nome}</TableCell>
              <TableCell align="right">{row.dono.id}</TableCell>
              <TableCell align="right">{row.dono.nome}</TableCell>
            </TableRow>
          </React.Fragment>
        );
      }
      
    const [rows, setRows] = useState([]);

    const [nomePet, setNomePet] = useState("");
    const [nomeDono, setNomeDono] = useState("");
    useEffect(() => {
        async function getPets() {
            try {
                const response = await Api.get("/pet");
                console.log(response.data);

                if(response) {
                    const pets = (response.data).map(function(item){
                        let json = {
                            dono: {
                                id: item.dono.id,
                                nome: item.dono.nome
                            },
                            id: item.id,
                            nome: item.nome
                        }
                        return json;
                    })
                    console.log(pets);
                    setRows(pets);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getPets();
    }, []);

    async function createPet(e){
        e.preventDefault();
        try {
            const response = await Api.post("/pet?donoId=" + id + "&nome=" + nomePet);

            if(response){
                console.log(response);
                alert("Pet cadastrado com sucesso!");
                window.location.reload();
            }
        } catch (error){
            console.log(error);
        }
    };

    async function getPetById(idPet){
        try {
            const response = await Api.get("/pet/" + idPet);

            if(response){
                setIdPet(response.data.id);
                setNomePet(response.data.nome);
                setId(response.data.dono.id);
                setNomeDono(response.data.dono.nome);
            }
        } catch (error){
            console.log(error);
        }
        handleOpenEdit();
    }

    async function editPet(e){
        e.preventDefault();

        try {
            const response = await Api.put("/pet/" + idPet, {
                donoId: id,
                nome: nomePet
            });

            if(response){
                console.log(response);
                alert("Pet atualizado com sucesso!");
                window.location.reload();
            }
        } catch (error){
            console.log(error);
        }
    }

    async function deletePet(idPet){
        try {
            const response = await Api.delete("/pet/" + idPet);

            if(response.status == 200){
                alert("Pet deletado com sucesso!");
                window.location.reload();
            }
        } catch (error){
            console.log(error);
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <SidebarCliente/>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
            <Toolbar />

            <Button onClick={handleOpen} sx={{marginBottom: 5}} variant="contained">Novo Pet</Button>

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={ style }
                    component="form"
                    onSubmit={createPet}
                    noValidate
                    autoComplete="off"
                  >

                    <TextField
                        label="ID Dono"
                        id="outlined-size-small"
                        size="small"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        sx={{marginBottom: 5, width: "100%"}}
                    />
                    
                    <TextField
                        label="Nome Pet"
                        id="outlined-size-small"
                        size="small"
                        value={nomePet}
                        onChange={(e) => setNomePet(e.target.value)}
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
                    onSubmit={editPet}
                    noValidate
                    autoComplete="off"
                  >
                    
                    <TextField
                        label="Nome Pet"
                        id="outlined-size-small"
                        size="small"
                        value={nomePet}
                        onChange={(e) => setNomePet(e.target.value)}
                        sx={{marginBottom: 5, width: "100%"}}
                    />

                    <Button type="submit" sx={{mr: 5}} variant="outlined">Salvar</Button>
                    <Button onClick={() => deletePet(idPet)} sx={{mr: 5}} variant="contained">Excluir</Button>

                  </Box>
                </Modal>
            </div>
            
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>ID Pet</TableCell>
                        <TableCell align="right">Nome Pet</TableCell>
                        <TableCell align="right">ID Dono</TableCell>
                        <TableCell align="right">Nome Dono</TableCell>
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

export default ListaPetsCliente;
