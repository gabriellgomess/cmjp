import React, { useContext } from "react";

import Cards from "../../components/Cards";
import FormasAjudar from "../../components/FormasAjudar";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Box, Typography, useTheme } from "@mui/material";

import Img1 from "../../assets/img_carousel/1.jpg";
import Img2 from "../../assets/img_carousel/2.jpg";
import Img3 from "../../assets/img_carousel/3.jpg";
import BannerFuncrianca from "../../assets/banner.jpg";

const Home = () => {
  const theme = useTheme();
  return ( 
    <Box sx={{width: '100%'}}>
      <Carousel
        width='100vw'
        showThumbs={false}
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        transitionTime={800}
        showStatus={false}
      >
        <div>
          <img src={Img1} alt="Imagem 1" />          
        </div>
        <div>
          <img src={Img2} alt="Imagem 2" />
        </div>
        <div>
          <img src={Img3} alt="Imagem 3" />
        </div>
      </Carousel>
      <Cards />
      <Box sx={{backgroundImage: `url(${BannerFuncrianca})`, backgroundSize: 'cover', backgroundPositionY: '50%', backgroundPositionX: '50%', height: '450px'}}>
        <Typography variant="h2" >
          Funcriança
        </Typography>
        <Typography variant="body1" >
          Provisório
        </Typography>
      </Box>
      <FormasAjudar />
    </Box>
  );
};

export default Home;
