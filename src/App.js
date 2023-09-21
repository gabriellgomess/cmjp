import React, { useState, useContext } from "react";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Contato from "./pages/Contato";
import Sobre from "./pages/Sobre";
import Backoffice from "./pages/Backoffice/Backoffice";

import MyContext from "./components/Context";

import Header from "./components/Header";
import ModalPagamento from "./components/ModalPagamento";
import BannerParceiros from "./components/BannerParceiros/BannerParceiros";

import { Container, Typography, Box, Button } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

import Banner from "./assets/banner1.jpg";
import BannerCriancas from "./assets/banner2.jpg";

import LogoAmigosDaCasa from "./assets/logoMain.png";
import LogoCMJP from "./assets/logo_cmjp.png";
import LogoAmigosDaCasaVertical from "./assets/logoAmigosDaCasa-vertical.png";
import LogoCMJPVertical from "./assets/logoCMJP-vertical.png";

import LogoNexus from "./assets/Nexus2.png";

import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

const App = () => {
  const [open, setOpen] = useState(false);  

  const [comoApoiar, setComoApoiar] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  // #74c3bb verde
  // #f2a243 amarelo
  // #e9434b vermelho
  // #080b0a preto

  const theme = createTheme({
    palette: {
      primary: {
        main: "#e9434b",
        light: "#ff983f",
        dark: "#ff983f",
      },
      accent: {
        main: "#1D1F21",
        light: "#7a7a7a",
      },
      text: {
        light: "#FFFFFF",
        primary: "#1D1F21",
        secondary: "#1D1F21",
        green: "#74c3bb",
        yellow: "#f2a243",
        red: "#f44336",
        blue: "#90caf9",
        black: "#080707",
        success: "#388e3c",
        warning: "#f57c00",
        dark: "rgba(0, 0, 0, 0.6)",
      },
      background: {
        header: "#FFFFFF",
        paper: "#FFFFFF",
        green: "#74c3bb",
        greenLight: "#74c3bb9c",
        yellow: "#f2a243",
        red: "#f44336",
        blue: "#90caf9",
        default: "#F5F5F5",
        dark: "#e0e0e0",
      },
    },
  });

  return (
    <MyContext.Provider value={{ open, setOpen, comoApoiar, setComoApoiar, currentData, setCurrentData }}>
      <ThemeProvider theme={theme}>
        <Header />

        <Button
          size="large"
          variant="contained"
          startIcon={<VolunteerActivismIcon />}
          sx={{
            backgroundColor: theme.palette.background.red,
            position: "fixed",
            top: {xs: "90%", sm: "90%", md: "50%"},
            right: { xs: "30px", sm: "30px", md: "30px" },
            zIndex: "999",
          }}
          onClick={() => setOpen(true)}
        >
          Quero Doar
        </Button>

        <Routes>
          <Route path="/homolog/" element={<Home />} />
          <Route path="/homolog/sobre" element={<Sobre />} />
          <Route path="/homolog/contato" element={<Contato />} />
          <Route path="/homolog/backoffice" element={<Backoffice />} />
        </Routes>

        {/* <Box>
          <img src={Banner} alt="Banner" width="100%" />
        </Box> */}
        <Box>
          <img src={BannerCriancas} alt="Banner Crianças" width="100%" />
        </Box>
        <BannerParceiros />
        <Box
          sx={{ background: theme.palette.background.dark, padding: "60px 0" }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: "30px",
            }}
          >
            <Box
              sx={{
                width: { sx: "100%", md: "50%" },
                display: "flex",
                justifyContent: "center",
                gap: "30px",
                alignItems: "center",
              }}
            >
              {/* DESKTOP */}
              <Box sx={{ width: "250px", display: { xs: "none", md: "flex" } }}>
                <img width="100%" src={LogoCMJP} alt="" />
              </Box>
              <Box sx={{ width: "350px", display: { xs: "none", md: "flex" } }}>
                <img width="100%" src={LogoAmigosDaCasa} alt="" />
              </Box>
              {/* MOBILE */}
              <Box sx={{ width: "150px", display: { xs: "flex", md: "none" } }}>
                <img width="100%" src={LogoCMJPVertical} alt="" />
              </Box>
              <Box sx={{ width: "130px", display: { xs: "flex", md: "none" } }}>
                <img width="100%" src={LogoAmigosDaCasaVertical} alt="" />
              </Box>
            </Box>

            <Box
              sx={{
                width: { sx: "100%", md: "50%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.text.yellow,
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                REDES SOCIAIS
              </Typography>
              <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <InstagramIcon
                  sx={{ color: theme.palette.text.dark, fontSize: "50px" }}
                />
                <FacebookIcon
                  sx={{ color: theme.palette.text.dark, fontSize: "50px" }}
                />
                <YouTubeIcon
                  sx={{ color: theme.palette.text.dark, fontSize: "65px" }}
                />
              </Box>
            </Box>
          </Container>
        </Box>

        {/* <Box sx={{ background: theme.palette.text.dark, padding: "10px 0" }}>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>
              Desenvolvido por{" "}
              <a href="https://nexustech.net.br/" target="blank">
                Nexus Tech
              </a>
            </Typography>
            <img width={60} src={LogoNexus} alt="" />
          </Container>
        </Box> */}
        <ModalPagamento
          open={open}
          onClose={() => setOpen(false)}
          source="geral"
          theme={theme}
        />
      </ThemeProvider>
    </MyContext.Provider>
  );
};

export default App;
