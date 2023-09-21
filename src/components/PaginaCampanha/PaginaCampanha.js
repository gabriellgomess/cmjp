import React, {useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import FormDoacao from "../FormDoacao/FormDoacao";
import DialogContent from '@mui/material/DialogContent';

import ReactMarkdown from "react-markdown";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  bgcolor: "background.paper",  
  p: 4,
  color: "black",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




const PaginaCampanha = ({ open, onClose, data }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentData, setCurrentData] = useState(null);
const handleOpenDialog = (data) => {
  setCurrentData(data);
  setOpenDialog(true);
};

const handleCloseDialog = () => {
  setCurrentData(null);
  setOpenDialog(false);
};
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
         <AppBar sx={{ position: 'relative' }}>
         <Toolbar sx={{ display: "flex", justifyContent: "end" }}> 
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>            
          </Toolbar>
        </AppBar>
        <Box sx={style}>
          <img
            width="350px"
            src={
              data
                ? `https://strapi-production-c201.up.railway.app${data.attributes.imagem.data.attributes.url}`
                : "Carregando"
            }
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {data ? data.attributes.titulo : "Carregando..."}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {data ? data.attributes.descricao : "Carregando..."}
          </Typography>

          <ReactMarkdown>
            {data ? data.attributes.texto_longo : "Carregando..."}
          </ReactMarkdown>

          <Button  onClick={() => handleOpenDialog(data)} variant="contained">Quero doar</Button>
        </Box>
      </Dialog>
      {openDialog && (
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <FormDoacao fundo={currentData?.attributes.id_campanha} />
            </DialogContent>
          </Dialog>
        )}
    </div>
  );
};

export default PaginaCampanha;
