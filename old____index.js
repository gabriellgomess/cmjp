import { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import axios from "axios";

const ModalPagamento = ({ open, onClose, source, theme }) => {
  const [valor, setValor] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [donationType, setDonationType] = useState("single");

  const handleChange = (event) => {
    setFormaPagamento(event.target.value);
  };

  const handleValorChange = (event) => {
    const input = event.target.value;
    const parsedValue = parseFloat(input.replace(",", "."));

    if (parsedValue < 5) {
      swal("O valor mínimo é R$5,00");
      setValor("");
    } else {
      setValor(input);
    }
  };

  const [documentType, setDocumentType] = useState("cpf");

  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
  };

  const handleCombinedChange = (event) => {
    handleDocumentTypeChange(event);
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("https://amigosdacasa.org.br/gerenciador-doacoes-amigosdacasa/login/login.php", {
        login
      })
      .then((response) => {
        console.log(response);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeLogin = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <Modal
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          width: 900,
          height: 700,
          bgcolor: "background.paper",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="donationType"
            name="donationType"
            value={donationType}
            onChange={(event) => setDonationType(event.target.value)}
          >
            <FormControlLabel
              value="single"
              control={<Radio />}
              label={<Typography color="textPrimary">Doação Única</Typography>}
            />
            <FormControlLabel
              value="recurring"
              control={<Radio />}
              label={
                <Typography color="textPrimary">Doação Recorrente</Typography>
              }
            />
          </RadioGroup>
        </FormControl>
        <Typography
          sx={{
            padding: "0px 20px",
            display: "flex",
            justifyContent: "center",
          }}
          gutterBottom
          variant="h4"
          color="primary"
        >
          Faça aqui sua contribuição
        </Typography>
        {donationType === "single" ? (
          <form onSubmit={handleSubmit(onSubmit)}>
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
                onChange={handleCombinedChange}
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
                onChange={handleValorChange}
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
                    onChange={handleChange}
                    {...register("formaPagamento")}
                  >
                    <MenuItem value={"Cartão de crédito"}>
                      Cartão de crédito
                    </MenuItem>
                    <MenuItem value={"Pix"}>Pix</MenuItem>
                    <MenuItem value={"Cartão debito"}>Cartão debito</MenuItem>
                    <MenuItem value={"Boleto"}>Boleto</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Button type="submit">SALVAR</Button>
          </form>
        ) : (
          //  Fomrulário privado
          <>
            {!isLoggedIn && showLogin && (
              <form onSubmit={handleLogin}>
                <TextField label="Username" onChange={(e)=>handleChangeLogin(e)} />
                <TextField type="password" label="Password" onChange={()=>handleChangeLogin()} />
                <Button type="submit">Login</Button>
                <Button onClick={() => setShowLogin(false)}>Fechar</Button>
              </form>
            )}
            {isLoggedIn ? (
              <h1>Autenticado</h1>
            ) : (
              <>
                <Button onClick={() => setShowLogin(true)}>
                  Faça login para continuar
                </Button>
              </>
            )}
          </>
        )}
        <Typography
          sx={{
            padding: "10px 0 0 0",
            margin: "0",
            display: "flex",
            justifyContent: "center",
          }}
          gutterBottom
          variant="h5"
          color="primary"
        >
          Avisos legais
        </Typography>
        <Typography
          sx={{ textAlign: "left" }}
          gutterBottom
          variant="body1"
          color="primary"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          quisquam molestias id odio cum placeat vero magnam delectus, possimus
          praesentium quibusdam accusantium, eius fuga quae! Dolor corporis
          debitis accusamus quas?is
        </Typography>
        <FormGroup sx={{ display: "flex" }}>
          <FormControlLabel
            sx={{ color: "gray" }}
            control={<Checkbox defaultChecked />}
            label="Estou ciente dos termos descritos acima"
          />
          <FormControlLabel
            sx={{ color: "gray" }}
            control={<Checkbox defaultChecked />}
            label="Concordo em receber informações sobre a Casa do Menido Jesus de Praga"
          />
        </FormGroup>
        <Divider
          sx={{
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
            backgroundColor: "primary-dark",
          }}
        />

        <Button variant="contained">Continuar</Button>
      </Box>
    </Modal>
  );
};

export default ModalPagamento;
