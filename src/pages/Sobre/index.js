import React from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  useTheme,
} from "@mui/material";

const Sobre = () => {
  const theme = useTheme();
  return (
    <Container sx={{ marginTop: "60px", marginBottom: "60px" }}>
      <Typography variant="h3" color={theme.palette.text.green}>
        Quem somos
      </Typography>
      <Typography variant="body1" color={theme.palette.text.dark}>
        A Casa do Menino Jesus de Praga (CMJP) é uma instituição sem fins
        lucrativos, fundada em 6 de janeiro de 1984 pelo jornalista e radialista
        Fábio Rocco. Promove acolhimento em saúde com habilitação e reabilitação
        multidisciplinar, gratuita e ou/onerosa, a pessoas com deficiência
        (PCDs), com lesões neurológicas e motoras de alta e média complexidade,
        em atendimentos de longa permanência.
      </Typography>
    </Container>
  );
};

export default Sobre;
