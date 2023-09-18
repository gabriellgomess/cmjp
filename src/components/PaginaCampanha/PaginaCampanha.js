import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReactMarkdown from 'react-markdown'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  color: 'black',
};

const PaginaCampanha = ({ open, onClose, data }) => {
    console.log(data);
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <img width='350px' src={data?`https://strapi-production-c201.up.railway.app${data.attributes.imagem.data.attributes.url}`:'Carregando'}/>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {data ? data.attributes.titulo : "Carregando..."}
          </Typography>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {data ? data.attributes.descricao : "Carregando..."}
          </Typography>

          <ReactMarkdown>{data ? data.attributes.texto_longo : "Carregando..."}</ReactMarkdown>
        </Box>
      </Modal>
    </div>
  );
}

export default PaginaCampanha;
