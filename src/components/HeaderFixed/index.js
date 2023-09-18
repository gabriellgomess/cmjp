import React, { useState } from "react";
import {
  Box,
  Button,
  Link,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import FormDoacao from "../FormDoacao/FormDoacao";

import LogoMain from "../../assets/LOGOS/AJUSTADOS/logo_horizontal_adc.png";
import LogoCMJP from "../../assets/LOGOS/AJUSTADOS/logo_horizontal_cmjp.png";

function HeaderFixed() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            onClick={handleOpen}
          >
            Doar
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Doação</DialogTitle>
            <DialogContent>
              <FormDoacao fundo="geral" />
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
    </Container>
  );
}

export default HeaderFixed;
