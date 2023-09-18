import React from "react";
import agco from "../../assets/parceiros/AGCO.jpg"
import asgav from "../../assets/parceiros/ASGAV.jpg"
import gerdau from "../../assets/parceiros/GERDAU.jpg"
import instituto_renner from "../../assets/parceiros/INSTITUTO_LOJAS_RENNER.jpg"
import instituto_slc from "../../assets/parceiros/INSTITUTO_SLC.webp"
import unimed from "../../assets/parceiros/logo-unimed.png"
import renner from "../../assets/parceiros/RENNER.jpg"
import slc from "../../assets/parceiros/SLC.jpg"
import white_martins from "../../assets/parceiros/WHITE_MARTINS.jpg"
import zaffari from "../../assets/parceiros/ZAFFARI.jpg"

import {Box, Typography} from "@mui/material"


const BannerParceiros = () => {
    return (
        <Box sx={{ background: 'grey'}}>
        <Typography variant='h4' sx={{textAlign: 'center'}}>Parceiros</Typography>
         <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px'}}>
            <img width='120px' src={agco} alt="agco" />
            <img width='120px' src={asgav} alt="asgav" />
            <img width='120px' src={gerdau} alt="gerdau" />
            <img width='120px' src={instituto_renner} alt="instituto_renner" />
            <img width='120px' src={instituto_slc} alt="instituto_slc" />
            <img width='120px' src={unimed} alt="unimed" />
            <img width='120px' src={renner} alt="renner" />
            <img width='120px' src={slc} alt="slc" />
            <img width='120px' src={white_martins} alt="white_martins" />
            <img width='120px' src={zaffari} alt="zaffari" />
        </Box>
        </Box>
       
    )

}

export default BannerParceiros;