import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";

import UserContext from "./components/Context";

import { GerarCobranca } from "./pages/GerarCobranca";
import { GerarCobrancaEmLote } from "./pages/GerarCobrancaEmLote";
import { GerenciarCobranca } from "./pages/GerenciarCobranca";
import Header from "./components/Header";
import { Container, Typography, Box, Button } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

import Img1 from "./assets/img_carousel/slide1.jpg";
import Img2 from "./assets/img_carousel/slide2.jpg";
import Img3 from "./assets/img_carousel/slide3.jpg";

import Banner from "./assets/banner.jpg";
import BannerCriancas from "./assets/banner-criancas.jpg";

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
        success: "#388e3c",
        warning: "#f57c00",
        dark: "rgba(0, 0, 0, 0.6)",
      },
      background: {
        header: "#FFFFFF",
        paper: "#FFFFFF",
        green: "#74c3bb",
        yellow: "#f2a243",
        red: "#f44336",
        blue: "#90caf9",
        default: "#F5F5F5",
        dark: "#e0e0e0",
      },
    },
  });

  return (
    <UserContext.Provider value={{ user: "Ignacio" }}>
      <ThemeProvider theme={theme}>
        <Header />
        <Carousel
          width="99vw"
          showThumbs={false}
          showArrows={true}
          infiniteLoop={true}
          autoPlay={true}
          transitionTime={800}
          showStatus={false}
        >
          <div>
            <img src={Img1} alt="Imagem 1" />
            {/* <p className="legend">Legenda da Imagem 1</p> */}
          </div>
          <div>
            <img src={Img2} alt="Imagem 2" />
            {/* <p className="legend">Legenda da Imagem 2</p> */}
          </div>
          <div>
            <img src={Img3} alt="Imagem 3" />
            {/* <p className="legend">Legenda da Imagem 3</p> */}
          </div>
        </Carousel>

        <Button
          size="large"
          variant="contained"
          startIcon={<VolunteerActivismIcon />}
          sx={{
            backgroundColor: theme.palette.background.green,
            position: "fixed",
            top: "50%",
            right: "30px",
            zIndex: "999",
          }}
        >
          Quero Doar
        </Button>

        <Container sx={{ marginTop: "100px" }}>
          <Routes>
            <Route path="/homolog/" element={<Home />} />
            <Route path="/homolog/gerar-cobranca" element={<GerarCobranca />} />
            <Route
              path="/homolog/gerar-cobranca-em-lote"
              element={<GerarCobrancaEmLote />}
            />
            <Route
              GerenciarCobranca
              path="/homolog/gerenciar-cobranca"
              element={<GerenciarCobranca />}
            />
          </Routes>
        </Container>
        <Box>
          <img src={Banner} alt="Banner" width="100%" />
        </Box>
        <Box>
          <img src={BannerCriancas} alt="Banner Crianças" width="100%" />
        </Box>

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
        <Box sx={{ background: theme.palette.text.dark, padding: "10px 0" }}>
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
        </Box>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
