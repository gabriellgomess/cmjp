import React, { useContext } from "react";

import Cards from "../../components/Cards";
import FormasAjudar from "../../components/FormasAjudar";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Box, Typography, useTheme } from "@mui/material";

import Img1 from "../../assets/img_carousel/bazar.jpg";
import Img2 from "../../assets/img_carousel/funcrianca.jpg";
import Img3 from "../../assets/img_carousel/lei_solidariedade.jpg";
import BannerFuncrianca from "../../assets/banner.jpg";

const Home = () => {
  const theme = useTheme();
  return (
    <Box sx={{ width: "100%" }}>
      <Carousel
        width="100vw"
        showThumbs={false}
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        transitionTime={2500}
        showStatus={false}
        interval={7000}
      >
        <Box
          sx={{
            paddingLeft: "20px",
            height: "600px",
            backgroundImage: `url(${Img1})`,
            backgroundSize: "cover",
            backgroundPositionY: "30%",
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
          }}
        >
          <Box
            sx={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              variant="h3"
              color={theme.palette.text.green}
              sx={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                fontWeight: "bolder",
                textAlign: "left",
              }}
            >
              Aplique parte do seu IR no melhor dos fundos: Funcriança.
            </Typography>
            <Typography
              variant="h5"
              color={theme.palette.text.yellow}
              sx={{ textAlign: "left" }}
            >
              Programa federal onde pessoas físicas (que declaram pelo modelo
              completo) e jurídicas (enquadradas no regime de lucro real) fazem
              doações e abatem diretamente no imposto de renda devido.{" "}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            paddingLeft: "20px",
            height: "600px",
            backgroundImage: `url(${Img2})`,
            backgroundSize: "cover",
            backgroundPositionY: "30%",
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
          }}
        >
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              variant="h3"
              color={theme.palette.text.green}
              sx={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                fontWeight: "bolder",
                textAlign: "left",
              }}
            >
              Lei da Solidariedade
            </Typography>
            <Typography
              variant="h5"
              color={theme.palette.text.yellow}
              sx={{ textAlign: "left" }}
            >
              A sua empresa pode colaborar conosco através dos incentivos
              fiscais, via Lei da Solidariedade.{" "}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            paddingLeft: "20px",
            height: "600px",
            backgroundImage: `url(${Img3})`,
            backgroundSize: "cover",
            backgroundPositionY: "30%",
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
          }}
        >
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              variant="h3"
              color={theme.palette.text.green}
              sx={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                fontWeight: "bolder",
                textAlign: "left",
              }}
            >
              Bazar
            </Typography>
            <Typography
              variant="h5"
              color={theme.palette.text.yellow}
              sx={{ textAlign: "left" }}
            >
              O Bazar Amigos da Casa é uma importante fonte de recurso da
              instituição.
            </Typography>
            <Typography
              variant="h5"
              color={theme.palette.text.yellow}
              sx={{ textAlign: "left" }}
            >
              Apoie com a doação de roupas, calçados e acessórios novos para a
              nossa loja.{" "}
            </Typography>
          </Box>
        </Box>
      </Carousel>

      <Cards />
      <Box
        sx={{
          backgroundImage: `url(${BannerFuncrianca})`,
          backgroundSize: "cover",
          backgroundPositionY: "50%",
          backgroundPositionX: "50%",
          height: "450px",
        }}
      >
        <Box sx={{display: 'flex', flexDirection: 'column', width: '50%', margin: '30px'}}>
          <Typography variant="h2">Aplique parte do seu IR no melhor dos fundos: Funcriança.</Typography>
        <Typography variant="body1">Programa federal onde pessoas físicas (que declaram pelo modelo
              completo) e jurídicas (enquadradas no regime de lucro real) fazem
              doações e abatem diretamente no imposto de renda devido.{" "}</Typography>
        </Box>
        
      </Box>
      <FormasAjudar />
    </Box>
  );
};

export default Home;
