import React, { useState } from "react";
import { useHistory } from "react-router";
import { Card, CardContent, Button } from "@material-ui/core";
import { CenterSection, Heading1 } from "../../components/styled";

const Home = () => {
    const history = useHistory();

    const handleCliente = () => {
        history.push("/cliente/pets");
    }

    const handleFuncionario = () => {
        history.push("/lista_funcionarios");
    }
    return (
        <CenterSection>
            <Card sx={{ minWidth: 350, justifyContent: "center", display: "flex" }}>
                <CardContent>
                    <Heading1
                        style={{
                            textAlign: "center",
                            textDecoration: "underline",
                            marginBottom: "4rem",
                        }}
                        >
                        Login
                    </Heading1>
                    <Button onClick={handleCliente} sx={{mr: 5}} variant="contained">Cliente</Button>
                    <Button onClick={handleFuncionario} variant="outlined">Funcionário</Button>
                </CardContent>
            </Card>
        </CenterSection>
        
    )
}

export default Home;