import React, {useState, useEffect} from "react";
import { useTheme, Box, Container, Typography, Button, Dialog,
  DialogContent, } from "@mui/material";
import axios from "axios";
import ReactMarkdown from 'react-markdown';


const FormasAjudar = () => {
  const theme = useTheme();
  const [comoApoiar, setComoApoiar] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    try {
      axios
        .get(
          "https://strapi-production-c201.up.railway.app/api/como-apoiars?populate=*"
        )
        .then((response) => {
          setComoApoiar(response.data.data);
          console.log(response.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleOpenDialog = (data) => {
    setCurrentData(data);
    setOpenDialog(true);
    console.log(data);
  };

  const handleCloseDialog = () => {
    setCurrentData(null);
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
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="form-dialog-title"
            fullWidth
          >
            <DialogContent>
              <Typography color={theme.palette.text.dark} variant="h4">
                {currentData.attributes.titulo}
              </Typography>
              <Typography color={theme.palette.text.dark} variant="body1">
                {currentData.attributes.descricao}
              </Typography>
              <Box sx={{fontFamily: 'Arial'}}>
                <ReactMarkdown>{currentData.attributes.pagina_interna}</ReactMarkdown>
              </Box>
              <Typography color={theme.palette.text.dark} variant="body1">
                {currentData.attributes.link}
              </Typography>
              
            </DialogContent>
          </Dialog>
        )}
    </Container>
  );
};

export default FormasAjudar;
