import {Button, Card, CardContent, TextField} from "@material-ui/core";
import {CenterSection, Heading1} from "../../components/styled";
import React, {useState} from "react";
import Api from "../../services/api";
import {useHistory} from "react-router-dom";

function Cadastro() {
    const history = useHistory();
    const [error, setError] = useState(false);

    const handleRedirect = () => {
        history.push("/");
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const email = e.target.elements.email.value
        const senha = e.target.elements.senha.value
        const nome = e.target.elements.nome.value
        try {
            const response = await Api.post(`/cliente?nome=${nome}&email=${email}&senha=${senha}`);

            if (response.status === 201) {
                history.push("/");
            } else {
                setError(true)
            }
        } catch (error2) {
            console.log(error2);
            setError(true)
        }
    }

    return(
        <CenterSection>
            <Card sx={{ minWidth: 350, justifyContent: "center", display: "flex" }}>
                <CardContent sx={{ display: "flex", flexDirection: "column"}}>
                    <Heading1
                        style={{
                            textAlign: "center",
                            fontSize: "2.5rem",
                            marginBottom: "2rem",
                        }}
                    >
                        Cadastro
                    </Heading1>
                    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection:"column"}}>
                        <TextField id="outlined-basic1" label="Nome" name={"nome"} variant="outlined" type={"nome"} error={error} style={{marginBottom: "2rem"}}/>
                        <TextField id="outlined-basic2" label="E-mail" name={"email"} variant="outlined" type={"email"} error={error} style={{marginBottom: "2rem"}}/>
                        <TextField id="outlined-basic3" label="Senha" name={"senha"} variant="outlined" type={"password"} error={error} style={{marginBottom: "2rem"}}/>
                        <div style={{display:'flex'}}>
                            <Button variant="contained" sx={{mr: 2}} type={"submit"} >Cadastrar</Button>
                            <Button onClick={handleRedirect} variant="outlined">Login</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </CenterSection>
    );

}

export default Cadastro;