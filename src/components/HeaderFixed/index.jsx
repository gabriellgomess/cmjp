import { Box, Button, Link, Container } from "@mui/material"
import ModalPagamento from '../ModalPagamento';
import { useState } from 'react';
import Facebook from '../../assets/icons/facebook.png';
import Instagram from '../../assets/icons/instagram.png'
import Twitter from '../../assets/icons/twitter.png'
import TikTok from '../../assets/icons/tik-tok.png'
import WhatsApp from '../../assets/icons/whatsapp.png'
import YouTube from '../../assets/icons/youtube.png'

import LogoMain from '../../assets/logoADC.png'
import LogoCMJP from '../../assets/logoCMJP-vertical.svg'

import { Alert } from '@coreui/react';


function HeaderFixed() {
    const [openModal, setOpenModal] = useState(false);


    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Container sx={{ width: "100%", height: "100px", background: "white", display: "flex", justifyContent: "space-between", alignItems: "center", }}>
            

            <Link to="/" sx={{ marginLeft: "20px", display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img width={70} src={LogoCMJP} alt="Logo Amigos da Casa" />
                <img style={{ width: '100px', height: 'auto' }} src={LogoMain} alt="Logo Amigos da Casa" />
            </Link>

            <Box sx={{display: {xs: 'none', md: 'flex'}, gap: '30px'}}>
                {/* <Box sx={{ display: "flex", gap: "20px", height: "35px" }}>
                    <Link>
                        <img width={35} src={Instagram} alt="instagram" />
                    </Link>
                    <Link>
                        <img width={35} src={Facebook} alt="facebook" />
                    </Link>
                    <Link>
                        <img width={35} src={TikTok} alt="tiktok" />
                    </Link>
                    <Link>
                        <img width={35} src={Twitter} alt="twitter" />
                    </Link>
                    <Link>
                        <img width={35} src={YouTube} alt="youtube" />
                    </Link>
                    <Link>
                        <img width={35} src={WhatsApp} alt="whatsapp" />
                    </Link>

                </Box> */}
                <Box sx={{ display: 'flex', gap: '20px', paddingRight: '20px' }}>
                    <Button sx={{ padding: "10px" }} variant="contained" size="small" color="primary" onClick={handleOpenModal}>
                        Doar
                    </Button>
                    {/* <Button sx={{ padding: "10px", marginRight: "80px" }} variant="contained" size="small" color="primary" onClick={handleOpenModal}>
                        Doar por boleto
                    </Button> */}
                    <ModalPagamento open={openModal} onClose={handleCloseModal} />
                </Box>
            </Box>

        </Container>
    )
}

export default HeaderFixed