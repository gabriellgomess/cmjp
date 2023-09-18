import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  InputLabel,
  Divider,
  Typography
} from "@mui/material";
import axios from "axios";
import swal from 'sweetalert';

const FormDoacao = ({fundo}) => {

    const { register, handleSubmit, reset } = useForm();

    const [addressData, setAddressData] = useState({});

    const onSubmit = (data) => {
        data.notificationDisabled = false;
        data.value = data.value.replace('R$ ', '');
        data.externalReference = `${fundo}`;
    
        axios.post('https://amigosdacasa.org.br/gerenciador-doacoes-amigosdacasa/api_site/asaas.php?param=38', data)
          .then(response => {
            const responseData = response.data;
            console.log(responseData.invoiceUrl);
            // Checa se existe erro na resposta
            if (responseData.error) {
                swal({
                    title: "Erro ao criar doação",
                    text: responseData.error,
                    icon: "error",
                    button: "Tentar novamente",
                });
                return;
            }
    
            // Caso contrário, assume que a doação foi criada com sucesso
            swal({
                title: "Doação criada com sucesso!",
                text: "Ao clicar em continuar, você será redirecionado para a página de pagamento, você também pode acessar o link da doação no seu email.",
                icon: "success",
                buttons: {
                    cancel: {
                        text: "Cancelar",
                        value: null,
                        visible: true,
                        className: "",
                        closeModal: true,
                    },
                    confirm: {
                        text: "Continuar",
                        value: true,
                        visible: true,
                        className: "",
                        closeModal: true,
                    }
                }
            }).then((value) => {
                if (value) {
    
                    window.open(responseData.invoiceUrl, '_blank'); 
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    window.location.reload();
                }
            });
        })
        .catch(error => {
            // Trata erros de rede ou outros erros não esperados
            swal({
                title: "Erro inesperado",
                text: "Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.",
                icon: "error",
                button: "Tentar novamente",
            });
        });
    }

    const handleFormatCurrency = (event) => {
        var valor = event.target.value.replace(/\D/g,"");
        valor = (valor/100).toFixed(2) + "";
        valor = valor.replace(".", ",");
        valor = valor.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
        valor = valor.replace(/(\d)(\d{3}),/g, "$1.$2,");
        event.target.value = valor === "0,00" ? "" : "R$ "+valor;
      }

    const fetchAddress = (cep) => {
        console.log("Buscando CEP");
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            if (!response.data.erro) {
                setAddressData({
                    address: response.data.logradouro,
                    province: response.data.bairro,
                    city: response.data.localidade,
                    state: response.data.uf
                });
                console.log('CEP encontrado');
            } else {
                console.error('CEP não encontrado');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar o CEP:', error);
        });
    }
    return (
        <form style={{ display: "flex", justifyContent: "center", marginTop: "20px" }} onSubmit={handleSubmit(onSubmit)}>
        <p>{fundo}</p>
      <Box sx={{ width: { xs: "100%", sm: "100%", md: "100%" }, display: "flex", flexDirection: "column", gap: "15px" }}>
        
        {/* Informações básicas */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "15px", width: { xs: "100%", sm: "100%", md: "100%" } }}>
          <TextField size="small" sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "58%" } }} {...register("name")} label="Nome" required />
          <TextField size="small" sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "38%" } }} {...register("cpfCnpj")} label="CPF/CNPJ" required />
          <TextField size="small" sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "39%" } }} {...register("email")} label="Email" required />
         
          <TextField size="small" sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "28%" } }} {...register("phone")} label="Telefone" />
          <TextField size="small" sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "28%" } }} {...register("mobilePhone")} label="Celular" required />
        </Box>
        <Divider />
       {/* Endereço */}
      <Box sx={{ display: "flex", flexWrap: "wrap",  gap: "15px" }}>
        <TextField
          size="small"
          sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "20%" } }}
          {...register("postalCode")}
          label="CEP"
          required
          onBlur={(e) => {
              const cep = e.target.value.replace(/[^0-9]/g, '');
              if (cep.length === 8) {
                  fetchAddress(cep);
              }
          }}
        />
        <TextField 
          size="small" 
          sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "55%" } }} 
          {...register("address")} 
          label="Endereço" 
          required 
          value={addressData.address || ''} 
          onChange={e => setAddressData(prev => ({ ...prev, address: e.target.value }))} 
        />
        <TextField 
          size="small" 
          sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "20%" } }} 
          {...register("addressNumber")} 
          label="Número" 
          required 
        />
        <TextField 
          size="small" 
          sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "20%" } }} 
          {...register("complement")} 
          label="Complemento" 
        />
        <TextField 
          size="small" 
          sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "30%" } }} 
          {...register("province")} 
          label="Bairro" 
          required 
          value={addressData.province || ''} 
          onChange={e => setAddressData(prev => ({ ...prev, province: e.target.value }))} 
        />
        <TextField 
          size="small" 
          sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "29%" } }} 
          {...register("city")} 
          label="Cidade" 
          required 
          value={addressData.city || ''} 
          onChange={e => setAddressData(prev => ({ ...prev, city: e.target.value }))} 
        />
        <FormControl sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "15%" } }}>
          <InputLabel sx={{marginTop: '-6px'}} >Estado</InputLabel>
          <Select 
            size="small" 
            {...register("state")} 
            label="Estado" 
            required 
            value={addressData.state || ''} 
            onChange={e => setAddressData(prev => ({ ...prev, state: e.target.value }))}
          >
            <MenuItem value="AC">AC</MenuItem>
            <MenuItem value="AL">AL</MenuItem>
            <MenuItem value="AP">AP</MenuItem>
            <MenuItem value="AM">AM</MenuItem>
            <MenuItem value="BA">BA</MenuItem>
            <MenuItem value="CE">CE</MenuItem>
            <MenuItem value="DF">DF</MenuItem>
            <MenuItem value="ES">ES</MenuItem>
            <MenuItem value="GO">GO</MenuItem>
            <MenuItem value="MA">MA</MenuItem>
            <MenuItem value="MT">MT</MenuItem>
            <MenuItem value="MS">MS</MenuItem>
            <MenuItem value="MG">MG</MenuItem>
            <MenuItem value="PA">PA</MenuItem>
            <MenuItem value="PB">PB</MenuItem>
            <MenuItem value="PR">PR</MenuItem>
            <MenuItem value="PE">PE</MenuItem>
            <MenuItem value="PI">PI</MenuItem>
            <MenuItem value="RJ">RJ</MenuItem>
            <MenuItem value="RN">RN</MenuItem>
            <MenuItem value="RS">RS</MenuItem>
            <MenuItem value="RO">RO</MenuItem>
            <MenuItem value="RR">RR</MenuItem>
            <MenuItem value="SC">SC</MenuItem>
            <MenuItem value="SP">SP</MenuItem>
            <MenuItem value="SE">SE</MenuItem>
            <MenuItem value="TO">TO</MenuItem>
          </Select>
        </FormControl>
      </Box>
          <Divider />

        {/* Pagamento e outras informações */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          <TextField size="small" sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "28%" } }} onKeyUp={(event)=>handleFormatCurrency(event)} {...register("value")} label="Valor" required />
          <TextField size="small" sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "28%" } }} type="date" {...register("dueDate")} label="Data de vencimento" required InputLabelProps={{ shrink: true }} />
          <FormControl sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "28%" } }}>
            <InputLabel sx={{marginTop: '-6px'}} id="demo-simple-select-label">Forma de Pagamento</InputLabel>
            <Select size="small" labelId="demo-simple-select-label" id="demo-simple-select" {...register("paymentMethod", { required: true })} label="Forma de Pagamento">
              <MenuItem value="BOLETO">Boleto</MenuItem>
              <MenuItem value="CREDIT_CARD">Cartão de crédito</MenuItem>
              <MenuItem value="PIX">Pix</MenuItem>
              <MenuItem value="UNDEFINED">Cliente define</MenuItem>
            </Select>
          </FormControl>
          {/* Adicione campos adicionais se necessário (e.g. `observations`) */}
         
        </Box>
        <Button type="submit" variant="contained">Criar doação única</Button>
      </Box>
    </form>

    )
}

export default FormDoacao;