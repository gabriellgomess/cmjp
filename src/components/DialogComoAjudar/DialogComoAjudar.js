import React from "react";
import {
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Container,
  Typography,
  Box,
  Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../assets/LOGOS/AJUSTADOS/logoMain.png";
import ReactMarkdown from "react-markdown";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogComoAjudar = ({ open, handleClose, currentData, theme }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullScreen
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <img width={350} src={Logo} alt="" />
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Container>
          <Typography color={theme.palette.primary.main} variant="h2">
            {currentData?.attributes.titulo}
          </Typography>
          <Typography color={theme.palette.text.green} variant="h4">
            {currentData?.attributes.descricao}
          </Typography>
          <Box
            sx={{
              fontFamily: "Arial",
              margin: "15px 0",
              lineHeight: "30px",
            }}
          >
            <ReactMarkdown>
              {currentData?.attributes.pagina_interna}
            </ReactMarkdown>
          </Box>
          <Typography color={theme.palette.text.dark} variant="body1">
            {currentData?.attributes.link ? (
              <Button href={currentData?.attributes.link} target="blank">
                {currentData?.attributes.link}
              </Button>
            ) : null}
          </Typography>
          {currentData?.attributes.imagem.data ? (
            <img
              width="250px"
              src={`https://strapi-production-c201.up.railway.app${currentData?.attributes.imagem.data[0].attributes.url}`}
              alt="imagem"
            />
          ) : null}
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComoAjudar;
