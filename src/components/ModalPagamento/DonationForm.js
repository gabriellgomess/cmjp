import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  InputLabel,
} from "@mui/material";

const DonationForm = ({
  documentType,
  handleCombinedChange,
  valor,
  handleValorChange,
  formaPagamento,
  handleChange,
}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ gap: "25px", display: "flex", flexWrap: "wrap" }}>
        <TextField
          id="outlined-basic"
          label="Nome Completo"
          variant="outlined"
          sx={{ width: "100%" }}
          {...register("nome")}
        />
        <Select
          sx={{ width: "115px" }}
          value={documentType}
          onChange={(e) => handleCombinedChange(e)}
          label=""
          {...register("documentType")}
        >
          <MenuItem value="cpf">CPF</MenuItem>
          <MenuItem value="cnpj">CNPJ</MenuItem>
        </Select>

        {documentType === "cpf" ? (
          <TextField
            sx={{ width: "280px" }}
            label="CPF"
            inputProps={{ maxLength: 11 }}
            placeholder="Digite seu CPF"
            {...register("document")}
          />
        ) : (
          <TextField
            sx={{ width: "280px" }}
            label="CNPJ"
            inputProps={{ maxLength: 14 }}
            placeholder="Digite seu CNPJ"
            {...register("document")}
          />
        )}

        <TextField
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          sx={{ width: "420px" }}
          {...register("email")}
        />

        <TextField
          sx={{ width: "420px" }}
          label="Celular"
          inputProps={{ maxLength: 11 }}
          placeholder="(DD)XXXXXXXXX"
          {...register("mobile")}
        />

        <TextField
          sx={{ width: "420px" }}
          label="Telefone"
          inputProps={{ maxLength: 10 }}
          placeholder="(DD)XXXXXXXX"
          {...register("phone")}
        />

        <TextField
          id="outlined-basic"
          label="Valor (mínimo R$:5,00)*"
          variant="outlined"
          sx={{ width: "420px" }}
          defaultValue={valor}
          onChange={(e) => handleValorChange(e)}
          {...register("valor", { min: 5 })}
        />

        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Forma de pagamento
            </InputLabel>
            <Select
              sx={{ width: "420px" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={formaPagamento}
              label="Forma de pagamento"
              onChange={(e) => handleChange(e)}
              {...register("formaPagamento")}
            >
              <MenuItem value={"Cartão de crédito"}>Cartão de crédito</MenuItem>
              <MenuItem value={"Pix"}>Pix</MenuItem>
              <MenuItem value={"Cartão debito"}>Cartão debito</MenuItem>
              <MenuItem value={"Boleto"}>Boleto</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Button sx={{ margin: "15px auto" }} variant="contained" type="submit">
        DOAR
      </Button>
    </form>
  );
};

export default DonationForm;
