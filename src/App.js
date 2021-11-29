import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./style/global";
//import global style

//import telas
import Home from "./pages/Home/Home.jsx";
import ListaFuncionarios from "./pages/Funcionario/Funcionario/ListaFuncionarios.jsx";
import ListaClientes from "./pages/Funcionario/Clientes/ListaClientes.jsx";
import ListaProdutos from "./pages/Funcionario/Produtos/ListaProdutos.jsx";
import ListaAgendamentos from "./pages/Funcionario/Agendamentos/ListaAgendamentos.jsx";
import ListaPets from "./pages/Funcionario/Pets/ListaPets.jsx";
import ListaPedidos from "./pages/Funcionario/Pedidos/ListaPedidos.jsx";
import ListaAgendamentosCliente from "./pages/Cliente/Agendamentos/ListaAgendamentos.jsx";
import ListaPetsCliente from "./pages/Cliente/Pets/ListaPets.jsx";
import ListaPedidosCliente from "./pages/Cliente/Pedidos/ListaPedidos.jsx";
import Cadastro from "./pages/Home/Cadastro";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/cliente/pets" component={ListaPetsCliente}/>
          <Route path="/cliente/agendamento" component={ListaAgendamentosCliente}/>
          <Route path="/cliente/pedidos" component={ListaPedidosCliente}/>
          <Route path="/lista_funcionarios" component={ListaFuncionarios}/>
          <Route path="/lista_clientes" component={ListaClientes}/>
          <Route path="/lista_produtos" component={ListaProdutos}/>
          <Route path="/lista_agendamentos" component={ListaAgendamentos}/>
          <Route path="/lista_pets" component={ListaPets}/>
          <Route path="/lista_pedidos" component={ListaPedidos}/>
          <Route path={"/cadastro"} component={Cadastro} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
