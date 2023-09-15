import React, { useState } from "react";
import { TextField, Button, Typography, Card, Box } from "@mui/material";
import axios from "axios";

function RegisterForm({ handleShowLogin }) {
  const initialState = {
    userInfo: {
      name: "",
      email: "",
      password: "",
      cpfCnpj: "",
      address: "",
      addressNumber: "",
      complement: "",
      province: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
      mobilePhone: "",
    },
    errorMsg: "",
    successMsg: "",
  };
  const [state, setState] = useState(initialState);

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://amigosdacasa.org.br/gerenciador-doacoes-amigosdacasa/login_site/register.php",
        state.userInfo
      );
      if (response.data.success) {
        setState({
          ...initialState,
          successMsg: response.data.message,
        });
      } else {
        setState({
          ...state,
          successMsg: "",
          errorMsg: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: { xs: "100%", sm: "100%", md: "100%" },
        padding: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Cadastro de Doador
      </Typography>
      <form
        style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
        onSubmit={submitForm}
      >
        <TextField
          label="Nome"
          name="name"
          required
          value={state.userInfo.name}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, name: e.target.value },
            })
          }
          placeholder="Digite seu nome completo"
        />

        <TextField
          label="Usuário"
          name="email"
          required
          value={state.userInfo.email}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, email: e.target.value },
            })
          }
          placeholder="Digite seu usuário"
        />

        <TextField
          type="password"
          label="Senha"
          name="password"
          required
          value={state.userInfo.password}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, password: e.target.value },
            })
          }
          placeholder="Digite sua senha"
        />

        <TextField
          label="CPF"
          name="cpfCnpj"
          required
          value={state.userInfo.cpfCnpj}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, cpfCnpj: e.target.value },
            })
          }
          placeholder="Digite seu CPF"
        />

        <TextField
          label="Rua"
          name="address"
          value={state.userInfo.address}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, address: e.target.value },
            })
          }
          placeholder="Digite sua rua"
        />

        <TextField
          label="Número"
          name="addressNumber"
          value={state.userInfo.addressNumber}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, addressNumber: e.target.value },
            })
          }
          placeholder="Digite o número"
        />

        <TextField
          label="Complemento"
          name="complement"
          value={state.userInfo.complement}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, complement: e.target.value },
            })
          }
          placeholder="Digite o complemento (opcional)"
        />

        <TextField
          label="Bairro"
          name="province"
          value={state.userInfo.province}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, province: e.target.value },
            })
          }
          placeholder="Digite o bairro"
        />

        <TextField
          label="Cidade"
          name="city"
          value={state.userInfo.city}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, city: e.target.value },
            })
          }
          placeholder="Digite a cidade"
        />

        <TextField
          label="Estado"
          name="state"
          value={state.userInfo.state}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, state: e.target.value },
            })
          }
          placeholder="Digite o estado"
        />

        <TextField
          label="CEP"
          name="postalCode"
          value={state.userInfo.postalCode}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, postalCode: e.target.value },
            })
          }
          placeholder="Digite o CEP"
        />

        <TextField
          label="Telefone"
          name="phone"
          value={state.userInfo.phone}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, phone: e.target.value },
            })
          }
          placeholder="Digite o telefone"
        />

        <TextField
          label="Celular"
          name="mobilePhone"
          value={state.userInfo.mobilePhone}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, mobilePhone: e.target.value },
            })
          }
          placeholder="Digite o celular"
        />

        {state.errorMsg && (
          <Typography color="error">{state.errorMsg}</Typography>
        )}
        {state.successMsg && (
          <Typography color="success">{state.successMsg}</Typography>
        )}

        <Button variant="contained" type="submit" fullWidth>
          Cadastrar
        </Button>
      </form>
      <Button variant="outlined" fullWidth onClick={handleShowLogin}>
        Entrar
      </Button>
    </Card>
  );
}

export default RegisterForm;
