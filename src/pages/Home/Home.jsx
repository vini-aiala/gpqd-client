import React, { useState } from "react";
import { useHistory } from "react-router";
import {Card, CardContent, Button, TextField} from "@material-ui/core";
import { CenterSection, Heading1 } from "../../components/styled";
import Api from "../../services/api";

const Home = () => {
    const history = useHistory();
    const [error, setError] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault()
        const email = e.target.elements.email.value
        const senha = e.target.elements.senha.value

        try {
            const responseC = await Api.post("/auth/cliente", {email, senha});

            if(responseC.status === 200){
                console.log(responseC.data)
                history.push("/cliente/pets");
            } else {
                setError(true)
            }

        } catch (error1){
            try {
                const responseF = await Api.post("/auth/funcionario", {email, senha});

                if (responseF.status === 200) {
                    console.log(responseF.data)
                    history.push("/lista_funcionarios");
                } else {
                    setError(true)
                }
            } catch (error2) {
                console.log(error2);
                setError(true)
            }
        }
    }

    return (
        <CenterSection>
            <Card sx={{ minWidth: 350, justifyContent: "center", display: "flex" }}>
                <CardContent sx={{ display: "flex", flexDirection: "column"}}>
                    <Heading1
                        style={{
                            textAlign: "center",
                            textDecoration: "underline",
                            marginBottom: "2rem",
                        }}
                        >
                        Login
                    </Heading1>
                    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection:"column"}}>
                        <TextField id="outlined-basic1" label="E-mail" name={"email"} variant="outlined" type={"email"} error={error} style={{marginBottom: "2rem"}}/>
                        <TextField id="outlined-basic2" label="Senha" name={"senha"} variant="outlined" type={"password"} error={error} style={{marginBottom: "2rem"}}/>
                        <Button variant="contained" type={"submit"} >Entrar</Button>
                    </form>
                </CardContent>
            </Card>
        </CenterSection>
        
    )
}

export default Home;