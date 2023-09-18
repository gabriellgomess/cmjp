import React from "react";
import agco from "../../assets/parceiros/AGCO.png";
import asgav from "../../assets/parceiros/ASGAV.png";
import gerdau from "../../assets/parceiros/GERDAU.png";
import instituto_renner from "../../assets/parceiros/INSTITUTO_LOJAS_RENNER.png";
import instituto_slc from "../../assets/parceiros/INSTITUTO_SLC.webp";
import unimed from "../../assets/parceiros/logo-unimed.png";
import renner from "../../assets/parceiros/RENNER.png";
import slc from "../../assets/parceiros/SLC.png";
import white_martins from "../../assets/parceiros/WHITE_MARTINS.png";
import zaffari from "../../assets/parceiros/ZAFFARI.png";
import nexustech from "../../assets/parceiros/NEXUSTECH.png";

import { Box, Typography } from "@mui/material";

const BannerParceiros = () => {
  return (
    <Box
      sx={{
        background: "#c5c4c4",
        height: "250px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Parceiros
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <img width="120px" src={agco} alt="agco" />
          <img width="120px" src={asgav} alt="asgav" />
          <img width="120px" src={gerdau} alt="gerdau" />
          <img width="120px" src={instituto_renner} alt="instituto_renner" />
          <img width="120px" src={instituto_slc} alt="instituto_slc" />
          <img width="120px" src={unimed} alt="unimed" />
          <img width="120px" src={renner} alt="renner" />
          <img width="120px" src={slc} alt="slc" />
          <img width="120px" src={white_martins} alt="white_martins" />
          <img width="120px" src={zaffari} alt="zaffari" />
          <img width="120px" src={nexustech} alt="nexustech" />
        </Box>
      </Box>
    </Box>
  );
};

export default BannerParceiros;
