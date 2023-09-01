import { useState } from 'react';
import {Modal, Box, Button, Typography, TextField, MenuItem, Select, InputLabel, FormControl, IconButton, Divider, FormGroup, FormControlLabel, Checkbox} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import swal from 'sweetalert';


const ModalPagamento = ({ open, onClose }) => {

    const [valor, setValor] = useState('');

    const handleChange = (event) => {
        setValor(event.target.value);
    };


    const handleValorChange = (event) => {
        const input = event.target.value;
        const parsedValue = parseFloat(input.replace(',', '.'));

        if (parsedValue < 5) {
            swal("O valor mínimo é R$5,00");
            setValor('');
        } else {
            setValor(input);
        }
    }

    const [documentType, setDocumentType] = useState('cpf');

    const handleDocumentTypeChange = (event) => {
        setDocumentType(event.target.value);
    };

    return (
        <Modal
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={{ width: 900, height: 700, bgcolor: 'background.paper', p: 2, display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: 'end' }}>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Typography sx={{ padding: "0px 20px", display: "flex", justifyContent: 'center' }} gutterBottom variant="h4" color='primary'>Faça aqui sua contribuição</Typography>

                <Box sx={{ gap: "25px", display: "flex", flexWrap: "wrap" }}>
                    <TextField id="outlined-basic" label="Nome Completo" variant="outlined" sx={{ width: "100%" }} />
                    <Select
                        sx={{ width: "115px" }}
                        value={documentType}
                        onChange={handleDocumentTypeChange}
                        label=""
                    >
                        <MenuItem value="cpf">CPF</MenuItem>
                        <MenuItem value="cnpj">CNPJ</MenuItem>
                    </Select>

                    {documentType === 'cpf' ? (
                        <TextField
                            sx={{ width: "280px" }}
                            label="CPF"
                            inputProps={{ maxLength: 11 }}
                            placeholder="Digite seu CPF"
                        />
                    ) : (
                        <TextField
                            sx={{ width: "280px" }}
                            label="CNPJ"
                            inputProps={{ maxLength: 14 }}
                            placeholder="Digite seu CNPJ"
                        />
                    )}

                    <TextField id="outlined-basic" label="E-mail" variant="outlined" sx={{ width: "420px" }} />


                    <TextField
                        sx={{ width: '420px' }}
                        label="Celular"
                        inputProps={{ maxLength: 11 }}
                        placeholder="(DD)XXXXXXXXX"

                    />

                    <TextField
                        sx={{ width: '420px' }}
                        label="Telefone"
                        inputProps={{ maxLength: 10 }}
                        placeholder="(DD)XXXXXXXX"
                    />

                    <TextField
                        id="outlined-basic"
                        label="Valor (mínimo R$:5,00)*"
                        variant="outlined"
                        sx={{ width: "420px" }}
                        value={valor}
                        onChange={handleValorChange}
                    />


                    <Box>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Forma de pagamento</InputLabel>
                            <Select
                                sx={{ width: "420px" }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={valor}
                                label="Forma de pagamento"
                                onChange={handleChange}
                            >
                                <MenuItem value={"Cartão de crédito"}>Cartão de crédito</MenuItem>
                                <MenuItem value={"Pix"}>Pix</MenuItem>
                                <MenuItem value={"Cartão debito"}>Cartão debito</MenuItem>
                                <MenuItem value={"Boleto"}>Boleto</MenuItem>

                            </Select>

                        </FormControl>
                    </Box>
                </Box>
                <Typography sx={{ padding: "10px 0 0 0", margin: "0", display: "flex", justifyContent: 'center' }} gutterBottom variant="h5" color='primary'>Avisos legais</Typography>
                <Typography sx={{ textAlign: "left" }} gutterBottom variant="div" color='primary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quisquam molestias id odio cum placeat vero magnam delectus, possimus praesentium quibusdam accusantium, eius fuga quae! Dolor corporis debitis accusamus quas?is</Typography>
                <FormGroup sx={{ display: "flex" }}>
                    <FormControlLabel sx={{ color: "gray" }} control={<Checkbox defaultChecked />} label="Estou ciente dos termos descritos acima" />
                    <FormControlLabel sx={{ color: "gray" }} control={<Checkbox defaultChecked />} label="Concordo em receber informações sobre a Casa do Menido Jesus de Praga" />
                </FormGroup>
                <Divider
                    sx={{
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
                        backgroundColor: "primary-dark"
                    }}
                />

                <Button  sx={{ width: "80px", height: "40px", display: 'flex', marginTop: "30px" }} variant="contained" disabled>Continuar</Button>
            </Box>
        </Modal >
    );
};

export default ModalPagamento;