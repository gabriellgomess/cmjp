import React, { useState } from "react";
import { Box, Typography, Container, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import axios from 'axios';
import swal from 'sweetalert';

const Contato = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Substitua a URL pelo endpoint do seu backend
      await axios.post("https://amigosdacasa.org.br/gerenciador-doacoes-amigosdacasa/api_site/send_mails/envia_contato.php", formData);
      swal("Mensagem enviada com sucesso!", "Em breve entraremos em contato.", "success");
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        mensagem: ""
      });
    } catch (error) {
      alert("Ocorreu um erro ao enviar a mensagem.");
    }
    console.log(formData);
  };
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
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "10px",
          }}
        >
            <TextField
            name="nome"
            label="Nome"
            variant="standard"
            value={formData.nome}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="E-mail"
            variant="standard"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="telefone"
            label="Telefone"
            variant="standard"
            value={formData.telefone}
            onChange={handleChange}
          />
          <TextField
            name="mensagem"
            label="Mensagem"
            multiline
            rows={4}
            variant="standard"
            value={formData.mensagem}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Contato;
