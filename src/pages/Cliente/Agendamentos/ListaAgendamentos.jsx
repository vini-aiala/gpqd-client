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

import DateTimePicker from 'react-datetime-picker';

import { Edit } from "@material-ui/icons";

import Api from "../../../services/api";
import SidebarCliente from "../../../components/SidebarCliente";

const ListaAgendamentosCliente = () => {

    const history = useHistory();
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setNomeFuncionario("");
        setOpen(true);
    }
        
    const handleClose = () => setOpen(false);
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    const [id, setId] = useState(0);
    const [idFuncionario, setIdFuncionario] = useState("");
    const [idPet, setIdPet] = useState("");
    const [idCliente, setIdCliente] = useState("");
    const [rows, setRows] = useState([]);

    const [nomeFuncionario, setNomeFuncionario] = useState("");
    const [nomeCliente, setNomeCliente] = useState("");
    const [nomePet, setNomePet] = useState("");
    const [cargoFuncionario, seCargoFuncionario] = useState("");

    const [date, setDate] = useState(new Date());
    
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
                  onClick={() => getAgendamentoById(row.id)}
                >
                    <Edit />
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.horario}</TableCell>
              <TableCell align="right">{row.funcionario.id}</TableCell>
              <TableCell align="right">{row.funcionario.nome}</TableCell>
              <TableCell align="right">{row.funcionario.cargo}</TableCell>
              <TableCell align="right">{row.pet.dono.id}</TableCell>
              <TableCell align="right">{row.pet.dono.nome}</TableCell>
              <TableCell align="right">{row.pet.id}</TableCell>
              <TableCell align="right">{row.pet.nome}</TableCell>
            </TableRow>
          </React.Fragment>
        );
      }
      
   
    
    useEffect(() => {
        async function getAgendamentos() {
            try {
                const response = await Api.get("/agendamento");
                console.log(response.data);

                if(response) {
                    const agendamentos = (response.data).map(function(item){
                        let json = {
                            funcionario: {
                                nome: item.funcionario.nome,
                                id: item.funcionario.id,
                                cargo: item.funcionario.cargo
                            },
                            horario: item.horario,
                            id: item.id,
                            pet: {
                                dono: {
                                    nome: item.pet.dono.nome,
                                    id: item.pet.dono.id
                                },
                                id: item.pet.id,
                                nome: item.pet.nome
                            }
                        }
                        return json;
                    })
                    console.log(agendamentos);
                    setRows(agendamentos);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getAgendamentos();
    }, []);

    async function createAgendamento(e){
        e.preventDefault();

        try {
            const response = await Api.post("/agendamento?funcionarioId=" + idFuncionario + "&horario=" + date.toISOString() + "&petId=" + idPet);

            if(response){
                console.log(response);
                alert("Agendamento realizado com sucesso!");
                window.location.reload();
            }
        } catch (error){
            console.log(error);
        }
    };

    async function getAgendamentoById(id){
        try {
            const response = await Api.get("/agendamento/" + id);

            if(response){
                setId(response.data.id);
                setIdFuncionario(response.data.funcionario.id);
                setIdPet(response.data.pet.id);
                setIdCliente(response.data.pet.dono.id);
            }
        } catch (error){
            console.log(error);
        }
        handleOpenEdit();
    }

    async function editAgendamento(e){
        e.preventDefault();

        try {
            const response = await Api.put("/agendamento/" + id, {
                funcionarioId: idFuncionario,
                horario: date.toISOString(),
                petId: idPet
            });

            if(response){
                console.log(response);
                alert("Agendamento atualizado com sucesso!");
                window.location.reload();
            }
        } catch (error){
            console.log(error);
        }
    }

    async function deleteAgendamento(id){
        try {
            const response = await Api.delete("/agendamento/" + id);

            if(response.status == 200){
                alert("Agendamento cancelado com sucesso!");
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

            <Button onClick={handleOpen} sx={{marginBottom: 5}} variant="contained">Novo Agendamento</Button>

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={ style }
                    component="form"
                    onSubmit={createAgendamento}
                    noValidate
                    autoComplete="off"
                  >

                    <TextField
                        label="ID Funcionario"
                        id="outlined-size-small"
                        size="small"
                        value={idFuncionario}
                        onChange={(e) => setIdFuncionario(e.target.value)}
                        sx={{marginBottom: 5, width: "100%"}}
                    />

                    <TextField
                        label="ID Pet"
                        id="outlined-size-small"
                        size="small"
                        value={idPet}
                        onChange={(e) => setIdPet(e.target.value)}
                        sx={{marginBottom: 5, width: "100%"}}
                    />

                    <DateTimePicker
                        onChange={setDate}
                        value={date}
                        disableClock={true}
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
                    onSubmit={editAgendamento}
                    noValidate
                    autoComplete="off"
                  >
                    
                    <TextField
                        label="ID Funcionario"
                        id="outlined-size-small"
                        size="small"
                        value={idFuncionario}
                        onChange={(e) => setIdFuncionario(e.target.value)}
                        sx={{marginBottom: 5, width: "100%"}}
                    />

                    <TextField
                        label="ID Pet"
                        id="outlined-size-small"
                        size="small"
                        value={idPet}
                        onChange={(e) => setIdPet(e.target.value)}
                        sx={{marginBottom: 5, width: "100%"}}
                    />

                    <DateTimePicker
                        onChange={setDate}
                        value={date}
                        disableClock={true}
                    />

                    <Button type="submit" sx={{mr: 5}} variant="outlined">Salvar</Button>
                    <Button onClick={() => deleteAgendamento(id)} sx={{mr: 5}} variant="contained">Excluir</Button>

                  </Box>
                </Modal>
            </div>
            
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Horário</TableCell>
                        <TableCell align="right">ID Funcionário</TableCell>
                        <TableCell align="right">Nome Funcionário</TableCell>
                        <TableCell align="right">Cargo Funcionário</TableCell>
                        <TableCell align="right">ID Cliente</TableCell>
                        <TableCell align="right">Nome Cliente</TableCell>
                        <TableCell align="right">ID Pet</TableCell>
                        <TableCell align="right">Nome Pet</TableCell>
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

export default ListaAgendamentosCliente;
