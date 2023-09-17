import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import DonationForm from "./DonationForm";
import LoginForm from "./LoginForm";
import LegalWarnings from "./LegalWarnings";
import ContinueButton from "./ContinueButton";
import RecurrentForm from "./RecurrentForm";
import RegisterForm from "./RegisterForm";

const ModalPagamento = ({ open, onClose, source, theme }) => {
  // State and Handlers for Basic Information
  const [valor, setValor] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [documentType, setDocumentType] = useState("cpf");
  const [donationType, setDonationType] = useState("single");

  // State and Handlers for Login Information
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [login, setLogin] = useState([]);
  const [showRegister, setShowRegister] = useState(false);

  const handleDocumentTypeChange = (e) => setDocumentType(e.target.value);
  const handleChange = (event) => setFormaPagamento(event.target.value);
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
  const handleCombinedChange = (event) => handleDocumentTypeChange(event);

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://amigosdacasa.org.br/gerenciador-doacoes-amigosdacasa/login_site/login.php",
        {
          email: login.email,
          password: login.password,
        }
      )
      .then((response) => {
        if (response.data.success === 1) {
          setIsLoggedIn(true);
          localStorage.setItem("loginToken", response.data.token);
        } else {
          console.log("Falha no login:", response.data.message);
          swal({
            title: "Falha no login",
            text: response.data.message,
            icon: "error",
          });
        }
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
  };

  const handleShowLogin = () => setShowRegister(false);


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
          width: { xs: "100%", md: "80%" },
          height: "100vh",
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
          <DonationForm
            documentType={documentType}
            handleCombinedChange={handleCombinedChange}
            valor={valor}
            handleValorChange={handleValorChange}
            formaPagamento={formaPagamento}
            handleChange={handleChange}
            theme={theme}
          />
        ) : isLoggedIn ? (
          <RecurrentForm theme={theme} />
        ) : showRegister ? (
          <RegisterForm handleShowLogin={handleShowLogin} />
        ) : (
          <LoginForm
            handleLogin={handleLogin}
            handleChangeLogin={handleChangeLogin}
            handleShowRegister={() => setShowRegister(true)} // pass this new prop to LoginForm
          />
        )}

        <LegalWarnings />

        <ContinueButton />
      </Box>
    </Modal>
  );
};

export default ModalPagamento;
