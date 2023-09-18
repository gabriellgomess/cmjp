import React from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Backoffice = () => {
  return (
    <Container>
      <Typography variant="h1">Backoffice</Typography>
      <Link
        to="https://strapi-production-c201.up.railway.app/admin/auth/login"
        target="blank"
      >
        <Button>Gerenciador de Conteúdo</Button>
      </Link>
    </Container>
  );
};

export default Backoffice;
