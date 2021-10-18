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

import { MultiSelect } from "react-multi-select-component";

import { Edit } from "@material-ui/icons";

import Api from "../../../services/api";
import SidebarFuncionario from '../../../components/SidebarFuncionario.jsx';

const ListaPedidos = () => {

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
    const [idCliente, setIdCliente] = useState("");
    const [idFuncionario, setIdFuncionario] = useState("");
    const [produtos, setProdutos] = useState([]);
    const [selected, setSelected] = useState([]);
    
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
                  onClick={() => getPedidoById(row.id)}
                >
                    <Edit />
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.cliente.id}</TableCell>
              <TableCell align="right">{row.cliente.nome}</TableCell>
              <TableCell align="right">{row.funcionario.id}</TableCell>
              <TableCell align="right">{row.funcionario.nome}</TableCell>
              <TableCell align="right">{row.funcionario.cargo}</TableCell>
              <TableCell align="right">{row.produtos.map(function(item){
                  return item.id + " "
              })}</TableCell>
            </TableRow>
          </React.Fragment>
        );
      }
      
    const [rows, setRows] = useState([]);

    const [nomePet, setNomePet] = useState("");
    const [nomeDono, setNomeDono] = useState("");
    useEffect(() => {
        async function getPedidos() {
            try {
                const response = await Api.get("/pedido");
                console.log(response.data);

                if(response) {
                    const pedidos = (response.data).map(function(item){
                        let json = {
                            cliente: {
                                id: item.cliente.id,
                                nome: item.cliente.nome
                            },
                            funcionario: {
                                id: item.funcionario.id,
                                nome: item.funcionario.nome,
                                cargo: item.funcionario.cargo
                            },
                            produtos: item.produtos,
                            id: item.id
                        }
                        return json;
                    })
                    console.log(pedidos);
                    setRows(pedidos);
                }
            } catch (error) {
                console.log(error);
            }
        }
        async function getProdutos() {
            try {
                const response = await Api.get("/produto");
                console.log(response.data);

                if(response) {
                    const produtos = (response.data).map(function(item){
                        let json = {
                            value: item.id,
                            label: item.nome
                        }
                        return json;
                    })
                    console.log(produtos);
                    setProdutos(produtos);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getProdutos();
        getPedidos();
    }, []);

    async function createPedido(e){
        e.preventDefault();

        const produtosId = selected.map(function(item){
            return item.value;
        });

        try {
            const response = await Api.post("/pedido?clienteId=" + idCliente + "&funcionarioId=" + idFuncionario + "&produtosId=" + produtosId);

            if(response){
                console.log(response);
                alert("Pedido realizado com sucesso!");
                window.location.reload();
            }
        } catch (error){
            console.log(error);
        }
    };

    async function getPedidoById(id){
        try {
            const response = await Api.get("/pedido/" + id);

            if(response){
                setIdCliente(response.data.cliente.id);
                setIdFuncionario(response.data.funcionario.id);
                setId(response.data.id);

                const produtos = (response.data.produtos).map(function(item){
                    let json = {
                        value: item.id,
                        label: item.nome
                    }
                    return json;
                })
                console.log(produtos);
                setSelected(produtos);
            }
        } catch (error){
            console.log(error);
        }
        handleOpenEdit();
    }

    async function editPedido(e){
        e.preventDefault();

        const produtosId = selected.map(function(item){
            return item.value;
        });

        try {
            const response = await Api.put("/pedido/" + id, {
                clienteId: idCliente,
                funcionarioId: idFuncionario,
                produtosId: produtosId
            });

            if(response){
                console.log(response);
                alert("Pedido atualizado com sucesso!");
                window.location.reload();
            }
        } catch (error){
            console.log(error);
        }
    }

    async function deletePedido(id){
        try {
            const response = await Api.delete("/pedido/" + id);

            if(response.status == 200){
                alert("Pedido deletado com sucesso!");
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

            <Button onClick={handleOpen} sx={{marginBottom: 5}} variant="contained">Novo Pedido</Button>

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={ style }
                    component="form"
                    onSubmit={createPedido}
                    noValidate
                    autoComplete="off"
                  >

                    <TextField
                        label="ID Cliente"
                        id="outlined-size-small"
                        size="small"
                        value={idCliente}
                        onChange={(e) => setIdCliente(e.target.value)}
                        sx={{marginBottom: 5, width: "100%"}}
                    />

                    <TextField
                        label="ID Funcionário"
                        id="outlined-size-small"
                        size="small"
                        value={idFuncionario}
                        onChange={(e) => setIdFuncionario(e.target.value)}
                        sx={{marginBottom: 1, width: "100%"}}
                    />
                    <h4>Produtos</h4>
                    <MultiSelect
                        options={produtos}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                    />

                    <Button type="submit" sx={{mr: 5, mt: 5}} variant="outlined">Salvar</Button>
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
                    onSubmit={editPedido}
                    noValidate
                    autoComplete="off"
                  >
                    
                    <TextField
                        label="ID Cliente"
                        id="outlined-size-small"
                        size="small"
                        value={idCliente}
                        onChange={(e) => setIdCliente(e.target.value)}
                        sx={{marginBottom: 5, width: "100%"}}
                    />

                    <TextField
                        label="ID Funcionário"
                        id="outlined-size-small"
                        size="small"
                        value={idFuncionario}
                        onChange={(e) => setIdFuncionario(e.target.value)}
                        sx={{marginBottom: 1, width: "100%"}}
                    />
                    <h4>Produtos</h4>
                    <MultiSelect
                        options={produtos}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                    />

                    <Button type="submit" sx={{mr: 5, mt: 5}} variant="outlined">Salvar</Button>
                    <Button onClick={() => deletePedido(id)} sx={{mr: 5, mt: 5}} variant="contained">Excluir</Button>

                  </Box>
                </Modal>
            </div>
            
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>ID Pedido</TableCell>
                        <TableCell align="right">ID Cliente</TableCell>
                        <TableCell align="right">Nome Cliente</TableCell>
                        <TableCell align="right">ID Funcionário</TableCell>
                        <TableCell align="right">Nome Funcionário</TableCell>
                        <TableCell align="right">Cargo Funcionário</TableCell>
                        <TableCell align="right">ID Produtos</TableCell>
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

export default ListaPedidos;
