import { Box, Button, Link, Container } from "@mui/material";
import ModalPagamento from "../ModalPagamento";
import { useState } from "react";
import Facebook from "../../assets/icons/facebook.png";
import Instagram from "../../assets/icons/instagram.png";
import Twitter from "../../assets/icons/twitter.png";
import TikTok from "../../assets/icons/tik-tok.png";
import WhatsApp from "../../assets/icons/whatsapp.png";
import YouTube from "../../assets/icons/youtube.png";

import LogoMain from "../../assets/LOGOS/AJUSTADOS/logo_horizontal_adc.png";
import LogoCMJP from "../../assets/LOGOS/AJUSTADOS/logo_horizontal_cmjp.png";

import { Alert } from "@coreui/react";

function HeaderFixed() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container
      sx={{
        width: "100%",
        height: "100px",
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link
        to="/"
        sx={{
          marginLeft: "20px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Box sx={{ width: { xs: "180px", sm: "240px", md: "240px" } }}>
          <img
            style={{ width: "100%" }}
            src={LogoCMJP}
            alt="Logo Amigos da Casa"
          />
        </Box>
        <Box sx={{ width: { xs: "80px", sm: "120px", md: "120px" } }}>
          <img
            style={{ width: "100%", height: "auto" }}
            src={LogoMain}
            alt="Logo Amigos da Casa"
          />
        </Box>
      </Link>

      <Box sx={{ display: { xs: "none", md: "flex" }, gap: "30px" }}>
        <Box sx={{ display: "flex", gap: "20px", paddingRight: "20px" }}>
          <Button
            sx={{ padding: "10px" }}
            variant="contained"
            size="small"
            color="primary"
            // onClick={handleOpenModal}
          >
            Doar
          </Button>

          <ModalPagamento open={openModal} onClose={handleCloseModal} />
        </Box>
      </Box>
    </Container>
  );
}

export default HeaderFixed;
