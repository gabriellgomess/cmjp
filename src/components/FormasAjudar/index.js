import React from "react";
import { useTheme, Box, Container, Typography, Button } from "@mui/material";

const donationItems = [
  {
    title: "Doe seu imposto de renda (Funcriança)",
    description: "Prever texto curto abaixo do título",
    pageContent: "Página interna deste tipo de doação com conteúdo",
    buttonLabel: "Saiba mais",
  },
  {
    title: "Eventos",
    description: "Prever texto curto abaixo do título",
    pageContent: "Página interna deste tipo de doação com conteúdo",
    buttonLabel: "Saiba mais",
  },
  {
    title: "Bazar Amigos da Casa",
    description: "Prever texto curto abaixo do título",
    pageContent: "Página interna deste tipo de doação com conteúdo",
    buttonLabel: "Saiba mais",
  },
  {
    title: "Doação por Testamento",
    description: "Prever texto curto abaixo do título",
    pageContent: "Página interna deste tipo de doação com conteúdo",
    buttonLabel: "Saiba mais",
  },
  {
    title: "PIX",
    description: "Prever texto curto abaixo do título",
    pageContent: "Página interna deste tipo de doação com conteúdo",
    buttonLabel: "Saiba mais",
  },
  {
    title: "NFG",
    description: "Prever texto curto abaixo do título",
    pageContent: "Página interna deste tipo de doação com conteúdo",
    buttonLabel: "Saiba mais",
  },
  {
    title: "Tampinha Legal",
    description: "Prever texto curto abaixo do título",
    pageContent: "Página interna deste tipo de doação com conteúdo",
    buttonLabel: "Saiba mais",
  },
  {
    title: "Lei do Esporte",
    description: "Prever texto curto abaixo do título",
    pageContent: "Página interna deste tipo de doação com conteúdo",
    buttonLabel: "Saiba mais",
  },
  {
    title: "Lei Solidariedade",
    description: "Prever texto curto abaixo do título",
    pageContent: "Página interna deste tipo de doação com conteúdo",
    buttonLabel: "Saiba mais",
  },
  {
    title: "Outras formas de colaborar",
    description: "Prever texto curto abaixo do título",
    pageContent: "Página interna deste tipo de doação com conteúdo",
    buttonLabel: "Saiba mais",
  },
];

const FormasAjudar = () => {
  const theme = useTheme();
  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: { xs: "50px 20px", sm: "50px 20px", md: "50px 0" },
      }}
    >
      {donationItems.map((item, index) => (
        <Box sx={{ width: { xs: "100%", sm: "100%", md: "48%" } }} key={index}>
          <Typography color={theme.palette.text.dark} variant="h4">
            {item.title}
          </Typography>
          <Typography color={theme.palette.text.dark} variant="body1">
            {item.description}
          </Typography>
          <Typography color={theme.palette.text.dark} variant="body1">
            {item.pageContent}
          </Typography>
          <Button>{item.buttonLabel}</Button>
        </Box>
      ))}
    </Container>
  );
};

export default FormasAjudar;
