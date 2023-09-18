import React from "react";
import { Box, Typography, Container, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material";

const Contato = () => {
  const theme = useTheme();
  return (
    <Container sx={{ marginTop: "60px", marginBottom: "60px" }}>
      <Typography variant="h3" color={theme.palette.text.green}>
        Contato
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "30px",
            width: "50%",
          }}
        >
          <Typography
            variant="h5"
            sx={{ margin: 0 }}
            color={theme.palette.text.green}
          >
            Endereço
          </Typography>
          <Typography variant="body1" color={theme.palette.text.dark}>
            Rua Nelson Zang, 420 - CEP 9153050 - Intercap - Porto Alegre - RS
          </Typography>
          <Typography
            variant="h5"
            sx={{ margin: 0 }}
            color={theme.palette.text.green}
          >
            Telefone
          </Typography>
          <Typography variant="body1" color={theme.palette.text.dark}>
            (51) 3352-9589
          </Typography>
          <Typography
            variant="h5"
            sx={{ margin: 0 }}
            color={theme.palette.text.green}
          >
            E-mail
          </Typography>
          <Typography variant="body1" color={theme.palette.text.dark}>
            <a href="mailto:doar@casadomenino.org.br">
              doar@casadomenino.org.br
            </a>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "30px",
            width: "50%",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "10px",
            }}
          >
            <TextField id="outlined-basic" label="Nome" variant="standard" />
            <TextField id="outlined-basic" label="E-mail" variant="standard" />
            <TextField
              id="outlined-basic"
              label="Telefone"
              variant="standard"
            />
            <TextField
              id="outlined-multiline-static"
              label="Mensagem"
              multiline
              rows={4}
              variant="standard"
            />
            <Button variant="contained" color="primary">
              Enviar
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Contato;
