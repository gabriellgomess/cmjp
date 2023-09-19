import React, { useState, useEffect, useContext } from "react";
import MyContext from "../../components/Context";
import {
  useTheme,
  Box,
  Container,
  Typography,
  Button,
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
} from "@mui/material";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../assets/LOGOS/AJUSTADOS/logoMain.png";
import DialogComoAjudar from "../../components/DialogComoAjudar/DialogComoAjudar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormasAjudar = () => {
  const theme = useTheme();
  const { comoApoiar, setComoApoiar } = useContext(MyContext);  
  const { currentData, setCurrentData } = useContext(MyContext);

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    try {
      axios
        .get(
          "https://strapi-production-c201.up.railway.app/api/como-apoiars?populate=*"
        )
        .then((response) => {
          setComoApoiar(response.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleOpenDialog = (data) => {
    setCurrentData(data);
    setOpenDialog(true);
    
  };

  const handleCloseDialog = () => {
    setCurrentData(null);
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: { xs: "50px 20px", sm: "50px 20px", md: "50px 0" },
      }}
    >
      {comoApoiar.map((item, index) => (
        <Box sx={{ width: { xs: "100%", sm: "100%", md: "48%" } }} key={index}>
          <Typography color={theme.palette.text.dark} variant="h4">
            {item.attributes.titulo}
          </Typography>
          <Typography color={theme.palette.text.dark} variant="body1">
            {item.attributes.descricao}
          </Typography>
          <Button onClick={() => handleOpenDialog(item)}>Saiba mais</Button>
        </Box>
      ))}
      {openDialog && (
        <DialogComoAjudar
          open={openDialog}
          handleClose={handleCloseDialog}
          currentData={currentData}
          theme={theme}
        />
      )}
    </Container>
  );
};

export default FormasAjudar;
